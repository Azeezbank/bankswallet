import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";
import axios from "axios";
import { decrypt } from "@/app/utils/crypto";
import { transporter } from "@/app/lib/mailler";
import { Decimal } from "@prisma/client/runtime/library";
import { generateReference } from "@/app/utils/txRef";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = Number(req.headers.get("x-user-id"));

    const {
      network,
      airtimeType,
      phone,
      amountToPay,
      amount,
    } = body;

    // Get network id
    const networkId = await prisma.networks.findFirst({
      where: { name: network },
      select: { id: true },
    });

    if (!networkId) return NextResponse.json({ message: "Network not found" }, { status: 404 });

    let ncNetworkId;
    if (networkId.id === 1) ncNetworkId = 1;
    else if (networkId.id === 4) ncNetworkId = 2;
    else if (networkId.id === 2) ncNetworkId = 3;
    else if (networkId.id === 3) ncNetworkId = 4;

    const airtimeBody = {
      network: ncNetworkId,
      airtime_type: airtimeType,
      phone_number: phone,
      amount: amount,
      Ported_number: true,
    };

    // 1. Get API details
    const apiDoc = await prisma.env.findUnique({
      where: { service_type: airtimeType },
      select: { api_key: true, api_url: true },
    });

    if (!apiDoc) {
      return NextResponse.json(
        { message: "No API found for the given service type" },
        { status: 404 }
      );
    }

    const { api_key, api_url } = apiDoc;

    if (!api_key || !api_url) {
      return NextResponse.json({ message: "Invalid API credentials" }, { status: 400 });
    }

    const decryptKey = decrypt(api_key);

    const headers = {
      Authorization: decryptKey,
      "Content-Type": "application/json",
    };

    // 2. Get user
    const user = await prisma.users.findUnique({
      where: { d_id: Number(userId) },
      select: { user_balance: true, isban: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const wallet = new Decimal(user.user_balance);
    const newBalance = wallet.minus(new Decimal(amountToPay));

    if (wallet.lt(new Decimal(amountToPay))) {
      return NextResponse.json(
        { message: "Insufficient wallet balance" },
        { status: 400 }
      );
    }


    // 3. Fraud check
    if (new Decimal(amount).gt(new Decimal(3000))) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "tunstelecom.com.ng@gmail.com",
        subject: "Fraud Alert!",
        html: `<p>A User with <b>ID: ${userId}</b> is trying to purchase Airtime more than 3k</p>`,
      });

      await prisma.users.update({
        where: { d_id: Number(userId) },
        data: { isban: true },
      });

      return NextResponse.json(
        { message: "Transaction cannot be processed" },
        { status: 403 }
      );
    };

    // Deduct user
    await prisma.users.update({
      where: {
        d_id: Number(userId),
      },
      data: {
        user_balance: {
          decrement: new Decimal(amountToPay),
        },
        prev_balance: wallet,
      },
    });


    const reference = generateReference();
    await prisma.airtimeHist.create({
      data: {
        id: Number(userId),
        txRef: reference,
        network: network,
        amount: new Decimal(amountToPay),
        phone_number: phone,
        previous_balance: wallet,
        new_balance: newBalance, // unchanged for now
        time: new Date(),
        status: "pending",
        airtimeType: airtimeType,
      },
    });


    let status;
    let apiResponse;

    // 5. Call external API
    try {
      const response = await axios.post(api_url, airtimeBody, { headers });

      apiResponse = response.data;
      status =
        response.data.status ??
        response.data.Status ??
        response.data.message

      // Refund if failed
      if (!status || ["failed", "Failed", "Fail", "fail"].includes(status) ||
        (typeof status === "number" && status >= 400)) {
        await prisma.users.update({
          where: { d_id: userId }, data: {
            prev_balance: newBalance, user_balance: {
              increment: new Decimal(amountToPay),
            },
          }
        });
        await prisma.airtimeHist.update({
          where: { txRef: reference },
          data: {
            previous_balance: newBalance, new_balance: wallet, time: new Date(), status: status
          }
        });
        return NextResponse.json({ message: "Transaction failed, wallet refunded", status }, { status: 502 });
      }

      // Update status to success
      await prisma.airtimeHist.update({
        where: { txRef: reference },
        data: { status: status, time: new Date() }
      });

    } catch (err) {
      console.error("API ERROR:", err);
      status = "failed";
      await prisma.users.update({
        where: { d_id: userId },
        data: {
          prev_balance: newBalance, user_balance: {
            increment: new Decimal(amountToPay)
          },
        }
      });
      await prisma.airtimeHist.update({
        where: { txRef: reference },
        data: {
          previous_balance: newBalance, new_balance: wallet, time: new Date(), status: status
        }
      });
      return NextResponse.json({ error: "Failed to process Airtime top-up" },
        { status: 500 }
      );
    }

    return NextResponse.json(apiResponse, { status: 200 });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to process Airtime top-up" },
      { status: 500 }
    );
  }
}
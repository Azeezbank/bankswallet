import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";
import axios from "axios";
import { decrypt } from "@/app/utils/crypto";
import { transporter } from "@/app/lib/mailler";
import { Decimal } from "@prisma/client/runtime/library";

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

    const airtimeBody = {
      network: network,
      amount: amount,
      mobile_number: phone,
      Ported_number: true,
      airtime_type: airtimeType,
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
            return NextResponse.json({ message: "Invalid Application Programming Interface credentials" }, { status: 400 });
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

    if (wallet.lt(new Decimal(amount))) {
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
    }

    // 4. Deduct balance
    const newBalance = wallet.minus(new Decimal(amountToPay));

    await prisma.users.update({
      where: { d_id: Number(userId) },
      data: {
        user_balance: newBalance,
        prev_balance: wallet,
      },
    });

    let status: any = "failed";
    let apiResponse = null;

    // 5. Call external API
    try {
      const response = await axios.post(
        api_url,
        airtimeBody,
        { headers }
      );

      apiResponse = response.data;
      status =
        response.data.status ??
        response.data.Status ??
        "unknown";

      // 6. Refund logic
      if (
        status === "failed" ||
        status === "Failed" ||
        status === "Fail" ||
        status === "fail" ||
        (typeof status === "number" && status >= 400)
      ) {
        await prisma.users.update({
          where: { d_id: Number(userId) },
          data: { user_balance: wallet },
        });
      }
    } catch (error: any) {
      console.error("API request failed:", error.message);

      await prisma.users.update({
        where: { d_id: Number(userId) },
        data: { user_balance: wallet },
      });

      status = "api_failed";
    }

    // 7. Save history
    await prisma.airtimeHist.create({
      data: {
        id: Number(userId),
        network: network,
        amount: parseFloat(amountToPay),
        phone_number: phone,
        previous_balance: wallet,
        new_balance: newBalance,
        time: new Date(),
        status: status.toString(),
        airtimeType: airtimeType,
      },
    });

    if (status === "failed" || status === "api_failed") {
      return NextResponse.json(
        { message: "Transaction failed", status },
        { status: 502 }
      );
    }

    return NextResponse.json(apiResponse, { status: 200 });

  } catch (err: any) {
    console.error(err?.response?.data || err.message);

    return NextResponse.json(
      { error: "Failed to process Airtime top-up" },
      { status: 500 }
    );
  }
}
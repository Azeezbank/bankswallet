import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/app/Prisma.client";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Step 1: Verify signature
    const verifySignature = (payload: any, signature: string) => {
      const secretKey = process.env.MON_SECRET_KEY as string;

      const computedHash = crypto
        .createHmac("sha512", secretKey)
        .update(JSON.stringify(payload))
        .digest("hex");

      return computedHash === signature;
    };

    const monnifySignature = req.headers.get("monnify-signature");

    if (!monnifySignature || !verifySignature(payload, monnifySignature)) {
      console.error("Invalid Monnify signature");
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 403 }
      );
    }

    const eventType = payload.eventType;
    const reference = payload.eventData.product.reference;
    const paymentRef = payload.eventData.paymentReference;
    const paidOn = payload.eventData.paidOn;
    const amountPaid = parseFloat(payload.eventData.amountPaid);
    const paymentMethod = payload.eventData.paymentMethod;
    const paymentStatus = payload.eventData.paymentStatus;

    const userId = parseInt(reference.split("_")[1]);

    const chargesPercent = 2;
    const charges = (chargesPercent / 100) * amountPaid;
    const netAmount = amountPaid - charges;

    // Step 2: Prevent duplicate processing
    const paymentExists = await prisma.paymentHist.findFirst({
      where: { payment_ref: paymentRef },
    });

    if (paymentExists) {
      return NextResponse.json(
        { message: "Payment already processed" },
        { status: 200 }
      );
    }

    // Step 3: Get user
    const user = await prisma.users.findUnique({
      where: { d_id: userId },
      select: {
        user_balance: true,
        isFund: true,
        referral: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Failed to select user balance" },
        { status: 500 }
      );
    }

    const prevBalance = parseFloat(user.user_balance as any);
    const newBalance = prevBalance + netAmount;

    // Step 4: Save payment history
    await prisma.paymentHist.create({
      data: {
        id: userId,
        event_type: eventType,
        payment_ref: paymentRef,
        paid_on: paidOn,
        amount: netAmount,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        prev_balance: prevBalance,
        user_balance: newBalance,
      },
    });

    // Step 5: Update user balance
    await prisma.users.update({
      where: { d_id: userId },
      data: {
        user_balance: newBalance,
        prev_balance: prevBalance,
      },
    });

    // Step 6: Referral bonus
    const referralPercentage = 2;
    const referralBonus = (referralPercentage / 100) * netAmount;

    if (user.isFund === false && user.referral) {
      const refer = await prisma.users.findFirst({
        where: { username: user.referral },
      });

      if (!refer) {
        console.log("No referral found");
      } else if (
        refer.username === user.referral &&
        refer.d_id === userId
      ) {
        console.log("You can't refer yourself");
      } else {
        await prisma.users.update({
          where: { username: user.referral },
          data: {
            cashback: { increment: referralBonus },
            isFund: true,
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error inserting payment:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
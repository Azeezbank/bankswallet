import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = parseFloat(body.amount);
    const id = Number(req.nextUrl.pathname.split("/").pop());

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }
    if (amount > 10000) {
      return NextResponse.json({ message: "Funding amount exceeds limit" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { d_id: id },
      select: { user_balance: true },
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const walletBalance = user.user_balance;
    const newBalance = walletBalance.plus(amount);

    await prisma.paymentHist.create({
      data: {
        id,
        event_type: "Manual Fund",
        payment_ref: "Admin Approved",
        paid_on: new Date().toISOString(),
        amount,
        payment_method: "Manual",
        payment_status: "Approved",
        prev_balance: walletBalance,
        user_balance: newBalance,
      },
    });

    await prisma.users.update({
      where: { d_id: id },
      data: { user_balance: newBalance, prev_balance: walletBalance },
    });

    return NextResponse.json({ message: "Wallet Funded Manually successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Error funding wallet manually", err);
    return NextResponse.json({ message: "Failed to fund wallet" }, { status: 500 });
  }
}
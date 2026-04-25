import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = Number(req.headers.get("x-user-id"));

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const skip = (page - 1) * limit;

    // DATA TRANSACTIONS
    const dataTx = await prisma.dataTransactionHist.findMany({
      where: { id: userId },
      select: {
        d_id: true,
        plan: true,
        phone_number: true,
        amount: true,
        balance_before: true,
        balance_after: true,
        status: true,
        time: true,
      },
      orderBy: { time: "desc" },
    });

    // AIRTIME TRANSACTIONS
    const airtimeTx = await prisma.airtimeHist.findMany({
      where: { id: userId },
      select: {
        d_id: true,
        network: true,
        amount: true,
        phone_number: true,
        previous_balance: true,
        new_balance: true,
        status: true,
        airtimeType: true,
        time: true,
      },
      orderBy: { time: "desc" },
    });

    // PAYMENT TRANSACTIONS
    const paymentTx = await prisma.paymentHist.findMany({
      where: { id: userId },
      orderBy: { paid_on: "desc" },
    });

    // NORMALIZE DATA
    const dataHistory = dataTx.map((tx) => ({
      id: tx.d_id,
      service: "data",
      type: tx.plan,
      receiver: tx.phone_number,
      amount: tx.amount,
      status: tx.status,
      date: tx.time,
    }));

    const airtimeHistory = airtimeTx.map((tx) => ({
      id: tx.d_id,
      service: "airtime",
      type: tx.airtimeType,
      receiver: tx.phone_number,
      amount: tx.amount,
      status: tx.status,
      date: tx.time,
    }));

    const paymentHistory = paymentTx.map((tx) => ({
      id: tx.d_id,
      service: "payment",
      type: "Wallet Funding",
      receiver: tx.payment_method,
      amount: tx.amount,
      status: tx.payment_status,
      date: tx.paid_on,
    }));

    // MERGE ALL HISTORIES
    const history = [
      ...dataHistory,
      ...airtimeHistory,
      ...paymentHistory,
    ];

    // SORT BY DATE
    history.sort(
      (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );

    const paginated = history.slice(skip, skip + limit);
    

    return NextResponse.json({
      result: paginated,
      total: history.length,
      totalPage: Math.ceil(history.length / limit),
      page,
      limit,
    });

  } catch (err) {
    console.error("Failed to fetch transaction history", err);

    return NextResponse.json(
      { message: "Failed to fetch transaction history" },
      { status: 500 }
    );
  }
}
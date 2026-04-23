import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const skip = (page - 1) * limit;

    // DATA TRANSACTIONS
    const dataTx = await prisma.dataTransactionHist.findMany({
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
      orderBy: { paid_on: "desc" },
    });

    // NORMALIZE DATA
    const dataHistory = dataTx.map((tx) => ({
      service: "data Transaction",
      type: tx.plan,
      receiver: tx.phone_number,
      amount: tx.amount,
      status: tx.status,
      date: tx.time,
    }));

    const airtimeHistory = airtimeTx.map((tx) => ({
      service: "airtime Transaction",
      type: tx.airtimeType,
      receiver: tx.phone_number,
      amount: tx.amount,
      status: tx.status,
      date: tx.time,
    }));

    const paymentHistory = paymentTx.map((tx) => ({
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const dailyDataTransactions = await prisma.dataTransactionHist.count({
      where: {
        time: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const dailyAirtimeTransactions = await prisma.airtimeHist.count({
      where: {
        time: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const dailyTransactions = dailyDataTransactions + dailyAirtimeTransactions;


    return NextResponse.json({
      result: paginated,
      total: history.length,
      totalPage: Math.ceil(history.length / limit),
      page,
      limit,
      dailyTransactions,
    });

  } catch (err) {
    console.error("Failed to fetch transaction history", err);

    return NextResponse.json(
      { message: "Failed to fetch transaction history" },
      { status: 500 }
    );
  }
}
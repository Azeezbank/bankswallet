import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const service = searchParams.get("service");

    if (!service) {
      return NextResponse.json(
        { message: "Service type is required" },
        { status: 400 }
      );
    }

    let result: any = null;

    if (service === "data") {
      const tx = await prisma.dataTransactionHist.findUnique({
        where: { d_id: numericId },
      });

      if (!tx) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }

      result = {
        id: tx.d_id,
        service: "data",
        reference: tx.txRef,
        network: tx.network,
        type: tx.plan,
        phone: tx.phone_number,
        amount: tx.amount,
        status: tx.status,
        date: tx.time,
        balance_before: tx.balance_before,
        balance_after: tx.balance_after,
      };
    }

    else if (service === "airtime") {
      const tx = await prisma.airtimeHist.findUnique({
        where: { d_id: numericId },
      });

      if (!tx) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }

      result = {
        id: tx.d_id,
        service: "airtime",
        reference: tx.txRef,
        network: tx.network,
        type: tx.airtimeType,
        receiver: tx.phone_number,
        amount: tx.amount,
        status: tx.status,
        date: tx.time,
        balance_before: tx.previous_balance,
        balance_after: tx.new_balance,
      };
    }

    else if (service === "payment") {
      const tx = await prisma.paymentHist.findUnique({
        where: { d_id: numericId },
      });

      if (!tx) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }

      result = {
        id: tx.id,
        service: "payment",
        type: "Wallet Funding",
        receiver: tx.payment_method,
        amount: tx.amount,
        status: tx.payment_status,
        date: tx.paid_on,
        reference: tx.payment_ref,
        balance_before: tx.prev_balance,
        balance_after: tx.user_balance,
      };
    }

    else {
      return NextResponse.json(
        { message: "Invalid service type" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

  } catch (err) {
    console.error("Failed to fetch receipt:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function POST(req: NextRequest) {
  try {
    const userId = Number(req.headers.get("x-user-id"));

    const bankDetails = await prisma.userBankDetails1.findFirst({
      where: {
        id: userId,
        is_active: "active",
      },
    });

    if (!bankDetails) {
      return NextResponse.json({ message: "No details found" }, { status: 404 });
    }

    return NextResponse.json(bankDetails, { status: 200 });
  } catch (err: any) {
    console.error("Error selecting user bank details", err);
    return NextResponse.json(
      { message: "Error selecting user bank details" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const pin = parseInt(body.pin);

    const userId = Number(req.headers.get("x-user-id"));

    await prisma.users.update({
      where: { d_id: userId },
      data: { Pin: pin },
    });

    return NextResponse.json({ message: "Pin updated successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Failed to update pin", err);
    return NextResponse.json({ message: "Failed to update pin" }, { status: 500 });
  }
}
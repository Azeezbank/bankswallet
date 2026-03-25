import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    await prisma.users.update({
      where: { d_id: userId },
      data: { isban: true },
    });

    return NextResponse.json(
      { message: "User banned successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Failed to ban user", err);

    return NextResponse.json(
      { message: "Failed to ban user" },
      { status: 500 }
    );
  }
}
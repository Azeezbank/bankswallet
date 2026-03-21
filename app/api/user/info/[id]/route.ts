import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const user = await prisma.users.findUnique({
      where: { d_id: id },
      select: {
        d_id: true,
        username: true,
        user_email: true,
        user_balance: true,
        packages: true,
        Phone_number: true,
        Pin: true,
        fullName: true,
      },
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.error("Failed to select user details", err);
    return NextResponse.json({ message: "Failed to select user details" }, { status: 500 });
  }
}
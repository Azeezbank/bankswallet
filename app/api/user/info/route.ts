import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client"; // adjust path

export async function GET(req: NextRequest) {
  try {
    const userId = Number(req.headers.get("x-user-id"));

    const user = await prisma.users.findUnique({
      where: { d_id: userId },
      select: {
        username: true,
        user_balance: true,
        role: true,
        packages: true,
        cashback: true,
        referree: true,
        Phone_number: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.error("Error selecting user", err);
    return NextResponse.json({ message: "Error selecting user" }, { status: 500 });
  }
}
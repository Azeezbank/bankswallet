import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

async function isAdmin(userId: number) {
  const user = await prisma.users.findFirst({
    where: { d_id: userId },
    select: { role: true }
  });

  return user?.role === "admin";
}

export async function GET(req: Request) {
  try {
    const userId = Number(req.headers.get("userid"));

    const admin = await isAdmin(userId);

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Admin Authorized" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
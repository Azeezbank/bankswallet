import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const userId = Number(req.headers.get("x-user-id"));
    const { currentPassword, newPassword, confirmPassword } =
      await req.json();

    if (!userId || !currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { d_id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.user_pass);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Confirm new password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password too weak (min 6 characters)" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { d_id: Number(userId) },
      data: {
        user_pass: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Password updated successfully",
    }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
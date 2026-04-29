import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function POST(req: Request) {
  try {
    const userId = Number(req.headers.get("x-user-id"));
    const { currentPin, newPin, confirmPin } = await req.json();

    if (!userId || !newPin || !confirmPin) {
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

    // Validate PIN format (4 digits only)
    const pinRegex = /^\d{4}$/;

    if (!pinRegex.test(newPin)) {
      return NextResponse.json(
        { message: "PIN must be exactly 4 digits" },
        { status: 400 }
      );
    }

    if (newPin !== confirmPin) {
      return NextResponse.json(
        { message: "PINs do not match" },
        { status: 400 }
      );
    }

    // If user already changed default PIN (0000), verify current PIN
    if (user.Pin !== 0) {
      if (!currentPin) {
        return NextResponse.json(
          { message: "Current PIN is required" },
          { status: 400 }
        );
      }

      if (Number(currentPin) !== user.Pin) {
        return NextResponse.json(
          { message: "Current PIN is incorrect" },
          { status: 401 }
        );
      }
    }

    await prisma.users.update({
      where: { d_id: Number(userId) },
      data: {
        Pin: Number(newPin),
      },
    });

    return NextResponse.json({
      message: "PIN updated successfully",
    }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
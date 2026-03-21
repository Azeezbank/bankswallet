import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client"; // adjust path

export async function GET(req: NextRequest) {
  try {
    const message = await prisma.admin_setting.findFirst({
      select: { whatsapp_link: true, dash_message: true },
    });

    if (!message) {
      return NextResponse.json(
        { message: "Error fetching dashboard message" },
        { status: 404 }
      );
    }

    return NextResponse.json(message, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching dashboard message:", err);
    return NextResponse.json(
      { message: "Server error while fetching dashboard message" },
      { status: 500 }
    );
  }
}
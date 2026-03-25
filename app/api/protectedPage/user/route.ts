import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET(req: NextResponse) {
  try {
    // Example: assuming userId comes from header or token
    const userId = Number(req.headers.get("x-user-id"));

    const user = await prisma.users.findFirst({
      where: { d_id: userId },
      select: { isban: true },
    });

    if (!user || user.isban === true) {
      console.log("Unauthorized, Banned User");
      return NextResponse.json({ message: "UB" }, { status: 401 });
    }

    return NextResponse.json({ message: "Authorized" }, { status: 200 });

  } catch (err: any) {
    console.error("Error checking user ban status:", err.message);
    return NextResponse.json(
      { message: "Server unavailable" },
      { status: 500 }
    );
  }
}
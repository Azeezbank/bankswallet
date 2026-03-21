import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client"; // adjust path

// Fetch paginated users
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.users.count();

    // Get paginated data
    const data = await prisma.users.findMany({
      skip,
      take: limit,
      select: {
        d_id: true,
        username: true,
        user_email: true,
        user_balance: true,
        packages: true,
        Phone_number: true,
        Pin: true,
      },
    });

    const totalPage = Math.ceil(total / limit);

    return NextResponse.json({ total, page, limit, totalPage, data }, { status: 200 });
  } catch (err: any) {
    console.error("Error selecting user details", err.message);
    return NextResponse.json({ message: "Error selecting user details" }, { status: 500 });
  }
}
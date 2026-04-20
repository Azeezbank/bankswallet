import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { network, choosenDataType } = body;

    const userId = Number(req.headers.get("x-user-id"));

    const user = await prisma.users.findUnique({
      where: { d_id: userId },
      select: { packages: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    let packag = "";

    if (user.packages === "USER") {
      packag = "USER";
    } else if (user.packages === "RESELLER") {
      packag = "RESELLER";
    } else if (user.packages === "API") {
      packag = "API";
    } else {
      console.log("Invalid package type");
      return NextResponse.json(
        { message: "Invalid package type" },
        { status: 400 }
      );
    }

    const plans = await prisma.data_plans.findMany({
      where: {
        network_name: network,
        data_type: choosenDataType,
        is_active: "active",
      },
      select: {
        d_id: true,
        id: true,
        name: true,
        network_name: true,
        data_type: true,
        validity: true,
        [packag]: true,
      },
      orderBy: {
        [packag]: "asc",
      },
    });

    return NextResponse.json(plans, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch data plans", err);

    return NextResponse.json(
      { message: "Failed to fetch data plans" },
      { status: 500 }
    );
  }
}
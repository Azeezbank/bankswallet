import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { choosenNetwork } = body;

  try {
    const result = await prisma.data_types.findMany({
      where: {
        network_name: choosenNetwork,
        is_active: "active",
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("Failed to select network", err.message);
    return NextResponse.json({ error: "Failed to select network" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET() {
  try {
    const result = await prisma.data_plans.findMany({
      select: { d_id: true, id: true, name: true, network_name: true, data_type: true, validity: true, USER: true, RESELLER: true, API: true, is_active: true },
      orderBy: [{ network_name: "asc" }, { data_type: "asc" }, { USER: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to select data plans" }, { status: 500 });
  }
}
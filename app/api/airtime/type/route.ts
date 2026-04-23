import prisma from "@/app/Prisma.client";
import { NextResponse } from "next/server";

// Fetch Airtime types
export async function GET() {
  try {
    const types = await prisma.airtimeT.findMany({
      where: {
        is_active: "active",
      },
    });

    if (!types || types.length === 0) {
      return NextResponse.json(
        { error: "Airtime type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(types, { status: 200 });

  } catch (err) {
    console.error("Failed to fetch Airtime types", err);

    return NextResponse.json(
      { error: "Unable to select Airtime type" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function GET() {
  try {
    const mtn = await prisma.data_plans.findMany({
      where: { network_name: "MTN" },
      select: {
        d_id: true,
        id: true,
        name: true,
        network_name: true,
        data_type: true,
        validity: true,
        USER: true,
        RESELLER: true,
        API: true,
        is_active: true,
      },
      orderBy: [
        { name: "asc" },
        { data_type: "asc" },
      ],
    });

    const airtel = await prisma.data_plans.findMany({
      where: { network_name: "AIRTEL" },
      select: {
        d_id: true,
        id: true,
        name: true,
        network_name: true,
        data_type: true,
        validity: true,
        USER: true,
        RESELLER: true,
        API: true,
        is_active: true,
      },
      orderBy: [
        { name: "asc" },
        { data_type: "asc" },
      ],
    });

    const glo = await prisma.data_plans.findMany({
      where: { network_name: "GLO" },
      select: {
        d_id: true,
        id: true,
        name: true,
        network_name: true,
        data_type: true,
        validity: true,
        USER: true,
        RESELLER: true,
        API: true,
        is_active: true,
      },
      orderBy: [
        { name: "asc" },
        { data_type: "asc" },
      ],
    });

    const mobile = await prisma.data_plans.findMany({
      where: { network_name: "9MOBILE" },
      select: {
        d_id: true,
        id: true,
        name: true,
        network_name: true,
        data_type: true,
        validity: true,
        USER: true,
        RESELLER: true,
        API: true,
        is_active: true,
      },
      orderBy: [
        { name: "asc" },
        { data_type: "asc" },
      ],
    });

    return NextResponse.json({ mtn, airtel, glo, mobile }, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch data plans", error);

    return NextResponse.json(
      { error: "Failed to fetch data plans" },
      { status: 500 }
    );
  }
}
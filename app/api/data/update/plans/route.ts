import { NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function PUT(req: Request) {
  try {
    const dataPlans = await req.json(); // array of plans

    await prisma.$transaction(
      dataPlans.map((item: any) =>
        prisma.data_plans.update({
          where: { d_id: Number(item.d_id) },
          data: {
            id: Number(item.id),
            name: item.name,
            network_name: item.network_name,
            data_type: item.data_type,
            validity: item.validity,
            is_active: item.is_active,
            USER: item.USER,
            RESELLER: item.RESELLER,
            API: item.API,
          },
        })
      )
    );

    return NextResponse.json(
      { message: "All data plans updated successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error updating data:", err);

    return NextResponse.json(
      { error: "Failed to update one or more plans" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function PUT(req: NextRequest) {
  const { dataTypeNetworkName, dataTypeName, isDataTypeStatus } = await req.json();

  try {
    await prisma.data_types.updateMany({
      where: { network_name: dataTypeNetworkName, name: dataTypeName },
      data: { is_active: isDataTypeStatus },
    });
    return NextResponse.json({ message: "Data type status updated successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update data type status" }, { status: 500 });
  }
}
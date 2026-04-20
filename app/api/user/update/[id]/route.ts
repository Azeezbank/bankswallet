import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";

export async function PUT(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());
    const body = await req.json();
    const { fieldName, value } = body;

    const allowedFields = ["username","user_email","user_balance","packages","Phone_number","Pin","fullName"];
    if (!allowedFields.includes(fieldName)) {
      return NextResponse.json({ message: "Invalid field name" }, { status: 400 });
    }

    await prisma.users.update({
      where: { d_id: id },
      data: { [fieldName]: value },
    });

    return NextResponse.json({ message: "User details updated successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Failed to update user details", err);
    return NextResponse.json({ message: "Failed to update user details" }, { status: 500 });
  }
}
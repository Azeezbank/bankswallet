import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/app/utils/crypto";
import prisma from "@/app/Prisma.client";

// POST - Save or Update API Docs
export async function POST(req: Request) {
  try {
    const { service_type, api_key, api_url } = await req.json();

    if (!service_type || !api_key || !api_url) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const encryptedApiKey = encrypt(api_key);

    await prisma.env.upsert({
      where: {
        service_type,
      },
      update: {
        api_key: encryptedApiKey,
        api_url,
      },
      create: {
        service_type,
        api_key: encryptedApiKey,
        api_url,
      },
    });

    return NextResponse.json(
      { message: "API details saved successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to save API docs", err);

    return NextResponse.json(
      { message: "Failed to save API docs" },
      { status: 500 }
    );
  }
}


// GET - Fetch API Docs
export async function GET() {
  try {
    const docs = await prisma.env.findMany({
      select: {
        d_id: true,
        service_type: true,
        api_key: true,
        api_url: true,
      },
    });

    const decryptedDocs = docs.map((doc: any) => ({
      ...doc,
      api_key: decrypt(doc.api_key),
    }));

    return NextResponse.json(decryptedDocs, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch API docs", err);

    return NextResponse.json(
      { message: "Failed to fetch API docs" },
      { status: 500 }
    );
  }
}
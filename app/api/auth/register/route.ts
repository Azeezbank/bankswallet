import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/Prisma.client";
import { transporter } from "@/app/lib/mailler";

export async function POST(req: NextRequest) {
  try {
    const { password, username, email, phone, fullName, referralUsername } = await req.json();

    // Check if user exists
    const existingUser = await prisma.users.findFirst({
      where: { OR: [{ user_email: email }, { username }] },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    await prisma.users.create({
      data: {
        user_pass: hashedPassword,
        username,
        user_email: email,
        Phone_number: phone,
        verificationOTP: verificationCode,
        fullName,
        referral: referralUsername,
      },
    });

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Your verification code is <b>${verificationCode}</b></p>`,
    });

    return NextResponse.json({
      message: "User registered successfully, verification code has been sent to your mail",
    });
  } catch (err: any) {
    console.error("Register Error:", err);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}
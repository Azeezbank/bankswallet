import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";
import { transporter } from "@/app/lib/mailler";

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();

    const user = await prisma.users.findFirst({
      where: { verificationOTP: otp },
      select: { username: true, referral: true, verificationOTP: true },
    });

    if (!user || user.verificationOTP !== otp) {
      return NextResponse.json(
        { message: "Invalid Verification Code, Please input valid verification code" },
        { status: 404 }
      );
    }

    const { username, referral } = user;

    // Update user to verified
    await prisma.users.update({
      where: { verificationOTP: otp },
      data: { isverified: true },
    });

    // Update referral count
    if (referral) {
      const refUser = await prisma.users.findFirst({ where: { username: referral } });
      if (refUser) {
        await prisma.users.update({
          where: { username: referral.trim() },
          data: { referree: { increment: 1 } },
        });
      }
    }

    // Notify admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "tunstelecom.com.ng@gmail.com",
      subject: "New User Registered",
      html: `<p>New User with Username <b>${username}</b> has just registered on your website </p>`,
    });

    return NextResponse.json({ message: "User Verified Successfully" });
  } catch (err: any) {
    console.error("Verify Mail Error:", err);
    return NextResponse.json({ message: "Error verifying user mail" }, { status: 500 });
  }
}
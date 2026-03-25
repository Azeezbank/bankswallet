import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import prisma from "@/app/Prisma.client";
import { transporter } from "@/app/lib/mailler";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If user not verified
    if (user.isverified === false) {
      const email = user.user_email;
      const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `<p>Your verification code is <b>${verificationCode}</b></p>`,
      });

      await prisma.users.update({
        where: { username },
        data: { verificationOTP: verificationCode },
      });

      return NextResponse.json(
        {
          message:
            "User mail not verified, please verify your mail. An OTP has been sent to your mail.",
        },
        { status: 503 }
      );
    }

    // Check password
    const passwordIsValid = await bcrypt.compare(password, user.user_pass);
    if (!passwordIsValid) {
      return NextResponse.json(
        {
          message:
            "Incorrect username or password. Both fields may be case-sensitive",
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = JWT.sign({ id: user.d_id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Return token in JSON body for frontend to handle
    return NextResponse.json({
      message: "Login successful",
      username: user.username,
      userId: user.d_id,
      token,
    });

  } catch (err: any) {
    console.error("Login Error:", err);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(req: NextRequest) {

  const publicRoutes = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/data/plan",
  ];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id.toString());

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;

  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
"use client";

import { Suspense } from "react";
import LoginClient from "@/app/components/auth/login";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}
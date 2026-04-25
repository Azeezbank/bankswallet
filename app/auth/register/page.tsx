"use client";

import { Suspense } from "react";
import RegisterForm from "@/app/components/auth/register";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-gradient px-4">
      <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
      </Suspense>
    </div>
  );
}
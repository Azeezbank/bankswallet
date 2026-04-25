"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/app/lib/authCheck";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const ok = await checkAuth();

      if (!ok) {
        router.push(`/auth/login?redirect=${window.location.pathname}`);
      }
    };

    verify();
  }, []);
};
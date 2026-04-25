"use client";

import HistoryPage from "../components/history";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function page() {
    useAuthGuard();
    return <HistoryPage />
}
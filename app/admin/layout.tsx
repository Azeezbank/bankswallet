"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-app-gradient">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (FIXED ALWAYS) */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* CONTENT (IMPORTANT PART) */}
      <div className="md:ml-64 min-h-screen flex flex-col">

        {/* TOP BAR (MOBILE ONLY) */}
        <header className="flex items-center gap-3 p-4 md:hidden bg-white/70 backdrop-blur border-b">

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold text-primary">
            Admin Panel
          </h1>

        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
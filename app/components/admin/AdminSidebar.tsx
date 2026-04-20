"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  ArrowLeftRight,
  Layers,
  Settings,
  X
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "API Docs", href: "/admin/api-docs", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {

  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b flex items-center justify-between">

        <h2 className="text-xl font-bold text-primary">
          VTU Admin
        </h2>

        {/* Close button (mobile) */}
        <button
          onClick={closeSidebar}
          className="md:hidden cursor-pointer"
        >
          <X size={20} />
        </button>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {

          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                active
                  ? "bg-primary text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 text-xs text-gray-400 border-t">
        Admin Panel v1.0
      </div>

    </aside>
  );
}
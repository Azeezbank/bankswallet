"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  ArrowLeftRight,
  Layers,
  Settings,
  ChevronDown,
  X
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "API Docs", href: "/admin/api-docs", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
];

const servicesMenu = [
  { name: "Data Gateway", href: "/admin/gateway/data" },
  { name: "Airtime Gateway", href: "/admin/services/airtime" },
  { name: "Cable TV", href: "/admin/services/cable" },
  { name: "Electricity", href: "/admin/services/electricity" },
];

export default function AdminSidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {

  const pathname = usePathname();
  const [openServices, setOpenServices] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b flex items-center justify-between">

        <h2 className="text-xl font-bold text-primary">
          VTU Admin
        </h2>

        <button
          onClick={closeSidebar}
          className="md:hidden"
        >
          <X size={20} />
        </button>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {/* Main Menu */}
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
              <Icon size={18} className={active ? "text-white" : "text-primary"} />
              {item.name}
            </Link>
          );
        })}

        {/* Services Parent */}
        <button
          onClick={() => setOpenServices(!openServices)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <Layers size={18} className="text-primary" />
            Services
          </div>

          <ChevronDown
            size={16}
            className={`transition-transform ${
              openServices ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Submenu */}
        {openServices && (
          <div className="ml-8 space-y-1">

            {servicesMenu.map((item) => {

              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`block px-3 py-2 rounded-md text-sm transition
                  ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

          </div>
        )}

        {/* Settings */}
        <Link
          href="/admin/settings"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
          ${
            pathname === "/admin/settings"
              ? "bg-primary text-white shadow"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Settings size={18} className="text-primary" />
          Settings
        </Link>

      </nav>

      <div className="p-4 text-xs text-gray-400 border-t">
        Admin Panel v1.0
      </div>

    </aside>
  );
}
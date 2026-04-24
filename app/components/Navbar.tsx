"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur border-b">

      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-lg font-bold text-primary">
            Bankswallet
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">

          <Link href="#features" className="hover:text-primary transition">
            Features
          </Link>

          <Link href="#pricing" className="hover:text-primary transition">
            Pricing
          </Link>

          <Link href="#how-it-works" className="hover:text-primary transition">
            How it works
          </Link>

          <Link href="#support" className="hover:text-primary transition">
            Support
          </Link>

        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm text-gray-600 hover:text-primary transition"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="px-5 py-2 rounded-lg text-sm text-white bg-gradient hover:opacity-90 transition"
          >
            Get Started
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">

          <Link href="#features" className="block text-gray-700">
            Features
          </Link>

          <Link href="#pricing" className="block text-gray-700">
            Pricing
          </Link>

          <Link href="#how-it-works" className="block text-gray-700">
            How it works
          </Link>

          <Link href="#support" className="block text-gray-700">
            Support
          </Link>

          <div className="flex flex-col gap-2 pt-3">

            <Link
              href="/auth/login"
              className="px-4 py-2 text-center border rounded-lg"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="px-4 py-2 text-center text-white bg-gradient rounded-lg"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}
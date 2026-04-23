import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react";

interface HeaderProps {
  pageIndex: number;
  buy: string;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}
export const Header = ({ pageIndex, setPageIndex, buy }: HeaderProps) => {
  return (
    <div className="mb-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-5">
        {pageIndex === 1 ? (
          <Link href="/user">
            <ChevronLeft size={26} className="cursor-pointer" />
          </Link>
        ) : (
          <button onClick={() => setPageIndex(pageIndex - 1)}>
            <ChevronLeft size={26} className="cursor-pointer" />
          </button>
        )}

        <h2 className="font-bold text-lg">{buy}</h2>

        <div className="w-7 h-7 rounded-lg bg-gradient flex items-center justify-center text-white font-bold">
            B
          </div>
      </div>
    </div>
  )
}

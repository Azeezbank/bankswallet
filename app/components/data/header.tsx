import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react";

interface HeaderProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}
export const Header = ({ pageIndex, setPageIndex }: HeaderProps) => {
  return (
    <div>
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

        <h2 className="font-bold text-lg">Buy Data</h2>

        <Image
          src="/SGN_09_08_2022_1662626364399-removebg-preview.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  )
}

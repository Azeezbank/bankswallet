import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
    return (
        <div>
             {/* Header */}
                  <div className="flex items-center justify-between pt-5">
                    <Link href={"/user"}>
                      <ChevronLeft size={26} className="cursor-pointer" />
                    </Link>
            
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

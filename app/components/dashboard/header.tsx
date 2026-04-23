import Image from "next/image";
import { Bell, Settings } from "lucide-react";

const Header = ({ username }: { username: string }) => {
  return (
    <header className="bg-primary sticky top-0  px-4 sm:px-6 py-3 flex items-center justify-between">
      
      {/* User section */}
      <div className="flex items-center gap-3">
        <Image
          src="/avatar.png"
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="leading-tight">
          <p className="text-xs sm:text-sm text-white/80">Welcome Back</p>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">
            {username}
          </h2>
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6 sm:gap-8 text-white">
        <div className="relative">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-2 -right-2 flex items-center justify-center text-xs bg-white text-primary w-4 h-4 sm:w-5 sm:h-5 rounded-full">
            0
          </span>
        </div>

        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </header>
  );
};

export default Header;
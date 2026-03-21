"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";

type Props = {
  sideBarClickHandler: () => void;
};

export default function NavBar({ sideBarClickHandler }: Props) {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const router = useRouter();

  const toggleLogout = () => setIsLogoutVisible(!isLogoutVisible);

  const handleLogOutUser = async () => {
    try {
      const response = await api.post("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        {/* Hamburger / Sidebar toggle */}
        <div
          className="flex flex-col justify-between w-6 h-6 cursor-pointer"
          onClick={sideBarClickHandler}
        >
          <span className="block h-0.5 w-full bg-primary rounded"></span>
          <span className="block h-0.5 w-full bg-primary rounded"></span>
          <span className="block h-0.5 w-full bg-primary rounded"></span>
        </div>

        {/* Welcome text */}
        <div className="text-gray-900 dark:text-gray-100 font-medium">
          Welcome Back
        </div>

        {/* Logout hamburger */}
        <div
          className="relative flex flex-col justify-between w-6 h-6 cursor-pointer"
          onClick={toggleLogout}
        >
          <span className="block h-0.5 w-full bg-primary rounded"></span>
          <span className="block h-0.5 w-full bg-primary rounded"></span>
          <span className="block h-0.5 w-full bg-primary rounded"></span>
        </div>
      </nav>

      {/* Logout Menu */}
      <div
        className={`absolute right-4 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg transition-all duration-300 ${
          isLogoutVisible ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handleLogOutUser}
          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-primary hover:text-white transition rounded-lg"
        >
          <i className="bi bi-power"></i>
          Logout
        </button>
      </div>
    </>
  );
}
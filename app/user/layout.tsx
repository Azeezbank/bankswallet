"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import NavBar from "@/app/components/dasNavBar";

interface WalletInfo {
  username: string;
  user_balance: string;
  packages: string;
}

interface Props {
  children: ReactNode;
}

export default function HomeLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState<WalletInfo>({
    username: "",
    user_balance: "",
    packages: "",
  });

  const router = useRouter();

  const handleVisible = () => setIsOpen(!isOpen);

  // Protect Route
  useEffect(() => {
    const protectPage = async () => {
      try {
        const response = await api.get("/protectedPage/user");
        if (response.status !== 200) router.push("/auth/login");
      } catch {
        router.push("/auth/login");
      }
    };
    protectPage();
  }, []);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get<WalletInfo>("/user/info");
        if (response.status === 200) setWalletBalance(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="flexEntire min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`aside ${isOpen ? "visible" : "hidden"} flexAside bg-white dark:bg-gray-800`}
      >
        <div className="d-flex navUser p-4 items-center gap-2">
          <img className="navImg rounded-full" src="/avatar.png" alt="user" />
          <div className="onlineSign">
            <span className="bg-green-500 rounded-full w-3 h-3 block"></span>
          </div>
          <div>
            <p className="ps-2 text-gray-900 dark:text-gray-100">
              {walletBalance.username} <br />
              <span className="navBalance text-primary">
                balance: #{walletBalance.user_balance}
              </span>
            </p>
          </div>
        </div>

        <div className="grid-navDashh p-4 space-y-2">
          <Link href="/user/dashboard" className="grid-navDash ps-2">
            <h3><i className="bi bi-house-fill"></i></h3>
            Dashboard
          </Link>

          <Link href="/user/data" className="grid-navDash ps-2">
            <h3><i className="bi bi-reception-4"></i></h3>
            Buy Data
          </Link>

          <Link href="/user/airtime" className="grid-navDash ps-2">
            <h3><i className="bi bi-telephone"></i></h3>
            Buy Airtime
          </Link>

          <Link href="/user/cable" className="grid-navDash ps-2">
            <h3><i className="bi bi-distribute-horizontal"></i></h3>
            Cable Sub
          </Link>

          <div className="grid-navDash ps-2">
            <h3><i className="bi bi-lightbulb"></i></h3>
            Utility Payment
          </div>

          <div className="grid-navDash ps-2">
            <h3><i className="bi bi-mortarboard-fill"></i></h3>
            Buy Exam Pin
          </div>

          <div className="grid-navDash ps-2">
            <h3><i className="bi bi-envelope-fill"></i></h3>
            Messages
          </div>

          <Link href="/user/plans" className="grid-navDash ps-2">
            <h3><i className="bi bi-cash"></i></h3>
            Pricing
          </Link>

          <Link href="/user/verify" className="grid-navDash ps-2">
            <h3><i className="bi bi-lock"></i></h3>
            Account Verification
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`main flexMain ${
          isOpen ? "with-margin" : "with-no-margin"
        } w-full`}
      >
        <NavBar sideBarClickHandler={handleVisible} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/lib/api";
import Header from "@/app/components/dashboard/header";
import Activity from "@/app/components/dashboard/activities";
import { Star, Eye, EyeOff, Copy, PackageCheck, History, Wallet2, HistoryIcon } from "lucide-react";
import QuickAccess from "@/app/components/dashboard/quickaccess";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";


interface Message {
  dash_message: string;
  whatsapp_link: string;
}

const DashboardPage = () => {
  const { userInfo } = useUserInfo();

  const [copysuccess, setCopySuccess] = useState<string>("");
  const [role, setRole] = useState(true);
  const [dash_message, setDash_message] = useState<Message>({
    whatsapp_link: "",
    dash_message: "",
  });
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [link, setLink] = useState("");

  const user = userInfo.username ?? "";

  useAuthGuard();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLink(`${window.location.origin}/register?ref=${user}`);
    }
  }, [user]);

  // Copy referral link
  const copyClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(link)
      .then(() => setCopySuccess("Link copied!"))
      .catch(() => setCopySuccess("Failed to copy link"));
    alert(copysuccess);
  };

  // Fetch dashboard message
  useEffect(() => {
    const handleMessage = async () => {
      try {
        const response = await api.get(
          `/notification`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setDash_message(response.data);
        }
      } catch (err: any) {
        console.error(err.response?.data.message || err.message);
      }
    };
    handleMessage();
  }, []);

  // Check role
  useEffect(() => {
    if (userInfo.role === "admin") {
      setRole(false);
    } else {
      setRole(true);
    }
  }, [userInfo]);


  return (
    <div>
      <div className="bg-white">
        <Header username={userInfo.username} />
        <div className="flex flex-col items-center bg-gradient px-4 sm:px-6 pt-12 pb-20 h-100 text-white">

          {/* Balance label */}
          <h5 className="bg-white/20 rounded-xl px-3 py-1 text-xs sm:text-sm">
            Account Balance
          </h5>

          {/* Balance */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex gap-1 items-center">
              {isAmountVisible ? (
                <h2 className="text-xl sm:text-2xl font-semibold">
                  ₦{userInfo.user_balance}
                </h2>
              ) : (
                <>
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsAmountVisible(!isAmountVisible)}
              className="outline-none"
            >
              {isAmountVisible ? (
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>

          {/* Referral + Package */}
          <div className="mt-3 flex flex-wrap justify-center items-center gap-3">
            <div className="flex items-center gap-2 border-r border-white/40 pr-3">
              <p className="text-xs sm:text-sm">Referral link</p>
              <button type="button" onClick={copyClipboard}>
                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white text-secondary rounded px-3 py-1 text-xs sm:text-sm">
              <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <p>{userInfo.packages}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 w-full max-w-sm">
            <Link href="/user/wallet">
              <button className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
                <Wallet2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Fund Wallet
              </button>
            </Link>
            <Link href="/histories">
              <button className="flex items-center justify-center gap-2 bg-white/20 px-8 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
                History
              </button>
            </Link>
          </div>
        </div>

        {/* Activities center */}
        <Activity whatsappLink={dash_message.whatsapp_link} />

        {/* Quick Access */}
        <QuickAccess />
      </div>
    </div>
  );
};

export default DashboardPage;
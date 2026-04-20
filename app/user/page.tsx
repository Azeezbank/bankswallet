"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Typewriter } from "react-simple-typewriter";

import HomeLayout from "./layout";
import api from "@/app/lib/api";

import Image from "next/image";
import Header from "@/app/components/dashboard/header";
import Activity from "@/app/components/dashboard/activities";
import { Star, Eye, EyeOff, Copy, PackageCheck, History, Wallet2, HistoryIcon } from "lucide-react";
import QuickAccess from "@/app/components/dashboard/quickaccess";
import { useBankAccount } from "@/app/hooks/useBankAccount";
import { useUserInfo } from "@/app/hooks/useUserInfo";


interface Message {
  dash_message: string;
  whatsapp_link: string;
}

const DashboardPage = () => {
  const { bankDetails, isAcctN, isAcct, generateAccount } = useBankAccount();
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

  // Fetch user information
  // useEffect(() => {
  //   const handleUserInfo = async () => {
  //     try {
  //       const response = await api.get<UserInfo>(
  //         `/user/info`,
  //       );
  //       if (response.status === 200) {
  //         setUserInfo(response.data);
  //       }
  //     } catch (err: any) {
  //       console.error(err.response?.data.message || err.message);
  //     }
  //   };
  //   handleUserInfo();
  // }, []);

  // Fetch account details
  // useEffect(() => {
  //   const bankDetail = async () => {
  //     try {
  //       const response = await api.post<Bank>(
  //         `/user/bankacct`,
  //         {},
  //       );
  //       if (response.status === 200) {
  //         setBankDetails(response.data);
  //         setIsAcctN(true);
  //       }
  //     } catch (err: any) {
  //       console.error(err.response?.data.message || err.message);
  //     }
  //   };
  //   bankDetail();
  // }, []);

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

  // Add wallet status indicator
  // useEffect(() => {
  //   const handleblink = () => {
  //     const balance = Number(userInfo.user_balance);
  //     if (balance >= 1000) {
  //       setBalanceColor("enoughbalance");
  //     } else if (balance < 1000 && balance > 500) {
  //       setBalanceColor("lowbalance");
  //     } else if (balance < 500) {
  //       setBalanceColor("insulficientbalance");
  //     }
  //   };
  //   handleblink();
  // }, [userInfo]);


  return (
    <HomeLayout>
      <div className="hero min-h-screen flex flex-col justify-center items-center bg-app-gradient px-4 md:px-20">
        <h3 className="text-3xl md:text-5xl font-bold text-primary text-center mb-4">
          WELCOME TO BANKYCONNECT.VERCEL.APP
        </h3>

        <div className="mb-8">
          <Typewriter
            words={["POWERED BY TUNSTELECOM"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={50}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Your plug for everything digital. We offer instant data, recharge card, airtime, cable
            subscription, bill payment, e.t.c. To enjoy our referral program, simply refer people,
            friends, and family to Tunstelecom.com.ng and continue to receive massive commissions
            instantly on each successful data purchase made by your downliners (who you referred) on
            the portal. <span className="font-bold text-secondary">THIS IS CALLED SALARY FOR LIFE!</span>
            <br />
            <br />
            Referral Link:{" "}
            <a
              href={link}
              className="decoration underline text-primary font-semibold wrap-break-word"
            >
              {link}
            </a>{" "}
            <button
              type="button"
              onClick={copyClipboard}
              className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
            >
              Copy
            </button>
          </p>

          <div className="flex flex-col justify-center items-start space-y-4">
            <button className="fund-wallet px-6 py-3 bg-secondary text-white font-semibold rounded shadow-lg hover:bg-secondary/90 transition">
              Fund Wallet
            </button>

            {!role && (
              <Link href="/admin/dashboard">
                <button className="admin-dash px-6 py-3 bg-primary text-white font-semibold rounded shadow-lg hover:bg-primary/90 transition">
                  Admin Panel
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>


      <div className="bg-app-gradient p-6 rounded-lg shadow-lg mt-8">
        {/* Greeting */}
        <div className="text-center mb-6">
          <p className="text-xl md:text-2xl font-semibold">
            You Are Welcome, <span className="text-primary">{userInfo.username}</span>
          </p>
          <hr className="my-3 border-gray-300" />
          <div className="mb-2">
            <a href="#">
              <Image src="/google-play.png" width={150} height={50} alt="Download our app" />
            </a>
          </div>
          <p className="font-bold">Package: {userInfo.packages}</p>
          <hr className="my-3 border-gray-300" />
        </div>

        {/* New Retailer Notice */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-gray-700">
          <span className="text-secondary font-bold">**NEW** </span>
          Own a BANKYCONNECT.VERCEL.APP retailer website and retail all our services; such as DATA,
          Recharge cards printing, AIRTIME, and Bills Payment.
          <button className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
            Click Here
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-300 mb-4">
            <button
              className={`py-2 px-4 font-semibold ${isAcctN ? "border-b-2 border-primary text-primary" : "text-gray-500"
                }`}
            >
              {isAcctN ? bankDetails.bankName : "NULL"}
            </button>
            <button className="py-2 px-4 font-semibold text-gray-500">NULL</button>
          </div>

          {/* Tab content */}
          <div className="space-y-6">
            {/* Moniepoint tab */}
            <div className="">
              <div className="flex justify-center mb-4">
                <Image
                  src={isAcctN ? "/monie.png" : "/bank.png"}
                  width={100}
                  height={100}
                  alt="Bank"
                />
              </div>
              <p className="text-center mb-4">
                <strong>Account Number:</strong>{" "}
                {isAcctN ? (
                  <span>{bankDetails.acctNo}</span>
                ) : (
                  <span
                    className="cursor-pointer text-primary font-semibold hover:underline"
                    onClick={generateAccount}
                  >
                    {isAcct ? (
                      <>
                        <i className="bi bi-arrow-counterclockwise"></i> Generate Account Number
                      </>
                    ) : (
                      <span className="animate-spin">Please Wait...</span>
                    )}
                  </span>
                )}
              </p>
              <div className="flex justify-between text-gray-700">
                <div>
                  <p className="font-bold">Account Name: Tunstelecom - {bankDetails.acctName}</p>
                  <p>Bank Name: {isAcctN ? bankDetails.bankName : "NULL"}</p>
                  <p className="text-sm">AUTOMATED BANK TRANSFER</p>
                  <p className="text-sm">Make transfer to this account to fund your wallet</p>
                </div>
                <div className="text-right">
                  <p>2%</p>
                  <p className="text-sm">CHARGES</p>
                </div>
              </div>
            </div>

            {/* Wema tab */}
            <div className="">
              <div className="flex justify-center mb-4">
                <Image src="/bank.png" width={100} height={100} alt="Bank" />
              </div>
              <p className="text-center mb-4">
                Account Number:{" "}
                <span className="cursor-pointer text-primary font-semibold hover:underline">
                  <i className="bi bi-arrow-counterclockwise"></i> Generate Account Number
                </span>
              </p>
              <div className="flex justify-between text-gray-700">
                <div>
                  <p className="font-bold">Account Name: Tunstelecom - NULL</p>
                  <p>Bank Name: NULL</p>
                  <p className="text-sm">AUTOMATED BANK TRANSFER</p>
                  <p className="text-sm">Make transfer to this account to fund your wallet</p>
                </div>
                <div className="text-right">
                  <p>1%</p>
                  <p className="text-sm">CHARGES</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="my-6">
          <Marquee speed={80} gradient={false}>
            <h4 className="text-lg md:text-xl font-semibold text-primary">
              {dash_message.dash_message}
            </h4>
          </Marquee>
        </div>

        {/* Histories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition">
            <p className="text-purple-600 text-2xl pr-2">
              <i className="bi bi-arrow-counterclockwise"></i>
            </p>
            <p className="font-semibold">Transactions</p>
          </div>
          <Link href="/user/data/history">
            <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition cursor-pointer">
              <p className="text-purple-600 text-2xl pr-2">
                <i className="bi bi-arrow-counterclockwise"></i>
              </p>
              <p className="font-semibold text-black">Data Transactions</p>
            </div>
          </Link>
          <Link href="/user/airtime/history">
            <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition cursor-pointer">
              <p className="text-purple-600 text-2xl pr-2">
                <i className="bi bi-arrow-counterclockwise"></i>
              </p>
              <p className="font-semibold text-black">Airtime-Top-Up Transactions</p>
            </div>
          </Link>
          <Link href="/user/fund/history">
            <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition cursor-pointer">
              <p className="text-yellow-500 text-2xl pr-2">
                <i className="bi bi-arrow-counterclockwise"></i>
              </p>
              <p className="font-semibold text-black">Wallet Summary</p>
            </div>
          </Link>
          <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition">
            <p className="text-purple-600 text-2xl pr-2">
              <i className="bi bi-arrow-counterclockwise"></i>
            </p>
            <p className="font-semibold">Data Wallet Summary</p>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Wallet & Notifications Section */}
        <div className="space-y-6">
          {/* Wallet Balances */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wallet Balance */}
            <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition">
              <div className="text-3xl p-4 bg-primary text-white rounded-full">
                <i className="bi bi-calendar-event-fill"></i>
              </div>
              {/* <div className="ml-4">
                <p className="text-gray-500">Wallet Balance</p>
                <div className={`w-20 h-2 mt-1 rounded ${balanceColor}`}></div>
                <p className="font-bold mt-1"># {userInfo.user_balance}</p>
              </div> */}
            </div>

            {/* Cashback */}
            <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition">
              <div className="text-3xl p-4 bg-primary text-white rounded-full">
                <i className="bi bi-database-fill"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Cashback</p>
                <p className="font-bold mt-1"># {userInfo.cashback}</p>
              </div>
            </div>

            {/* Total Referral */}
            <div className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition">
              <div className="text-3xl p-4 bg-primary text-white rounded-full">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500">My Total Referral</p>
                <p className="font-bold mt-1">{userInfo.referree}</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h5 className="font-semibold mb-2">Notification</h5>
              <p>
                <b>Welcome to BankyConnect</b> <br />
                Note: On this platform, you can order for anything you like. We are here to serve you
                better and enjoy all our goods with cheaper rate. Powered by Tunstelecom.
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow flex flex-col items-start space-y-2">
              <h5 className="font-semibold">FAQ:</h5>
              <p>Please go through them to have a better knowledge of this platform.</p>
              <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-semibold">
                ? FAQs
              </button>
            </div>

            <div className="bg-white p-4 rounded shadow flex flex-col items-start space-y-2">
              <h5 className="font-semibold">Support Team:</h5>
              <p>
                Have anything to say to us? Please contact our Support Team on Whatsapp.
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2 hover:bg-green-700 transition">
                <i className="bi bi-whatsapp"></i> Whatsapp us
              </button>
              {dash_message.whatsapp_link && (
                <a href={dash_message.whatsapp_link} target="_blank" rel="noreferrer">
                  <button className="px-4 py-2 bg-green-600 text-white mt-2 rounded flex items-center gap-2 hover:bg-green-700 transition">
                    <i className="bi bi-whatsapp"></i> Join our Whatsapp group
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 lg:mt-0">
          <Link href="/user/airtime">
            <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <Image src="/airtime.svg" alt="Airtime" width={80} height={80} />
              <p className="text-gray-500 mt-2 text-center">Airtime TopUp</p>
            </div>
          </Link>

          <Link href="/user/data">
            <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <Image src="/data.jpg" alt="Buy Data" width={80} height={80} />
              <p className="text-gray-500 mt-2 text-center">Buy Data</p>
            </div>
          </Link>

          <Link href="/user/airtime">
            <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <Image src="/airtime2cash.jpg" alt="Airtime to Cash" width={80} height={80} />
              <p className="text-gray-500 mt-2 text-center">Airtime To Cash</p>
            </div>
          </Link>

          <Link href="/user/electricity-bill">
            <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <Image src="/utility.jpg" alt="Electricity" width={80} height={80} />
              <p className="text-gray-500 mt-2 text-center">Electricity Bills</p>
            </div>
          </Link>

          <Link href="/user/cable">
            <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <Image src="/cable.jpg" alt="Cable" width={80} height={80} />
              <p className="text-gray-500 mt-2 text-center">Cable Subscription</p>
            </div>
          </Link>

          <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition">
            <Image src="/sms.png" alt="Bulk SMS" width={80} height={80} />
            <p className="text-gray-500 mt-2 text-center">Bulk SMS</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition">
            <Image src="/resultchecker.png" alt="Result Checker" width={80} height={80} />
            <p className="text-gray-500 mt-2 text-center">Result Checker</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition">
            <Image src="/printer.jpg" alt="Recharge Card" width={80} height={80} />
            <p className="text-gray-500 mt-2 text-center">Recharge Card Printing</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-md transition">
            <Image src="/referral.png" alt="My Referrals" width={80} height={80} />
            <p className="text-gray-500 mt-2 text-center">My Referrals</p>
          </div>
        </div>
      </div>

      <div className="bg-app-gradient p-6 rounded-lg shadow-lg mt-8">
        {/* Transaction Statistics */}
        <div className="space-y-4">
          <h5 className="text-lg font-semibold">TRANSACTION STATISTICS</h5>
          <hr className="border-gray-300" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Wallet Balance */}
            <div className="flex flex-col items-center p-4 bg-white rounded shadow hover:shadow-md transition">
              <h2 className="text-warning text-3xl mb-2">
                <i className="bi bi-clock cash-coin x-circle"></i>
              </h2>
              <h5 className="text-gray-500 text-center">
                WALLET BALANCE <br />
                <span className="text-secondary font-bold"># {userInfo.user_balance}</span>
              </h5>
            </div>

            {/* Transactions */}
            <div className="flex flex-col items-center p-4 bg-white rounded shadow hover:shadow-md transition border border-gray-200">
              <h2 className="text-green-600 text-3xl mb-2">
                <i className="bi bi-cash-coin x-circle"></i>
              </h2>
              <h5 className="text-gray-500 text-center">
                TRANSACTIONS <br />
                <span className="text-secondary font-bold">Await...</span>
              </h5>
            </div>

            {/* Total Spent */}
            <div className="flex flex-col items-center p-4 bg-white rounded shadow hover:shadow-md transition">
              <h2 className="text-red-600 text-3xl mb-2">
                <i className="bi bi-x-circle"></i>
              </h2>
              <h5 className="text-gray-500 text-center">
                TOTAL SPENT <br />
                <span className="text-secondary font-bold">Hidden</span>
              </h5>
            </div>
          </div>
        </div>

        {/* Error Modal */}
        {/* {isErr && (
          <ModalNotification notification={notification} onButtonClick={() => setIsErr(false)} />
        )} */}
      </div>


      {/* New design */}
      <div className="bg-white">
        <Header username={userInfo.username} />
        <div className="flex flex-col items-center bg-gradient px-4 sm:px-6 py-12 text-white">

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
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
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

            <button className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
              History
            </button>
          </div>
        </div>

        {/* Activities center */}
        <Activity whatsappLink={dash_message.whatsapp_link} />

        {/* Quick Access */}
        <QuickAccess />
      </div>
    </HomeLayout>
  );
};

export default DashboardPage;
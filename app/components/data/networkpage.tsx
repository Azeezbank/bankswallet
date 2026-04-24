import Image from "next/image";
import { detectNetwork } from "@/app/components/detectNetwork";
import { Check, ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

interface PageInfo {
    page: String;
    phone: string;
    network: string;
    plan: string;
    beneficiary: string;
    userInfo: {
        username: string;
        user_balance: string;
        role: string;
        packages: string;
        cashback: number;
        referree: number;
        Phone_number: string;
    };
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setNetwork: React.Dispatch<React.SetStateAction<string>>;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
    setBeneficiary: React.Dispatch<React.SetStateAction<string>>;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}
const NetworkSelectionPage = ({page, phone, network, plan, beneficiary, 
    userInfo, setPage, setPhone, setNetwork, setPlan, setBeneficiary, setPageIndex}: PageInfo) => {

        const networkType = detectNetwork(userInfo.Phone_number);

    return (
        <div>
            {/* Data / Airtime Switch */}
                  <div className="bg-gray-100 rounded flex my-5">
                    <button
                      type="button"
                      onClick={() => setPage("data")}
                      className={`w-full ${page === "data"
                          ? "bg-white rounded-lg text-center py-2 m-0.5 shadow"
                          : "bg-gray-100"
                        }`}
                    >
                      Data
                    </button>
            
                    <button
                      type="button"
                      onClick={() => setPage("airtime")}
                      className={`w-full ${page === "airtime"
                          ? "bg-white rounded-lg text-center py-2 m-0.5 shadow"
                          : "bg-gray-100"
                        }`}
                    >
                     <Link href="/airtime"> Airtime</Link>
                    </button>
                  </div>
            
                  {/* Phone Input */}
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold">Phone Number</h5>
                    <h2 className="text-primary font-semibold text-sm cursor-pointer">
                      Select From Contacts
                    </h2>
                  </div>
            
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    pattern="[0-9]{11}"
                    placeholder="07012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2 w-full mt-1 outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
            
                  {/* Network Selection */}
                  <div className="mt-5 border-b border-gray-200 pb-5">
                    <h2 className="font-semibold">Select Network</h2>
            
                    <div className="flex gap-3 mt-2">
                      {["mtn", "airtel", "glo", "9mobile"].map((n, i) => (
                        <div className="relative" key={i}>
                          <Image
                            key={n}
                            src={`/${n}.png`}
                            alt={n}
                            width={40}
                            height={40}
                            onClick={() => setNetwork(n)}
                            className={`rounded-full cursor-pointer hover:scale-105 transition ${network === n ? "border-2 border-gray-500" : ""}`}
                          />
                          {network === n && (
                            <span className="absolute top-3 left-3 bg-primary text-white rounded-full p-0.5">
                              <Check size={12} />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
            
                    <button
                      type="button"
                      onClick={() => setPageIndex(2)}
                      disabled={phone === ""}
                      className={`rounded-lg text-center w-full mb-5 mt-10 text-white py-2 ${phone === '' ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-gradient"}`}
                    >
                      Continue
                    </button>
                  </div>
            
                  {/* Beneficiaries */}
                  <div>
                    <div className="flex justify-between items-center my-4">
                      <h3 className="font-semibold">Beneficiaries</h3>
                      <h3 className="text-primary font-semibold text-sm cursor-pointer">
                        View All
                      </h3>
                    </div>
            
                    {/* Beneficiary Tabs */}
                    <div className="bg-gray-100 rounded flex">
                      <button
                        type="button"
                        onClick={() => setBeneficiary("frequent")}
                        className={`w-full ${beneficiary === "frequent"
                            ? "bg-white rounded-lg text-center py-2 m-0.5 shadow"
                            : "bg-gray-100"
                          }`}
                      >
                        Frequent
                      </button>
            
                      <button
                        type="button"
                        onClick={() => setBeneficiary("saved")}
                        className={`w-full ${beneficiary === "saved"
                            ? "bg-white rounded-lg text-center py-2 m-0.5 shadow"
                            : "bg-gray-100"
                          }`}
                      >
                        Saved
                      </button>
                    </div>
            
                    {/* My Number */}
                    {beneficiary === 'frequent' && (
                      <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded mt-3">
                        <div className="flex gap-3 items-center">
            
                          <Image
                            src={`/${networkType || "unknown"}.png`}
                            alt="network"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
            
                          <div onClick={() => { setNetwork(networkType); setPhone(userInfo.Phone_number)}}>
                            <h3 className="font-semibold">Me</h3>
                            <p className="text-sm text-gray-600">
                              {userInfo.Phone_number} | {networkType.toLocaleUpperCase()}
                            </p>
                          </div>
            
                        </div>
            
                        <ChevronRight size={22} />
                      </div>
                    )}
                  </div>
        </div>
    )
}


export default NetworkSelectionPage;
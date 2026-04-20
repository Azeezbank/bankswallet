"use client";

import { useState } from "react";
import { Copy, RefreshCcw, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useBankAccount } from "@/app/hooks/useBankAccount";

interface Bank {
  acctNo: number;
  acctName: string;
  bankName: string;
}

interface Props {
  bankDetails: Bank;
  isAcctN: boolean;
  isAcct: boolean;
  handleGenerateAcct: (e: any) => void;
}

export default function FundWallet() {
    const {  bankDetails, isAcctN, isAcct, generateAccount } = useBankAccount()
  const [activeTab, setActiveTab] = useState("moniepoint");
  const [copied, setCopied] = useState(false);

  const copyAcct = async () => {
    await navigator.clipboard.writeText(String(bankDetails.acctNo));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Fund Wallet</h2>
        <p className="text-sm text-gray-500">
          Transfer to the account below to fund your wallet
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setActiveTab("moniepoint")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "moniepoint"
              ? "bg-white shadow text-black"
              : "text-gray-500"
          }`}
        >
          {isAcctN ? bankDetails.bankName : "Moniepoint"}
        </button>

        <button
          onClick={() => setActiveTab("wema")}
          disabled
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "wema"
              ? "bg-white shadow text-black"
              : "text-gray-500"
          }`}
        >
          Wema Bank
        </button>
      </div>

      {/* Account Card */}
      <div className="border rounded-xl p-5">

        {/* Bank */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/monie.png"
            alt="bank"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div>
            <p className="font-medium text-sm">
              {isAcctN ? bankDetails.bankName : "Bank"}
            </p>
            <p className="text-xs text-gray-500">
              Automated Bank Transfer
            </p>
          </div>
        </div>

        {/* Account Number */}
        <div className="bg-gray-100 rounded-xl p-4 mb-4">

          {isAcctN ? (
            <>
              <p className="text-xs text-gray-500 mb-1">
                Account Number
              </p>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold tracking-widest">
                  {bankDetails.acctNo}
                </h3>

                <button
                  onClick={copyAcct}
                  className="flex items-center gap-1 cursor-pointer text-sm text-blue-600"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={generateAccount}
              className="flex items-center gap-2 text-blue-600 font-medium"
            >
              {isAcct ? (
                <>
                  <RefreshCcw size={16} />
                  Generate Account Number
                </>
              ) : (
                "Generating..."
              )}
            </button>
          )}
        </div>

        {/* Account Details */}
        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">Account Name</span>
            <span className="font-medium">
              Tunstelecom - {bankDetails.acctName || "NULL"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Bank</span>
            <span className="font-medium">
              {bankDetails.bankName || "NULL"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Charges</span>
            <span className="font-medium text-red-500">2%</span>
          </div>

        </div>

      </div>

      {/* Info */}
      <div className="mt-4 text-xs text-gray-500">
        After transfer, your wallet will be credited automatically.
      </div>
    </div>
  );
}
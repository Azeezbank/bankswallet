"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import DotLoader from "../modal/loader";
import { ModalNotification } from "../modal/modal";

export default function VerifyMailForm() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("");

  const isFormValid = otp.trim() !== "";

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await api.post("/auth/verify/mail", { otp });

      setNotification(response.data.message || "Verification successful");
      setTitle("Success!");
      setIsNotification(true);
      setIsProcessing(false);

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);

    } catch (err: any) {
      setNotification(err.response?.data?.message || "Verification failed");
      setTitle("Error!");
      setIsNotification(true);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      {isProcessing && <DotLoader />}
      {isNotification && (
        <ModalNotification
          notification={notification}
          title={title}
          isNotification={isNotification}
          onButtonClick={() => setIsNotification(false)}
        />
      )}

      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-10 h-10 mb-4 rounded-xl bg-gradient flex items-center justify-center text-white font-bold text-lg shadow-md">
          B
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Enter the verification code sent to your email address
        </p>
      </div>

      <form onSubmit={handleVerification} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP code"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-center tracking-widest text-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isProcessing}
          className={`w-full py-3 rounded-lg text-white font-medium transition 
            ${
              !isFormValid || isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient hover:opacity-90"
            }`}
        >
          {isProcessing ? "Verifying..." : "Verify Email"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-primary cursor-pointer font-medium"
            onClick={() => router.push("/auth/register")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import { ModalNotification } from "@/app/components/modal/modal";
import DotLoader from "@/app/components/modal/loader";
import { useSearchParams } from "next/navigation";


export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/user";

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      setIsAuth(true);

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);
      router.push(redirectTo);

    } catch (err: any) {
      setNotification(err.response?.data?.message || "Login failed");
      setTitle("Error!");
      setIsNotification(true);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-gradient px-4">
      {isProcessing && <DotLoader />}
      {isNotification && (
        <ModalNotification
          notification={notification}
          title={title}
          isNotification={isNotification}
          onButtonClick={() => setIsNotification(false)}
        />
      )}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="w-9 h-9 mb-5 rounded-lg bg-gradient flex items-center justify-center text-white font-bold">
              B
            </div>
          </div>

          <h1 className="text-2xl font-bold text-primary">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to your dashboard
          </p>
        </div>


        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-600">
              Username
            </label>

            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            {isAuth ? "Authenticating..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>

        </div>

      </div>
    </div>
  );
}

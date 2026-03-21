"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setIsAuth(true);

      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      router.push("/user");

    } catch (err: any) {
      setIsAuth(false);
      setIsError(true);
      setLoginError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-gradient px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Error */}
        {isError && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
            {loginError}
          </div>
        )}

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
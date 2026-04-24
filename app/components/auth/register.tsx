"use client";

import { useState } from "react";
import DotLoader from "../modal/loader";
import { ModalNotification } from "../modal/modal";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/app/lib/api";

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isNotification, setIsNotification] = useState(false);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const referral = searchParams.get("ref") || "";

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        referralUsername: referral,
        password: "",
        confirmPass: "",
    });

    const [passError, setPassError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const isFormValid =
        form.fullName.trim() !== "" &&
        form.username.trim() !== "" &&
        form.email.trim() !== "" &&
        form.phone.trim() !== "" &&
        form.password.trim() !== "" &&
        form.confirmPass.trim() !== "" &&
        !passError &&
        !confirmError &&
        form.password === form.confirmPass &&
        acceptedTerms;
        
    const validatePass = (value: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(value)) {
            setPassError("Password must be at least 8 characters and include letters & numbers");
        } else {
            setPassError("");
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "password") validatePass(value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsProcessing(true);

        if (form.password !== form.confirmPass) {
            setConfirmError("Passwords do not match");
            setIsProcessing(false);
            return;
        }

        try {
            const res = await api.post(
                `/auth/register`,
                {
                    ...form,
                },
            );

            setIsProcessing(false);
            setNotification(res.data.message || "Registration successful, Please verify your identity");
            setIsNotification(true);
            setTitle('Success!')
            router.push("/verify/mail");
        } catch (err: any) {
            setIsProcessing(false);
            setNotification(err.response?.data?.message || "Something went wrong");
            setIsNotification(true);
            setTitle('Error!')
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            {isProcessing && <DotLoader />}
            {isNotification && <ModalNotification notification={notification}
                title={title} onButtonClick={() => setIsNotification(false)} isNotification={isNotification} />}
            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-9 h-9 mb-5 rounded-lg bg-gradient flex items-center justify-center text-white font-bold">
                    B
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Create Account
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="fullName" placeholder="Full Name" onChange={handleChange} />
                <Input name="username" placeholder="Username" onChange={handleChange} />
                <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
                <Input name="phone" placeholder="Phone Number" onChange={handleChange} />

                <Input
                    name="referralUsername"
                    placeholder="Referral (optional)"
                    value={form.referralUsername}
                    onChange={handleChange}
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                {passError && <p className="text-red-500 text-sm">{passError}</p>}

                <Input
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />
                {confirmError && <p className="text-red-500 text-sm">{confirmError}</p>}

                {/* Terms */}
                <div className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    <span className={!acceptedTerms ? "text-gray-500" : ""}>
                        I agree to the terms & conditions
                    </span>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-3 rounded-lg text-white font-medium transition 
    ${!isFormValid
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient hover:opacity-90"
                        }`}
                >
                    Sign Up
                </button>

                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <span
                        className="text-primary cursor-pointer"
                        onClick={() => router.push("/auth/login")}
                    >
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    );
}

/* Reusable Input Component */
function Input({ name, type = "text", placeholder, onChange, value }: any) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={name !== "referralUsername"}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
        />
    );
}
"use client";

import { useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import DotLoader from "@/app/components/modal/loader";
import { ModalNotification } from "@/app/components/modal/modal";
import api from "@/app/lib/api";
import { PinInput, Input } from "@/app/components/security";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function SecuritySettings() {

    useAuthGuard();
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isNotification, setIsNotification] = useState(false);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentPin, setCurrentPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    // CHANGE PASSWORD
    const handlePasswordUpdate = async () => {
        setIsProcessing(true);

        try {
            const res = await api.post("/security/password", {
                currentPassword,
                newPassword,
                confirmPassword,
            });
            setIsProcessing(false);
            setIsNotification(true);
            setNotification(res.data.message);
            setTitle('Success!')
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setIsProcessing(false);
            setTitle('Error!');
            setNotification(error.response?.data?.message || "Something went wrong");
            setIsNotification(true);
        }
    };

    //CHANGE PIN
    const handlePinUpdate = async () => {
        setIsProcessing(true);

        try {
            const res = await api.post("/security/pin", {
                currentPin,
                newPin,
                confirmPin,
            });

            setIsProcessing(false);
            setIsNotification(true);
            setNotification(res.data.message);
            setTitle('Success!')
            setCurrentPin("");
            setNewPin("");
            setConfirmPin("");
        } catch (error: any) {
            setIsProcessing(false);
            setTitle('Error!');
            setNotification(error.response?.data?.message || "Something went wrong");
            setIsNotification(true);
        }
    };

    return (
        <div className="min-h-screen bg-app-gradient p-6 md:p-10">
            {isProcessing && (
                <DotLoader />
            )}
            {isNotification &&
                <ModalNotification
                    notification={notification} title={title}
                    onButtonClick={() => setIsNotification(false)}
                    isNotification={isNotification} />}
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Security Settings
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your password and transaction PIN
                    </p>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* ================= PASSWORD ================= */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[rgba(61,70,237,0.1)] text-primary">
                                <Lock size={18} />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Change Password
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="Current Password"
                                type="password"
                                value={currentPassword}
                                onChange={setCurrentPassword}
                            />

                            <Input
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={setNewPassword}
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />

                            <button
                                onClick={handlePasswordUpdate}
                                disabled={isProcessing}
                                className="w-full mt-2 bg-gradient text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* ================= PIN ================= */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                <KeyRound size={18} />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Transaction PIN
                            </h2>
                        </div>

                        <p className="text-xs text-gray-500 mb-4">
                            Default PIN is <span className="font-semibold">0000</span>. Must be 4 digits.
                        </p>

                        <div className="space-y-4">
                            <PinInput
                                label="Current PIN"
                                value={currentPin}
                                setValue={setCurrentPin}
                            />

                            <PinInput
                                label="New PIN"
                                value={newPin}
                                setValue={setNewPin}
                            />

                            <PinInput
                                label="Confirm PIN"
                                value={confirmPin}
                                setValue={setConfirmPin}
                            />

                            <button
                                onClick={handlePinUpdate}
                                disabled={isProcessing}
                                className="w-full mt-2 bg-gradient text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
                            >
                                Update PIN
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
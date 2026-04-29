"use client";

import {
    User,
    Lock,
    Shield,
    CreditCard,
    Bell,
    Globe,
    HelpCircle,
    LogOut,
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/utils/lougout";

const settingsOptions = [
    {
        title: "Profile",
        description: "Update your personal information",
        icon: User,
    },
    {
        title: "Password & PIN",
        description: "Change password and security PIN",
        icon: Lock,
        href: "/user/setting/security",
    },
    {
        title: "Security",
        description: "Manage 2FA and account protection",
        icon: Shield,
    },
    {
        title: "Payment Methods",
        description: "Manage cards and transactions",
        icon: CreditCard,
    },
    {
        title: "Notifications",
        description: "Control alerts and messages",
        icon: Bell,
    },
    {
        title: "Language & Region",
        description: "Set your preferences",
        icon: Globe,
    },
    {
        title: "Help & Support",
        description: "Get help or contact support",
        icon: HelpCircle,
    },
    {
        title: "Logout",
        description: "Sign out of your account",
        icon: LogOut,
        danger: true,
        action: "logout",
    },
];

export default function SettingsPage() {
    useAuthGuard();
    const router = useRouter();
    return (
        <div className="min-h-screen bg-app-gradient p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                    Settings
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {settingsOptions.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    if (item.action === "logout") {
                                        logoutUser(router);
                                    } else if (item.href) {
                                        router.push(item.href);
                                    }
                                }}
                                className={`group cursor-pointer rounded-2xl p-5 bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.danger
                                    ? "hover:border-red-300"
                                    : "hover:border-primary"
                                    }`}
                            >
                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-all duration-300 ${item.danger
                                        ? "bg-red-50 text-red-500 group-hover:bg-red-100"
                                        : "bg-[rgba(61,70,237,0.08)] text-primary group-hover:bg-[rgba(61,70,237,0.15)]"
                                        }`}
                                >
                                    <Icon size={22} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
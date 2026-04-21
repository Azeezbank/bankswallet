"use client";

import { useEffect, useState } from "react";
import { Smartphone, Wifi, CreditCard } from "lucide-react";
import api from "@/app/lib/api";
import DotLoader from "@/app/components/modal/loader";
import { ModalNotification } from "@/app/components/modal/modal";

type HistoryItem = {
    service: string;
    type: string;
    receiver: string;
    amount: number;
    status: string;
    date: string;
};

export default function HistoryPage() {
    const [filter, setFilter] = useState("all");
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchHistory = async (pageNum: number) => {
        try {
            setIsUpdating(true);

            const res = await api.get(
                `/history?page=${pageNum}&limit=10`
            );

            setHistory((prev) =>
                pageNum === 1
                    ? res.data.result
                    : [...prev, ...res.data.result]
            );

            setTotalPage(res.data.totalPage);
        } catch (err: any) {
            setIsUpdating(false);
            setTitle('Error!');
            setNotification(err.response?.data?.message || "Something went wrong");
            setIsNotification(true);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        fetchHistory(1);
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchHistory(nextPage);
    };

    const filtered =
        filter === "all"
            ? history
            : history.filter((tx) =>
                tx.service.toLowerCase().includes(filter)
            );

    const getMonth = (date: string) =>
        new Date(date).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

    const grouped = filtered.reduce((acc: any, item) => {
        const month = getMonth(item.date);
        if (!acc[month]) acc[month] = [];
        acc[month].push(item);
        return acc;
    }, {});

    const getIcon = (service: string) => {
        switch (service) {
            case "data Transaction":
                return <Wifi size={18} />;
            case "airtime Transaction":
                return <Smartphone size={18} />;
            case "payment":
                return <CreditCard size={18} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-app-gradient min-h-screen p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">

                    {isUpdating && (
                        <DotLoader />
                    )}
                    {isNotification &&
                        <ModalNotification
                            notification={notification} title={title}
                            onButtonClick={() => setIsNotification(false)}
                            isNotification={isNotification} />}

                    {/* Header */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-primary">
                            Transaction History
                        </h1>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {["all", "payment", "data", "airtime"].map((btn) => (
                            <button
                                key={btn}
                                onClick={() => setFilter(btn)}
                                className={`px-4 py-2 capitalize rounded-full text-sm font-medium
              ${filter === btn
                                        ? "bg-primary text-white"
                                        : "bg-white border"
                                    }`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>

                    {/* History */}
                    <div className="space-y-6">

                        {Object.entries(grouped).map(([month, items]: any) => (
                            <div key={month}>
                                <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
                                    {month}
                                </h2>

                                <div className="space-y-2">
                                    {items.map((tx: HistoryItem, index: number) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-white rounded-lg shadow-sm flex justify-between items-center"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 rounded-lg text-primary">
                                                    {getIcon(tx.service)}
                                                </div>

                                                <div>
                                                    <p className="font-medium capitalize">
                                                        {tx.service}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {tx.receiver}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <p className="font-semibold">
                                                    ₦{tx.amount.toLocaleString()}
                                                </p>

                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full
                        ${tx.status.toLowerCase().charAt(0) === "s" || tx.status.toLowerCase().charAt(0) === "a"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Load More Button */}
                    {page < totalPage && (
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={loadMore}
                                disabled={isUpdating}
                                className="bg-primary text-white px-6 py-2 rounded-lg"
                            >
                                Load More
                            </button>
                        </div>
                    )}

                </div>
            </div>
            );
}
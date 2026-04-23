"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";

type HistoryItem = {
    service: string;
    type: string;
    receiver: string;
    amount: number;
    status: string;
    date: string;
};
export const useAdminHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [dailyTransactions, setDailyTransactions] = useState(0)

    const fetchHistory = async (pageNum: number) => {
        try {
            setIsProcessing(true);

            const res = await api.get(
                `/history/admin?page=${pageNum}&limit=10`
            );

            setHistory((prev) =>
                pageNum === 1
                    ? res.data.result
                    : [...prev, ...res.data.result]
            );
            setIsProcessing(false);
            setTotalPage(res.data.totalPage);
            setDailyTransactions(res.data.dailyTransactions);
        } catch (err: any) {
            setIsProcessing(false);
            setNotification(err.response?.data?.message || "Something went wrong");
            setTitle('Error!')
        }
    };

    useEffect(() => {
        fetchHistory(1);
    }, []);

    const loadMore = () => {
        if (page >= totalPage) return;

        const nextPage = page + 1;
        setPage(nextPage);
        fetchHistory(nextPage);
    };

    return {
        history,
        isProcessing,
        notification,
        title,
        page,
        totalPage,
        loadMore,
        refetch: () => fetchHistory(1),
        dailyTransactions,
    };
};
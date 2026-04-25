"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import api from "@/app/lib/api";
import DotLoader from "@/app/components/modal/loader";
import ReceiptCard from "@/app/components/receipt/ReceiptCard";
import { Transaction } from "@/app/components/receipt/types";
import { useRouter } from "next/navigation";

export default function ReceiptPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const service = searchParams.get("service");

    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchReceipt = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/history/${id}?service=${service}`);
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            router.push("/histories")
        }
    };

    useEffect(() => {
        if (id) fetchReceipt();
    }, [id]);

    const transaction: Transaction = {
        amount: data.amount,
        serviceType: data.service,
        network: data.network,
        meterNumber: data.meterNumber,
        smartCardNumber: data.smartCardNumber,
        phone: data.phone,
        reference: data.reference,
        prevBalance: data.balance_before,
        newBalance: data.balance_after,
        date: data.date,
        status: data.status as "success" | "failed" | "pending",
        isShare: true,
        close: true,
    };

    if (loading) return <DotLoader />;

    return (
        <div className="p-4">
            <ReceiptCard
                data={transaction}
            />
        </div>
    );
}
"use client";

import React, { useState, useEffect } from "react";
import api from "../lib/api";
import { Header } from "@/app/components/data/header";
import BuyAirtimeComp from "@/app/components/airtime/buyAirtime";
import TransactionConfirmation from "@/app/components/transactionConfirmation";
import DotLoader from "../components/modal/loader";
import NetworkSelectionPage from "@/app/components/airtime/networkpage";
import { ModalNotification } from "../components/modal/modal";
import { detectNetwork } from "@/app/components/detectNetwork";
import { useUserInfo } from "@/app/hooks/useUserInfo";

interface AirtimeN {
    d_id: number;
    id: number;
    name: string;
}

interface AirtimeT {
    d_id: number;
    name: string;
}

interface walletInfo {
    username: string;
    user_balance: string;
}

const BuyAirtime: React.FC = () => {
    const [beneficiary, setBeneficiary] = useState("frequent");
    const [page, setPage] = useState("airtime");
    const [network, setNetwork] = useState("");
    const [airtimeTypes, setAirtimeTypes] = useState<AirtimeT[]>([]);
    const [airtimeType, setAirtimeType] = useState("");
    const [phone, setPhone] = useState("");
    const [amountToPay, setAmountToPay] = useState("");
    const [amount, setAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isNotification, setIsNotification] = useState(false);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const PIN_LENGTH = 4;
    const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const [pageIndex, setPageIndex] = useState(1);
    const { userInfo } = useUserInfo();

    //Fetch Airtime type
    useEffect(() => {
        const fetchAirtimeType = async () => {
            try {
                const response = await api.get(
                    `/airtime/type`,
                );
                if (response.status === 200) {
                    setAirtimeTypes(response.data);
                }
            } catch (err: any) {
                console.error(err);
                setIsProcessing(false);
                setNotification(err.response?.data?.message || "Something went wrong");
                setIsNotification(true);
                setTitle('Error!')
            }
        };
        fetchAirtimeType();
    }, []);

    //Purchase Airtime6
    const HandleAirtePurchase = async (e: any) => {
        e.preventDefault();
        try {
            setIsProcessing(true);

            const isLesser = parseFloat(userInfo.user_balance) < parseFloat(amountToPay);

            if (isLesser) {
                setIsProcessing(false);
                setNotification("Low wallet balance, please fund your wallet");
                setIsNotification(true);
                setTitle('Warning!')
                return;
            }
            const response = await api.post(
                `/airtime/purchase`,
                { network, airtimeType, phone, amountToPay, amount },
            );
            if (response.status === 200) {
                setIsProcessing(false);
                setNotification(response.data.message || "Airtime purchase successful");
                setIsNotification(true);
                setTitle('Success!')
            }
        } catch (err: any) {
            setIsProcessing(true);
            setIsProcessing(false);
            setNotification(err.response?.data?.message || "Something went wrong");
            setIsNotification(true);
            setTitle('Error!')
        }
    };

    // update airtime amount to pay
    useEffect(() => {
        const toPay = Number(amount) - (Number(amount) * 0.02);
        const strToPay = toPay.toString();
        setAmountToPay(strToPay)
    }, [amount]);

    return (
        <div className="px-4 sm:px-6 max-w-md mx-auto pb-10">

            {/* Header */}
            {isProcessing && <DotLoader />}
            {isNotification && <ModalNotification notification={notification} title={title} onButtonClick={() => setIsNotification(false)} isNotification={isNotification} />}
            <Header
                pageIndex={pageIndex}
                buy="Buy Airtime"
                setPageIndex={setPageIndex}
            />

            {pageIndex === 1 && (
                <NetworkSelectionPage
                    page={page}
                    phone={phone}
                    network={network}
                    beneficiary={beneficiary}
                    userInfo={userInfo}
                    setPage={setPage}
                    setPhone={setPhone}
                    setNetwork={setNetwork}
                    setBeneficiary={setBeneficiary}
                    setPageIndex={setPageIndex}
                />
            )}
            {pageIndex === 2 && (
                <BuyAirtimeComp
                    beneficiary={beneficiary}
                    network={network}
                    phone={phone}
                    amount={amount}
                    airtimeType={airtimeType}
                    airtimeTypes={airtimeTypes}
                    setAirtimeType={setAirtimeType}
                    setAmount={setAmount}
                    setPageIndex={setPageIndex}
                />
            )}

            {pageIndex === 3 && (
                <TransactionConfirmation
                    choosenDataPlan={amountToPay}
                    phone={phone}
                    page={page}
                    network={network}
                    pin={pin}
                    setPin={setPin}
                    phoneTitle='Phone Number'
                    ProductTitle="Product"
                    NetworkTitile="Netwok"
                    planTitile=""
                    plan=""
                    Fetch={HandleAirtePurchase}
                />
            )}
        </div>
    );
};

export default BuyAirtime;

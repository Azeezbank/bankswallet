"use client";

import { Eye, EyeOff, Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/api";

interface UserInfo {
    username: string;
    user_balance: string;
    packages: string;
    role: string;
    referree: number;
    cashback: number;
    Phone_number: string;
}

interface Bank {
    d_id: number;
    acctNo: number;
    acctName: string;
    bankName: string;
}

export const AccountToDebit = () => {
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "",
        user_balance: "",
        role: "",
        packages: "",
        cashback: 0,
        referree: 0,
        Phone_number: ""
    });

    const [bankDetails, setBankDetails] = useState<Bank>({
        d_id: 0,
        acctNo: 0,
        acctName: "",
        bankName: "",
    });

    // Fetch user information
    useEffect(() => {
        const handleUserInfo = async () => {
            try {
                const response = await api.get<UserInfo>(
                    `/user/info`,
                );
                if (response.status === 200) {
                    setUserInfo(response.data);
                }
            } catch (err: any) {
                console.error(err.response?.data.message || err.message);
            }
        };
        handleUserInfo();
    }, []);

    // Fetch account details
    useEffect(() => {
        const bankDetail = async () => {
            try {
                const response = await api.post<Bank>(
                    `/user/bankacct`,
                    {},
                );
                if (response.status === 200) {
                    setBankDetails(response.data);
                    //   setIsAcctN(true);
                }
            } catch (err: any) {
                console.error(err.response?.data.message || err.message);
            }
        };
        bankDetail();
    }, []);

    return (
        <div>
            <div className="mt-5">
                <h2 className="font-semibold">Account to Debit</h2>
                <div className="bg-gradient rounded-lg p-5 text-white">
                    {/* Balance */}
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1 items-center">
                            {isAmountVisible ? (
                                <h2 className="text-xl sm:text-2xl font-semibold">
                                    ₦{Number(userInfo.user_balance).toLocaleString()}
                                </h2>
                            ) : (
                                <>
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsAmountVisible(!isAmountVisible)}
                        >
                            {isAmountVisible ? (
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 mt-8">
                        <h5>{bankDetails.acctNo}</h5><span className="flex w-px h-4 bg-white"></span><h5>{userInfo.packages}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
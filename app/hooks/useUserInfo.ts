import { useState, useEffect } from "react";
import api from "@/app/lib/api";

interface UserInfo {
    username: string;
    user_balance: string;
    packages: string;
    role: string;
    referree: number;
    cashback: number;
}

export function useUserInfo() {

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "",
        user_balance: "",
        role: "",
        packages: "",
        cashback: 0,
        referree: 0,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/user/info`);

                if (response.status === 200) {
                    setUserInfo(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    return { userInfo };
}
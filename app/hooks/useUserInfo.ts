import { useState, useEffect } from "react";
import api from "@/app/lib/api";

interface UserInfo {
    username: string;
    user_balance: string;
    packages: string;
    role: string;
    referree: number;
    cashback: number;
    Phone_number: string;
}

interface UserDetails {
    d_id: number;
    username: string;
    user_email: string;
    user_balance: number;
    packages: number;
    Phone_number: number;
    Pin: number;
}

export function useUserInfo() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "",
        user_balance: "",
        role: "",
        packages: "",
        cashback: 0,
        referree: 0,
        Phone_number: "",
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

    /* Fetch users */

    return { userInfo };
}

export const useUsersDetails = ({ page, limit }: { page: number, limit: number }) => {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [totalUser, setTotalUser] = useState(0);
    const [totalWallet, setTotalWallet] = useState(0);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await api.get(
                `/user/details?page=${page}&limit=${limit}`,
            );

            if (res.status === 200) {

                setUsers(res.data.data);
                setTotalPage(res.data.totalPage);
                setTotalUser(res.data.total)
                setTotalWallet(res.data.totalUserWallet)
            }
        };
        fetchUsers();
    }, [page, limit]);
    return { users, totalPage, totalUser, totalWallet }
};
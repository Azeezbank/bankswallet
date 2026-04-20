import { useState, useEffect } from "react";
import api from "@/app/lib/api";

interface Bank {
  acctNo: number;
  acctName: string;
  bankName: string;
}

export function useBankAccount() {
  const [bankDetails, setBankDetails] = useState<Bank>({
    acctNo: 0,
    acctName: "",
    bankName: "",
  });

  const [isAcctN, setIsAcctN] = useState(false);
  const [isAcct, setIsAcct] = useState(true);

  const generateAccount = async () => {
    setIsAcct(false);

    try {
      const response = await api.post(`/monnify/acct`, {});

      if (response.status === 200) {
        setIsAcct(true);
      }
    } catch (err) {
      console.error(err);
      setIsAcct(true);
    }
  };

  const fetchBankAccount = async () => {
    try {
      const response = await api.post(`/user/bankacct`, {});

      if (response.status === 200) {
        setBankDetails(response.data);
        setIsAcctN(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBankAccount();
  }, []);

  return {
    bankDetails,
    isAcctN,
    isAcct,
    generateAccount,
  };
}
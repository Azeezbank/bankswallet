"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Header } from "@/app/components/data/header";
import BuyDataComp from "@/app/components/data/buyData";
import TransactionConfirmation from "@/app/components/transactionConfirmation";
import DotLoader from "../components/modal/loader";
import NetworkSelectionPage from "@/app/components/data/networkpage";
import { ModalNotification } from "../components/modal/modal";
import { detectNetwork } from "@/app/components/detectNetwork";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import ReceiptCard from "../components/receipt/ReceiptCard";
import { Transaction } from "@/app/components/receipt/types";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

interface dataType {
  d_id: number;
  id: number;
  name: string;
}

interface dataPlan {
  d_id: number;
  id: number;
  name: string;
  network_name: string;
  data_type: string;
  USER: string;
  RESELLER: string;
  API: string;
  validity: string;
}

const BuyData = () => {
  const [beneficiary, setBeneficiary] = useState("frequent");
  const [page, setPage] = useState("data");
  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState('');
  const [dataType, setDataType] = useState<dataType[]>([]);
  const [choosenDataType, setChoosenDataType] = useState("");
  const [dataPlan, setDataPlan] = useState<dataPlan[]>([]);
  const [choosenDataPlan, setChoosenDataPlan] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [plan, setPlan] = useState('');
  const [isNotification, setIsNotification] = useState(false);
  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState('');
  const PIN_LENGTH = 4;
  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [pageIndex, setPageIndex] = useState(1);
  const { userInfo } = useUserInfo();
  const [txSatatus, setTxStatus] = useState('');
  const [isReciept, setIsReceipt] = useState(false);

  const DataPrice = choosenDataPlan;

  useAuthGuard();

  useEffect(() => {
    if (phone.length >= 4) {
      const detected = detectNetwork(phone);
      if (detected) {
        setNetwork(detected);
      }
    }
  }, [phone]);

  //Fetch dataType
  useEffect(() => {

    if (!network) {
      setDataType([]);
      return;
    }

    const fetchDataType = async () => {
      try {
        const response = await api.post<dataType[]>(
          `/data/types`,
          { network },
        );
        if (response.status === 200) {
          setDataType(response.data);
        }
      } catch (err: any) {
        console.error(err);
        setIsProcessing(false);
        setNotification(err.response?.data?.message || "Something went wrong");
        setIsNotification(true);
        setTitle('Error!')
      }
    }
    fetchDataType();
  }, [network]);

  //Fetch data plans
  useEffect(() => {
    const fetchDataPlan = async () => {
      try {
        const response = await api.post<dataPlan[]>(
          "/data/plans",
          { network, choosenDataType },
        );
        if (response.status === 200) {
          setDataPlan(response.data);
        }
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchDataPlan();
  }, [network, choosenDataType]);

  const handlePrice = (e: any) => {
    const newPrice = e.target.value;
    setChoosenDataPlan(newPrice);
    setPlan(e.target.selectedOptions[0].text)
  };

  //Purchase data bundle
  const FetchDataBundle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsProcessing(true);

      const isLesser = parseFloat(userInfo.user_balance) < parseFloat(choosenDataPlan);

      if (isLesser) {
        setIsProcessing(false);
        setNotification('Low wallet balance, please fund your wallet');
        setIsNotification(true);
        setTitle('Warning!')
        return;
      }

      const pinValue = pin.join("");

      const response = await api.post(
        `/data/purchase`,
        { plan, DataPrice, phone, network, choosenDataType, pin: pinValue },
      );

      if (response.status === 200) {
        setIsProcessing(false);
        setTxStatus("success")
        setIsReceipt(true);
      }
    } catch (err: any) {
      console.error(err);
      setIsProcessing(false);
      setTxStatus("failed")
      setIsReceipt(true);
    }
  };

  const transaction: Transaction = {
    amount: plan,
    serviceType: "data",
    network: network,
    phone: phone,
    status: txSatatus as "success" | "failed" | "pending",
    isShare: false,
  };

  return (
    <div className="px-4 sm:px-6 max-w-md mx-auto pb-10">

      {/* Header */}
      {isProcessing && <DotLoader />}
      {isNotification && <ModalNotification notification={notification} title={title} onButtonClick={() => setIsNotification(false)} isNotification={isNotification} />}
      <Header
        buy="Buy Data"
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />

      {pageIndex === 1 && (
        <NetworkSelectionPage
          page={page}
          phone={phone}
          network={network}
          plan={plan}
          beneficiary={beneficiary}
          userInfo={userInfo}
          setPage={setPage}
          setPhone={setPhone}
          setNetwork={setNetwork}
          setPlan={setPlan}
          setBeneficiary={setBeneficiary}
          setPageIndex={setPageIndex}
        />
      )}
      {pageIndex === 2 && (
        <BuyDataComp
          beneficiary={beneficiary}
          network={network}
          phone={phone}
          dataType={dataType}
          choosenDataType={choosenDataType}
          setChoosenDataType={setChoosenDataType}
          dataPlan={dataPlan}
          choosenDataPlan={choosenDataPlan}
          plan={plan}
          setChoosenDataPlan={setChoosenDataPlan}
          setPlan={setPlan}
          handlePrice={handlePrice}
          setPageIndex={setPageIndex}
        />
      )}

      {pageIndex === 3 && (
        <TransactionConfirmation
          choosenDataPlan={choosenDataPlan}
          phone={phone}
          page={page}
          network={network}
          plan={plan}
          pin={pin}
          setPin={setPin}
          phoneTitle='Phone Number'
          ProductTitle="Product"
          NetworkTitile="Netwok"
          planTitile="Data Bundle"
          Fetch={FetchDataBundle}
        />
      )}

      {isReciept && (
        <ReceiptCard
          data={transaction}
          onClose={() => setIsReceipt(false)}
        />
      )}
    </div>
  );
};

export default BuyData;
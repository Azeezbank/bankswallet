import api from "@/app/lib/api";

interface FetchDataBundleProps {
  apiUrl: string;
  walletBalance: { user_balance: string };
  choosenDataPlan: string;
  plan: string;
  DataPrice: string;
  mobileNumber: string;
  choosenNetwork: string;
  choosenDataType: string;
  pin: string;
  setInfoWar: (msg: string) => void;
  setWarning: (val: boolean) => void;
  setIsProcessing: (val: boolean) => void;
  setIsModalFail: (val: boolean) => void;
  setIsModalSuccess: (val: boolean) => void;
  setIsModalConfirmation: (val: boolean) => void;
}

export const FetchDataBundle = async (props: FetchDataBundleProps) => {
  const {
    apiUrl,
    walletBalance,
    choosenDataPlan,
    plan,
    DataPrice,
    mobileNumber,
    choosenNetwork,
    choosenDataType,
    pin,
    setInfoWar,
    setWarning,
    setIsProcessing,
    setIsModalFail,
    setIsModalSuccess,
    setIsModalConfirmation,
  } = props;

  try {
    setIsProcessing(false);

    const isLesser = parseFloat(walletBalance.user_balance) < parseFloat(choosenDataPlan);

    if (isLesser) {
      setInfoWar("Low wallet balance, please fund your wallet");
      setWarning(true);
      setIsProcessing(true);
      return;
    }

    const response = await api.post(
      `/data/purchase/bundle`,
      { plan, DataPrice, mobileNumber, choosenNetwork, choosenDataType, pin },
    );

    if (response.status === 200) {
      setIsModalFail(false);
      setIsModalSuccess(true);
      setIsProcessing(true);
      setIsModalConfirmation(false);
    }
  } catch (err: any) {
    console.error(err);
    setIsModalSuccess(false);
    setIsModalFail(true);
    setIsProcessing(true);
  }
};
export type Transaction = {
  amount: string;
  serviceType: "airtime" | "data" | "cable" | "electricity" | "transfer";
  network?: string;
  meterNumber?: string;
  smartCardNumber?: string;
  phone?: string;
  reference?: string;
  date?: string;
  status: "success" | "failed" | "pending";
  isShare: boolean;
};



export const getServiceLabel = (tx: Transaction) => {
  switch (tx.serviceType) {
    case "airtime":
      return "Airtime Purchase";

    case "data":
      return "Data Subscription";

    case "cable":
      return "Cable TV Subscription";

    case "electricity":
      return "Electricity Bill Payment";

    case "transfer":
      return "Wallet Transfer";

    default:
      return "Transaction";
  }
};
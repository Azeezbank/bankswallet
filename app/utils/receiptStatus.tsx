import { CheckCircle, Clock, XCircle } from "lucide-react";

export const getStatusColor = (status?: string) => {
  const s = status?.toLowerCase();

  if (["success", "successful", "paid", "approved"].includes(s || "")) {
    return "text-green-600";
  }

  if (["failed", "error", "rejected"].includes(s || "")) {
    return "text-red-600";
  }

  return "text-yellow-600";
};

export const getStatus = (status?: string) => {
  const s = status?.toLowerCase();

  if (["success", "successful", "paid", "approved"].includes(s || "")) {
    return <div className="bg-green-100 text-green-600 rounded-lg px-1">Successful</div>;
  }

  if (["failed", "error", "rejected"].includes(s || "")) {
    return <div className="bg-red-100 text-red-600 rounded-lg px-1">Failed</div>;
  }

  return <div className="bg-yellow-100 text-yellow-600 rounded-lg px-1">Pending</div>;
};

export const getStatusIcon = (status?: string) => {
  const s = status?.toLowerCase();

  if (["success", "successful", "paid", "approved"].includes(s || "")) {
    return CheckCircle;
  }

  if (["failed", "error", "rejected"].includes(s || "")) {
    return XCircle;
  }

  return Clock;
};

export const getStatusMessage = (status?: string) => {
  const s = status?.toLowerCase();

  if (["success", "successful", "paid", "approved"].includes(s || "")) {
    return "Your transaction was successful";
  }

  if (["failed", "error", "rejected"].includes(s || "")) {
    return "Your transaction failed";
  }

  return "Your transaction is processing";
};
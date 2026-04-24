"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";

type Status = "success" | "failed" | "pending";

type Props = {
  status?: string;
};

export default function StatusBadge({ status }: Props) {
  const normalized: Status =
    status === "success" ||
    status === "failed" ||
    status === "pending"
      ? status
      : "pending";

  const config = {
    success: {
      label: "Successful",
      icon: <CheckCircle size={14} />,
      style: "bg-green-100 text-green-600",
    },
    failed: {
      label: "Failed",
      icon: <XCircle size={14} />,
      style: "bg-red-100 text-red-600",
    },
    pending: {
      label: "Pending",
      icon: <Clock size={14} />,
      style: "bg-yellow-100 text-yellow-600",
    },
  };

  const current = config[normalized];

  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${current.style}`}
    >
      {current.icon}
      {current.label}
    </span>
  );
}
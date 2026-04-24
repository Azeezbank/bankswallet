"use client";

import {
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Calendar,
  Hash,
  Wifi,
  CreditCard,
  Share2,
  Download,
  Zap,
  Tv,
} from "lucide-react";

import ReceiptRow from "./ReceiptRow";
import StatusBadge from "./StatusBadge";
import { Transaction, getServiceLabel } from "./types";

type Props = {
  data: Transaction;
  onClose: () => void;
};

// 🎯 Dynamic status icons
const StatusIcon = {
  success: CheckCircle,
  failed: XCircle,
  pending: Clock,
};

export default function ReceiptCard({ data, onClose }: Props) {
  const Icon = StatusIcon[data.status] || Clock;

  // 📤 SHARE RECEIPT
  const handleShare = async () => {
    const text = `
Transaction Receipt
-------------------------
Amount: ${data.amount}
Service: ${getServiceLabel(data)}
${data.network ? `Network: ${data.network}` : ""}
${data.phone ? `Phone: ${data.phone}` : ""}
${data.meterNumber ? `Meter: ${data.meterNumber}` : ""}
${data.smartCardNumber ? `Smart Card: ${data.smartCardNumber}` : ""}
Reference: ${data.reference}
Date: ${data.date}
Status: ${data.status}
    `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Transaction Receipt",
          text,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(text);
      alert("Receipt copied to clipboard");
    }
  };

  // 📥 DOWNLOAD (PRINT)
  const handleDownload = () => {
    window.print();
  };

  return (
    // 🌑 OVERLAY
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      {/* CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
      >

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        >
          <XCircle size={18} className="text-gray-600" />
        </button>

        {/* HEADER */}
        <div className="text-center mb-6">

          {/* ICON + STATUS */}
          <div className="flex flex-col items-center gap-2 mb-3">

            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <Icon
                size={28}
                className={
                  data.status === "success"
                    ? "text-green-600"
                    : data.status === "failed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              />
            </div>

            <StatusBadge status={data.status} />

          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction {data.status}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mt-1">
            {data.status === "success" && "Your transaction was successful"}
            {data.status === "failed" && "Your transaction failed"}
            {data.status === "pending" && "Your transaction is processing"}
          </p>

        </div>

        {/* AMOUNT */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {data.amount}
          </h1>
          <p className="text-sm text-gray-500">
            {getServiceLabel(data)}
          </p>
        </div>

        {/* DETAILS */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-1">

          <ReceiptRow
            label="Service"
            value={getServiceLabel(data)}
            icon={<CreditCard size={16} />}
          />

          {data.network && (
            <ReceiptRow
              label="Network"
              value={data.network}
              icon={<Wifi size={16} />}
            />
          )}

          {data.phone && (
            <ReceiptRow
              label="Phone"
              value={data.phone}
              icon={<Phone size={16} />}
            />
          )}

          {data.meterNumber && (
            <ReceiptRow
              label="Meter Number"
              value={data.meterNumber}
              icon={<Zap size={16} />}
            />
          )}

          {data.smartCardNumber && (
            <ReceiptRow
              label="Smart Card"
              value={data.smartCardNumber}
              icon={<Tv size={16} />}
            />
          )}

          {data.reference && (
            <ReceiptRow
              label="Reference ID"
              value={data.reference}
              icon={<Hash size={16} />}
            />
          )}

          {data.date && (
            <ReceiptRow
              label="Date"
              value={data.date}
              icon={<Calendar size={16} />}
            />
          )}

          {/* STATUS ROW */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500 text-sm">Status</span>
            <StatusBadge status={data.status} />
          </div>

        </div>

        {/* ACTIONS */}
        {data.isShare && (
          <div className="mt-6 space-y-3">

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient text-white font-medium hover:opacity-90 transition"
            >
              <Download size={18} />
              Download Receipt
            </button>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              <Share2 size={18} />
              Share Receipt
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
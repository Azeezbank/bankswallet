import React from "react";

type Props = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export default function ReceiptRow({ label, value, icon }: Props) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-none">

      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-medium text-gray-800 text-sm text-right">
        {value}
      </span>

    </div>
  );
}
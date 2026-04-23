import { ChevronRight, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";
import { AccountToDebit } from "@/app/components/accountToDebit";
import React from "react";

interface airtimeTypes {
    d_id: number;
    name: string
}

interface BuyAirtimeCompProps {
    beneficiary: string;
    network: string;
    phone: string;
    amount: string;
    airtimeType: string;
    airtimeTypes: airtimeTypes[]
    setAirtimeType: React.Dispatch<React.SetStateAction<string>>
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const BuyAirtimeComp = ({ beneficiary, network, phone, amount, airtimeType, airtimeTypes, setAirtimeType, 
    setAmount, setPageIndex }: BuyAirtimeCompProps) => {

    return (
        <div>
            {/* My Number */}
            {beneficiary === 'frequent' && (
                <div className="flex justify-between items-center bg-gray-100 px-3 py-4 rounded-lg mt-3">
                    <div className="flex gap-3 items-center">

                        <Image
                            src={`/${network || "unknown"}.png`}
                            alt="network"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />

                        <div>
                            <h3 className="font-semibold">{phone}</h3>
                            <p className="text-sm text-gray-500 uppercase">{network}</p>
                        </div>

                    </div>
                </div>
            )}
            <AccountToDebit />

            <span className="flex bg-gray-300 w-full h-[1.5px] my-4"></span>

            <div>
                <div>
                    <div className="flex justify-between">
                        <h2 className="font-semibold">Airtime Types</h2>
                    </div>
                    <select
                        onChange={(e) => setAirtimeType(e.target.value)}
                        className="bg-gray-100 rounded-lg p-4 outline-none w-full mt-2 mb-4 text-gray-500">
                        <option value={airtimeType}>Select Airtime type</option>
                        {airtimeTypes.map((a) => (
                            <option key={a.d_id}>{a.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between mt-2">
                    <h2 className="font-semibold">Amount</h2>
                    <h5>Daily limit: Unlimited</h5>
                </div>
                <input type="number" placeholder="Amount" value={amount} 
                className="bg-gray-100 rounded-lg p-4 outline-none w-full mt-2 mb-4"
                onChange={(e) => setAmount(e.target.value)} />

                <div className="flex gap-2 items-center mt-2">
                    <input type="checkbox" id="beneficiary" name="beneficiary" />
                    <label htmlFor="beneficiary">Save a beneficiary</label>
                </div>
            </div>

            <div className="text-white my-5">
                <button type={'button'}
                    disabled={!amount}
                    onClick={() => setPageIndex(3)}
                    className={`w-full py-2 rounded-lg ${amount ? "bg-gradient cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}>Proceed to pay</button>
            </div>
        </div>
    )
}

export default BuyAirtimeComp;
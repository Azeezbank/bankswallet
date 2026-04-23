import { ChevronRight, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";
import { AccountToDebit } from "@/app/components/accountToDebit";
import React from "react";

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

interface BuyDataCompProps {
    beneficiary: string;
    network: string;
    phone: string;
    dataType: dataType[],
    choosenDataType: string;
    setChoosenDataType: React.Dispatch<React.SetStateAction<string>>;
    dataPlan: dataPlan[]
    choosenDataPlan: string
    plan: string
    setChoosenDataPlan: React.Dispatch<React.SetStateAction<string>>;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
    handlePrice: (e: any) => void
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const BuyDataComp = ({ beneficiary, network, phone, dataType, choosenDataType,
    setChoosenDataType, dataPlan, handlePrice, plan, setPageIndex }: BuyDataCompProps) => {

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
                <div className="flex justify-between">
                    <h2 className="font-semibold">Data Types</h2>
                    <h5>Daily limit: Unlimited</h5>
                </div>
                <select
                    value={choosenDataType}
                    onChange={(e) => setChoosenDataType(e.target.value)}
                    className="bg-gray-100 rounded-lg p-4 outline-none w-full mt-2 mb-4 text-gray-500">
                    <option value="">Select data type</option>
                    {dataType.map((t) => (
                        <option key={t.d_id}>{t.name}</option>
                    ))}
                </select>

                {choosenDataType && (
                    <>
                        <div className="flex justify-between">
                            <h2 className="font-semibold">Data Plans</h2>
                            {/* <h5>Daily limit: Unlimited</h5> */}
                        </div>
                        <select
                            onChange={handlePrice}
                            className="bg-gray-100 rounded-lg p-4 outline-none w-full mt-2 mb-4 text-gray-500">
                            <option value="">Select data plan</option>
                            {dataPlan.map((p) => (
                                <option key={p.d_id} value={p.USER || p.RESELLER || p.API}>{p.network_name} {p.name} {p.validity} #{p.USER || p.RESELLER || p.API}</option>
                            ))}
                        </select>
                    </>
                )}

                <div className="flex gap-2 items-center mt-2">
                    <input type="checkbox" id="beneficiary" name="beneficiary" />
                    <label htmlFor="beneficiary">Save a beneficiary</label>
                </div>
            </div>

            <div className="text-white my-5">
                <button type={'button'}
                    disabled={!plan}
                    onClick={() => setPageIndex(3)}
                    className={`w-full py-2 rounded-lg ${plan ? "bg-gradient cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}>Proceed to pay</button>
            </div>
        </div>
    )
}

export default BuyDataComp;
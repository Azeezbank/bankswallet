import { ChevronRight, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";
import { AccountToDebit } from "@/app/components/accountToDebit";

interface UserInfo {
    username: string;
    user_balance: string;
    packages: string;
    role: string;
    referree: number;
    cashback: number;
    Phone_number: string;
}

interface dataType {
  d_id: number;
  id: number;
  name: string;
}

interface BuyDataCompProps {
  beneficiary: string;
  network: string;
  phone: string;
  dataType: dataType[],
  choosenDataType: string;
  setChoosenDataType: React.Dispatch<React.SetStateAction<string>>
}


const BuyDataComp = ({ beneficiary, network, phone, dataType, choosenDataType, setChoosenDataType }: BuyDataCompProps) => {
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
                className="bg-gray-100 rounded-lg p-4 outline-none w-full mt-2 mb-4 text-gray-500">
                    <option value="">Select data type</option>
                    {dataType.map((t) => (
                        <option key={t.d_id}>{t.name}</option>
                    ))}
                </select>
                </>
                )}
            </div>
        </div>
    )
}

export default BuyDataComp;
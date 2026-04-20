import PinInput from "@/app/components/pin";

interface ITransactionConfirmationProps {
    choosenDataPlan: string;
    phone: string;
    page: string;
    network: string;
    plan: string;
    pin: string[],
    setPin: (val: string[]) => void
    FetchDataBundle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const TransactionConfirmation = ({ choosenDataPlan, phone, page, network, plan,
    pin, setPin, FetchDataBundle
}: ITransactionConfirmationProps) => {
    return (
        <div>
            <div className="bg-gray-100 py-3 text-center rounded-lg my-2">
                <h3>Total Amount</h3>
                <h1 className="font-bold text-2xl pt-1">#{Number(choosenDataPlan).toLocaleString()}</h1>
            </div>

            <span className="flex w-full h-0.5 bg-gray-200 my-5"></span>

            <div className="grid grid-cols-2 gap-y-3">
                <h5 className="text-gray-500">Phone Number</h5>
                <h5 className="text-end">{phone}</h5>
                <h5 className="text-gray-500">Product</h5>
                <h5 className="text-end capitalize">{page}</h5>
                <h5 className="text-gray-500">Network</h5>
                <h5 className="text-end uppercase">{network}</h5>
                <h5 className="text-gray-500">Data Bundle</h5>
                <h5 className="text-end uppercase text-sm">{plan}</h5>
            </div>

            <span className="flex w-full h-0.5 bg-gray-200 my-5"></span>

            <div className="text-center">
                <h1 className="font-bold">Transaction PIN</h1>
                <PinInput
                    pin={pin}
                    setPin={setPin}
                    FetchDataBundle={FetchDataBundle}
                />
            </div>
        </div>
    )
}


export default TransactionConfirmation;

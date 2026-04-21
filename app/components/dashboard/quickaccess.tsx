
import { MessageCircleQuestionMark, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QuickAccess = () => {
    return (
        <section>
            <div className="bg-white px-5">

                {/* Quick access */}
                <h2 className="font-semibold mt-8 mb-3">Quick Access</h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4">
                    <Link href="/data">
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image src="/airtime.svg" alt="Airtime" width={40} height={40} />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1">
                                Buy Airtime
                            </h3>
                        </div>
                    </Link>

                    <Link href="/data">
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image src="/data.jpg" alt="Data" width={40} height={40} />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1">
                                Buy Data
                            </h3>
                        </div>
                    </Link>

                    <Link href={'#'}>
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image
                                src="/airtime2cash - Copy.jpg"
                                alt="Airtime to Cash"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1 text-center">
                                Airtime to Cash
                            </h3>
                        </div>
                    </Link>
                    <Link href={'#'}>
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image
                                src="/utility.jpg"
                                alt="Electricity"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1 text-center">
                                Electricity
                            </h3>
                        </div>
                    </Link>
                    <Link href={'#'}>
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image
                                src="/cable.jpg"
                                alt="Airtime to Cash"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1 text-center">
                                Cable Tv
                            </h3>
                        </div>
                    </Link>
                    <Link href={'#'}>
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image
                                src="/resultchecker.png"
                                alt="Airtime to Cash"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1 text-center">
                                Result Checker
                            </h3>
                        </div>
                    </Link>
                    <Link href={'#'}>
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image
                                src="/sms.png"
                                alt="Airtime to Cash"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1 text-center">
                                Bulk SMS
                            </h3>
                        </div>
                    </Link>
                    <Link href={'#'}>
                        <div className="bg-gray-100 rounded-lg shadow flex flex-col items-center py-3 hover:bg-gray-200 transition">
                            <Image
                                src="/printer.jpg"
                                alt="Airtime to Cash"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-xs sm:text-sm font-semibold mt-1 text-center">
                                Airtime Printing
                            </h3>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};


export default QuickAccess;
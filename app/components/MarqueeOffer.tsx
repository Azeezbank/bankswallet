import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function MarqueeOffer() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-4">
      <Marquee speed={60} gradient={false}>
        <div className="flex gap-4 items-center">
          <span className="text-lg font-medium">Data Bundle</span>
          <Image src="/download.png" alt="star" width={24} height={24} />
          <span className="text-lg font-medium">Airtime</span>
          <Image src="/download.png" alt="star" width={24} height={24} />
          <span className="text-lg font-medium">Electricity Bill</span>
          <Image src="/download.png" alt="star" width={24} height={24} />
          <span className="text-lg font-medium">Exam Pin</span>
          <Image src="/download.png" alt="star" width={24} height={24} />
          <span className="text-lg font-medium">Cable Subscription</span>
          <Image src="/download.png" alt="star" width={24} height={24} />
        </div>
      </Marquee>
    </div>
  );
}
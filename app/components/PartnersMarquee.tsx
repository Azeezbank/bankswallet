import Marquee from "react-fast-marquee";
import Image from "next/image";

const logos = ["/mtn.png", "/airtel.png", "/glo.png", "/9mobile.png"];

export default function PartnersMarquee() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold">Our Partners</h3>
      </div>
      <Marquee speed={30} gradient={false}>
        <div className="flex gap-10 items-center">
          {Array(3)
            .fill(logos)
            .flat()
            .map((logo, idx) => (
              <Image key={idx} src={logo} alt="Partner Logo" width={120} height={50} />
            ))}
        </div>
      </Marquee>
    </section>
  );
}
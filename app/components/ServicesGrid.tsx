import Image from "next/image";

const services = [
  { title: "Data Bundle", img: "/data.jpg", desc: "Affordable data plans for all networks." },
  { title: "Airtime Top-Up", img: "/airtime.svg", desc: "Instant airtime recharge for all networks." },
  { title: "Airtime to Cash", img: "/airtime2cash.jpg", desc: "Convert airtime to cash safely." },
  { title: "Electricity Bill", img: "/utility.jpg", desc: "Pay your electricity bills anytime." },
  { title: "Cable TV", img: "/cable.jpg", desc: "Renew cable subscriptions instantly." },
  { title: "Exam Result", img: "/resultchecker.png", desc: "Get WAEC, NECO, or JAMB results online." },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold">Our Services</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Explore the wide range of services we provide</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div key={service.title} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center hover:scale-105 transition">
            <Image src={service.img} alt={service.title} width={150} height={150} className="mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-2">{service.title}</h4>
            <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
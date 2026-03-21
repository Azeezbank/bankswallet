import Image from "next/image";

interface Plan {
  d_id: number;
  name: string;
  data_type: string;
  network_name: string;
  USER: string;
  RESELLER: string;
  API: string;
}

interface PlansTableProps {
  mtn: Plan[];
  airtel: Plan[];
  glo: Plan[];
  nimobile: Plan[];
}

export default function PlansTable({ mtn, airtel, glo, nimobile }: PlansTableProps) {
  const networks = [
    { name: "MTN", plans: mtn, logo: "/mtn.png" },
    { name: "GLO", plans: glo, logo: "/glo.png" },
    { name: "AIRTEL", plans: airtel, logo: "/airtel.png" },
    { name: "9MOBILE", plans: nimobile, logo: "/9mobile.png" },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-12">
        {networks.map((net) => (
          <div key={net.name} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Image src={net.logo} alt={net.name} width={40} height={40} className="mr-2" />
              <h3 className="text-2xl font-bold">{net.name} PLAN</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-200 dark:bg-gray-700 text-left">
                  <tr>
                    <th className="px-3 py-2">Network</th>
                    <th className="px-3 py-2">Plan</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">User Price</th>
                    <th className="px-3 py-2">Reseller Price</th>
                    <th className="px-3 py-2">API Price</th>
                  </tr>
                </thead>
                <tbody>
                  {net.plans.map((plan) => (
                    <tr key={plan.d_id} className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-3 py-2">{plan.network_name}</td>
                      <td className="px-3 py-2">{plan.name}</td>
                      <td className="px-3 py-2">{plan.data_type}</td>
                      <td className="px-3 py-2">{plan.USER}</td>
                      <td className="px-3 py-2">{plan.RESELLER}</td>
                      <td className="px-3 py-2">{plan.API}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
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

export default function PlansTable({
  mtn,
  airtel,
  glo,
  nimobile,
}: PlansTableProps) {
  const networks = [
    { name: "MTN", plans: mtn, logo: "/mtn.png", color: "text-yellow-500" },
    { name: "GLO", plans: glo, logo: "/glo.png", color: "text-green-600" },
    { name: "AIRTEL", plans: airtel, logo: "/airtel.png", color: "text-red-500" },
    { name: "9MOBILE", plans: nimobile, logo: "/9mobile.png", color: "text-emerald-600" },
  ];

  return (
    <section className="bg-app-gradient py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-2" id="#pricing">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Data Plans & Pricing
          </h2>
          <p className="text-gray-600 text-sm">
            Transparent pricing across all networks
          </p>
        </div>

        {/* NETWORK CARDS */}
        <div className="space-y-8 md:grid md:grid-cols-2 gap-5">

          {networks.map((net) => (
            <div
              key={net.name}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b">

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <Image
                      src={net.logo}
                      alt={net.name}
                      width={32}
                      height={32}
                    />
                  </div>

                  <h3 className={`font-bold text-lg ${net.color}`}>
                    {net.name} DATA PLANS
                  </h3>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {net.plans.length} plans
                </span>

              </div>

              {/* TABLE */}
              <div className="overflow-x-auto max-h-125 overflow-y-auto">
                <table className="w-full text-sm relative border-separate border-spacing-0">

                  {/* HEADER (STICKY) */}
                  <thead className="bg-gray-50 text-gray-600 text-xs uppercase sticky top-0 z-10 shadow-sm">

                    <tr>
                      <th className="text-left px-6 py-3 bg-gray-50">Plan</th>
                      <th className="text-left px-6 py-3 bg-gray-50">Type</th>
                      <th className="text-left px-6 py-3 bg-gray-50">User</th>
                      <th className="text-left px-6 py-3 bg-gray-50">Reseller</th>
                      <th className="text-left px-6 py-3 bg-gray-50">API</th>
                    </tr>

                  </thead>

                  <tbody className="divide-y">

                    {net.plans.map((plan) => (
                      <tr
                        key={plan.d_id}
                        className="hover:bg-gray-50 transition"
                      >

                        <td className="px-6 py-4 font-medium text-gray-900">
                          {plan.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {plan.data_type}
                        </td>

                        <td className="px-6 py-4 text-primary font-semibold">
                          ₦{plan.USER}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          ₦{plan.RESELLER}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          ₦{plan.API}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
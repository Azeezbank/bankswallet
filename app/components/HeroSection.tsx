// "use client";

// import { ArrowRight, ShieldCheck, Zap, Wallet } from "lucide-react";
// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section className="bg-app-gradient min-h-[85vh] flex items-center pt-5">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

//         <div className="grid md:grid-cols-2 gap-10 items-center">

//           {/* LEFT CONTENT */}
//           <div className="space-y-6">

//             <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border text-sm text-primary">
//               <Zap size={16} />
//               Fast • Secure • Reliable VTU Platform
//             </div>

//             <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-gray-900">
//               One Platform for{" "}
//               <span className="text-primary">Airtime, Data & Payments</span>
//             </h1>

//             <p className="text-gray-600 text-base sm:text-lg">
//               Buy airtime, data, cable TV, and fund your wallet instantly with
//               automated secure transactions — built for speed and reliability.
//             </p>

//             {/* CTA BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <Link href="/auth/login">
//               <button className="bg-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition w-full">
//                 Get Started
//                 <ArrowRight size={18} />
//               </button>
//               </Link>

//               <button className="bg-white border px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition">
//                 View Pricing
//               </button>

//             </div>

//             {/* TRUST FEATURES */}
//             <div className="flex flex-wrap gap-4 pt-4 text-sm text-gray-600">

//               <div className="flex items-center gap-2">
//                 <ShieldCheck size={16} className="text-primary" />
//                 Secure Payments
//               </div>

//               <div className="flex items-center gap-2">
//                 <Zap size={16} className="text-primary" />
//                 Instant Delivery
//               </div>

//               <div className="flex items-center gap-2">
//                 <Wallet size={16} className="text-primary" />
//                 Automated Wallet
//               </div>

//             </div>

//           </div>

//           {/* RIGHT CONTENT (VISUAL CARD) */}
//           <div className="relative">

//             <div className="bg-white rounded-2xl shadow-xl border p-6 space-y-4">

//               <h3 className="font-semibold text-lg text-gray-900">
//                 Live Transactions
//               </h3>

//               {/* fake transaction cards */}
//               <div className="space-y-3">

//                 <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium">MTN Data</p>
//                     <p className="text-xs text-gray-500">08012345678</p>
//                   </div>
//                   <span className="text-green-600 font-semibold">₦1,000</span>
//                 </div>

//                 <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium">Airtime</p>
//                     <p className="text-xs text-gray-500">08098765432</p>
//                   </div>
//                   <span className="text-green-600 font-semibold">₦500</span>
//                 </div>

//                 <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium">Wallet Funding</p>
//                     <p className="text-xs text-gray-500">Card Payment</p>
//                   </div>
//                   <span className="text-primary font-semibold">₦5,000</span>
//                 </div>

//               </div>

//             </div>

//             {/* floating glow */}
//             <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 blur-3xl rounded-full"></div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import { ArrowRight, ShieldCheck, Zap, Wallet } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-app-gradient min-h-[85vh] flex items-center pt-5 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >

            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border text-sm text-primary">
              <Zap size={16} />
              Fast • Secure • Reliable VTU Platform
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-gray-900">
              One Platform for{" "}
              <span className="text-primary">Airtime, Data & Payments</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg">
              Buy airtime, data, cable TV, and fund your wallet instantly with
              automated secure transactions — built for speed and reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">

              <Link href="/auth/login">
                <button className="bg-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition w-full">
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </Link>

              <button className="bg-white border px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition">
                View Pricing
              </button>

            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                Secure Payments
              </div>

              <div className="flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                Instant Delivery
              </div>

              <div className="flex items-center gap-2">
                <Wallet size={16} className="text-primary" />
                Automated Wallet
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >

            <div className="bg-white rounded-2xl shadow-xl border p-6 space-y-4">

              <h3 className="font-semibold text-lg text-gray-900">
                Live Transactions
              </h3>

              <div className="space-y-3">

                {[
                  { title: "MTN Data", phone: "08012345678", amount: "₦1,000" },
                  { title: "Airtime", phone: "08098765432", amount: "₦500" },
                  { title: "Wallet Funding", phone: "Card Payment", amount: "₦5,000", primary: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.phone}</p>
                    </div>

                    <span className={`font-semibold ${
                      item.primary ? "text-primary" : "text-green-600"
                    }`}>
                      {item.amount}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* FLOATING GLOW (slow pulse instead of animation library) */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 blur-3xl rounded-full animate-pulse"></div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
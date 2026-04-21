
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section className="bg-app-gradient py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
            Built for Speed, Security & Simplicity
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Bankswallet is a modern financial platform designed for instant,
            secure and automated transactions across airtime, data, cable TV,
            and wallet funding.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >

          {/* CARD 1 */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient flex items-center justify-center text-white mb-4">
              ⚡
            </div>
            <h3 className="font-semibold text-lg">Instant Transactions</h3>
            <p className="text-sm text-gray-600 mt-2">
              All services are processed instantly with automated delivery and
              zero delays.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient flex items-center justify-center text-white mb-4">
              🔐
            </div>
            <h3 className="font-semibold text-lg">Secure System</h3>
            <p className="text-sm text-gray-600 mt-2">
              Built with enterprise-level security to protect every transaction
              and user account.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient flex items-center justify-center text-white mb-4">
              💳
            </div>
            <h3 className="font-semibold text-lg">Smart Wallet</h3>
            <p className="text-sm text-gray-600 mt-2">
              Fund and manage your wallet instantly with full automation and
              real-time updates.
            </p>
          </motion.div>

        </motion.div>

        {/* FOOTER LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Always Active • Always Fast • Always Secure
          </div>
        </motion.div>

      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-app-gradient dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
            <Image
              src="/personal-infothumb-2653662e.png"
              alt="Personal Info"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            About BankyConnect
          </h3>

          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            We provide virtual top-up services including{" "}
            <span className="text-secondary font-semibold">
              Data Bundles, Airtime, Electricity Tokens, and Cable TV Subscriptions
            </span>
            . Our services are tailored to deliver maximum convenience and satisfaction globally.
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            With a focus on{" "}
            <span className="text-primary font-semibold">
              reliability, affordability, and dedicated support
            </span>
            , we help businesses and individuals stay connected and productive.
          </p>

          {/* CTA Button */}
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Learn More
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
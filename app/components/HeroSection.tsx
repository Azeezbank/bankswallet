// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       >
//         <source src="/dark_blue_bg_3.mp4" type="video/mp4" />
//       </video>

//       <div className="relative z-10 space-y-6">
//         <h2 className="text-3xl sm:text-5xl font-bold text-white">
//           Welcome to BankyConnect
//         </h2>
//         <p className="text-lg sm:text-xl text-white">
//           Top-Up Made Easy, Worldwide
//         </p>

//         <div className="flex justify-center gap-4">
//           <Link
//             href="/auth/register"
//             className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//           >
//             Register
//           </Link>

//           <Link
//             href="/auth/login"
//             className="bg-white text-primary px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center bg-app-gradient px-6 overflow-hidden">

      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute w-150 h-150 bg-primary/20 rounded-full -top-25 -left-37.5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-125 h-125 bg-secondary/20 rounded-full -bottom-30 -right-25 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight">
          BankyConnect
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200">
          Top-Up Made Easy. <span className="text-secondary font-semibold">Data, Airtime, Electricity, Cable TV</span> — Fast, Reliable, Everywhere.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            href="/auth/register"
            className="bg-primary text-white px-8 py-4 rounded-lg shadow-lg font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="bg-white text-primary px-8 py-4 rounded-lg shadow-md font-medium hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>
      </motion.div>

      {/* Hero Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mt-12 w-full max-w-3xl relative"
      >
        <Image
          src="/data.png"
          alt="BankyConnect Illustration"
          width={800}
          height={500}
          className="mx-auto rounded-2xl shadow-2xl"
        />
      </motion.div>
    </section>
  );
}
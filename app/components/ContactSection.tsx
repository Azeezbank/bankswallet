import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="py-16 px-6 bg-gray-900 text-white relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold"
          >
            Need a Service?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Let’s work together and set up a meeting.
          </motion.p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Email</h4>
              <p><a href="mailto:bankoleazeezb@gmail.com" className="underline">bankoleazeezb@gmail.com</a></p>
            </div>
            <div>
              <h4 className="font-semibold">Location</h4>
              <p>Iragbiji, Osun State, Nigeria</p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image src="/project-need-dee85a1f.png" alt="Need help" width={500} height={500} className="rounded-lg" />
        </motion.div>
      </div>
    </section>
  );
}
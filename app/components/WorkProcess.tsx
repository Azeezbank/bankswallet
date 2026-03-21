import { motion } from "framer-motion";

const steps = [
  {
    title: "Discovery & Concept",
    points: [
      "Understand your business goals, audience, and brand voice",
      "Define project scope, key features, and number of pages",
      "Research industry trends and gather design inspiration",
      "Present moodboards or sample layouts for direction approval",
    ],
  },
  {
    title: "Design & Wireframing",
    points: [
      "Create clean, responsive wireframes to map structure",
      "Design high-fidelity mockups using tools like Figma or Adobe XD",
      "Incorporate your brand identity (colors, typography, logo)",
    ],
  },
  {
    title: "Build in Code",
    points: [
      "Convert design into a fully functional, responsive website",
      "Use hand-code for custom development",
      "Add animations, forms, CMS (blog or dynamic content)",
      "Optimize for SEO, fast load time, and all device sizes",
    ],
  },
  {
    title: "Launch & Handoff",
    points: [
      "Connect custom domain and set up hosting",
      "Perform final testing and cross-browser checks",
      "Deliver access, training (video or guide), and support options",
      "Offer ongoing maintenance or future updates if needed",
    ],
  },
];

export default function WorkProcess() {
  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold">Working Process</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Your Dream Website In Just Few Steps</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h4 className="text-xl font-bold mb-4">{step.title}</h4>
              <ul className="list-disc pl-5 space-y-2">
                {step.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
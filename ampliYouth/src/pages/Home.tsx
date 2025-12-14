import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl bg-gradient-to-br from-primary to-secondary text-white p-16 shadow-2xl"
      >
        <h1 className="text-4xl font-bold mb-4">
          Educate. Empower. Amplify.
        </h1>
        <p className="text-lg mb-8">
          Grooming a New Wave of Changemakers
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-primary px-6 py-3 rounded-pill font-semibold">
            Apply Now
          </button>
          <button className="border border-white px-6 py-3 rounded-pill">
            Become a Mentor
          </button>
        </div>
      </motion.div>
    </section>
  );
}

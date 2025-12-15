import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-br from-primary to-secondary text-white p-16 shadow-2xl"
        >
          <h1 className="text-5xl font-bold mb-6">
            Educate. Empower. Amplify.
          </h1>
          <p className="text-xl max-w-2xl mb-10">
            AmpliYouth Advocacy Academy is grooming a new wave of
            integrity-driven changemakers from underserved communities
            across Africa and beyond.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-pill font-semibold">
              Apply to the Academy
            </button>
            <button className="border border-white px-8 py-4 rounded-pill">
              Become a Mentor
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="px-8 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Educate",
            text:
              "Deep learning in advocacy, leadership, civic engagement, and social innovation rooted in real community challenges."
          },
          {
            title: "Empower",
            text:
              "Hands-on skills, mentorship, and access to resources that turn passion into structured impact."
          },
          {
            title: "Amplify",
            text:
              "Platforms, visibility, and networks that elevate unheard voices and grassroots solutions."
          }
        ].map((p) => (
          <div
            key={p.title}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              {p.title}
            </h3>
            <p>{p.text}</p>
          </div>
        ))}
      </section>

      {/* Why */}
      <section className="px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Why AmpliYouth Matters
        </h2>
        <p className="text-lg">
          Africa’s changemakers do not only live in big cities. They are
          in villages, inner cities, borderlands, and forgotten spaces.
          AmpliYouth exists to level the playing field and bring those
          voices to the center of global conversations.
        </p>
      </section>
    </div>
  );
}

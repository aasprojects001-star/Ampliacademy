import Section from "../components/Section";
import Card from "../components/Card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="px-5 py-24 bg-gradient-to-br from-primary to-secondary text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Educate. Empower. Amplify.
          </h1>
          <p className="text-lg">
            Grooming a new wave of youth changemakers from underserved
            communities across Africa and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-6 py-4 rounded-pill font-semibold">
              Apply Now
            </button>
            <button className="border border-white px-6 py-4 rounded-pill">
              Become a Mentor
            </button>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <Section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            ["5,000+", "Youth Reached"],
            ["20+", "Communities"],
            ["100+", "Projects Launched"],
            ["15+", "Countries"]
          ].map(([num, label]) => (
            <Card key={label}>
              <p className="text-3xl font-bold text-primary">{num}</p>
              <p className="text-sm">{label}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* PILLARS */}
      <Section>
        <div className="grid sm:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-xl font-bold text-primary mb-2">Educate</h3>
            <p>
              Advocacy, leadership, civic engagement, storytelling, SDGs,
              and human-centered problem solving.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-primary mb-2">Empower</h3>
            <p>
              Mentorship, skills training, resources, funding access,
              and leadership confidence.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-primary mb-2">Amplify</h3>
            <p>
              Platforms, visibility, alumni spotlights, and global
              advocacy opportunities.
            </p>
          </Card>
        </div>
      </Section>
      <Section>
  <h2 className="text-2xl font-bold mb-6 text-center">
    Voices From the Community
  </h2>
  <div className="grid sm:grid-cols-2 gap-6">
    <Card>
      <p>
        “AmpliYouth gave me clarity, confidence, and the network I
        never had.”
      </p>
      <p className="mt-3 font-semibold text-primary">— Amina, Northern Nigeria</p>
    </Card>
    <Card>
      <p>“This academy helped me turn passion into structured advocacy.”</p>
      <p className="mt-3 font-semibold text-primary">— Joseph, Kenya</p>
    </Card>
  </div>
</Section>
    </>
  );
}

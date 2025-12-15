import Section from "../components/Section";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
              Educating and amplifying Africa’s next generation of changemakers
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              AmpliYouth Advocacy Academy equips young leaders from underserved
              communities with the skills, networks, and platforms to drive
              justice, equity, and sustainable development.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-6 py-3 rounded-full">
                Apply to the Academy
              </button>
              <button className="border px-6 py-3 rounded-full">
                Become a Partner
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Youth leadership"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* IMPACT */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["5,000+", "Youth Reached"],
            ["20+", "Communities"],
            ["15+", "Countries"],
            ["100+", "Projects"]
          ].map(([n, t]) => (
            <div key={t}>
              <p className="text-3xl font-bold text-primary">{n}</p>
              <p className="text-sm text-gray-600">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
            className="rounded-2xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Why AmpliYouth Matters
            </h2>
            <p className="text-gray-600">
              Africa’s most powerful changemakers often live far from
              opportunity. We exist to bridge that gap — connecting talent,
              integrity, and grassroots passion to global platforms.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

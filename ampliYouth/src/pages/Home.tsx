export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Building Africa’s next generation of principled changemakers
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              AmpliYouth Advocacy Academy is a leadership and advocacy institution
              dedicated to equipping young people from underserved communities
              with the skills, confidence, and platforms to influence systems,
              shape narratives, and drive sustainable development across Africa
              and beyond.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-7 py-3 rounded-full">
                Apply to the Academy
              </button>
              <button className="border px-7 py-3 rounded-full">
                Partner With Us
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
            alt="Youth advocacy workshop"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">5,000+</p>
            <p className="text-gray-600 mt-2">Young people reached</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">20+</p>
            <p className="text-gray-600 mt-2">Communities engaged</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15+</p>
            <p className="text-gray-600 mt-2">Countries represented</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">100+</p>
            <p className="text-gray-600 mt-2">Youth-led initiatives launched</p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
            alt="Community dialogue"
            className="rounded-2xl"
          />

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why AmpliYouth Exists
            </h2>

            <p className="text-gray-600 mb-4">
              Across Africa, extraordinary leadership potential exists in
              rural communities, informal settlements, conflict-affected
              regions, and overlooked spaces. Yet access to platforms,
              mentorship, and institutional support remains deeply unequal.
            </p>

            <p className="text-gray-600 mb-4">
              AmpliYouth Advocacy Academy was created to bridge this gap —
              ensuring that talent, integrity, and purpose are not limited by
              geography or socioeconomic background.
            </p>

            <p className="text-gray-600">
              We work at the intersection of advocacy, leadership development,
              storytelling, and community action to support young people who
              are ready to lead change but lack access to opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Voices from the Academy
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow">
              <p className="text-gray-700 mb-4">
                “Before AmpliYouth, I had passion but no structure.
                The Academy helped me understand advocacy, leadership,
                and how to turn community problems into actionable projects.”
              </p>
              <p className="font-semibold text-primary">
                Amina S. — Northern Nigeria
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <p className="text-gray-700 mb-4">
                “This is not motivational talk. It is practical,
                grounded leadership training that respects where
                young people are coming from.”
              </p>
              <p className="font-semibold text-primary">
                Joseph K. — Kenya
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

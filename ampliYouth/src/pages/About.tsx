export default function About() {
  return (
    <>
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            About AmpliYouth Advocacy Academy
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            AmpliYouth Advocacy Academy is a leadership and advocacy institution
            committed to identifying, grooming, and amplifying young
            changemakers, particularly from underserved and marginalized
            communities across Africa and beyond.
          </p>

          <p className="text-gray-600 mb-6">
            The Academy operates as both a training platform and a movement —
            supporting young people to develop the knowledge, skills, and
            confidence required to influence systems, shape public discourse,
            and lead community-driven solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To educate, empower, and amplify socially conscious young people
              by providing leadership training, advocacy skills, mentorship,
              networks, and access to platforms that enable them to drive
              justice, equity, and sustainable development.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A generation of principled, resilient, and creative youth leaders
              shaping policies, narratives, and communities at local, national,
              and global levels.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Leadership discussion"
            className="rounded-2xl"
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Founded By</h2>
          <p className="text-gray-600">
            AmpliYouth Advocacy Academy was founded by
            <strong> Ayotunde Aboderin</strong>, a youth advocate and social
            impact leader committed to expanding access to leadership
            development and advocacy platforms for young people across Africa.
          </p>
        </div>
      </section>
    </>
  );
}

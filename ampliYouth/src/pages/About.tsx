export default function About() {
  return (
    <div className="p-10 space-y-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-primary">
        About AmpliYouth Advocacy Academy
      </h1>

      <p className="text-lg">
        AmpliYouth Advocacy Academy is a bold, transformative leadership
        initiative designed to identify, groom, and amplify the next
        generation of changemakers, particularly from underserved and
        overlooked communities across Africa and beyond.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            Our Mission
          </h3>
          <p>
            To educate, empower, and amplify socially conscious young
            people by providing skills, networks, resources, and
            confidence to drive justice, equity, and development.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            Our Vision
          </h3>
          <p>
            To raise a new wave of grassroots and global leaders who
            reshape narratives, influence systems, and build sustainable
            impact with integrity and resilience.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">
          Founder
        </h3>
        <p>
          Founded by <strong>Ayotunde Aboderin</strong>, a youth advocate
          and social impact leader committed to building ecosystems
          where passion meets purpose and potential meets opportunity.
        </p>
      </div>
    </div>
  );
}

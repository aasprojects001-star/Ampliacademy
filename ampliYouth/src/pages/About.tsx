import Section from "../components/Section";

export default function About() {
  return (
    <>
      <Section>
        <h1 className="text-4xl font-bold mb-6">About the Academy</h1>
        <p className="max-w-3xl text-gray-600">
          AmpliYouth Advocacy Academy is a leadership launchpad designed to
          identify, groom, and amplify youth changemakers from marginalized and
          underrepresented communities across Africa and beyond.
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To educate, empower, and amplify socially conscious young people
              with the skills, confidence, and networks needed to influence
              systems and drive sustainable change.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A future where grassroots youth leaders shape narratives,
              policies, and communities with integrity and creativity.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="bg-muted rounded-2xl p-10">
          <h3 className="text-xl font-bold mb-3">Founded By</h3>
          <p className="text-gray-600">
            Founded by <strong>Ayotunde Aboderin</strong>, AmpliYouth was born
            from a commitment to ensure that leadership opportunity is not
            limited by geography, background, or access.
          </p>
        </div>
      </Section>
    </>
  );
}

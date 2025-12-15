import Section from "../components/Section";
import Card from "../components/Card";

export default function About() {
  return (
    <Section>
      <div className="space-y-10">
        <h1 className="text-3xl font-bold text-primary">
          About AmpliYouth Advocacy Academy
        </h1>

        <p>
          AmpliYouth Advocacy Academy is a transformative leadership
          launchpad designed to identify, groom, and amplify youth
          changemakers—especially those from rural, underserved, and
          overlooked communities.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-xl mb-2">Our Mission</h3>
            <p>
              To educate, empower, and amplify socially conscious young
              people by providing skills, resources, networks, and
              confidence to drive justice and development.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl mb-2">Our Vision</h3>
            <p>
              A generation of grassroots and global leaders reshaping
              systems with integrity, resilience, and creativity.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

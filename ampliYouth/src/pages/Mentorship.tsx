import Section from "../components/Section";

export default function Mentorship() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-primary mb-4">
        Mentorship Hub
      </h1>

      <p className="mb-6">
        Our mentorship program pairs emerging leaders with experienced
        advocates and professionals for growth and impact.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-primary text-white px-6 py-4 rounded-pill">
          Apply as Mentee
        </button>
        <button className="border border-primary px-6 py-4 rounded-pill">
          Become a Mentor
        </button>
      </div>
    </Section>
  );
}

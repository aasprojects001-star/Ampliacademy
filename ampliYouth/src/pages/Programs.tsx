import Section from "../components/Section";
import Card from "../components/Card";

export default function Programs() {
  const programs = [
    {
      title: "Mentorship Hub",
      desc:
        "One-on-one and group mentorship connecting youth with experienced changemakers."
    },
    {
      title: "Innovation Lab",
      desc:
        "Designing human-centered solutions to real community challenges."
    },
    {
      title: "Integrity Music Project",
      desc:
        "Using creative expression and music for advocacy and social change."
    },
    {
      title: "Campus Network",
      desc:
        "Building advocacy pipelines across universities and colleges."
    }
  ];

  return (
    <Section>
      <h1 className="text-3xl font-bold text-primary mb-6">
        Programs & Initiatives
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {programs.map(p => (
          <Card key={p.title}>
            <h3 className="font-bold text-xl mb-2">{p.title}</h3>
            <p>{p.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

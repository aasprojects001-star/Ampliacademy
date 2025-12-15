export default function Programs() {
  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-primary">
        Programs & Initiatives
      </h1>

      {[
        {
          title: "Mentorship Hub",
          desc:
            "Structured mentor–mentee relationships that guide young changemakers through growth, clarity, and impact."
        },
        {
          title: "Innovation Lab",
          desc:
            "A space for designing and testing community-centered solutions to real social problems."
        },
        {
          title: "Integrity Music Project",
          desc:
            "Harnessing creative expression and music as a tool for advocacy, integrity, and social messaging."
        },
        {
          title: "Campus Network",
          desc:
            "Building leadership pipelines across universities and colleges through campus-based advocacy hubs."
        }
      ].map((p) => (
        <div
          key={p.title}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-secondary mb-3">
            {p.title}
          </h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

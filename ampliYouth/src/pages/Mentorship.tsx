export default function Mentorship() {
  return (
    <div className="p-10 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-primary">
        Mentorship Hub
      </h1>

      <p className="text-lg">
        Our Mentorship Hub connects emerging changemakers with experienced
        leaders, advocates, and professionals who guide them through
        leadership, advocacy, and personal development.
      </p>

      <div className="flex gap-4">
        <button className="bg-primary text-white px-6 py-3 rounded-pill">
          Apply as Mentee
        </button>
        <button className="border border-primary px-6 py-3 rounded-pill">
          Become a Mentor
        </button>
      </div>
    </div>
  );
}

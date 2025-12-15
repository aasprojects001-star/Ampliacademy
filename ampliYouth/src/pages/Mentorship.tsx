export default function Mentorship() {
  return (
    <>
      {/* INTRO */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Mentorship at AmpliYouth
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Mentorship is central to the AmpliYouth Advocacy Academy.
            We believe leadership development is most effective when
            knowledge is paired with guidance, accountability, and lived
            experience.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              How the Mentorship Program Works
            </h2>

            <p className="text-gray-600 mb-4">
              Participants are matched with mentors based on interests,
              lived experience, and leadership goals. Mentorship engagements
              combine structured sessions and informal check-ins.
            </p>

            <p className="text-gray-600 mb-4">
              Focus areas include leadership growth, advocacy strategy,
              ethical decision-making, community engagement, and personal
              resilience.
            </p>

            <p className="text-gray-600">
              The program emphasizes trust, confidentiality, and mutual
              learning.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Mentorship conversation"
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* WHO CAN APPLY */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Who the Program Is For
          </h2>

          <p className="text-gray-600 mb-4">
            The Mentorship Program is open to young people aged 14–35 who are
            actively engaged in social impact, advocacy, education, community
            leadership, or creative change-making.
          </p>

          <p className="text-gray-600">
            We prioritize participants from underserved, rural, and
            underrepresented communities who have limited access to formal
            mentorship opportunities.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="max-w-4xl mx-auto bg-muted p-10 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">
            Become a Mentor or Mentee
          </h3>

          <p className="text-gray-600 mb-6">
            Whether you are seeking guidance or offering experience,
            mentorship at AmpliYouth is a commitment to shared growth
            and long-term impact.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-primary text-white px-6 py-3 rounded-full">
              Apply as a Mentee
            </button>
            <button className="border px-6 py-3 rounded-full">
              Become a Mentor
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

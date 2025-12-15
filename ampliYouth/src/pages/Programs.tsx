export default function Programs() {
  return (
    <>
      {/* INTRO */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Programs & Initiatives
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            AmpliYouth Advocacy Academy delivers carefully designed programs
            that combine leadership education, advocacy practice, mentorship,
            and real-world community engagement. Each program is rooted in
            lived realities and focused on producing measurable impact.
          </p>
        </div>
      </section>

      {/* PROGRAM 1 */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
            alt="Mentorship session"
            className="rounded-2xl"
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Mentorship Hub
            </h2>

            <p className="text-gray-600 mb-4">
              The Mentorship Hub connects emerging changemakers with
              experienced advocates, professionals, and leaders who provide
              guidance, accountability, and strategic support.
            </p>

            <p className="text-gray-600 mb-4">
              Mentorship is structured around leadership growth, advocacy
              planning, personal development, and long-term impact building.
              Participants are supported to navigate challenges and turn ideas
              into actionable initiatives.
            </p>

            <p className="text-gray-600">
              Mentors include practitioners from civil society, policy spaces,
              education, development organizations, and youth-led movements.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM 2 */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Innovation & Advocacy Lab
            </h2>

            <p className="text-gray-600 mb-4">
              The Innovation & Advocacy Lab is a practical learning space where
              participants design solutions to real community challenges using
              human-centered approaches.
            </p>

            <p className="text-gray-600 mb-4">
              Fellows work through problem identification, stakeholder
              analysis, solution design, testing, and iteration. Emphasis is
              placed on feasibility, ethics, and sustainability.
            </p>

            <p className="text-gray-600">
              Outputs include community campaigns, policy briefs, advocacy
              tools, and pilot projects tailored to local contexts.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
            alt="Community innovation workshop"
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* PROGRAM 3 */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
            alt="Youth dialogue"
            className="rounded-2xl"
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Campus & Community Network
            </h2>

            <p className="text-gray-600 mb-4">
              The Campus & Community Network builds decentralized leadership
              hubs across universities, colleges, and local communities.
            </p>

            <p className="text-gray-600 mb-4">
              Through this network, AmpliYouth supports youth-led dialogues,
              advocacy actions, civic education, and grassroots mobilization.
            </p>

            <p className="text-gray-600">
              Chapters are guided by shared values while remaining responsive
              to local realities and priorities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

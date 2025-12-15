export default function Events() {
  return (
    <>
      {/* =======================
          PAGE INTRO
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Events & Convenings
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            AmpliYouth Advocacy Academy convenes spaces for learning, dialogue,
            reflection, and collective action. Our events bring together young
            changemakers, mentors, practitioners, and partners to exchange
            ideas, build skills, and advance youth-led advocacy.
          </p>

          <p className="text-gray-600">
            Events are designed to be inclusive, context-responsive, and
            grounded in lived realities. They range from intimate workshops
            and dialogues to large-scale convenings and public engagements.
          </p>
        </div>
      </section>

      {/* =======================
          FEATURED EVENTS
      ======================== */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Featured & Upcoming Events
          </h2>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* EVENT 1 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop"
                alt="Youth leadership summit"
                loading="lazy"
              />
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">
                  Upcoming • Virtual
                </p>
                <h3 className="font-bold mb-3">
                  Youth Advocacy & Leadership Summit
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  A multi-session virtual convening focused on advocacy
                  strategy, ethical leadership, and youth participation in
                  governance and development processes.
                </p>
                <p className="text-sm text-gray-500">
                  Date: To be announced
                </p>
              </div>
            </div>

            {/* EVENT 2 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&auto=format&fit=crop"
                alt="Community workshop"
                loading="lazy"
              />
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">
                  Upcoming • In-Person
                </p>
                <h3 className="font-bold mb-3">
                  Community Action Design Workshop
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  A practical workshop supporting young leaders to design
                  community-based initiatives using human-centered and
                  ethical approaches.
                </p>
                <p className="text-sm text-gray-500">
                  Location: Selected communities
                </p>
              </div>
            </div>

            {/* EVENT 3 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop"
                alt="Youth dialogue"
                loading="lazy"
              />
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">
                  Ongoing Series
                </p>
                <h3 className="font-bold mb-3">
                  Youth-Led Policy Dialogues
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Facilitated dialogues that create safe spaces for young
                  people to engage policymakers, practitioners, and
                  stakeholders on pressing social issues.
                </p>
                <p className="text-sm text-gray-500">
                  Format: Hybrid
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          EVENT TYPES
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Types of Events We Organize
          </h2>

          <p className="text-gray-600 mb-6">
            Our events are designed to respond to diverse learning needs,
            advocacy goals, and community contexts. Common event formats
            include:
          </p>

          <ul className="space-y-3 text-gray-600">
            <li>• Leadership and advocacy training workshops</li>
            <li>• Youth-led policy dialogues and roundtables</li>
            <li>• Community action challenges and showcases</li>
            <li>• Mentorship meet-ups and reflection sessions</li>
            <li>• Public conversations on justice, equity, and development</li>
          </ul>
        </div>
      </section>

      {/* =======================
          PAST EVENTS & HIGHLIGHTS
      ======================== */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Past Events & Highlights
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="font-bold mb-3">
                Advocacy Skills Bootcamp
              </h3>
              <p className="text-gray-600">
                A multi-day training program focused on storytelling,
                campaign design, and ethical advocacy for emerging youth
                leaders from underserved communities.
              </p>
            </div>

            <div className="bg-muted rounded-2xl p-8">
              <h3 className="font-bold mb-3">
                Youth Voices Dialogue Series
              </h3>
              <p className="text-gray-600">
                A series of conversations amplifying youth perspectives on
                governance, peacebuilding, education, and social inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          PARTICIPATION
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Who Can Participate
          </h2>

          <p className="text-gray-600 mb-4">
            AmpliYouth events are open to young people aged 14–35, as well as
            mentors, educators, practitioners, and partners aligned with our
            mission and values.
          </p>

          <p className="text-gray-600">
            Participation may be open, application-based, or by invitation,
            depending on the nature and objectives of each event.
          </p>
        </div>
      </section>

      {/* =======================
          CALL TO ACTION
      ======================== */}
      <section className="section">
        <div className="max-w-5xl mx-auto bg-muted rounded-2xl p-10">
          <h3 className="text-2xl font-bold mb-4">
            Stay Informed About Upcoming Events
          </h3>

          <p className="text-gray-600 mb-6">
            To receive updates about upcoming events, workshops, and
            convenings, we encourage you to stay connected with the
            AmpliYouth community.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-full">
              Join Our Mailing List
            </button>
            <button className="border px-6 py-3 rounded-full">
              View Past Events
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

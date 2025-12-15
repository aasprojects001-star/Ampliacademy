export default function Media() {
  return (
    <>
      {/* =======================
          PAGE INTRO
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Media & Impact
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            The work of AmpliYouth Advocacy Academy is grounded in real
            communities, real challenges, and real outcomes. This page
            documents our impact, stories from participants, and media
            coverage that reflects our journey and growth.
          </p>

          <p className="text-gray-600">
            We believe transparency and storytelling are essential to
            accountability. The following sections highlight how youth-led
            advocacy, mentorship, and leadership development translate into
            measurable and meaningful change.
          </p>
        </div>
      </section>

      {/* =======================
          IMPACT OVERVIEW
      ======================== */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">5,000+</p>
            <p className="text-gray-600 mt-2">Young people engaged</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">100+</p>
            <p className="text-gray-600 mt-2">Youth-led initiatives supported</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">20+</p>
            <p className="text-gray-600 mt-2">Communities reached</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15+</p>
            <p className="text-gray-600 mt-2">Countries represented</p>
          </div>
        </div>
      </section>

      {/* =======================
          STORIES FROM THE FIELD
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Stories from the Field
          </h2>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* STORY 1 */}
            <div className="bg-muted rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop"
                alt="Youth leadership workshop"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="font-bold mb-3">
                  From Passion to Policy Advocacy
                </h3>
                <p className="text-gray-600 text-sm">
                  Through the Advocacy Lab, participants in Northern Nigeria
                  developed policy briefs addressing youth unemployment and
                  presented them to local stakeholders.
                </p>
              </div>
            </div>

            {/* STORY 2 */}
            <div className="bg-muted rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop"
                alt="Community dialogue"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="font-bold mb-3">
                  Building Peace Through Dialogue
                </h3>
                <p className="text-gray-600 text-sm">
                  Campus Network leads organized inter-community dialogues
                  focused on peacebuilding, inclusion, and civic participation
                  in conflict-affected regions.
                </p>
              </div>
            </div>

            {/* STORY 3 */}
            <div className="bg-muted rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&auto=format&fit=crop"
                alt="Youth collaboration"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="font-bold mb-3">
                  Grassroots Action, Global Perspective
                </h3>
                <p className="text-gray-600 text-sm">
                  Fellows applied global frameworks such as the SDGs to design
                  community-driven projects addressing education and health
                  access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          TESTIMONIALS
      ======================== */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Voices from the Community
          </h2>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-gray-700 mb-4">
                “AmpliYouth gave me clarity and confidence. I learned how to
                structure my advocacy work and engage decision-makers with
                integrity and purpose.”
              </p>
              <p className="font-semibold text-primary">
                — Program Participant, Ghana
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-gray-700 mb-4">
                “This academy respects grassroots voices. It does not impose
                solutions but supports young people to lead change from where
                they are.”
              </p>
              <p className="font-semibold text-primary">
                — Community Partner, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          MEDIA & PRESS
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Media & Press
          </h2>

          <p className="text-gray-600 mb-6">
            AmpliYouth Advocacy Academy has been featured in conversations
            around youth leadership, advocacy, and grassroots innovation.
            Selected media highlights and publications will be shared here.
          </p>

          <ul className="space-y-4 text-gray-600">
            <li>
              • Feature article on youth-led advocacy and leadership development
            </li>
            <li>
              • Panel discussions on civic engagement and youth participation
            </li>
            <li>
              • Interviews with Academy facilitators and participants
            </li>
            <li>
              • Coverage of community action challenges and dialogues
            </li>
          </ul>
        </div>
      </section>

      {/* =======================
          GALLERY
      ======================== */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Photo Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop"
              alt="Workshop"
              loading="lazy"
              className="rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&auto=format&fit=crop"
              alt="Training session"
              loading="lazy"
              className="rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&auto=format&fit=crop"
              alt="Youth dialogue"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* =======================
          CLOSING
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto bg-muted rounded-2xl p-10">
          <h3 className="text-2xl font-bold mb-4">
            Measuring What Matters
          </h3>

          <p className="text-gray-600 mb-4">
            Impact at AmpliYouth is not defined by numbers alone. It is reflected
            in strengthened leadership capacity, ethical advocacy, and the
            sustained engagement of young people in shaping their communities.
          </p>

          <p className="text-gray-600">
            We remain committed to learning, transparency, and continuous
            improvement as we expand our reach and deepen our impact.
          </p>
        </div>
      </section>
    </>
  );
}

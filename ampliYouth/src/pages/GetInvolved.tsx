export default function GetInvolved() {
  return (
    <>
      {/* =======================
          PAGE INTRO
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Get Involved
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            AmpliYouth Advocacy Academy is built on collaboration. Our work is
            sustained by individuals, institutions, and partners who believe
            in the power of young people to shape just, inclusive, and
            sustainable societies.
          </p>

          <p className="text-gray-600">
            There are multiple ways to engage with AmpliYouth — whether as a
            volunteer, mentor, institutional partner, campus lead, or supporter.
            Each pathway is designed to align commitment with meaningful impact.
          </p>
        </div>
      </section>

      {/* =======================
          WHY GET INVOLVED
      ======================== */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop"
            alt="Community collaboration"
            loading="lazy"
            className="rounded-2xl shadow-sm"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Why Get Involved with AmpliYouth
            </h2>

            <p className="text-gray-600 mb-4">
              Across Africa and beyond, young people are responding to complex
              social challenges with courage, creativity, and commitment.
              However, many lack access to platforms, resources, and support
              systems that enable sustained impact.
            </p>

            <p className="text-gray-600 mb-4">
              By getting involved with AmpliYouth, you become part of an
              ecosystem that prioritizes integrity, grassroots leadership, and
              long-term change over visibility or short-term outcomes.
            </p>

            <p className="text-gray-600">
              Your involvement helps strengthen youth-led initiatives,
              mentorship structures, advocacy efforts, and community action
              across diverse contexts.
            </p>
          </div>
        </div>
      </section>

      {/* =======================
          WAYS TO GET INVOLVED
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Ways to Get Involved
          </h2>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* VOLUNTEER */}
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Volunteer
              </h3>

              <p className="text-gray-600 mb-4">
                Volunteers play a vital role in supporting AmpliYouth programs,
                operations, research, facilitation, communications, and
                community engagement activities.
              </p>

              <p className="text-gray-600">
                Volunteers contribute time and skills while gaining exposure
                to youth advocacy, leadership development, and social impact
                work at local and regional levels.
              </p>
            </div>

            {/* PARTNER */}
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Partner with Us
              </h3>

              <p className="text-gray-600 mb-4">
                We collaborate with organizations, institutions, foundations,
                and networks that share our commitment to youth leadership,
                equity, and social justice.
              </p>

              <p className="text-gray-600">
                Partnerships may include program co-creation, funding support,
                research collaboration, content development, or platform
                sharing.
              </p>
            </div>

            {/* CAMPUS LEAD */}
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Become a Campus or Community Lead
              </h3>

              <p className="text-gray-600 mb-4">
                Campus and Community Leads coordinate AmpliYouth chapters within
                universities, colleges, or local communities.
              </p>

              <p className="text-gray-600">
                Leads organize dialogues, civic education sessions, advocacy
                actions, and youth-led initiatives aligned with AmpliYouth
                values and priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          WHO SHOULD APPLY
      ======================== */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Who Should Get Involved
          </h2>

          <p className="text-gray-600 mb-4">
            Opportunities to get involved with AmpliYouth are open to a wide
            range of individuals and institutions committed to social impact
            and youth empowerment.
          </p>

          <p className="text-gray-600 mb-4">
            This includes students, educators, youth workers, advocates,
            creatives, development practitioners, researchers, and
            professionals seeking to support youth-led change.
          </p>

          <p className="text-gray-600">
            We particularly encourage applications from individuals and
            institutions working in or connected to underserved and
            underrepresented communities.
          </p>
        </div>
      </section>

      {/* =======================
          EXPRESSION OF INTEREST FORM
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Expression of Interest
          </h2>

          <p className="text-gray-600 mb-6">
            If you are interested in volunteering, partnering, mentoring, or
            leading within the AmpliYouth network, please complete the form
            below. Our team will review submissions and follow up where
            appropriate.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg p-3"
            />

            <select className="w-full border rounded-lg p-3">
              <option>Volunteer</option>
              <option>Partner</option>
              <option>Campus or Community Lead</option>
              <option>Mentor</option>
              <option>Other</option>
            </select>

            <textarea
              rows={5}
              placeholder="Tell us about your interest and how you would like to contribute"
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-full"
            >
              Submit Expression of Interest
            </button>
          </form>
        </div>
      </section>

      {/* =======================
          CLOSING STATEMENT
      ======================== */}
      <section className="section">
        <div className="max-w-5xl mx-auto bg-muted rounded-2xl p-10">
          <h3 className="text-2xl font-bold mb-4">
            Building Change Together
          </h3>

          <p className="text-gray-600 mb-4">
            Meaningful change is rarely achieved in isolation. It requires
            collaboration, trust, and a shared commitment to values and impact.
          </p>

          <p className="text-gray-600">
            By getting involved with AmpliYouth Advocacy Academy, you join a
            growing community dedicated to supporting youth leadership that is
            ethical, inclusive, and rooted in real community needs.
          </p>
        </div>
      </section>
    </>
  );
}

export default function Contact() {
  return (
    <>
      {/* =======================
          PAGE INTRO
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            We welcome inquiries, collaboration proposals, and messages from
            individuals and organizations aligned with the mission and values
            of AmpliYouth Advocacy Academy.
          </p>

          <p className="text-gray-600">
            Whether you are a young person seeking information, a potential
            partner, a donor, a mentor, or a member of the media, this page
            provides the appropriate channels to connect with our team.
          </p>
        </div>
      </section>

      {/* =======================
          CONTACT CONTEXT
      ======================== */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              How to Reach AmpliYouth
            </h2>

            <p className="text-gray-600 mb-4">
              AmpliYouth Advocacy Academy operates as a distributed organization,
              working across multiple regions and communities. As such, most
              communications are managed digitally to ensure accessibility,
              responsiveness, and proper documentation.
            </p>

            <p className="text-gray-600 mb-4">
              We encourage clear, purposeful communication to help us respond
              efficiently and appropriately to your inquiry.
            </p>

            <p className="text-gray-600">
              Please review the contact categories below to determine the most
              suitable channel for your message.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop"
            alt="Professional discussion"
            loading="lazy"
            className="rounded-2xl shadow-sm"
          />
        </div>
      </section>

      {/* =======================
          CONTACT CATEGORIES
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Contact Categories
          </h2>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                General Inquiries
              </h3>
              <p className="text-gray-600">
                For questions about programs, applications, timelines, or
                general information about AmpliYouth Advocacy Academy.
              </p>
            </div>

            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Partnerships & Collaboration
              </h3>
              <p className="text-gray-600">
                For organizations, institutions, and funders interested in
                collaboration, co-creation, sponsorship, or long-term
                partnerships.
              </p>
            </div>

            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Media & Communications
              </h3>
              <p className="text-gray-600">
                For journalists, researchers, and media professionals seeking
                interviews, statements, or information about our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          CONTACT FORM
      ======================== */}
      <section className="section">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Send Us a Message
          </h2>

          <p className="text-gray-600 mb-6">
            Please complete the form below. We aim to review and respond to
            messages within a reasonable timeframe, depending on the nature
            of the inquiry.
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
              <option>General Inquiry</option>
              <option>Program Information</option>
              <option>Partnership or Collaboration</option>
              <option>Media Inquiry</option>
              <option>Other</option>
            </select>

            <textarea
              rows={6}
              placeholder="Your message"
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-full"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* =======================
          CONTACT DETAILS
      ======================== */}
      <section className="section bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Additional Contact Information
          </h2>

          <p className="text-gray-600 mb-4">
            For formal correspondence or official communication, you may also
            reach us through the following channels:
          </p>

          <ul className="space-y-3 text-gray-600">
            <li>
              • Email: <strong>info@ampliyouth.org</strong>
            </li>
            <li>
              • Partnerships: <strong>partnerships@ampliyouth.org</strong>
            </li>
            <li>
              • Media: <strong>media@ampliyouth.org</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* =======================
          SAFEGUARDING NOTE
      ======================== */}
      <section className="section">
        <div className="max-w-5xl mx-auto bg-muted rounded-2xl p-10">
          <h3 className="text-2xl font-bold mb-4">
            Safeguarding & Responsible Communication
          </h3>

          <p className="text-gray-600 mb-4">
            AmpliYouth Advocacy Academy is committed to safeguarding and ethical
            engagement, particularly when working with young people and
            vulnerable communities.
          </p>

          <p className="text-gray-600">
            Any communication that raises safeguarding concerns will be handled
            with confidentiality, care, and in line with our safeguarding
            policies and procedures.
          </p>
        </div>
      </section>
    </>
  );
}

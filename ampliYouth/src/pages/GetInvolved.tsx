export default function GetInvolved() {
  return (
    <>
      {/* INTRO */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Get Involved
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            AmpliYouth Advocacy Academy thrives through collaboration.
            There are multiple ways to support, contribute to, and grow
            with the movement.
          </p>
        </div>
      </section>

      {/* WAYS */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">Volunteer</h3>
            <p className="text-gray-600">
              Support programs, research, facilitation, communications,
              and community engagement initiatives.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">Partner</h3>
            <p className="text-gray-600">
              Collaborate as an organization, institution, or donor to
              support youth-led advocacy and leadership development.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">Campus Lead</h3>
            <p className="text-gray-600">
              Establish and coordinate an AmpliYouth chapter within your
              campus or community.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Expression of Interest
          </h2>

          <form className="space-y-4">
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Full Name"
            />
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Email Address"
            />
            <select className="w-full border rounded-lg p-3">
              <option>Volunteer</option>
              <option>Partner</option>
              <option>Campus Lead</option>
              <option>Mentor</option>
            </select>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={5}
              placeholder="Tell us why you want to get involved"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-full">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

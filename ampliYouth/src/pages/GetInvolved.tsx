import Section from "../components/Section";

export default function GetInvolved() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-primary mb-4">
        Get Involved
      </h1>

      <form className="space-y-4 max-w-md">
        <input
          className="w-full border rounded-xl p-4"
          placeholder="Full Name"
        />
        <input
          className="w-full border rounded-xl p-4"
          placeholder="Email Address"
        />
        <select className="w-full border rounded-xl p-4">
          <option>Volunteer</option>
          <option>Mentor</option>
          <option>Partner</option>
          <option>Campus Lead</option>
        </select>
        <textarea
          className="w-full border rounded-xl p-4"
          placeholder="Why do you want to get involved?"
        />
        <button className="bg-primary text-white w-full py-4 rounded-pill">
          Submit
        </button>
      </form>
    </Section>
  );
}


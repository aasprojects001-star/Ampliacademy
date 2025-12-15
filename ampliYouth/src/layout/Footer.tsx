export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <h4 className="font-bold mb-3 text-primary">AmpliYouth</h4>
          <p>
            A leadership and advocacy academy amplifying youth voices
            from underserved communities across Africa and beyond.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Programs</h4>
          <ul className="space-y-2">
            <li>Mentorship Hub</li>
            <li>Innovation Lab</li>
            <li>Campus Network</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Get Involved</h4>
          <ul className="space-y-2">
            <li>Volunteer</li>
            <li>Partner</li>
            <li>Campus Lead</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p>Email: info@ampliyouth.org</p>
          <p>Instagram · Twitter · LinkedIn</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t dark:border-slate-700">
        © {new Date().getFullYear()} AmpliYouth Advocacy Academy
      </div>
    </footer>
  );
}

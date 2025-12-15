import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Get Involved", path: "/get-involved" }
  ];

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-primary">
          AmpliYouth
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex gap-8 items-center">
          {links.map(l => (
            <Link
              key={l.name}
              to={l.path}
              className="text-sm font-medium hover:text-primary"
            >
              {l.name}
            </Link>
          ))}
          <button className="bg-primary text-white px-5 py-2 rounded-full">
            Apply
          </button>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-5 py-6 space-y-4">
          {links.map(l => (
            <Link
              key={l.name}
              to={l.path}
              onClick={() => setOpen(false)}
              className="block text-lg"
            >
              {l.name}
            </Link>
          ))}
          <button className="w-full bg-primary text-white py-3 rounded-full">
            Apply
          </button>
        </div>
      )}
    </header>
  );
}

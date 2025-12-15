import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Media", path: "/media" },
    { name: "Events", path: "/events" },
    { name: "Network", path: "/network" },
    { name: "Resources", path: "/resources" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          AmpliYouth
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex gap-6 items-center">
          {links.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className="text-sm hover:text-primary"
            >
              {l.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white dark:bg-slate-900 px-5 py-6 space-y-4">
          {links.map(l => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className="block text-lg"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

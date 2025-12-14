import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white shadow-lg rounded-b-xl px-6 py-4 flex justify-between items-center"
    >
      <h1 className="font-bold text-primary text-xl">AmpliYouth</h1>
      <div className="flex gap-4">
        {["/", "/about", "/programs", "/mentorship", "/get-involved"].map(
          (path, i) => (
            <Link
              key={i}
              to={path}
              className="px-4 py-2 rounded-pill bg-gradient-to-r from-primary to-secondary text-white"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          )
        )}
      </div>
    </motion.nav>
  );
}

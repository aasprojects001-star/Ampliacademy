import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-primary text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AmpliYouth</h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-6">
          {["Home", "About", "Programs", "Mentorship", "Contact"].map((page) => (
            <Link
              key={page}
              to={`/${page.toLowerCase()}`}
              className="hover:text-secondary transition-colors"
            >
              {page}
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button onClick={handleMenuToggle} className="text-2xl">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden bg-primary py-4 px-5"
        >
          <nav className="space-y-4">
            {["Home", "About", "Programs", "Mentorship", "Contact"].map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                className="block text-lg text-white hover:text-secondary"
                onClick={handleMenuToggle}
              >
                {page}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

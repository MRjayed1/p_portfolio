import { useState } from "react";
import { motion } from "motion/react";

// SVG Gooey Filter (scoped to Navbar)
const GooeySVGFilter = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <filter id="gooey-navbar">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      <feColorMatrix in="blur" mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="gooey" />
      <feBlend in="SourceGraphic" in2="gooey" />
    </filter>
  </svg>
);

function Navigation() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div
      className="relative flex gap-4 items-center px-4 py-2"
      style={{ filter: "url(#gooey-navbar)" }}
    >
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="gooey-btn flex items-center justify-center w-12 h-12 rounded-full bg-primary/80 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary/100 focus:outline-none"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <GooeySVGFilter />
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Jayed
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          {/* Gooey Nav only on desktop */}
          <nav className="hidden sm:flex relative">
            <Navigation />
          </nav>
        </div>
      </div>
      {/* Mobile nav fallback (no gooey effect) */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <ul className="nav-ul">
              <li className="nav-li">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-li">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-li">
                <a className="nav-link" href="#work">Work</a>
              </li>
              <li className="nav-li">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
// Add this to your main CSS (e.g., src/index.css):
// .gooey-btn { box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10); }

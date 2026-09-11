import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const links = [
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Classes", href: "#classes" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Handles mobile nav link taps: prevents the native hash jump (which was
  // getting cancelled because the <a> unmounts mid-navigation when the menu
  // closes), scrolls to the target section manually, then closes the menu.
  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-navy-slate/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 bg-transparent">
          <img
            src="/images/logo1.png"
            alt="Mindful Movement Tribe"
            className={`h-12 w-auto bg-transparent transition-all duration-500 ${
              scrolled ? "brightness-0 invert" : ""
            }`}
          />
        </a>

        <ul
          className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide transition-colors duration-500"
          style={{ color: scrolled ? "#c3d6e2" : "#132430" }}
        >
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                
                  <a href={link.href}
                  className={`relative pb-1 transition-colors duration-300 ${
                    isActive ? "text-sand" : "hover:text-sand"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-sand rounded-full"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        
          <a href="#contact"
          className="hidden md:inline-block px-5 py-2 rounded-full bg-sand text-navy-deep font-body text-sm font-medium hover:bg-sky transition-colors duration-300"
        >
          Join a Class
        </a>

        <button
          className="md:hidden text-sky text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-navy-slate/98 backdrop-blur-sm flex flex-col items-center gap-5 py-6 font-body text-sky overflow-hidden"
          >
            {links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  
                    <a href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className={isActive ? "text-sand" : ""}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              
                <a href="#contact"
                onClick={(e) => handleMobileNavClick(e, "#contact")}
                className="px-5 py-2 rounded-full bg-sand text-navy-deep font-medium"
              >
                Join a Class
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
"use client";

import { useState, useEffect, useMemo } from "react";
import { useActiveSection, useScrollY } from "@/hooks/useAnimations";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "FILOSOFIE", href: "#filosofie" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => ["home", "filosofie", "portfolio", "contact"], []);
  const activeSection = useActiveSection(sectionIds);
  const scrolled = scrollY > 50;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "glass shadow-2xl shadow-black/20 py-3"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group relative z-10">
          <div className="w-8 h-8 border-2 border-gold rotate-45 flex items-center justify-center group-hover:border-gold-light group-hover:scale-110 transition-all duration-500">
            <div className="w-2.5 h-2.5 bg-gold rotate-0 group-hover:bg-gold-light transition-colors duration-500" />
          </div>
          <span className="text-white text-sm font-medium tracking-[0.25em] uppercase">
            TITAAN
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[11px] tracking-[0.2em] px-5 py-2 transition-all duration-300 ${
                  isActive ? "text-gold" : "text-white/50 hover:text-white/90"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-gold" />
                )}
              </a>
            );
          })}
          <a
            href="#contact"
            className="ml-4 border border-gold/40 text-gold text-[11px] tracking-[0.2em] px-7 py-2.5 hover:bg-gold hover:text-green-950 hover:border-gold transition-all duration-500"
          >
            CONTACT
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[1.5px] bg-gold transition-all duration-500 ${mobileOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
          <span className={`w-6 h-[1.5px] bg-gold transition-all duration-500 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
          <span className={`w-6 h-[1.5px] bg-gold transition-all duration-500 ${mobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-green-950/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-white/60 text-lg tracking-[0.3em] hover:text-gold transition-all duration-500 ${
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 0.1}s` : "0s" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className={`mt-4 border border-gold text-gold text-sm tracking-[0.2em] px-10 py-4 hover:bg-gold hover:text-green-950 transition-all duration-500 ${
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "0.4s" : "0s" }}
          >
            NEEM CONTACT OP
          </a>
        </div>
      </div>
    </nav>
  );
}

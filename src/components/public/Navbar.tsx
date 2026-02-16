"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "FILOSOFIE", href: "#filosofie" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-green-950/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border-2 border-gold rotate-45 flex items-center justify-center group-hover:border-gold-light transition-colors">
            <div className="w-3 h-3 bg-gold rotate-0 group-hover:bg-gold-light transition-colors" />
          </div>
          <span className="text-white text-sm font-semibold tracking-[0.3em] uppercase">
            TITAAN <span className="text-gold">DEVELOPMENT</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 text-xs tracking-[0.2em] hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-gold text-gold text-xs tracking-[0.2em] px-6 py-2.5 hover:bg-gold hover:text-green-950 transition-all duration-300"
          >
            CONTACT
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-green-950/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-80 border-b border-gold/20" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 text-sm tracking-[0.2em] hover:text-gold transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="border border-gold text-gold text-sm tracking-[0.2em] px-6 py-3 text-center hover:bg-gold hover:text-green-950 transition-all mt-2"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}

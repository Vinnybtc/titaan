export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 border-[1.5px] border-gold rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-gold" />
              </div>
              <span className="text-white text-xs tracking-[0.25em] font-medium">
                TITAAN
              </span>
            </div>
            <p className="text-white/25 text-xs leading-[1.8] max-w-xs">
              Gespecialiseerd in het ontwikkelen en beheren van hoogwaardig vastgoed sinds 1999.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6 font-medium font-sans">
              Navigatie
            </h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "Filosofie", href: "#filosofie" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/30 text-sm hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6 font-medium font-sans">
              Contact
            </h4>
            <div className="space-y-3 text-white/30 text-sm">
              <p>info@titaan.dev</p>
              <p>+31 (0)70 123 4567</p>
              <p>Lange Voorhout 10</p>
              <p>2514 ED Den Haag</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[11px] tracking-wider">
            &copy; {year} Titaan Development. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 text-[11px] tracking-wider hover:text-white/40 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/20 text-[11px] tracking-wider hover:text-white/40 transition-colors">
              Voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-gold rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-gold" />
            </div>
            <span className="text-white text-xs tracking-[0.3em]">
              TITAAN <span className="text-gold">DEVELOPMENT</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs tracking-wider">
            © {year} Titaan Development. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

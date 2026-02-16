"use client";

interface HeroProps {
  heading: string;
  subtitle: string;
  cta: string;
}

export default function Hero({ heading, subtitle, cta }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.svg')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-950/80 to-green-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-green-950/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">
          {/* Gold accent line */}
          <div className="w-16 h-0.5 bg-gold mb-8 animate-fade-in-up" />

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light italic text-white mb-8 animate-fade-in-up animate-delay-200">
            {heading}
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-12 animate-fade-in-up animate-delay-400">
            {subtitle}
          </p>

          {/* CTA Button */}
          <a
            href="#portfolio"
            className="inline-flex items-center gap-3 text-gold text-sm tracking-[0.2em] group animate-fade-in-up animate-delay-600"
          >
            <span className="border-b border-gold/30 pb-1 group-hover:border-gold transition-colors duration-300">
              {cta}
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animate-delay-600">
        <span className="text-white/30 text-xs tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}

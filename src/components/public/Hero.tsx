"use client";

import { useScrollY } from "@/hooks/useAnimations";

interface HeroProps {
  heading: string;
  subtitle: string;
  cta: string;
}

export default function Hero({ heading, subtitle, cta }: HeroProps) {
  const scrollY = useScrollY();
  const parallaxOffset = scrollY * 0.3;
  const opacity = Math.max(0, 1 - scrollY / 700);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url('/images/hero-bg.svg')",
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/85 to-green-950/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-green-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-950" />

      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40 w-full"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold/0 mb-10 animate-fade-in-up" />

          <p className="text-gold/80 text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in-up animate-delay-100">
            VASTGOED ONTWIKKELING &amp; INVESTERING
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light italic text-white leading-[1.05] mb-8 animate-fade-in-up animate-delay-200">
            {heading}
          </h1>

          <p className="text-white/45 text-base md:text-lg leading-[1.8] max-w-xl mb-14 animate-fade-in-up animate-delay-400">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up animate-delay-500">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 bg-gold text-green-950 text-xs font-semibold tracking-[0.2em] px-8 py-4 hover:bg-gold-light transition-all duration-500"
            >
              {cta}
              <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-white/15 text-white/70 text-xs tracking-[0.2em] px-8 py-4 hover:border-gold/40 hover:text-gold transition-all duration-500"
            >
              NEEM CONTACT OP
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in animate-delay-700">
        <span className="text-white/25 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-gold/60 to-transparent"
            style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-950 to-transparent" />
    </section>
  );
}

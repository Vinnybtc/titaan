"use client";

import { useInView } from "@/hooks/useAnimations";

interface FilosofieProps {
  subtitle: string;
  heading: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
}

export default function Filosofie({
  subtitle,
  heading,
  card1Title,
  card1Desc,
  card2Title,
  card2Desc,
}: FilosofieProps) {
  const { ref, inView } = useInView(0.15);

  const cards = [
    {
      title: card1Title,
      desc: card1Desc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      num: "01",
    },
    {
      title: card2Title,
      desc: card2Desc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      num: "02",
    },
  ];

  return (
    <section id="filosofie" className="relative py-28 md:py-36 bg-green-950 bg-noise overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] opacity-[0.02] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className={`text-gold text-[11px] tracking-[0.4em] uppercase mb-5 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {subtitle}
          </p>
          <h2
            className={`text-3xl md:text-5xl lg:text-[3.5rem] font-light text-white italic leading-tight transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {heading}
          </h2>
          <div
            className={`w-16 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 transition-all duration-1000 delay-400 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative glass-gold p-10 md:p-14 hover:border-gold/30 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.3 + i * 0.2}s` }}
            >
              {/* Card number */}
              <span className="absolute top-8 right-8 text-gold/10 text-6xl font-light select-none">
                {card.num}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 border border-gold/25 flex items-center justify-center mb-8 text-gold group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-500">
                {card.icon}
              </div>

              <h3 className="text-xl md:text-2xl text-white font-light mb-5 group-hover:text-gold-light transition-colors duration-500">
                {card.title}
              </h3>

              <p className="text-white/40 text-sm leading-[1.8]">{card.desc}</p>

              {/* Bottom accent line */}
              <div className="w-0 group-hover:w-12 h-[1px] bg-gold/40 mt-8 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

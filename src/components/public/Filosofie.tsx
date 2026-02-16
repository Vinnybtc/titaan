"use client";

import { useEffect, useRef, useState } from "react";

interface FilosofieProps {
  subtitle: string;
  heading: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function Filosofie({
  subtitle,
  heading,
  card1Title,
  card1Desc,
  card2Title,
  card2Desc,
}: FilosofieProps) {
  const { ref, inView } = useInView();

  return (
    <section id="filosofie" className="py-24 md:py-32 bg-green-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {subtitle}
          </p>
          <h2
            className={`text-3xl md:text-5xl font-light text-white italic transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {heading}
          </h2>
          <div
            className={`w-16 h-0.5 bg-gold mx-auto mt-8 transition-all duration-700 delay-400 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div
            className={`border border-white/10 p-10 md:p-12 hover:border-gold/30 transition-all duration-500 group ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
              <svg
                className="w-5 h-5 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl text-white font-light mb-4">{card1Title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{card1Desc}</p>
          </div>

          {/* Card 2 */}
          <div
            className={`border border-white/10 p-10 md:p-12 hover:border-gold/30 transition-all duration-500 group ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
              <svg
                className="w-5 h-5 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-xl text-white font-light mb-4">{card2Title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{card2Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useAnimations";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "+",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2200;
          const steps = 80;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-light text-gradient-gold tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

interface StatsBarProps {
  stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  const { ref, inView } = useInView(0.3);

  return (
    <section className="relative py-20 md:py-28 bg-green-950 bg-noise overflow-hidden" ref={ref}>
      <div className="section-divider" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #c9a84c, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="w-8 h-[1px] bg-gold/20 mx-auto my-4" />
              <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20 md:mt-28" />
    </section>
  );
}

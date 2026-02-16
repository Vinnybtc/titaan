"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

interface PortfolioProps {
  subtitle: string;
  heading: string;
  projects: Project[];
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function Portfolio({ subtitle, heading, projects }: PortfolioProps) {
  const { ref, inView } = useInView();

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-green-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p
              className={`text-gold text-xs tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {subtitle}
            </p>
            <h2
              className={`text-3xl md:text-5xl font-light text-white transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {heading}
            </h2>
          </div>
          <a
            href="#portfolio"
            className={`text-gold text-xs tracking-[0.2em] mt-6 md:mt-0 hover:text-gold-light transition-all duration-700 delay-300 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            Bekijk Alle Projecten →
          </a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden bg-green-950 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-green-950/40 group-hover:bg-green-950/20 transition-colors duration-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-xs tracking-[0.2em] border border-white/50 px-6 py-2.5 hover:bg-white/10 transition-colors">
                    BEKIJK PROJECT →
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg text-white font-light mb-2 group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span className="text-gold/70 tracking-[0.15em]">
                    {project.category}
                  </span>
                  <span>·</span>
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

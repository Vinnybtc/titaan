"use client";

import { useInView } from "@/hooks/useAnimations";

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

export default function Portfolio({ subtitle, heading, projects }: PortfolioProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="portfolio" className="relative py-28 md:py-36 bg-green-900/50 bg-noise overflow-hidden" ref={ref}>
      {/* Background accents */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.02] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <p
              className={`text-gold text-[11px] tracking-[0.4em] uppercase mb-5 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {subtitle}
            </p>
            <h2
              className={`text-3xl md:text-5xl lg:text-[3.5rem] font-light text-white leading-tight transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {heading}
            </h2>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden bg-green-950/80 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Hover button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-white text-[10px] tracking-[0.25em] border border-white/40 px-7 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
                    BEKIJK PROJECT
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-gold/80 text-[9px] tracking-[0.2em] bg-green-950/60 backdrop-blur-sm px-3 py-1.5 border border-gold/10">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 border-t border-white/5">
                <h3 className="text-lg text-white font-light mb-2 group-hover:text-gold-light transition-colors duration-500">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
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

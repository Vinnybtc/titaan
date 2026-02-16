"use client";

import { useState, useEffect, useRef } from "react";

interface ContactProps {
  heading: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
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

export default function Contact({
  heading,
  subtitle,
  email,
  phone,
  address,
}: ContactProps) {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Verzenden mislukt");

      setSent(true);
      setFormState({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setError("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-green-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Info */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
              CONTACT
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white italic mb-6">
              {heading}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-12 max-w-md">
              {subtitle}
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Email
                  </p>
                  <p className="text-white text-sm">{email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Telefoon
                  </p>
                  <p className="text-white text-sm">{phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1">
                    Adres
                  </p>
                  <p className="text-white text-sm">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {sent ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border border-gold mx-auto mb-6 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-white font-light mb-2">
                    Bericht verzonden
                  </h3>
                  <p className="text-white/50 text-sm">
                    Wij nemen zo snel mogelijk contact met u op.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
                      Voornaam
                    </label>
                    <input
                      type="text"
                      value={formState.firstName}
                      onChange={(e) =>
                        setFormState({ ...formState, firstName: e.target.value })
                      }
                      required
                      className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
                      Achternaam
                    </label>
                    <input
                      type="text"
                      value={formState.lastName}
                      onChange={(e) =>
                        setFormState({ ...formState, lastName: e.target.value })
                      }
                      required
                      className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
                    Email Adres
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                    className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
                    Bericht
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gold text-green-950 text-xs tracking-[0.2em] font-semibold py-4 hover:bg-gold-light transition-colors duration-300 disabled:opacity-50"
                >
                  {sending ? "VERZENDEN..." : "VERSTUUR BERICHT"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

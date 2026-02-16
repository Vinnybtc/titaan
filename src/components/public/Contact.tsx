"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useAnimations";

interface ContactProps {
  heading: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
}

export default function Contact({ heading, subtitle, email, phone, address }: ContactProps) {
  const { ref, inView } = useInView(0.15);
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

  const contactInfo = [
    {
      label: "Email",
      value: email,
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    {
      label: "Telefoon",
      value: phone,
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    },
    {
      label: "Adres",
      value: address,
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ),
    },
  ];

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-green-950 bg-noise overflow-hidden" ref={ref}>
      <div className="section-divider mb-28 md:mb-36" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Info */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-5">CONTACT</p>
            <h2 className="text-3xl md:text-5xl font-light text-white italic mb-6 leading-tight">{heading}</h2>
            <p className="text-white/40 text-sm leading-[1.8] mb-14 max-w-md">{subtitle}</p>

            <div className="space-y-8">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-5 transition-all duration-700 ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0 text-gold/70">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1.5">{item.label}</p>
                    <p className="text-white/80 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {sent ? (
              <div className="h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-20 h-20 border border-gold/30 mx-auto mb-8 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-white font-light mb-3">Bericht verzonden</h3>
                  <p className="text-white/40 text-sm">Wij nemen zo snel mogelijk contact met u op.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase block mb-2.5 font-medium">Voornaam</label>
                    <input
                      type="text"
                      value={formState.firstName}
                      onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                      required
                      placeholder="Jan"
                      className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-3.5 text-sm placeholder:text-white/15 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase block mb-2.5 font-medium">Achternaam</label>
                    <input
                      type="text"
                      value={formState.lastName}
                      onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                      required
                      placeholder="de Vries"
                      className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-3.5 text-sm placeholder:text-white/15 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase block mb-2.5 font-medium">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    placeholder="jan@voorbeeld.nl"
                    className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-3.5 text-sm placeholder:text-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase block mb-2.5 font-medium">Bericht</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Vertel ons over uw project of vraag..."
                    className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-3.5 text-sm placeholder:text-white/15 transition-all duration-300 resize-none"
                  />
                </div>

                {error && <p className="text-red-400/80 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gold text-green-950 text-[11px] tracking-[0.2em] font-semibold py-4.5 hover:bg-gold-light transition-all duration-500 disabled:opacity-50 mt-2"
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

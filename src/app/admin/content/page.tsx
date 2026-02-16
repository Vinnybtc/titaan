"use client";

import { useEffect, useState } from "react";

interface SettingsGroup {
  title: string;
  fields: { key: string; label: string; type: "text" | "textarea" }[];
}

const settingsGroups: SettingsGroup[] = [
  {
    title: "Hero Sectie",
    fields: [
      { key: "hero_heading", label: "Hoofdtitel", type: "text" },
      { key: "hero_subtitle", label: "Ondertitel", type: "textarea" },
      { key: "hero_cta", label: "CTA Knop Tekst", type: "text" },
    ],
  },
  {
    title: "Statistieken",
    fields: [
      { key: "stats_years", label: "Jaren Ervaring (getal)", type: "text" },
      { key: "stats_years_label", label: "Jaren Label", type: "text" },
      { key: "stats_portfolio", label: "Portfolio Waarde (getal)", type: "text" },
      { key: "stats_portfolio_prefix", label: "Portfolio Prefix (b.v. €)", type: "text" },
      { key: "stats_portfolio_suffix", label: "Portfolio Suffix (b.v. M+)", type: "text" },
      { key: "stats_portfolio_label", label: "Portfolio Label", type: "text" },
      { key: "stats_projects", label: "Projecten (getal)", type: "text" },
      { key: "stats_projects_label", label: "Projecten Label", type: "text" },
    ],
  },
  {
    title: "Filosofie Sectie",
    fields: [
      { key: "filosofie_subtitle", label: "Subtitel", type: "text" },
      { key: "filosofie_heading", label: "Hoofdtitel", type: "text" },
      { key: "filosofie_card1_title", label: "Kaart 1 Titel", type: "text" },
      { key: "filosofie_card1_desc", label: "Kaart 1 Beschrijving", type: "textarea" },
      { key: "filosofie_card2_title", label: "Kaart 2 Titel", type: "text" },
      { key: "filosofie_card2_desc", label: "Kaart 2 Beschrijving", type: "textarea" },
    ],
  },
  {
    title: "Portfolio Sectie",
    fields: [
      { key: "portfolio_subtitle", label: "Subtitel", type: "text" },
      { key: "portfolio_heading", label: "Hoofdtitel", type: "text" },
    ],
  },
  {
    title: "Contact Informatie",
    fields: [
      { key: "contact_heading", label: "Hoofdtitel", type: "text" },
      { key: "contact_subtitle", label: "Beschrijving", type: "textarea" },
      { key: "contact_email", label: "Email", type: "text" },
      { key: "contact_phone", label: "Telefoon", type: "text" },
      { key: "contact_address", label: "Adres", type: "text" },
    ],
  },
];

export default function ContentPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return <div className="text-white/30 text-sm">Laden...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl text-white font-light">Content Beheer</h1>
          <p className="text-white/40 text-sm mt-2">
            Bewerk alle teksten op de website
          </p>
        </div>
        <div className="flex items-center gap-4">
          {saved && (
            <span className="text-green-400 text-xs">Opgeslagen!</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold text-green-950 text-xs tracking-[0.15em] font-semibold px-6 py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {saving ? "OPSLAAN..." : "ALLES OPSLAAN"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {settingsGroups.map((group) => (
          <div
            key={group.title}
            className="border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-white text-lg font-light">{group.title}</h2>
            </div>
            <div className="p-6 space-y-5">
              {group.fields.map((field) => (
                <div key={field.key}>
                  <label className="text-white/40 text-xs tracking-[0.15em] uppercase block mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={settings[field.key] || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, [field.key]: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={settings[field.key] || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, [field.key]: e.target.value })
                      }
                      className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 right-0 left-64 bg-green-950/95 backdrop-blur-md border-t border-white/5 p-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-green-950 text-xs tracking-[0.15em] font-semibold px-6 py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {saving ? "OPSLAAN..." : "WIJZIGINGEN OPSLAAN"}
        </button>
      </div>
    </div>
  );
}

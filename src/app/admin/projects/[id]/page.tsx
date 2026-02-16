"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    image: "",
    description: "",
    featured: true,
    sortOrder: 0,
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          category: data.category || "",
          location: data.location || "",
          image: data.image || "",
          description: data.description || "",
          featured: data.featured ?? true,
          sortOrder: data.sortOrder ?? 0,
        });
        setLoading(false);
      });
  }, [id]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setForm({ ...form, image: data.url });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/projects");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="text-white/30 text-sm">Laden...</div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <button
          onClick={() => router.back()}
          className="text-white/30 text-xs hover:text-white/60 transition-colors mb-4 block"
        >
          ← Terug naar projecten
        </button>
        <h1 className="text-3xl text-white font-light">Project Bewerken</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
            Titel
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
              Categorie
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
              Locatie
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
              className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
            Afbeelding
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-white/50 text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-white/10 file:bg-transparent file:text-gold file:text-xs file:cursor-pointer"
            />
            {form.image && (
              <div
                className="w-20 h-14 bg-cover bg-center rounded border border-white/10"
                style={{ backgroundImage: `url('${form.image}')` }}
              />
            )}
          </div>
          <input
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors mt-2"
            placeholder="Afbeelding URL"
          />
        </div>

        <div>
          <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
            Beschrijving
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
              Volgorde
            </label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })
              }
              className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 accent-[#c8a45c]"
              />
              <span className="text-white/60 text-sm">Uitgelicht op homepage</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-green-950 text-xs tracking-[0.15em] font-semibold px-8 py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {saving ? "OPSLAAN..." : "WIJZIGINGEN OPSLAAN"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-white/10 text-white/50 text-xs tracking-[0.15em] px-8 py-3 hover:border-white/30 transition-colors"
          >
            ANNULEREN
          </button>
        </div>
      </form>
    </div>
  );
}

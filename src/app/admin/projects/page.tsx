"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  featured: boolean;
  sortOrder: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit project wilt verwijderen?")) return;

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl text-white font-light">Projecten</h1>
          <p className="text-white/40 text-sm mt-2">
            Beheer je portfolio projecten
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-gold text-green-950 text-xs tracking-[0.15em] font-semibold px-6 py-3 hover:bg-gold-light transition-colors"
        >
          + NIEUW PROJECT
        </Link>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-white/40 text-xs tracking-wider uppercase p-4 px-6">
                Project
              </th>
              <th className="text-left text-white/40 text-xs tracking-wider uppercase p-4">
                Categorie
              </th>
              <th className="text-left text-white/40 text-xs tracking-wider uppercase p-4">
                Locatie
              </th>
              <th className="text-left text-white/40 text-xs tracking-wider uppercase p-4">
                Uitgelicht
              </th>
              <th className="text-right text-white/40 text-xs tracking-wider uppercase p-4 px-6">
                Acties
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30 text-sm">
                  Laden...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30 text-sm">
                  Nog geen projecten
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded bg-cover bg-center bg-green-800"
                        style={{
                          backgroundImage: `url('${project.image}')`,
                        }}
                      />
                      <span className="text-white text-sm">{project.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gold/70 text-xs tracking-wider">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{project.location}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.featured
                          ? "bg-gold/10 text-gold"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {project.featured ? "Ja" : "Nee"}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-gold/70 text-xs hover:text-gold transition-colors mr-4"
                    >
                      Bewerken
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-400/70 text-xs hover:text-red-400 transition-colors"
                    >
                      Verwijderen
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Ongeldige inloggegevens");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 border-2 border-gold rotate-45 mx-auto mb-6 flex items-center justify-center">
            <div className="w-4 h-4 bg-gold" />
          </div>
          <h1 className="text-white text-sm tracking-[0.3em]">
            TITAAN <span className="text-gold">DEVELOPMENT</span>
          </h1>
          <p className="text-white/40 text-xs mt-2 tracking-wider">
            ADMIN DASHBOARD
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
              placeholder="admin@titaan.nl"
            />
          </div>

          <div>
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-2">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm focus:border-gold/50 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-green-950 text-xs tracking-[0.2em] font-semibold py-4 hover:bg-gold-light transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "INLOGGEN..." : "INLOGGEN"}
          </button>
        </form>

        <p className="text-white/20 text-xs text-center mt-8">
          Standaard: admin@titaan.nl / admin123
        </p>
      </div>
    </div>
  );
}

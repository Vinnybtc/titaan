import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projectCount, messageCount, unreadCount] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl text-white font-light">Dashboard</h1>
        <p className="text-white/40 text-sm mt-2">
          Welkom terug bij het TITAAN admin paneel
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-white/10 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs tracking-wider uppercase">
                Projecten
              </p>
              <p className="text-3xl text-white font-light mt-2">{projectCount}</p>
            </div>
            <div className="w-12 h-12 border border-gold/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <Link href="/admin/projects" className="text-gold text-xs mt-4 block hover:text-gold-light transition-colors">
            Beheer projecten →
          </Link>
        </div>

        <div className="border border-white/10 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs tracking-wider uppercase">
                Berichten
              </p>
              <p className="text-3xl text-white font-light mt-2">{messageCount}</p>
            </div>
            <div className="w-12 h-12 border border-gold/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <Link href="/admin/messages" className="text-gold text-xs mt-4 block hover:text-gold-light transition-colors">
            Bekijk berichten →
          </Link>
        </div>

        <div className="border border-white/10 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs tracking-wider uppercase">
                Ongelezen
              </p>
              <p className="text-3xl text-white font-light mt-2">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 border border-gold/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent messages */}
      <div className="border border-white/10 rounded-lg">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white text-lg font-light">Recente Berichten</h2>
          <Link href="/admin/messages" className="text-gold text-xs hover:text-gold-light transition-colors">
            Bekijk alle →
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {recentMessages.length === 0 ? (
            <div className="p-6 text-white/30 text-sm text-center">
              Nog geen berichten ontvangen
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className="p-4 px-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  {!msg.read && (
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-white text-sm">
                      {msg.firstName} {msg.lastName}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">
                      {msg.email}
                    </p>
                  </div>
                </div>
                <p className="text-white/20 text-xs">
                  {new Date(msg.createdAt).toLocaleDateString("nl-NL")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

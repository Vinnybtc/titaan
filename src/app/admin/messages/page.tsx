"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  async function markRead(msg: Message) {
    if (!msg.read) {
      await fetch(`/api/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages(
        messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
    setSelected(msg);
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit bericht wilt verwijderen?")) return;

    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl text-white font-light">Berichten</h1>
        <p className="text-white/40 text-sm mt-2">
          Contact formulier inzendingen
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message list */}
        <div className="lg:col-span-1 border border-white/10 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/[0.01]">
            <p className="text-white/40 text-xs tracking-wider">
              {messages.length} berichten
            </p>
          </div>
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="p-6 text-white/30 text-sm text-center">
                Laden...
              </div>
            ) : messages.length === 0 ? (
              <div className="p-6 text-white/30 text-sm text-center">
                Nog geen berichten
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => markRead(msg)}
                  className={`w-full text-left p-4 hover:bg-white/[0.02] transition-colors ${
                    selected?.id === msg.id ? "bg-white/[0.03]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.read && (
                      <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        msg.read ? "text-white/60" : "text-white"
                      }`}
                    >
                      {msg.firstName} {msg.lastName}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs truncate">{msg.message}</p>
                  <p className="text-white/20 text-[10px] mt-1">
                    {new Date(msg.createdAt).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message detail */}
        <div className="lg:col-span-2 border border-white/10 rounded-lg overflow-hidden">
          {selected ? (
            <div>
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-white text-lg font-light">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <p className="text-white/40 text-xs mt-1">{selected.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="text-red-400/70 text-xs hover:text-red-400 transition-colors border border-red-400/20 px-4 py-2 hover:border-red-400/40"
                >
                  Verwijderen
                </button>
              </div>
              <div className="p-6">
                <p className="text-white/20 text-xs mb-4">
                  {new Date(selected.createdAt).toLocaleDateString("nl-NL", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-white/20 text-sm">
              Selecteer een bericht om te lezen
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

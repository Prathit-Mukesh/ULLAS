"use client";

import { Film } from "lucide-react";

interface FooterProps {
  setPage: (page: string) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const links = [
    { label: "Home", key: "home" },
    { label: "Collections", key: "collections" },
    { label: "Predictions", key: "predictions" },
    { label: "Trends", key: "trends" },
  ];

  return (
    <footer
      className="atlas-container py-10 mt-10 text-center"
      style={{ borderTop: "1px solid var(--atlas-border)" }}
    >
      <button
        onClick={() => setPage("home")}
        className="inline-flex items-center gap-2.5 mx-auto"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, var(--atlas-gold), var(--atlas-gold-dark))",
          }}
        >
          <Film size={16} style={{ color: "var(--atlas-bg)" }} />
        </div>
        <span
          className="font-display text-xl tracking-widest"
          style={{ color: "var(--atlas-text)" }}
        >
          Box Office Atlas
        </span>
      </button>

      <p
        className="text-sm mt-3 max-w-md mx-auto"
        style={{ color: "var(--atlas-text-dim)" }}
      >
        The most comprehensive movie analytics platform. Track, analyze, and
        predict box office performance across India and the world.
      </p>

      <div className="flex gap-6 justify-center mt-5 flex-wrap">
        {links.map((l) => (
          <button
            key={l.key}
            onClick={() => setPage(l.key)}
            className="text-[13px] transition-colors duration-200 hover:text-[var(--atlas-gold)]"
            style={{
              color: "var(--atlas-text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {l.label}
          </button>
        ))}
        <span
          className="text-[13px]"
          style={{ color: "var(--atlas-text-muted)" }}
        >
          About
        </span>
        <span
          className="text-[13px]"
          style={{ color: "var(--atlas-text-muted)" }}
        >
          API
        </span>
      </div>

      <p
        className="text-[11px] mt-6"
        style={{ color: "var(--atlas-text-dim)" }}
      >
        © 2026 Box Office Atlas. All data for demonstration purposes.
      </p>
    </footer>
  );
}

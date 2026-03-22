"use client";

import { useState } from "react";
import {
  Film, Home, BarChart3, Zap, Activity, Menu, X,
} from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "collections", label: "Collections", icon: BarChart3 },
  { key: "predictions", label: "Predictions", icon: Zap },
  { key: "trends", label: "Trends", icon: Activity },
];

export default function Navbar({ currentPage, setPage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (key: string) => {
    setPage(key);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-4 sm:px-6"
        style={{
          background: "rgba(10, 14, 26, 0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--atlas-border)",
        }}
      >
        {/* Brand */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2.5 group"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--atlas-gold), var(--atlas-gold-dark))",
            }}
          >
            <Film size={16} style={{ color: "var(--atlas-bg)" }} />
          </div>
          <span
            className="font-display text-xl tracking-widest hidden sm:block"
            style={{ color: "var(--atlas-text)" }}
          >
            Box Office Atlas
          </span>
          <span
            className="font-display text-lg tracking-widest sm:hidden"
            style={{ color: "var(--atlas-text)" }}
          >
            BOA
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPage === item.key ||
              (item.key === "collections" && currentPage === "detail");
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
                style={{
                  background: isActive
                    ? "rgba(212, 168, 67, 0.1)"
                    : "transparent",
                  color: isActive
                    ? "var(--atlas-gold)"
                    : "var(--atlas-text-muted)",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--atlas-text)";
                    e.currentTarget.style.background = "var(--atlas-surface)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--atlas-text-muted)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
          style={{
            background: "none",
            border: "1px solid var(--atlas-border)",
            color: "var(--atlas-text-muted)",
            cursor: "pointer",
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed top-[60px] inset-x-0 bottom-0 z-40 p-6 flex flex-col gap-2 animate-fade-in md:hidden"
          style={{
            background: "rgba(10, 14, 26, 0.96)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-200"
                style={{
                  background: isActive
                    ? "rgba(212, 168, 67, 0.1)"
                    : "transparent",
                  color: isActive
                    ? "var(--atlas-gold)"
                    : "var(--atlas-text-muted)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

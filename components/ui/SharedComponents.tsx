"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  Film, Sparkles, Layers, Star,
} from "lucide-react";
import { Movie, formatCr, calcROI, getVerdictColor } from "@/data/movies";

// ── Animated Number ──
export function AnimNum({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const end = Number(value) || 0;
    const duration = 800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Stat Card ──
export function StatCard({
  icon,
  label,
  value,
  sub,
  color = "var(--atlas-gold)",
  delay = 0,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sub?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <div
      className="atlas-card-static animate-fade-in-up"
      style={{
        borderLeft: `3px solid ${color}`,
        animationDelay: `${delay}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color, opacity: 0.8 }}>{icon}</span>
        <span className="atlas-label">{label}</span>
      </div>
      <div
        className="text-2xl font-bold font-display tracking-wide"
        style={{ color: "var(--atlas-text)" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] mt-1"
          style={{ color: "var(--atlas-text-dim)" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// ── Verdict Badge ──
export function VerdictBadge({
  verdict,
  size = "sm",
}: {
  verdict: string;
  size?: "sm" | "lg";
}) {
  const c = getVerdictColor(verdict);
  return (
    <span
      className="atlas-badge"
      style={{
        background: `${c}18`,
        color: c,
        border: `1px solid ${c}40`,
        padding: size === "lg" ? "6px 16px" : "3px 10px",
        fontSize: size === "lg" ? 14 : 11,
      }}
    >
      {verdict === "All Time Blockbuster" && <Sparkles size={12} />}
      {verdict}
    </span>
  );
}

// ── Movie Card ──
export function MovieCard({
  movie,
  onClick,
  idx = 0,
  onCompare,
  isCompared = false,
}: {
  movie: Movie;
  onClick: () => void;
  idx?: number;
  onCompare?: () => void;
  isCompared?: boolean;
}) {
  const roi = calcROI(movie);

  return (
    <div
      className="atlas-card cursor-pointer animate-fade-in-up relative"
      onClick={onClick}
      style={{
        animationDelay: `${idx * 50}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flex gap-4 items-start">
        {/* Poster placeholder */}
        <div
          className="w-[60px] h-[80px] rounded-lg flex-shrink-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, var(--atlas-surface-light), var(--atlas-surface))`,
            border: "1px solid var(--atlas-border-light)",
          }}
        >
          <Film size={22} style={{ color: "var(--atlas-gold)" }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="text-base font-bold font-display tracking-wide"
              style={{ color: "var(--atlas-text)" }}
            >
              {movie.name}
            </h3>
            <VerdictBadge verdict={movie.verdict} />
          </div>

          <div className="flex gap-3 mt-1.5 flex-wrap">
            <span className="text-xs" style={{ color: "var(--atlas-text-muted)" }}>
              {movie.year}
            </span>
            <span className="text-xs" style={{ color: "var(--atlas-text-dim)" }}>•</span>
            <span className="text-xs" style={{ color: "var(--atlas-cyan)" }}>
              {movie.industry}
            </span>
            <span className="text-xs" style={{ color: "var(--atlas-text-dim)" }}>•</span>
            <span className="text-xs" style={{ color: "var(--atlas-text-muted)" }}>
              {movie.genre}
            </span>
            <span className="text-xs" style={{ color: "var(--atlas-text-dim)" }}>•</span>
            <span className="text-xs" style={{ color: "var(--atlas-text-muted)" }}>
              {movie.language}
            </span>
          </div>

          <div className="flex gap-4 mt-2.5 flex-wrap">
            <div className="text-xs">
              <span style={{ color: "var(--atlas-text-dim)" }}>Worldwide </span>
              <span
                className="font-bold"
                style={{ color: "var(--atlas-gold)" }}
              >
                {formatCr(movie.worldwideGross)}
              </span>
            </div>
            <div className="text-xs">
              <span style={{ color: "var(--atlas-text-dim)" }}>Budget </span>
              <span style={{ color: "var(--atlas-text-muted)" }}>
                {formatCr(movie.totalCost)}
              </span>
            </div>
            <div className="text-xs">
              <span style={{ color: "var(--atlas-text-dim)" }}>ROI </span>
              <span
                className="font-bold"
                style={{
                  color: roi > 0 ? "var(--atlas-emerald)" : "var(--atlas-magenta)",
                }}
              >
                {roi}%
              </span>
            </div>
            <div className="text-xs">
              <span style={{ color: "var(--atlas-text-dim)" }}>IMDb </span>
              <span className="font-semibold" style={{ color: "#F59E0B" }}>
                ★ {movie.imdbRating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compare button */}
      {onCompare && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompare();
          }}
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] transition-all duration-200"
          style={{
            background: isCompared ? "var(--atlas-cyan)" : "var(--atlas-surface)",
            color: isCompared ? "var(--atlas-bg)" : "var(--atlas-text-muted)",
            border: `1px solid ${isCompared ? "var(--atlas-cyan)" : "var(--atlas-border-light)"}`,
            cursor: "pointer",
          }}
        >
          <Layers size={11} /> {isCompared ? "Added" : "Compare"}
        </button>
      )}
    </div>
  );
}

// ── Custom Chart Tooltip ──
export function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3.5 py-2.5"
      style={{
        background: "var(--atlas-card)",
        border: "1px solid var(--atlas-border-light)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <p
        className="text-[13px] font-semibold mb-1"
        style={{ color: "var(--atlas-text)" }}
      >
        {label}
      </p>
      {payload.map((p, i) => (
        <p
          key={i}
          className="text-xs"
          style={{ color: p.color, margin: "2px 0" }}
        >
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

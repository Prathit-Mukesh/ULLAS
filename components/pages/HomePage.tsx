"use client";

import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Cell,
} from "recharts";
import {
  Film, BarChart3, Zap, DollarSign, TrendingUp, Star,
  Activity, MapPin, Globe, Target, Sparkles, Award,
} from "lucide-react";
import { MOVIES, formatCr, calcROI, CHART_COLORS } from "@/data/movies";
import { StatCard, AnimNum, VerdictBadge, ChartTooltip } from "@/components/ui/SharedComponents";

export default function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const topMovies = useMemo(
    () => [...MOVIES].sort((a, b) => b.worldwideGross - a.worldwideGross).slice(0, 6),
    []
  );
  const totalCollection = MOVIES.reduce((s, m) => s + m.worldwideGross, 0);
  const avgROI = Math.round(
    MOVIES.reduce((s, m) => s + calcROI(m), 0) / MOVIES.length
  );
  const avgIMDb = (
    MOVIES.reduce((s, m) => s + m.imdbRating, 0) / MOVIES.length
  ).toFixed(1);

  const yearData = useMemo(() => {
    const acc: Record<number, { year: number; total: number; count: number }> = {};
    MOVIES.forEach((m) => {
      acc[m.year] = acc[m.year] || { year: m.year, total: 0, count: 0 };
      acc[m.year].total += m.worldwideGross;
      acc[m.year].count += 1;
    });
    return Object.values(acc).sort((a, b) => a.year - b.year);
  }, []);

  return (
    <div>
      {/* ── HERO SECTION ── */}
      <div className="atlas-container relative py-16 sm:py-24 overflow-hidden">
        <div className="atlas-grid-bg absolute inset-0 opacity-30" />
        <div className="relative z-10 animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(212, 168, 67, 0.08)",
              border: "1px solid rgba(212, 168, 67, 0.2)",
            }}
          >
            <Activity size={14} style={{ color: "var(--atlas-gold)" }} />
            <span className="text-[13px] font-medium" style={{ color: "var(--atlas-gold)" }}>
              Live Analytics Engine
            </span>
          </div>

          <h1 className="font-display tracking-wider leading-none mb-5"
            style={{ fontSize: "clamp(36px, 7vw, 76px)" }}>
            <span style={{ color: "var(--atlas-text)" }}>Track the Past.</span>
            <br />
            <span className="atlas-title-gradient">Predict the Future</span>
            <br />
            <span style={{ color: "var(--atlas-text)" }}>of Box Office.</span>
          </h1>

          <p className="max-w-xl mb-8 leading-relaxed"
            style={{ color: "var(--atlas-text-muted)", fontSize: "clamp(14px, 2vw, 18px)" }}>
            The most comprehensive movie analytics platform. Historical data,
            advanced predictions, and deep insights across India and the world.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="atlas-btn-primary" onClick={() => setPage("collections")}>
              <BarChart3 size={18} /> Explore Collections
            </button>
            <button className="atlas-btn-secondary" onClick={() => setPage("predictions")}>
              <Zap size={18} /> Predict Box Office
            </button>
          </div>
        </div>
      </div>

      {/* ── QUICK STATS ── */}
      <div className="atlas-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Film size={18} />} label="Movies Tracked"
            value={<AnimNum value={MOVIES.length} />}
            sub="Across India & World" color="var(--atlas-gold)" delay={0} />
          <StatCard icon={<DollarSign size={18} />} label="Total Collection"
            value={formatCr(totalCollection)}
            sub="Combined worldwide" color="var(--atlas-cyan)" delay={100} />
          <StatCard icon={<TrendingUp size={18} />} label="Average ROI"
            value={<AnimNum value={avgROI} suffix="%" />}
            sub="Across all films" color="var(--atlas-emerald)" delay={200} />
          <StatCard icon={<Star size={18} />} label="Avg IMDb"
            value={avgIMDb}
            sub="Mean rating" color="#F59E0B" delay={300} />
        </div>
      </div>

      {/* ── MAIN PANELS ── */}
      <div className="atlas-container atlas-section">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Collections Panel */}
          <div
            className="atlas-card cursor-pointer group"
            onClick={() => setPage("collections")}
            style={{ padding: 32 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(212, 168, 67, 0.1)" }}
            >
              <BarChart3 size={32} style={{ color: "var(--atlas-gold)" }} />
            </div>
            <h2 className="font-display text-2xl tracking-wide mb-2"
              style={{ color: "var(--atlas-text)" }}>
              Box Office Collections
            </h2>
            <p className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--atlas-text-muted)" }}>
              Browse, filter, sort, and compare historical movie performance
              across India and the world.
            </p>
            <div className="flex gap-3">
              <span className="atlas-badge" style={{ background: "rgba(255,140,66,0.12)", color: "var(--atlas-orange)" }}>
                <MapPin size={12} /> India
              </span>
              <span className="atlas-badge" style={{ background: "rgba(0,212,255,0.12)", color: "var(--atlas-cyan)" }}>
                <Globe size={12} /> Rest of World
              </span>
            </div>
          </div>

          {/* Predictions Panel */}
          <div
            className="atlas-card cursor-pointer group"
            onClick={() => setPage("predictions")}
            style={{ padding: 32 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(0, 212, 255, 0.1)" }}
            >
              <Zap size={32} style={{ color: "var(--atlas-cyan)" }} />
            </div>
            <h2 className="font-display text-2xl tracking-wide mb-2"
              style={{ color: "var(--atlas-text)" }}>
              Box Office Predictions
            </h2>
            <p className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--atlas-text-muted)" }}>
              Predict future box office outcomes using advanced multi-factor
              analysis and AI modeling.
            </p>
            <div className="flex gap-3">
              <span className="atlas-badge" style={{ background: "rgba(139,92,246,0.12)", color: "var(--atlas-purple)" }}>
                <Target size={12} /> Forecast
              </span>
              <span className="atlas-badge" style={{ background: "rgba(0,204,136,0.12)", color: "var(--atlas-emerald)" }}>
                <Sparkles size={12} /> AI-Powered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOP BOX OFFICE CHART ── */}
      <div className="atlas-container atlas-section">
        <h2 className="font-display text-xl tracking-wide mb-5 flex items-center gap-2.5"
          style={{ color: "var(--atlas-text)" }}>
          <Award size={20} style={{ color: "var(--atlas-gold)" }} />
          Top Box Office Performers
        </h2>
        <div className="atlas-chart">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={topMovies} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
              <XAxis type="number" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={140}
                tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="worldwideGross" name="Worldwide (₹Cr)" radius={[0, 6, 6, 0]}>
                {topMovies.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── YEAR-WISE TREND ── */}
      <div className="atlas-container atlas-section">
        <h2 className="font-display text-xl tracking-wide mb-5 flex items-center gap-2.5"
          style={{ color: "var(--atlas-text)" }}>
          <TrendingUp size={20} style={{ color: "var(--atlas-cyan)" }} />
          Year-wise Box Office Trends
        </h2>
        <div className="atlas-chart">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={yearData} margin={{ left: 10, right: 10 }}>
              <defs>
                <linearGradient id="areaGradHome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--atlas-cyan)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--atlas-cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
              <XAxis dataKey="year" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="total" name="Total Collection (₹Cr)"
                stroke="var(--atlas-cyan)" fill="url(#areaGradHome)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── FEATURED CAROUSEL ── */}
      <div className="atlas-container atlas-section">
        <h2 className="font-display text-xl tracking-wide mb-5 flex items-center gap-2.5"
          style={{ color: "var(--atlas-text)" }}>
          <Sparkles size={20} style={{ color: "var(--atlas-magenta)" }} />
          Featured Movies
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4">
          {MOVIES.slice(0, 10).map((m, i) => (
            <div
              key={m.id}
              className="min-w-[200px] max-w-[220px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              onClick={() => setPage("detail:" + m.id)}
              style={{
                background: "var(--atlas-card)",
                border: "1px solid var(--atlas-border)",
                animationDelay: `${i * 70}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div
                className="w-full h-28 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${CHART_COLORS[i % 8]}20, var(--atlas-surface))`,
                }}
              >
                <Film size={32} style={{ color: CHART_COLORS[i % 8], opacity: 0.5 }} />
              </div>
              <div className="p-3.5">
                <h4 className="text-sm font-bold font-display" style={{ color: "var(--atlas-text)" }}>
                  {m.name}
                </h4>
                <p className="text-[11px] mt-1" style={{ color: "var(--atlas-text-muted)" }}>
                  {m.year} • {m.industry}
                </p>
                <p className="text-[13px] font-bold mt-2" style={{ color: "var(--atlas-gold)" }}>
                  {formatCr(m.worldwideGross)}
                </p>
                <div className="mt-1.5">
                  <VerdictBadge verdict={m.verdict} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

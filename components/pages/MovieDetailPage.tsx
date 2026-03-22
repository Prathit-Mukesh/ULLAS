"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell,
} from "recharts";
import {
  Film, DollarSign, TrendingUp, Zap, Target, MapPin, Globe,
  Calendar, Clock, Shield, ChevronLeft, Users, Clapperboard,
  Music, Video, Hash, Tag, Sparkles,
} from "lucide-react";
import {
  MOVIES, formatCr, calcROI, calcMultiplier,
  getDomesticShare, getOverseasShare, CHART_COLORS, Movie,
} from "@/data/movies";
import { StatCard, VerdictBadge, ChartTooltip } from "@/components/ui/SharedComponents";

export default function MovieDetailPage({
  movieId,
  setPage,
}: {
  movieId: number;
  setPage: (p: string) => void;
}) {
  const movie = MOVIES.find((m) => m.id === movieId);
  if (!movie) {
    return (
      <div className="atlas-container text-center py-20" style={{ color: "var(--atlas-text-muted)" }}>
        <p>Movie not found</p>
      </div>
    );
  }

  const roi = calcROI(movie);
  const mult = calcMultiplier(movie);
  const domShare = getDomesticShare(movie);
  const osShare = getOverseasShare(movie);

  const collectionFlow = [
    { stage: "Opening Day", value: movie.openingDay },
    { stage: "Opening Wknd", value: movie.openingWeekend },
    { stage: "Week 1", value: movie.week1 },
    { stage: "India LT", value: movie.lifetimeDomestic },
    { stage: "Worldwide", value: movie.worldwideGross },
  ];

  const splitData = [
    { name: "India", value: movie.indiaGross },
    { name: "Overseas", value: movie.overseasGross },
  ];

  const costData = [
    { name: "Production", value: movie.productionCost },
    { name: "Marketing", value: movie.marketingCost },
  ];

  const similar = MOVIES.filter(
    (m) =>
      m.id !== movie.id &&
      (m.genre === movie.genre || m.industry === movie.industry)
  ).slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="px-4 sm:px-6 py-10"
        style={{
          background: "linear-gradient(135deg, var(--atlas-card), var(--atlas-bg))",
          borderBottom: "1px solid var(--atlas-border)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setPage("collections")}
            className="flex items-center gap-1 text-sm mb-5"
            style={{ background: "none", border: "none", color: "var(--atlas-text-muted)", cursor: "pointer" }}
          >
            <ChevronLeft size={18} /> Back to Collections
          </button>

          <div className="flex gap-6 flex-wrap items-start">
            <div
              className="w-[120px] h-[160px] rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--atlas-surface-light), var(--atlas-surface))",
                border: "1px solid var(--atlas-border-light)",
              }}
            >
              <Film size={48} style={{ color: "var(--atlas-gold)", opacity: 0.4 }} />
            </div>

            <div className="flex-1">
              <h1
                className="font-display tracking-wide mb-2"
                style={{ color: "var(--atlas-text)", fontSize: "clamp(24px, 4vw, 42px)" }}
              >
                {movie.name}
              </h1>
              {movie.originalTitle !== movie.name && (
                <p className="text-sm mb-3" style={{ color: "var(--atlas-text-muted)" }}>
                  Original: {movie.originalTitle}
                </p>
              )}

              <div className="flex gap-2.5 flex-wrap mb-3">
                <VerdictBadge verdict={movie.verdict} size="lg" />
                <span
                  className="px-3 py-1 rounded-full text-[13px]"
                  style={{ background: "var(--atlas-surface)", color: "#F59E0B" }}
                >
                  ★ {movie.imdbRating} IMDb
                </span>
                {movie.rtScore && (
                  <span
                    className="px-3 py-1 rounded-full text-[13px]"
                    style={{ background: "var(--atlas-surface)", color: "var(--atlas-emerald)" }}
                  >
                    🍅 {movie.rtScore}%
                  </span>
                )}
              </div>

              <div className="flex gap-4 flex-wrap text-[13px]" style={{ color: "var(--atlas-text-muted)" }}>
                <span><Calendar size={13} className="inline mr-1" />{movie.releaseDate}</span>
                <span><Clock size={13} className="inline mr-1" />{movie.runtime} min</span>
                <span><Film size={13} className="inline mr-1" />{movie.industry}</span>
                <span><Globe size={13} className="inline mr-1" />{movie.language}</span>
                <span><Shield size={13} className="inline mr-1" />{movie.certification}</span>
              </div>

              <p className="text-sm mt-3 max-w-2xl leading-relaxed" style={{ color: "var(--atlas-text-muted)" }}>
                {movie.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="atlas-container atlas-section">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard icon={<DollarSign size={16} />} label="Worldwide" value={formatCr(movie.worldwideGross)} color="var(--atlas-gold)" />
          <StatCard icon={<TrendingUp size={16} />} label="ROI" value={`${roi}%`} color={roi > 0 ? "var(--atlas-emerald)" : "var(--atlas-magenta)"} />
          <StatCard icon={<Zap size={16} />} label="Opening Day" value={formatCr(movie.openingDay)} color="var(--atlas-cyan)" />
          <StatCard icon={<Target size={16} />} label="Multiplier" value={`${mult}x`} color="var(--atlas-purple)" />
          <StatCard icon={<MapPin size={16} />} label="India Gross" value={formatCr(movie.indiaGross)} sub={`${domShare}% share`} color="var(--atlas-orange)" />
          <StatCard icon={<Globe size={16} />} label="Overseas" value={formatCr(movie.overseasGross)} sub={`${osShare}% share`} color="var(--atlas-cyan)" />
        </div>

        {/* Collection Flow */}
        <div className="mt-8">
          <h3 className="font-display text-lg tracking-wide mb-4" style={{ color: "var(--atlas-text)" }}>
            Collection Progression
          </h3>
          <div className="atlas-chart">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={collectionFlow}>
                <defs>
                  <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--atlas-gold)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--atlas-gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
                <XAxis dataKey="stage" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="value" name="Collection (₹Cr)"
                  stroke="var(--atlas-gold)" fill="url(#flowGrad)" strokeWidth={2.5}
                  dot={{ fill: "var(--atlas-gold)", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Split Charts */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-display text-lg tracking-wide mb-4" style={{ color: "var(--atlas-text)" }}>
              India vs Overseas Split
            </h3>
            <div className="atlas-chart">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={splitData} cx="50%" cy="50%" outerRadius={85} innerRadius={50} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    <Cell fill="var(--atlas-orange)" />
                    <Cell fill="var(--atlas-cyan)" />
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg tracking-wide mb-4" style={{ color: "var(--atlas-text)" }}>
              Cost Breakdown
            </h3>
            <div className="atlas-chart">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={costData} cx="50%" cy="50%" outerRadius={85} innerRadius={50} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    <Cell fill="var(--atlas-magenta)" />
                    <Cell fill="var(--atlas-purple)" />
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cast & Crew */}
        <div className="mt-8">
          <h3 className="font-display text-lg tracking-wide mb-4" style={{ color: "var(--atlas-text)" }}>
            Cast & Crew
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: "Lead Cast", value: movie.leadActors, icon: <Users size={14} /> },
              { label: "Supporting", value: movie.supportingActors, icon: <Users size={14} /> },
              { label: "Director", value: movie.director, icon: <Clapperboard size={14} /> },
              { label: "Producer", value: movie.producer, icon: <DollarSign size={14} /> },
              { label: "Writer", value: movie.writer, icon: <Hash size={14} /> },
              { label: "Music", value: movie.musicComposer, icon: <Music size={14} /> },
              { label: "Cinematography", value: movie.cinematographer, icon: <Video size={14} /> },
              { label: "Production", value: movie.productionHouse, icon: <Film size={14} /> },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-xl p-3.5"
                style={{
                  background: "var(--atlas-surface)",
                  border: "1px solid var(--atlas-border)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span style={{ color: "var(--atlas-gold)" }}>{c.icon}</span>
                  <span className="atlas-label">{c.label}</span>
                </div>
                <div className="text-sm font-medium" style={{ color: "var(--atlas-text)" }}>
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex gap-2 flex-wrap">
          {movie.tags.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                color: "var(--atlas-cyan)",
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              <Tag size={11} className="inline mr-1" />{t}
            </span>
          ))}
          {movie.franchise && (
            <span className="px-3 py-1 rounded-full text-xs"
              style={{ color: "var(--atlas-purple)", background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
              Franchise: {movie.franchise}
            </span>
          )}
          {movie.sequel && (
            <span className="px-3 py-1 rounded-full text-xs"
              style={{ color: "var(--atlas-orange)", background: "rgba(255,140,66,0.07)", border: "1px solid rgba(255,140,66,0.15)" }}>
              Sequel
            </span>
          )}
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-lg tracking-wide mb-4" style={{ color: "var(--atlas-text)" }}>
              Similar Movies
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {similar.map((m) => (
                <div
                  key={m.id}
                  className="atlas-card cursor-pointer"
                  onClick={() => setPage("detail:" + m.id)}
                >
                  <h4 className="text-sm font-bold" style={{ color: "var(--atlas-text)" }}>{m.name}</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--atlas-text-muted)" }}>
                    {m.year} • {m.genre}
                  </p>
                  <p className="text-[13px] font-bold mt-2" style={{ color: "var(--atlas-gold)" }}>
                    {formatCr(m.worldwideGross)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend, ComposedChart,
} from "recharts";
import {
  Activity, Film, Users, Clapperboard, Music,
} from "lucide-react";
import { MOVIES, calcROI, formatCr, CHART_COLORS } from "@/data/movies";
import { ChartTooltip } from "@/components/ui/SharedComponents";

export default function TrendsPage() {
  const directorData = useMemo(() => {
    const d: Record<string, { director: string; movies: number; totalGross: number; rois: number[] }> = {};
    MOVIES.forEach((m) => {
      d[m.director] = d[m.director] || { director: m.director, movies: 0, totalGross: 0, rois: [] };
      d[m.director].movies += 1;
      d[m.director].totalGross += m.worldwideGross;
      d[m.director].rois.push(calcROI(m));
    });
    return Object.values(d)
      .map((x) => ({
        ...x,
        avgROI: Math.round(x.rois.reduce((a, b) => a + b, 0) / x.rois.length),
        avgGross: Math.round(x.totalGross / x.movies),
      }))
      .sort((a, b) => b.avgGross - a.avgGross);
  }, []);

  const actorData = useMemo(() => {
    const a: Record<string, { actor: string; movies: number; totalGross: number; hits: number }> = {};
    MOVIES.forEach((m) => {
      m.leadActors.split(", ").forEach((actor) => {
        a[actor] = a[actor] || { actor, movies: 0, totalGross: 0, hits: 0 };
        a[actor].movies += 1;
        a[actor].totalGross += m.worldwideGross;
        if (["All Time Blockbuster", "Blockbuster", "Super Hit", "Hit"].includes(m.verdict)) {
          a[actor].hits += 1;
        }
      });
    });
    return Object.values(a)
      .map((x) => ({
        ...x,
        avgGross: Math.round(x.totalGross / x.movies),
        hitRate: Math.round((x.hits / x.movies) * 100),
      }))
      .sort((a, b) => b.totalGross - a.totalGross)
      .slice(0, 12);
  }, []);

  const composerData = useMemo(() => {
    const c: Record<string, { composer: string; movies: number; totalGross: number }> = {};
    MOVIES.forEach((m) => {
      c[m.musicComposer] = c[m.musicComposer] || { composer: m.musicComposer, movies: 0, totalGross: 0 };
      c[m.musicComposer].movies += 1;
      c[m.musicComposer].totalGross += m.worldwideGross;
    });
    return Object.values(c)
      .map((x) => ({ ...x, avgGross: Math.round(x.totalGross / x.movies) }))
      .sort((a, b) => b.totalGross - a.totalGross);
  }, []);

  const industryData = useMemo(() => {
    const ind: Record<string, { industry: string; movies: number; totalGross: number }> = {};
    MOVIES.forEach((m) => {
      ind[m.industry] = ind[m.industry] || { industry: m.industry, movies: 0, totalGross: 0 };
      ind[m.industry].movies += 1;
      ind[m.industry].totalGross += m.worldwideGross;
    });
    return Object.values(ind)
      .map((x) => ({ ...x, avgGross: Math.round(x.totalGross / x.movies) }))
      .sort((a, b) => b.totalGross - a.totalGross);
  }, []);

  return (
    <div className="atlas-container pt-6">
      <h1
        className="font-display text-2xl sm:text-3xl tracking-wide flex items-center gap-2.5 mb-8"
        style={{ color: "var(--atlas-text)" }}
      >
        <Activity size={24} style={{ color: "var(--atlas-purple)" }} />
        Trends & Analytics
      </h1>

      {/* Industry Performance */}
      <section className="mb-10">
        <h2
          className="font-display text-lg tracking-wide mb-4 flex items-center gap-2"
          style={{ color: "var(--atlas-text)" }}
        >
          <Film size={18} style={{ color: "var(--atlas-gold)" }} />
          Industry-wise Performance
        </h2>
        <div className="atlas-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
              <XAxis dataKey="industry" tick={{ fill: "var(--atlas-text-muted)", fontSize: 10 }} />
              <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="avgGross" name="Avg Gross (₹Cr)" radius={[6, 6, 0, 0]}>
                {industryData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % 8]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Top Actors */}
      <section className="mb-10">
        <h2
          className="font-display text-lg tracking-wide mb-4 flex items-center gap-2"
          style={{ color: "var(--atlas-text)" }}
        >
          <Users size={18} style={{ color: "var(--atlas-cyan)" }} />
          Top Actors by Box Office
        </h2>
        <div className="atlas-chart">
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={actorData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
              <XAxis type="number" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <YAxis type="category" dataKey="actor" width={140}
                tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="totalGross" name="Total Gross (₹Cr)" barSize={14} radius={[0, 6, 6, 0]}>
                {actorData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % 8]} />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {actorData.slice(0, 6).map((a, i) => (
            <div
              key={i}
              className="rounded-xl p-3.5"
              style={{
                background: "var(--atlas-surface)",
                border: "1px solid var(--atlas-border)",
              }}
            >
              <div className="text-sm font-bold" style={{ color: "var(--atlas-text)" }}>
                {a.actor}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--atlas-text-muted)" }}>
                {a.movies} movies • Hit: {a.hitRate}%
              </div>
              <div className="text-[13px] font-bold mt-1.5" style={{ color: "var(--atlas-gold)" }}>
                Avg: {formatCr(a.avgGross)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Director Performance */}
      <section className="mb-10">
        <h2
          className="font-display text-lg tracking-wide mb-4 flex items-center gap-2"
          style={{ color: "var(--atlas-text)" }}
        >
          <Clapperboard size={18} style={{ color: "var(--atlas-magenta)" }} />
          Director ROI & Performance
        </h2>
        <div className="atlas-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={directorData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
              <XAxis dataKey="director" tick={{ fill: "var(--atlas-text-muted)", fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right"
                tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="avgGross" name="Avg Gross (₹Cr)"
                fill="var(--atlas-gold)" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="avgROI" name="Avg ROI %"
                fill="var(--atlas-emerald)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Composer Performance */}
      <section className="mb-10">
        <h2
          className="font-display text-lg tracking-wide mb-4 flex items-center gap-2"
          style={{ color: "var(--atlas-text)" }}
        >
          <Music size={18} style={{ color: "var(--atlas-emerald)" }} />
          Composer Commercial Impact
        </h2>
        <div className="atlas-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={composerData.slice(0, 10)} layout="vertical"
              margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
              <XAxis type="number" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
              <YAxis type="category" dataKey="composer" width={140}
                tick={{ fill: "var(--atlas-text-muted)", fontSize: 10 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="totalGross" name="Total Gross (₹Cr)" radius={[0, 6, 6, 0]}>
                {composerData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % 8]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

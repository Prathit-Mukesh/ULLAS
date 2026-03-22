"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ScatterChart, Scatter, Cell, Legend, PieChart as RPieChart, Pie,
} from "recharts";
import {
  Search, Filter, BarChart3, MapPin, Globe, X, Layers,
  ChevronDown, ChevronRight, ArrowDownRight, ArrowUpRight,
  Target, TrendingUp, PieChart as PieChartIcon, Film,
} from "lucide-react";
import {
  MOVIES, GENRES, INDUSTRIES, VERDICTS,
  formatCr, calcROI, calcMultiplier, CHART_COLORS, Movie,
} from "@/data/movies";
import { MovieCard, ChartTooltip } from "@/components/ui/SharedComponents";

export default function CollectionsPage({ setPage }: { setPage: (p: string) => void }) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [verdictFilter, setVerdictFilter] = useState("All");
  const [sortBy, setSortBy] = useState("worldwideGross");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<Movie[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [chartView, setChartView] = useState("scatter");

  const filtered = useMemo(() => {
    let r = [...MOVIES];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.leadActors.toLowerCase().includes(q) ||
          m.industry.toLowerCase().includes(q) ||
          m.musicComposer.toLowerCase().includes(q)
      );
    }
    if (regionFilter !== "All")
      r = r.filter((m) =>
        regionFilter === "India"
          ? m.region === "India" || m.region === "Both"
          : m.region === "Rest of World" || m.region === "Both"
      );
    if (genreFilter !== "All") r = r.filter((m) => m.genre === genreFilter);
    if (industryFilter !== "All") r = r.filter((m) => m.industry === industryFilter);
    if (verdictFilter !== "All") r = r.filter((m) => m.verdict === verdictFilter);

    r.sort((a, b) => {
      let va: number, vb: number;
      if (sortBy === "roi") {
        va = calcROI(a); vb = calcROI(b);
      } else if (sortBy === "multiplier") {
        va = Number(calcMultiplier(a)) || 0;
        vb = Number(calcMultiplier(b)) || 0;
      } else {
        va = (a as any)[sortBy] ?? 0;
        vb = (b as any)[sortBy] ?? 0;
      }
      return sortDir === "desc" ? vb - va : va - vb;
    });
    return r;
  }, [search, regionFilter, genreFilter, industryFilter, verdictFilter, sortBy, sortDir]);

  const toggleCompare = (m: Movie) => {
    setCompareList((prev) =>
      prev.find((x) => x.id === m.id)
        ? prev.filter((x) => x.id !== m.id)
        : prev.length < 4
        ? [...prev, m]
        : prev
    );
  };

  const genreData = useMemo(() => {
    const g: Record<string, { genre: string; total: number; count: number }> = {};
    filtered.forEach((m) => {
      g[m.genre] = g[m.genre] || { genre: m.genre, total: 0, count: 0 };
      g[m.genre].total += m.worldwideGross;
      g[m.genre].count += 1;
    });
    return Object.values(g)
      .map((x) => ({ ...x, avgCollection: Math.round(x.total / x.count) }))
      .sort((a, b) => b.avgCollection - a.avgCollection);
  }, [filtered]);

  const scatterData = filtered.map((m) => ({
    name: m.name,
    budget: m.totalCost,
    worldwide: m.worldwideGross,
  }));

  return (
    <div>
      <div className="atlas-container pt-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h1 className="font-display text-2xl sm:text-3xl tracking-wide flex items-center gap-2.5"
            style={{ color: "var(--atlas-text)" }}>
            <BarChart3 size={24} style={{ color: "var(--atlas-gold)" }} />
            Box Office Collections
          </h1>
          <div className="flex gap-2">
            {["All", "India", "Rest of World"].map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`atlas-tab ${regionFilter === r ? "active" : ""}`}
              >
                {r === "India" && <MapPin size={13} />}
                {r === "Rest of World" && <Globe size={13} />}
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filter bar */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="atlas-search flex-1" style={{ minWidth: 250 }}>
            <Search size={16} style={{ color: "var(--atlas-text-dim)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies, actors, directors, composers..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{ color: "var(--atlas-text)" }}
            />
            {search && (
              <X
                size={14}
                className="cursor-pointer"
                style={{ color: "var(--atlas-text-muted)" }}
                onClick={() => setSearch("")}
              />
            )}
          </div>
          <button
            className="atlas-tab"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} /> Filters{" "}
            {showFilters ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
          {compareList.length > 0 && (
            <button
              className="atlas-tab active"
              onClick={() => setShowCompare(true)}
              style={{ background: "rgba(0,212,255,0.1)", color: "var(--atlas-cyan)", borderColor: "rgba(0,212,255,0.3)" }}
            >
              <Layers size={14} /> Compare ({compareList.length})
            </button>
          )}
        </div>

        {/* Filter Drawer */}
        {showFilters && (
          <div
            className="flex gap-3 flex-wrap p-4 rounded-xl mb-5 animate-fade-in"
            style={{
              background: "var(--atlas-surface)",
              border: "1px solid var(--atlas-border)",
            }}
          >
            <div className="flex flex-col gap-1 min-w-[150px]">
              <label className="atlas-label">Genre</label>
              <select className="atlas-select" value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}>
                <option value="All">All Genres</option>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 min-w-[150px]">
              <label className="atlas-label">Industry</label>
              <select className="atlas-select" value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}>
                <option value="All">All Industries</option>
                {INDUSTRIES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 min-w-[150px]">
              <label className="atlas-label">Verdict</label>
              <select className="atlas-select" value={verdictFilter}
                onChange={(e) => setVerdictFilter(e.target.value)}>
                <option value="All">All Verdicts</option>
                {VERDICTS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 min-w-[150px]">
              <label className="atlas-label">Sort By</label>
              <select className="atlas-select" value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                <option value="worldwideGross">Worldwide Collection</option>
                <option value="roi">ROI</option>
                <option value="imdbRating">IMDb Rating</option>
                <option value="openingDay">Opening Day</option>
                <option value="year">Year</option>
                <option value="totalCost">Budget</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="atlas-label">Order</label>
              <button
                className="atlas-tab"
                onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              >
                {sortDir === "desc" ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
                {sortDir === "desc" ? "High→Low" : "Low→High"}
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-[13px] mb-4" style={{ color: "var(--atlas-text-dim)" }}>
          Showing {filtered.length} of {MOVIES.length} movies
        </p>

        {/* Movie Cards */}
        <div className="flex flex-col gap-3">
          {filtered.map((m, i) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => setPage("detail:" + m.id)}
              idx={i}
              onCompare={() => toggleCompare(m)}
              isCompared={!!compareList.find((x) => x.id === m.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "var(--atlas-text-dim)" }}>
              <Film size={48} className="mx-auto mb-4 opacity-30" />
              <p>No movies match your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* ── ANALYTICS ── */}
      <div className="atlas-container atlas-section">
        <h2 className="font-display text-xl tracking-wide mb-5 flex items-center gap-2.5"
          style={{ color: "var(--atlas-text)" }}>
          <PieChartIcon size={20} style={{ color: "var(--atlas-purple)" }} />
          Analytics & Insights
        </h2>

        <div className="flex gap-2 mb-5 flex-wrap">
          {[
            { key: "scatter", label: "Budget vs Gross", icon: <Target size={13} /> },
            { key: "genre", label: "Genre Performance", icon: <BarChart3 size={13} /> },
            { key: "split", label: "India vs Overseas", icon: <PieChartIcon size={13} /> },
            { key: "roi", label: "ROI Distribution", icon: <TrendingUp size={13} /> },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setChartView(t.key)}
              className={`atlas-tab ${chartView === t.key ? "active" : ""}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="atlas-chart">
          {chartView === "scatter" && (
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
                <XAxis dataKey="budget" name="Budget (₹Cr)"
                  tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }}
                  label={{ value: "Budget (₹Cr)", fill: "var(--atlas-text-dim)", fontSize: 11, position: "bottom" }} />
                <YAxis dataKey="worldwide" name="Worldwide (₹Cr)"
                  tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Scatter data={scatterData} fill="var(--atlas-cyan)">
                  {scatterData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % 8]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          )}

          {chartView === "genre" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
                <XAxis dataKey="genre" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="avgCollection" name="Avg Collection (₹Cr)" radius={[6, 6, 0, 0]}>
                  {genreData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % 8]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartView === "split" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filtered.slice(0, 10).map((m) => ({
                name: m.name.length > 15 ? m.name.slice(0, 15) + "…" : m.name,
                India: m.indiaGross,
                Overseas: m.overseasGross,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
                <XAxis dataKey="name" tick={{ fill: "var(--atlas-text-muted)", fontSize: 10 }} />
                <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Bar dataKey="India" fill="var(--atlas-orange)" stackId="a" />
                <Bar dataKey="Overseas" fill="var(--atlas-cyan)" stackId="a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartView === "roi" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filtered
                .map((m) => ({ name: m.name.length > 12 ? m.name.slice(0, 12) + "…" : m.name, ROI: calcROI(m) }))
                .sort((a, b) => b.ROI - a.ROI)
                .slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
                <XAxis dataKey="name" tick={{ fill: "var(--atlas-text-muted)", fontSize: 10 }} />
                <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="ROI" name="ROI %" radius={[6, 6, 0, 0]}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % 8]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── COMPARE MODAL ── */}
      {showCompare && compareList.length > 0 && (
        <div className="atlas-overlay" onClick={() => setShowCompare(false)}>
          <div className="atlas-modal" style={{ maxWidth: 900 }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-display text-2xl tracking-wide flex items-center gap-2"
                style={{ color: "var(--atlas-text)" }}>
                <Layers size={20} style={{ color: "var(--atlas-cyan)" }} />
                Movie Comparison
              </h2>
              <button onClick={() => setShowCompare(false)}
                style={{ background: "none", border: "none", color: "var(--atlas-text-muted)", cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="atlas-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    {compareList.map((m) => <th key={m.id}>{m.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Year", fn: (m: Movie) => String(m.year) },
                    { label: "Industry", fn: (m: Movie) => m.industry },
                    { label: "Genre", fn: (m: Movie) => m.genre },
                    { label: "Budget", fn: (m: Movie) => formatCr(m.totalCost) },
                    { label: "Opening Day", fn: (m: Movie) => formatCr(m.openingDay) },
                    { label: "Opening Weekend", fn: (m: Movie) => formatCr(m.openingWeekend) },
                    { label: "Week 1", fn: (m: Movie) => formatCr(m.week1) },
                    { label: "India Gross", fn: (m: Movie) => formatCr(m.indiaGross) },
                    { label: "Overseas", fn: (m: Movie) => formatCr(m.overseasGross) },
                    { label: "Worldwide", fn: (m: Movie) => formatCr(m.worldwideGross) },
                    { label: "ROI", fn: (m: Movie) => calcROI(m) + "%" },
                    { label: "IMDb", fn: (m: Movie) => "★ " + m.imdbRating },
                    { label: "Verdict", fn: (m: Movie) => m.verdict },
                    { label: "Director", fn: (m: Movie) => m.director },
                    { label: "Lead Cast", fn: (m: Movie) => m.leadActors },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: "var(--atlas-text-muted)" }}>{row.label}</td>
                      {compareList.map((m) => <td key={m.id}>{row.fn(m)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={compareList.map((m) => ({
                  name: m.name.length > 15 ? m.name.slice(0, 15) + "…" : m.name,
                  Budget: m.totalCost,
                  Worldwide: m.worldwideGross,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--atlas-border)" />
                  <XAxis dataKey="name" tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--atlas-text-muted)", fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="Budget" fill="var(--atlas-magenta)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Worldwide" fill="var(--atlas-gold)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

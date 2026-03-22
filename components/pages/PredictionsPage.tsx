"use client";

import { useState } from "react";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  Zap, MapPin, Globe, Sliders, DollarSign, Calendar,
  BarChart3, Maximize2, TrendingUp, Sparkles,
} from "lucide-react";
import { GENRES, LANGUAGES, formatCr } from "@/data/movies";
import {
  predictBoxOffice, DEFAULT_INPUTS,
  PredictionInputs, PredictionResult,
} from "@/lib/prediction-engine";
import { StatCard, VerdictBadge } from "@/components/ui/SharedComponents";

export default function PredictionsPage() {
  const [region, setRegion] = useState("India");
  const [inputs, setInputs] = useState<PredictionInputs>({ ...DEFAULT_INPUTS });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [scenario, setScenario] = useState<{
    type: string;
    result: PredictionResult;
  } | null>(null);

  const update = <K extends keyof PredictionInputs>(
    key: K,
    val: PredictionInputs[K]
  ) => setInputs((p) => ({ ...p, [key]: val }));

  const runPrediction = () => {
    setResult(predictBoxOffice(inputs));
    setScenario(null);
  };

  const runScenario = (type: string) => {
    const mods = { ...inputs };
    switch (type) {
      case "higher_budget":
        mods.budget = Math.round(mods.budget * 1.2);
        mods.marketingSpend = Math.round(mods.marketingSpend * 1.2);
        break;
      case "festival":
        mods.festivalRelease = true;
        break;
      case "more_screens":
        mods.screenCount = Math.min(mods.screenCount + 3000, 20000);
        break;
      case "higher_marketing":
        mods.marketingSpend = Math.round(mods.marketingSpend * 1.5);
        break;
    }
    setScenario({ type, result: predictBoxOffice(mods) });
  };

  return (
    <div className="atlas-container pt-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1
          className="font-display text-2xl sm:text-3xl tracking-wide flex items-center gap-2.5"
          style={{ color: "var(--atlas-text)" }}
        >
          <Zap size={24} style={{ color: "var(--atlas-cyan)" }} />
          Box Office Predictor
        </h1>
        <div className="flex gap-2">
          {["India", "Rest of World", "Worldwide"].map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`atlas-tab ${region === r ? "active" : ""}`}
            >
              {r === "India" && <MapPin size={13} />}
              {r === "Rest of World" && <Globe size={13} />}
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── INPUT FORM ── */}
        <div className="atlas-card-static" style={{ padding: 24 }}>
          <h3
            className="font-display text-base tracking-wide mb-5 flex items-center gap-2"
            style={{ color: "var(--atlas-text)" }}
          >
            <Sliders size={16} style={{ color: "var(--atlas-gold)" }} />
            Movie Parameters
          </h3>

          {/* Movie Name */}
          <div className="mb-3">
            <label className="atlas-label mb-1 block">Movie Name</label>
            <input
              className="atlas-input"
              value={inputs.movieName}
              onChange={(e) => update("movieName", e.target.value)}
              placeholder="Enter movie name..."
            />
          </div>

          {/* Budget + Marketing */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="atlas-label mb-1 block">Budget (₹Cr)</label>
              <input
                type="number"
                className="atlas-input"
                value={inputs.budget}
                onChange={(e) => update("budget", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="atlas-label mb-1 block">Marketing (₹Cr)</label>
              <input
                type="number"
                className="atlas-input"
                value={inputs.marketingSpend}
                onChange={(e) => update("marketingSpend", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Genre + Language */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="atlas-label mb-1 block">Genre</label>
              <select
                className="atlas-select w-full"
                value={inputs.genre}
                onChange={(e) => update("genre", e.target.value)}
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="atlas-label mb-1 block">Language</label>
              <select
                className="atlas-select w-full"
                value={inputs.language}
                onChange={(e) => update("language", e.target.value)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Certification + Runtime */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="atlas-label mb-1 block">Certification</label>
              <select
                className="atlas-select w-full"
                value={inputs.certification}
                onChange={(e) => update("certification", e.target.value)}
              >
                {["U", "UA", "PG", "PG-13", "A", "R"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="atlas-label mb-1 block">Runtime (min)</label>
              <input
                type="number"
                className="atlas-input"
                value={inputs.runtime}
                onChange={(e) => update("runtime", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Screens Slider */}
          <div className="mb-4">
            <label className="atlas-label mb-1.5 block">
              Screen Count: {inputs.screenCount.toLocaleString()}
            </label>
            <input
              type="range"
              className="atlas-range"
              min={500} max={20000} step={500}
              value={inputs.screenCount}
              onChange={(e) => update("screenCount", Number(e.target.value))}
            />
          </div>

          {/* Power Sliders */}
          {[
            { key: "starPower" as const, label: "Star Power" },
            { key: "directorTrack" as const, label: "Director Track Record" },
            { key: "musicComposer" as const, label: "Music Composer Impact" },
            { key: "competition" as const, label: "Competition Level" },
          ].map((s) => (
            <div key={s.key} className="mb-3">
              <label className="atlas-label mb-1.5 block">
                {s.label}: {inputs[s.key]}/10
              </label>
              <input
                type="range"
                className="atlas-range"
                min={1} max={10}
                value={inputs[s.key]}
                onChange={(e) => update(s.key, Number(e.target.value))}
              />
            </div>
          ))}

          {/* Toggles */}
          <div className="flex gap-5 flex-wrap mt-2 mb-4">
            {(
              [
                { key: "franchise" as const, label: "Franchise" },
                { key: "sequel" as const, label: "Sequel" },
                { key: "festivalRelease" as const, label: "Festival Release" },
              ] as const
            ).map((t) => (
              <label key={t.key} className="flex items-center gap-2 text-[13px] cursor-pointer"
                style={{ color: "var(--atlas-text-muted)" }}>
                <div
                  className={`atlas-toggle ${inputs[t.key] ? "active" : ""}`}
                  onClick={() => update(t.key, !inputs[t.key])}
                >
                  <div className="atlas-toggle-knob" />
                </div>
                {t.label}
              </label>
            ))}
          </div>

          <button className="atlas-btn-primary w-full justify-center text-base py-4 mt-2"
            onClick={runPrediction}
            style={{ background: "linear-gradient(135deg, var(--atlas-cyan), var(--atlas-cyan-dark))" }}>
            <Zap size={18} /> Predict Now
          </button>
        </div>

        {/* ── RESULTS ── */}
        <div>
          {!result ? (
            <div
              className="atlas-card-static flex flex-col items-center justify-center"
              style={{ minHeight: 400, padding: 32 }}
            >
              <Zap size={64} style={{ color: "var(--atlas-cyan)", opacity: 0.15 }} className="mb-5" />
              <p className="text-center text-base" style={{ color: "var(--atlas-text-muted)" }}>
                Configure movie parameters and hit
                <br />
                <strong style={{ color: "var(--atlas-cyan)" }}>Predict Now</strong> to see results
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Main Result Card */}
              <div
                className="atlas-card-static"
                style={{
                  padding: 24,
                  borderTop: `3px solid ${
                    result.verdict.includes("Blockbuster")
                      ? "var(--atlas-gold)"
                      : result.verdict === "Hit"
                      ? "var(--atlas-purple)"
                      : "var(--atlas-magenta)"
                  }`,
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-lg tracking-wide" style={{ color: "var(--atlas-text)" }}>
                    {inputs.movieName || "Untitled Movie"} — Forecast
                  </h3>
                  <VerdictBadge verdict={result.verdict} size="lg" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard icon={<Zap size={14} />} label="Opening Day" value={formatCr(result.openingDay)} color="var(--atlas-cyan)" />
                  <StatCard icon={<Calendar size={14} />} label="Opening Wknd" value={formatCr(result.openingWeekend)} color="var(--atlas-purple)" />
                  <StatCard icon={<BarChart3 size={14} />} label="Week 1" value={formatCr(result.week1)} color="var(--atlas-gold)" />
                  <StatCard icon={<MapPin size={14} />} label="India LT" value={formatCr(result.domestic)} color="var(--atlas-orange)" />
                  <StatCard icon={<Globe size={14} />} label="International" value={formatCr(result.international)} color="var(--atlas-cyan)" />
                  <StatCard icon={<DollarSign size={14} />} label="Worldwide" value={formatCr(result.worldwide)} color="var(--atlas-gold)" />
                </div>

                {/* Gauges */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                  <div className="text-center">
                    <div className="atlas-label mb-1">ROI</div>
                    <div
                      className="text-2xl sm:text-3xl font-bold font-display"
                      style={{ color: result.roi > 0 ? "var(--atlas-emerald)" : "var(--atlas-magenta)" }}
                    >
                      {result.roi > 0 ? "+" : ""}{result.roi}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="atlas-label mb-1">Confidence</div>
                    <div className="text-2xl sm:text-3xl font-bold font-display" style={{ color: "var(--atlas-cyan)" }}>
                      {result.confidenceScore}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="atlas-label mb-1">Risk</div>
                    <div
                      className="text-2xl sm:text-3xl font-bold font-display"
                      style={{
                        color:
                          result.riskScore > 60
                            ? "var(--atlas-magenta)"
                            : result.riskScore > 30
                            ? "var(--atlas-orange)"
                            : "var(--atlas-emerald)",
                      }}
                    >
                      {result.riskScore}%
                    </div>
                  </div>
                </div>

                {/* Scenarios */}
                <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--atlas-border)" }}>
                  <h4 className="text-[13px] font-bold mb-3" style={{ color: "var(--atlas-text)" }}>
                    Scenarios
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl p-3 text-center"
                      style={{ background: "rgba(0,204,136,0.06)", border: "1px solid rgba(0,204,136,0.15)" }}>
                      <div className="text-[11px] mb-1" style={{ color: "var(--atlas-emerald)" }}>Best Case</div>
                      <div className="text-lg font-bold font-display" style={{ color: "var(--atlas-emerald)" }}>
                        {formatCr(result.bestCase)}
                      </div>
                    </div>
                    <div className="rounded-xl p-3 text-center"
                      style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)" }}>
                      <div className="text-[11px] mb-1" style={{ color: "var(--atlas-gold)" }}>Base Case</div>
                      <div className="text-lg font-bold font-display" style={{ color: "var(--atlas-gold)" }}>
                        {formatCr(result.worldwide)}
                      </div>
                    </div>
                    <div className="rounded-xl p-3 text-center"
                      style={{ background: "rgba(255,51,102,0.06)", border: "1px solid rgba(255,51,102,0.15)" }}>
                      <div className="text-[11px] mb-1" style={{ color: "var(--atlas-magenta)" }}>Worst Case</div>
                      <div className="text-lg font-bold font-display" style={{ color: "var(--atlas-magenta)" }}>
                        {formatCr(result.worstCase)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factor Radar */}
              <div className="atlas-card-static" style={{ padding: 24 }}>
                <h3 className="font-display text-base tracking-wide mb-4" style={{ color: "var(--atlas-text)" }}>
                  Factor Contributions
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart
                    data={Object.entries(result.factors).map(([k, v]) => ({
                      factor: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
                      value: v,
                    }))}
                  >
                    <PolarGrid stroke="var(--atlas-border)" />
                    <PolarAngleAxis dataKey="factor" tick={{ fill: "var(--atlas-text-muted)", fontSize: 10 }} />
                    <PolarRadiusAxis tick={{ fill: "var(--atlas-text-dim)", fontSize: 9 }} />
                    <Radar name="Contribution" dataKey="value"
                      stroke="var(--atlas-cyan)" fill="var(--atlas-cyan)" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* What-If Simulator */}
              <div className="atlas-card-static" style={{ padding: 24 }}>
                <h3 className="font-display text-base tracking-wide mb-4 flex items-center gap-2"
                  style={{ color: "var(--atlas-text)" }}>
                  <Sparkles size={16} style={{ color: "var(--atlas-purple)" }} />
                  What-If Simulator
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { key: "higher_budget", label: "Budget +20%", icon: <DollarSign size={13} /> },
                    { key: "festival", label: "Festival Release", icon: <Calendar size={13} /> },
                    { key: "more_screens", label: "+3000 Screens", icon: <Maximize2 size={13} /> },
                    { key: "higher_marketing", label: "Marketing +50%", icon: <TrendingUp size={13} /> },
                  ].map((s) => (
                    <button
                      key={s.key}
                      onClick={() => runScenario(s.key)}
                      className={`atlas-tab ${scenario?.type === s.key ? "active" : ""}`}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>

                {scenario && result && (
                  <div
                    className="mt-4 p-4 rounded-xl"
                    style={{
                      background: "var(--atlas-surface)",
                      border: "1px solid var(--atlas-border-light)",
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="atlas-label mb-1">Original Worldwide</div>
                        <div className="text-lg font-bold" style={{ color: "var(--atlas-text-muted)" }}>
                          {formatCr(result.worldwide)}
                        </div>
                      </div>
                      <div>
                        <div className="atlas-label mb-1">Scenario Worldwide</div>
                        <div
                          className="text-lg font-bold"
                          style={{
                            color:
                              scenario.result.worldwide > result.worldwide
                                ? "var(--atlas-emerald)"
                                : "var(--atlas-magenta)",
                          }}
                        >
                          {formatCr(scenario.result.worldwide)}
                          <span className="text-xs ml-2">
                            ({scenario.result.worldwide > result.worldwide ? "+" : ""}
                            {Math.round(
                              ((scenario.result.worldwide - result.worldwide) / result.worldwide) * 100
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <VerdictBadge verdict={scenario.result.verdict} size="lg" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

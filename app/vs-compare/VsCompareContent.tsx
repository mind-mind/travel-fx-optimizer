"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { translations, type Lang, type Translations } from "@/data/translations";
import { DESTINATIONS, getWeatherType } from "@/data/whereToTravel";
import { getFestivalsForMonth, COUNTRY_CODE_TO_GUIDE } from "@/data/festivals";
import { COUNTRIES } from "@/lib/fxData";
import { getTravelWarningsByCountry } from "@/lib/data/travelWarnings";
import type { TravelAdvisory, BannedAirline } from "@/components/TravelSafetyNews";

// ─── helpers ─────────────────────────────────────────────────────────────────

function parseFlightAverage(price: string): number {
  const cleaned = price.replace(/[$,]/g, "");
  const parts = cleaned.split(/[\u2013\u2014\-]/).map((p) => Number(p.trim()));
  if (parts.length < 2 || !Number.isFinite(parts[0]) || !Number.isFinite(parts[1])) return Infinity;
  return (parts[0] + parts[1]) / 2;
}

function getSafetyMeta(score: number | null): {
  label: string; icon: string;
  badge: string; penalty: number;
} {
  if (score === null) return { label: "No data", icon: "❓", badge: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700", penalty: 0 };
  if (score >= 4.5) return { label: "Do not travel", icon: "🚫", badge: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800", penalty: 5 };
  if (score >= 3.5) return { label: "Reconsider travel", icon: "🔴", badge: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800", penalty: 4 };
  if (score >= 2.5) return { label: "Exercise caution", icon: "🟡", badge: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800", penalty: 2 };
  if (score >= 1.5) return { label: "Take normal precautions", icon: "🟢", badge: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800", penalty: 0 };
  return { label: "Safe to travel", icon: "✅", badge: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800", penalty: 0 };
}

function getVerdict(score: number, t: Translations) {
  if (score >= 5) return t.vsGoodNow ?? "Great to visit now";
  if (score >= 3) return t.vsOkNow ?? "Okay to visit now";
  return t.vsNotIdeal ?? "Not ideal right now";
}

// ─── component ───────────────────────────────────────────────────────────────

export default function VsCompareContent() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && saved in translations) return saved;
    }
    return "en";
  });

  const t: Translations = translations[lang];
  const [leftId, setLeftId] = useState(DESTINATIONS[0]?.id ?? "");
  const [rightId, setRightId] = useState(DESTINATIONS[1]?.id ?? "");

  // Live safety + flight-ban data
  const [advisories, setAdvisories] = useState<Record<string, TravelAdvisory>>({});
  const [bannedAirlines, setBannedAirlines] = useState<BannedAirline[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/travel-news")
      .then((r) => r.json())
      .then((data) => {
        setAdvisories(data.advisories ?? {});
        setBannedAirlines(data.bannedAirlines ?? []);
      })
      .catch(() => {/* use empty fallback */})
      .finally(() => setNewsLoading(false));
  }, []);

  const monthIndex = new Date().getMonth();
  const left = DESTINATIONS.find((d) => d.id === leftId) ?? DESTINATIONS[0];
  const right = DESTINATIONS.find((d) => d.id === rightId) ?? DESTINATIONS[1];

  const comparison = useMemo(() => {
    if (!left || !right || left.id === right.id) return null;

    const leftTemp = left.avgTempByMonth[monthIndex];
    const rightTemp = right.avgTempByMonth[monthIndex];
    const leftWeatherType = getWeatherType(leftTemp);
    const rightWeatherType = getWeatherType(rightTemp);

    const leftSlug = COUNTRY_CODE_TO_GUIDE[left.countryCode];
    const rightSlug = COUNTRY_CODE_TO_GUIDE[right.countryCode];

    const leftFestivals = leftSlug ? getFestivalsForMonth(monthIndex, leftSlug) : [];
    const rightFestivals = rightSlug ? getFestivalsForMonth(monthIndex, rightSlug) : [];
    const leftHighCrowd = leftFestivals.filter((f) => f.crowdLevel === "high").length;
    const rightHighCrowd = rightFestivals.filter((f) => f.crowdLevel === "high").length;

    const leftCountry = COUNTRIES.find((c) => c.code === left.countryCode);
    const rightCountry = COUNTRIES.find((c) => c.code === right.countryCode);

    const leftFlight = parseFlightAverage(left.flightPriceEstimate);
    const rightFlight = parseFlightAverage(right.flightPriceEstimate);

    // Static travel warnings
    const leftWarnings = leftSlug ? getTravelWarningsByCountry(leftSlug) : [];
    const rightWarnings = rightSlug ? getTravelWarningsByCountry(rightSlug) : [];

    // Live advisory score (UK FCO / 0‑5 scale)
    const leftAdvisory = advisories[left.countryCode] ?? null;
    const rightAdvisory = advisories[right.countryCode] ?? null;
    const leftSafetyMeta = getSafetyMeta(leftAdvisory?.score ?? null);
    const rightSafetyMeta = getSafetyMeta(rightAdvisory?.score ?? null);

    // EU-banned airlines for each destination country
    const leftBanned = bannedAirlines.filter(
      (a) => a.countryCode?.toUpperCase() === left.countryCode.toUpperCase()
    );
    const rightBanned = bannedAirlines.filter(
      (a) => a.countryCode?.toUpperCase() === right.countryCode.toUpperCase()
    );

    // ── scoring ──────────────────────────────────────────────────────────────
    let leftScore = 0;
    let rightScore = 0;

    // Best months
    if (left.bestMonths.includes(monthIndex)) leftScore += 2;
    if (right.bestMonths.includes(monthIndex)) rightScore += 2;

    // Weather
    if (leftWeatherType === "mild") leftScore += 2; else leftScore += 1;
    if (rightWeatherType === "mild") rightScore += 2; else rightScore += 1;

    // Cheaper flights
    if (Number.isFinite(leftFlight) && Number.isFinite(rightFlight)) {
      if (leftFlight < rightFlight) leftScore += 1;
      else if (rightFlight < leftFlight) rightScore += 1;
    }

    // VAT refund
    if (leftCountry?.vatEligible) leftScore += 1;
    if (rightCountry?.vatEligible) rightScore += 1;

    // Crowd penalty
    leftScore -= Math.min(2, leftHighCrowd);
    rightScore -= Math.min(2, rightHighCrowd);

    // Safety advisory penalty (live data — heavyweight: up to -5)
    leftScore -= leftSafetyMeta.penalty;
    rightScore -= rightSafetyMeta.penalty;

    // EU flight ban penalty
    if (leftBanned.length > 0) leftScore -= 3;
    if (rightBanned.length > 0) rightScore -= 3;

    const winner = leftScore === rightScore ? "tie" : leftScore > rightScore ? "left" : "right";

    return {
      leftTemp, rightTemp,
      leftFestivals, rightFestivals,
      leftCountry, rightCountry,
      leftWarnings, rightWarnings,
      leftAdvisory, rightAdvisory,
      leftSafetyMeta, rightSafetyMeta,
      leftBanned, rightBanned,
      leftScore, rightScore,
      winner,
    };
  }, [left, right, monthIndex, advisories, bannedAirlines]);

  // ─── per-side data array for rendering ────────────────────────────────────
  const sides = comparison
    ? [
        {
          dest: left,
          temp: comparison.leftTemp,
          festivals: comparison.leftFestivals,
          country: comparison.leftCountry,
          score: comparison.leftScore,
          warnings: comparison.leftWarnings,
          advisory: comparison.leftAdvisory,
          safetyMeta: comparison.leftSafetyMeta,
          banned: comparison.leftBanned,
        },
        {
          dest: right,
          temp: comparison.rightTemp,
          festivals: comparison.rightFestivals,
          country: comparison.rightCountry,
          score: comparison.rightScore,
          warnings: comparison.rightWarnings,
          advisory: comparison.rightAdvisory,
          safetyMeta: comparison.rightSafetyMeta,
          banned: comparison.rightBanned,
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Hero ── */}
        <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-6 text-white shadow-md">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-100">{t.vsBadge ?? "Destination Battle"}</p>
          <h1 className="mt-1 text-2xl font-extrabold">{t.vsTitle ?? "Compare Two Destinations"}</h1>
          <p className="mt-2 text-sm text-blue-100">{t.vsSubtitle ?? "Pick two places — safety, flights & conditions compared instantly"}</p>
          <div className="mt-4 flex items-center gap-3">
            <Link href="/" className="inline-flex rounded-xl bg-white/20 px-3 py-2 text-sm font-semibold hover:bg-white/30">
              ← Back
            </Link>
            {newsLoading && (
              <span className="text-xs text-blue-200 animate-pulse">Loading live safety data…</span>
            )}
          </div>
        </section>

        {/* ── Selectors ── */}
        <section className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {([
              { label: t.vsSelectA ?? "Destination A", value: leftId, set: setLeftId },
              { label: t.vsSelectB ?? "Destination B", value: rightId, set: setRightId },
            ] as const).map(({ label, value, set }) => (
              <label key={label} className="space-y-1">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</span>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                >
                  {DESTINATIONS.map((dest) => (
                    <option key={dest.id} value={dest.id}>{dest.flag} {dest.name}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Language</span>
            <select
              value={lang}
              onChange={(e) => { const v = e.target.value as Lang; setLang(v); localStorage.setItem("lang", v); }}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-xs"
            >
              <option value="en">English</option>
              <option value="th">ไทย</option>
              <option value="es">Español</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </div>
        </section>

        {comparison ? (
          <>
            {/* ── Safety & flight ban summary banner (critical, shown first) ── */}
            {(comparison.leftBanned.length > 0 || comparison.rightBanned.length > 0 ||
              (comparison.leftAdvisory?.score ?? 0) >= 3.5 || (comparison.rightAdvisory?.score ?? 0) >= 3.5) && (
              <section className="rounded-2xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-4 shadow-sm space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-300">⚠️ Important Safety Alerts</p>
                {comparison.leftBanned.length > 0 && (
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <span className="font-bold">{left.flag} {left.name}:</span> {comparison.leftBanned.length} airline(s) from this country are EU-banned. Verify your carrier before booking.
                  </p>
                )}
                {comparison.rightBanned.length > 0 && (
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <span className="font-bold">{right.flag} {right.name}:</span> {comparison.rightBanned.length} airline(s) from this country are EU-banned. Verify your carrier before booking.
                  </p>
                )}
                {(comparison.leftAdvisory?.score ?? 0) >= 3.5 && (
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <span className="font-bold">{left.flag} {left.name}:</span> Advisory score {comparison.leftAdvisory!.score.toFixed(1)}/5 — {comparison.leftSafetyMeta.label}.
                  </p>
                )}
                {(comparison.rightAdvisory?.score ?? 0) >= 3.5 && (
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <span className="font-bold">{right.flag} {right.name}:</span> Advisory score {comparison.rightAdvisory!.score.toFixed(1)}/5 — {comparison.rightSafetyMeta.label}.
                  </p>
                )}
              </section>
            )}

            {/* ── Side-by-side cards ── */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sides.map((item) => (
                <article
                  key={item.dest.id}
                  className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm overflow-hidden"
                >
                  {/* Card header */}
                  <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.dest.flag} {item.dest.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.dest.city}</p>
                  </div>

                  <div className="px-4 py-4 space-y-4">

                    {/* ── SAFETY (most important) ── */}
                    <div className="rounded-xl border bg-white dark:bg-gray-800/60 px-3 py-3 space-y-2
                      border-gray-200 dark:border-gray-700">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        🛡️ Safety Advisory
                      </p>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${item.safetyMeta.badge}`}>
                        {item.safetyMeta.icon} {item.safetyMeta.label}
                        {item.advisory && (
                          <span className="opacity-70">· {item.advisory.score.toFixed(1)}/5</span>
                        )}
                      </span>
                      {item.advisory?.message && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">{item.advisory.message}</p>
                      )}
                      {!item.advisory && !newsLoading && (
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">No live advisory available.</p>
                      )}
                      {item.warnings.filter((w) => w.category === "safety" || w.category === "scam").length > 0 && (
                        <ul className="mt-1 space-y-1">
                          {item.warnings
                            .filter((w) => w.category === "safety" || w.category === "scam")
                            .map((w, i) => (
                              <li key={i} className="text-[11px] text-orange-700 dark:text-orange-300 leading-relaxed">
                                ⚠️ {w.message}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>

                    {/* ── FLIGHT BAN ── */}
                    <div className={`rounded-xl border px-3 py-3 space-y-1 ${
                      item.banned.length > 0
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
                        : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                    }`}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        ✈️ EU Flight Ban Status
                      </p>
                      {item.banned.length === 0 ? (
                        <p className="text-xs font-semibold text-green-700 dark:text-green-300">
                          ✅ No airlines from this country are EU-banned
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-bold text-red-700 dark:text-red-300">
                            🚫 {item.banned.length} airline{item.banned.length > 1 ? "s" : ""} EU-banned
                          </p>
                          <ul className="space-y-0.5">
                            {item.banned.slice(0, 3).map((a) => (
                              <li key={a.iata} className="text-[11px] text-red-700 dark:text-red-300">
                                {a.name} ({a.iata}) — {a.reason}
                              </li>
                            ))}
                            {item.banned.length > 3 && (
                              <li className="text-[11px] text-red-600 dark:text-red-400">
                                +{item.banned.length - 3} more
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </div>

                    {/* ── Other factors ── */}
                    <div className="space-y-1.5 text-sm">
                      <Row label={t.vsWeather ?? "Weather"} value={`${item.temp}°C`} />
                      <Row label={t.vsCost ?? "Flight Cost"} value={item.dest.flightPriceEstimate} />
                      <Row
                        label={t.vsBestMonths ?? "Best Month Now"}
                        value={item.dest.bestMonths.includes(monthIndex) ? "✅ Yes" : "❌ No"}
                      />
                      <Row
                        label={t.vsFestivals ?? "Festivals Now"}
                        value={item.festivals.length > 0 ? item.festivals[0].name : (t.vsNone ?? "None")}
                      />
                      <Row
                        label={t.vsVatRefund ?? "VAT Refund"}
                        value={item.country?.vatEligible ? "✅ Available" : "❌ No"}
                      />
                      <Row
                        label="Known local risks"
                        value={item.warnings.length > 0 ? `${item.warnings.length} warning${item.warnings.length > 1 ? "s" : ""}` : "None"}
                      />
                    </div>

                    {/* ── Verdict ── */}
                    <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{t.vsVerdict ?? "Verdict"}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{getVerdict(item.score, t)}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">Score: {item.score}</p>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* ── Winner banner ── */}
            <section className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 px-5 py-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">{t.vsWinner ?? "Better pick right now"}</p>
              <p className="mt-1 text-xl font-extrabold text-gray-900 dark:text-gray-100">
                {comparison.winner === "tie"
                  ? t.vsTie ?? "It's a tie!"
                  : comparison.winner === "left"
                  ? `${left.flag} ${left.name}`
                  : `${right.flag} ${right.name}`}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                Based on: safety advisory · EU flight bans · weather · best season · flight cost · festivals
              </p>
            </section>
          </>
        ) : (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
            {t.vsPickDifferent ?? "Pick two different destinations to compare"}
          </section>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-gray-600 dark:text-gray-400 shrink-0">{label}</span>
      <span className="font-semibold text-gray-900 dark:text-gray-100 text-right">{value}</span>
    </div>
  );
}

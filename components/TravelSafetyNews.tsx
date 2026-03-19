"use client";

import { useEffect, useRef, useState } from "react";

export interface TravelAdvisory {
  iso: string;
  name: string;
  score: number;
  message: string;
  updated: string;
  source: string;
}

export interface BannedAirline {
  name: string;
  /** ISO 3166-1 alpha-2 code of the airline's home country */
  countryCode: string;
  country: string;
  iata: string;
  reason: string;
}

interface TravelSafetyNewsProps {
  /** ISO 3166-1 alpha-2 country code for the selected destination */
  countryCode: string;
  countryName: string;
  advisories: Record<string, TravelAdvisory>;
  bannedAirlines: BannedAirline[];
  fetchedAt: string | null;
  isLoading: boolean;
  isFallback?: boolean;
  labels: {
    title: string;
    updatedAgo: string;
    offline: string;
    advisoryFor: string;
    doNotTravel: string;
    reconsiderTravel: string;
    exerciseCaution: string;
    normalPrecautions: string;
    unknown: string;
    riskScore: string;
    sourceUpdated: string;
    officialSource: string;
    noAdvisory: string;
    aviationFor: string;
    euListLabel: string;
    noAirlinesBanned: string;
    noAirlinesBannedDesc: string;
    viewGlobalList: string;
    hideGlobalList: string;
    disclaimer: string;
    autoRefresh: string;
    justNow: string;
    oneMinAgo: string;
    nMinAgo: string;
    hAgo: string;
  };
}

function advisoryMeta(score: number): {
  labelKey: "doNotTravel" | "reconsiderTravel" | "exerciseCaution" | "normalPrecautions" | "unknown";
  color: string;
  bg: string;
  border: string;
  icon: string;
} {
  if (score >= 4.5)
    return {
      labelKey: "doNotTravel",
      color: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-50 dark:bg-rose-950/30",
      border: "border-rose-200 dark:border-rose-800",
      icon: "🚫",
    };
  if (score >= 4.0)
    return {
      labelKey: "reconsiderTravel",
      color: "text-orange-700 dark:text-orange-300",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-200 dark:border-orange-800",
      icon: "⛔",
    };
  if (score >= 3.0)
    return {
      labelKey: "exerciseCaution",
      color: "text-yellow-700 dark:text-yellow-300",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: "⚠️",
    };
  if (score >= 2.0)
    return {
      labelKey: "normalPrecautions",
      color: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: "✅",
    };
  return {
    labelKey: "unknown",
    color: "text-gray-600 dark:text-gray-300",
    bg: "bg-gray-50 dark:bg-gray-800/50",
    border: "border-gray-200 dark:border-gray-700",
    icon: "❓",
  };
}

function ScoreBar({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, ((score - 1) / 4) * 100));
  const colorClass =
    score >= 4.5
      ? "bg-rose-500"
      : score >= 4.0
      ? "bg-orange-500"
      : score >= 3.0
      ? "bg-yellow-400"
      : "bg-emerald-500";

  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const REFRESH_MS = 30 * 60 * 1000; // 30 minutes

export default function TravelSafetyNews({
  countryCode,
  countryName,
  advisories,
  bannedAirlines,
  fetchedAt,
  isLoading,
  isFallback,
  labels,
}: TravelSafetyNewsProps) {
  const advisory = advisories[countryCode] ?? null;
  const meta = advisory ? advisoryMeta(advisory.score) : null;

  // Airlines from the selected destination country
  const destinationAirlines = bannedAirlines.filter(
    (a) => a.countryCode === countryCode
  );
  const [showGlobalList, setShowGlobalList] = useState(false);

  // Live "last updated" relative label
  const [ageLabel, setAgeLabel] = useState("");
  const fetchedAtRef = useRef(fetchedAt);
  useEffect(() => {
    fetchedAtRef.current = fetchedAt;
  }, [fetchedAt]);

  useEffect(() => {
    function updateAge() {
      if (!fetchedAtRef.current) return setAgeLabel("");
      const diffMs = Date.now() - new Date(fetchedAtRef.current).getTime();
      const mins = Math.round(diffMs / 60_000);
      if (mins < 1) setAgeLabel(labels.justNow);
      else if (mins === 1) setAgeLabel(labels.oneMinAgo);
      else if (mins < 60) setAgeLabel(labels.nMinAgo.replace("{n}", String(mins)));
      else setAgeLabel(labels.hAgo.replace("{h}", String(Math.round(mins / 60))));
    }
    updateAge();
    const t = setInterval(updateAge, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
          {labels.title}
        </h3>
        <div className="flex items-center gap-1.5">
          {isLoading && (
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          )}
          {ageLabel ? (
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {labels.updatedAgo.replace("{age}", ageLabel)}
            </span>
          ) : null}
          {isFallback && (
            <span className="rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-700 dark:text-yellow-300">
              {labels.offline}
            </span>
          )}
        </div>
      </div>

      {/* Destination advisory */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {labels.advisoryFor.replace("{country}", countryName)}
        </p>

        {isLoading && !advisory ? (
          <div className="mt-2 animate-pulse rounded-xl h-16 bg-gray-100 dark:bg-gray-800" />
        ) : advisory && meta ? (
          <div
            className={`mt-2 rounded-xl border px-3 py-2.5 ${meta.bg} ${meta.border}`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className={`text-sm font-bold ${meta.color}`}>
                {meta.icon} {labels[meta.labelKey]}
              </p>
              <span className={`text-xs font-semibold ${meta.color}`}>
                {labels.riskScore.replace("{score}", advisory.score.toFixed(1))}
              </span>
            </div>
            <ScoreBar score={advisory.score} />
            {advisory.message ? (
              <p className="mt-2 text-xs leading-relaxed text-gray-700 dark:text-gray-200">
                {advisory.message}
              </p>
            ) : null}
            {advisory.updated ? (
              <p className="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500">
                {labels.sourceUpdated.replace("{date}", advisory.updated.slice(0, 10))}
                {advisory.source ? (
                  <>
                    {" · "}
                    <a
                      href={advisory.source}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {labels.officialSource}
                    </a>
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {labels.noAdvisory}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-black/5 dark:border-gray-700" />

      {/* Airlines to avoid — filtered to the selected destination */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {labels.aviationFor.replace("{country}", countryName)}
          </p>
          <a
            href="https://transport.ec.europa.eu/transport-modes/air/safety/air-ban_en"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[10px] text-blue-600 dark:text-blue-400 underline"
          >
            {labels.euListLabel}
          </a>
        </div>

        {destinationAirlines.length === 0 ? (
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2.5">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {labels.noAirlinesBanned.replace("{country}", countryName)}
            </p>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
              {labels.noAirlinesBannedDesc}
            </p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {destinationAirlines.map((airline) => (
              <li
                key={`${airline.iata}-${airline.name}`}
                className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 px-3 py-2"
              >
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                    🚫 {airline.name}
                    {airline.iata && airline.iata !== "—" && (
                      <span className="ml-1.5 text-[10px] font-mono text-gray-400">
                        {airline.iata}
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-0.5 text-[11px] text-rose-600 dark:text-rose-400">
                  {airline.reason}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Collapsible global reference */}
        <div className="mt-3">
          <button
            onClick={() => setShowGlobalList((v) => !v)}
            className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1"
          >
            <span>{showGlobalList ? "▾" : "▸"}</span>
            {showGlobalList
              ? labels.hideGlobalList
              : labels.viewGlobalList.replace("{count}", String(bannedAirlines.length))}
          </button>
          {showGlobalList && (
            <ul className="mt-2 space-y-1.5">
              {bannedAirlines.map((airline) => (
                <li
                  key={`global-${airline.countryCode}-${airline.iata}-${airline.name}`}
                  className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2"
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {airline.name}
                      {airline.iata && airline.iata !== "—" && (
                        <span className="ml-1.5 text-[10px] font-mono text-gray-400">
                          {airline.iata}
                        </span>
                      )}
                    </p>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 shrink-0">
                      {airline.country}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-rose-600 dark:text-rose-400">
                    {airline.reason}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-2 text-[10px] leading-relaxed text-gray-400 dark:text-gray-500">
          {labels.disclaimer}
        </p>

        {/* Live refresh pulse */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            {labels.autoRefresh}
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { translations } from "@/data/translations";
import type { Translations } from "@/data/translations";
import type { Lang } from "@/data/translations";
import {
  DESTINATIONS,
  WEATHER_CONFIG,
  getWeatherType,
  getDestinationsForMonth,
  type WeatherType,
  type Destination,
} from "@/data/whereToTravel";
import { getFestivalsForMonth, COUNTRY_CODE_TO_GUIDE, type Festival } from "@/data/festivals";
import { getFestivalName, getFestivalTravelTip } from "@/data/festivalTranslations";

// ─── Locale-aware month names via Intl ───────────────────────────────────────

const LOCALE_MAP: Record<string, string> = {
  en: "en-US", th: "th-TH", es: "es-ES", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR",
};

function getMonthNames(lang: string): string[] {
  const locale = LOCALE_MAP[lang] ?? "en-US";
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2024, i, 1))
  );
}

function getMonthNamesShort(lang: string): string[] {
  const locale = LOCALE_MAP[lang] ?? "en-US";
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2024, i, 1))
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function getTempColor(temp: number): string {
  if (temp < 0) return "text-blue-600 dark:text-blue-400";
  if (temp < 15) return "text-cyan-600 dark:text-cyan-400";
  if (temp < 25) return "text-green-600 dark:text-green-400";
  return "text-orange-500 dark:text-orange-400";
}

function weatherLabel(w: WeatherType, t: Translations): string {
  return w === "cool" ? t.wttCool : w === "mild" ? t.wttMild : t.wttWarm;
}
function weatherRange(w: WeatherType, t: Translations): string {
  return w === "cool" ? t.wttCoolRange : w === "mild" ? t.wttMildRange : t.wttWarmRange;
}
function weatherDesc(w: WeatherType, t: Translations): string {
  return w === "cool" ? t.wttCoolDesc : w === "mild" ? t.wttMildDesc : t.wttWarmDesc;
}

// ─── Destination Card ─────────────────────────────────────────────────────────

function DestinationCard({
  dest,
  monthIndex,
  monthNamesShort,
  festivals,
  t,
  lang,
}: {
  dest: Destination;
  monthIndex: number;
  monthNamesShort: string[];
  festivals: Festival[];
  t: Translations;
  lang: string;
}) {
  const temp = dest.avgTempByMonth[monthIndex];
  const w = getWeatherType(temp);

  const weatherBadgeClass =
    w === "cool"
      ? "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900"
      : w === "mild"
      ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-900"
      : "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-900";

  const bestMonthsLabel = dest.bestMonths.map((i) => monthNamesShort[i]).join(", ");

  return (
    <article className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 overflow-hidden">
      <div className="px-5 pt-5 pb-4 flex items-start gap-4">
        <span className="text-4xl shrink-0 leading-none">{dest.flag}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {dest.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{dest.city}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className={`text-xl font-bold leading-none ${getTempColor(temp)}`}>
                {temp >= 0 ? "+" : ""}{temp}°C
              </span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold border rounded-full px-2 py-0.5 ${weatherBadgeClass}`}>
                {WEATHER_CONFIG[w].icon} {weatherLabel(w, t)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 mx-5" />

      <div className="px-5 py-4 flex-1 space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {dest.descriptions?.[lang] ?? dest.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dest.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full px-2 py-0.5 capitalize"
            >
              {(t.wttTags as Record<string, string>)[tag] ?? tag}
            </span>
          ))}
        </div>
        {festivals.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {festivals.map((f) => (
              <span
                key={f.id}
                className="inline-flex items-center gap-1 text-[10px] font-semibold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900 rounded-full px-2 py-0.5"
                title={f.travelTip}
              >
                {f.emoji} {f.name}
              </span>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
              ✈️ {t.wttFlightPrice}
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
              {dest.flightPriceEstimate}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
              📅 {t.wttBestMonths}
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
              {bestMonthsLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          href={`/?country=${dest.countryCode}`}
          className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 transition-colors"
        >
          {t.wttCheckPrices}
        </Link>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WhereToTravelContent() {
  const now = new Date();
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [weather, setWeather] = useState<WeatherType>("mild");
  const [lang, setLang] = useState<Lang>("en");
  const monthScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang && storedLang in translations) {
      setLang(storedLang);
    } else {
      const browserLang = navigator.language.toLowerCase().split("-")[0];
      const detected = (browserLang in translations ? browserLang : "en") as Lang;
      setLang(detected);
    }
  }, []);

  useEffect(() => {
    const container = monthScrollRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLButtonElement>("[data-active='true']");
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [monthIndex]);

  const t = translations[lang];
  const monthNames = getMonthNames(lang);
  const monthNamesShort = getMonthNamesShort(lang);
  const monthName = monthNames[monthIndex];
  const filtered = getDestinationsForMonth(monthIndex, weather);

  const seoHeading =
    weather === "cool"
      ? t.wttSeoCool.replace("{month}", monthName)
      : weather === "warm"
      ? t.wttSeoWarm.replace("{month}", monthName)
      : t.wttSeoMild.replace("{month}", monthName);

  const foundText = t.wttFound.replace("{n}", filtered.length.toString());

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ── */}
      <div
        className="pt-12 pb-10 px-4"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm transition-colors"
            >
              {t.guideBack}
            </Link>
          </div>
          <div className="space-y-2 mb-2">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
              {t.wttBadge}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {t.wttTitle}
            </h1>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
              {t.wttSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ── Selectors ── */}
      <div className="max-w-3xl mx-auto px-4 -mt-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md p-5 space-y-5">
          {/* Month selector */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
              {t.wttSelectMonth}
            </p>
            <div
              ref={monthScrollRef}
              className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none"
              role="group"
              aria-label={t.wttSelectMonth}
            >
              {monthNamesShort.map((m, i) => (
                <button
                  key={i}
                  data-active={i === monthIndex ? "true" : "false"}
                  onClick={() => setMonthIndex(i)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    i === monthIndex
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  aria-pressed={i === monthIndex}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Weather preference */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
              {t.wttWeatherPref}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["cool", "mild", "warm"] as WeatherType[]).map((w) => {
                const cfg = WEATHER_CONFIG[w];
                const isActive = weather === w;
                const activeClass =
                  w === "cool"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : w === "mild"
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-orange-500 border-orange-500 text-white";
                return (
                  <button
                    key={w}
                    onClick={() => setWeather(w)}
                    aria-pressed={isActive}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-all ${
                      isActive
                        ? activeClass + " shadow-sm"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <span className="text-2xl">{cfg.icon}</span>
                    <span className="text-xs font-bold leading-tight">{weatherLabel(w, t)}</span>
                    <span className={`text-[9px] leading-tight ${isActive ? "opacity-80" : "text-gray-400 dark:text-gray-500"}`}>
                      {weatherRange(w, t)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* SEO heading + summary */}
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {seoHeading}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {WEATHER_CONFIG[weather].icon} {weatherDesc(weather, t)} &middot; {foundText}
          </p>
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((dest) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                monthIndex={monthIndex}
                monthNamesShort={monthNamesShort}
                festivals={getFestivalsForMonth(monthIndex, COUNTRY_CODE_TO_GUIDE[dest.countryCode])}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 text-center space-y-2">
            <p className="text-4xl">🗺️</p>
            <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
              {t.wttNoResults}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {t.wttTryOther}
            </p>
          </div>
        )}

        {/* Festivals This Month */}
        {(() => {
          const allFestivals = DESTINATIONS.flatMap((dest) => {
            const guideCountry = COUNTRY_CODE_TO_GUIDE[dest.countryCode];
            if (!guideCountry) return [];
            return getFestivalsForMonth(monthIndex, guideCountry).map((f) => ({
              ...f,
              destFlag: dest.flag,
              destName: dest.name,
            }));
          });
          if (allFestivals.length === 0) return null;
          return (
            <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                🎉 {t.festivalsTitle} — {monthName}
              </h3>
              <div className="space-y-2">
                {allFestivals.map((festival) => (
                  <div key={festival.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <span className="text-xl shrink-0">{festival.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          {getFestivalName(festival.id, festival.name, lang)}
                        </p>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          {festival.destFlag} {festival.destName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {getFestivalTravelTip(festival.id, festival.travelTip, lang)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Weather key */}
        <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
            🌡️ {t.wttWeatherGuide}
          </h3>
          <div className="space-y-2">
            {(["cool", "mild", "warm"] as WeatherType[]).map((w) => (
              <div key={w} className="flex items-start gap-3">
                <span className="text-lg shrink-0">{WEATHER_CONFIG[w].icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {weatherLabel(w, t)}{" "}
                    <span className="font-normal text-gray-400 dark:text-gray-500">
                      — {weatherRange(w, t)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {weatherDesc(w, t)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All destinations overview */}
        <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
            📊 {t.wttAllDestIn.replace("{month}", monthName)}
          </h3>
          <div className="space-y-2">
            {DESTINATIONS.map((dest) => {
              const temp = dest.avgTempByMonth[monthIndex];
              const w = getWeatherType(temp);
              return (
                <div key={dest.id} className="flex items-center gap-3 text-sm">
                  <span className="text-lg shrink-0">{dest.flag}</span>
                  <span className="flex-1 font-medium text-gray-700 dark:text-gray-200">
                    {dest.name}
                  </span>
                  <span className={`font-bold tabular-nums ${getTempColor(temp)}`}>
                    {temp >= 0 ? "+" : ""}{temp}°C
                  </span>
                  <span className="text-base shrink-0" title={weatherLabel(w, t)}>
                    {WEATHER_CONFIG[w].icon}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Calculator CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💱</span>
            <h3 className="text-base font-bold">{t.wttPlanMoneyTitle}</h3>
          </div>
          <p className="text-sm text-blue-100 leading-relaxed">
            {t.wttPlanMoneyDesc}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm rounded-xl px-5 py-2.5 hover:bg-blue-50 transition-colors"
          >
            {t.wttCompareMethods}
          </Link>
        </section>

        {/* Back link */}
        <Link
          href="/"
          className="block w-full text-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm font-medium py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {t.wttBackCalc}
        </Link>
      </div>
    </main>
  );
}

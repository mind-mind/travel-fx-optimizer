"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CountryContent, GuideCountry, GuideLang } from "@/lib/guideConfig";
import { VALID_COUNTRIES, COUNTRY_META } from "@/lib/guideConfig";
import type { Translations } from "@/data/translations";
import { fmtCurrency } from "@/lib/formatCurrency";
import { getFestivalsForCountry } from "@/data/festivals";
import { getFestivalName, getFestivalTravelTip } from "@/data/festivalTranslations";

interface Props {
  content: CountryContent;
  t: Translations;
  lang: GuideLang;
  country: GuideCountry;
}

function FeeItem({
  name,
  detail,
  badge,
}: {
  name: string;
  detail: string;
  badge: "red" | "orange";
}) {
  const badgeClass =
    badge === "red"
      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <span
        className={`shrink-0 mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeClass}`}
      >
        Fee
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

function TouristCostExample({
  country,
  currency,
  t,
}: {
  country: GuideCountry;
  currency: string;
  t: Translations;
}) {
  const { atmFeeLocal, exampleWithdrawal, fxFeePercent } = COUNTRY_META[country];
  const fxFeeAmount = Math.round(exampleWithdrawal * fxFeePercent / 100);
  const totalExtra = atmFeeLocal + fxFeeAmount;
  const fmt = (n: number) => fmtCurrency(n, currency);

  return (
    <section className="bg-amber-50 dark:bg-amber-950 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💸</span>
        <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100">
          {t.costExampleTitle}
        </h2>
      </div>

      <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
        {t.costExampleSubtitle} {fmt(exampleWithdrawal)}
      </p>

      <div className="rounded-xl bg-white dark:bg-gray-900 border border-amber-100 dark:border-amber-800 divide-y divide-amber-100 dark:divide-amber-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="text-gray-600 dark:text-gray-400">{t.costExampleWithdrawal}</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">{fmt(exampleWithdrawal)}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="text-gray-600 dark:text-gray-400">{t.costExampleAtmFee}</span>
          <span className="font-semibold text-red-600 dark:text-red-400">+{fmt(atmFeeLocal)}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {t.costExampleFxFeePre} {fxFeePercent}%{t.costExampleFxFeeSuf}
          </span>
          <span className="font-semibold text-red-600 dark:text-red-400">+{fmt(fxFeeAmount)}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-sm bg-amber-50 dark:bg-amber-950">
          <span className="font-bold text-amber-900 dark:text-amber-100">{t.costExampleTotal}</span>
          <span className="font-bold text-red-600 dark:text-red-400">+{fmt(totalExtra)}</span>
        </div>
      </div>

      <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
        {t.costExampleNote}
      </p>

      <div className="rounded-xl bg-amber-100 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 px-4 py-3">
        <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
          💡 {t.costExampleTip}
        </p>
      </div>
    </section>
  );
}

function getCountryName(t: Translations, c: GuideCountry): string {
  const map: Record<GuideCountry, string> = {
    china: t.countryChina,
    japan: t.countryJapan,
    korea: t.countryKorea,
    singapore: t.countrySingapore,
    "hong-kong": t.countryHongKong,
    taiwan: t.countryTaiwan,
    thailand: t.countryThailand,
  };
  return map[c];
}

export function GuidePageContent({ content, t, lang, country }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the user's preferred language if different from URL
    const validLangs = ["en", "th", "es", "zh", "ja", "ko"];
    const storedLang = localStorage.getItem("lang");
    if (storedLang && validLangs.includes(storedLang) && storedLang !== lang) {
      router.replace(`/${storedLang}/how-to-pay/${country}`);
      return;
    }
    if (!storedLang) {
      const browserLang = navigator.language.toLowerCase().split("-")[0];
      const langMap: Record<string, string> = { en: "en", th: "th", es: "es", zh: "zh", ja: "ja", ko: "ko" };
      const detected = langMap[browserLang];
      if (detected && detected !== lang) {
        localStorage.setItem("lang", detected);
        router.replace(`/${detected}/how-to-pay/${country}`);
      }
    }
  }, []);

  const otherCountries = VALID_COUNTRIES.filter((c) => c !== country);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div
        className="pt-12 pb-10 px-4"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm transition-colors"
            >
              {t.guideBack}
            </Link>
            <div className="flex items-center gap-2">
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{content.countryFlag}</span>
            <div>
              <p className="text-blue-200 text-sm font-medium">{t.guideHero}</p>
              <h1 className="text-2xl font-bold text-white leading-tight">
                {t.guideHeroTitle} {content.countryName} {t.guideHeroSuf}
              </h1>
            </div>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">{content.heroTip}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Best Card */}
        <section
          id="best-card"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideBestCardPre} {content.countryName} — {t.guideBestCardTitle}
            </h2>
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              {t.guideBestCardRec}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">{content.bestCard}</p>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {t.guideBestCardMethod}{" "}
            <span className="font-bold">{content.bestPaymentMethod}</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t.guideBestCardCompare}{" "}
            <Link
              href={`/?country=${content.countryCode}`}
              className="text-blue-500 hover:underline"
            >
              {t.guideBestCardLink}
            </Link>
          </p>
        </section>

        {/* Fees */}
        <section
          id="fees"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧾</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideFeesIntlTitle}
            </h2>
          </div>
          <div className="space-y-1">
            {content.fxFeeItems.map((fee, i) => (
              <FeeItem key={i} name={fee.name} detail={fee.detail} badge={i === 1 ? "orange" : "red"} />
            ))}
          </div>
        </section>

        {/* DCC */}
        <section
          id="dcc"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideDccIntlTitle}
            </h2>
          </div>
          <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 space-y-2">
            <p className="text-sm font-bold text-red-800 dark:text-red-300">
              DCC = Dynamic Currency Conversion
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
              {t.guideDccExplanation}
            </p>
            <p className="text-sm font-bold text-red-700 dark:text-red-300">
              ✋ {t.guideDccDecline} {content.currency} {t.guideDccDeclineSuf}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {content.dccNote}
          </p>
        </section>

        {/* Tourist Cost Example */}
        <TouristCostExample country={country} currency={content.currency} t={t} />

        {/* Bank Compare */}
        <section
          id="compare-banks"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideBankIntlTitle} {content.countryName}
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.guideBankCompareDesc}</p>
          <Link
            href={`/?country=${content.countryCode}`}
            className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors"
          >
            {t.guideBankCompareCta} {content.countryName} →
          </Link>
        </section>

        {/* Tips */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideTipsTitle} {content.countryName}
            </h2>
          </div>
          <ul className="space-y-2">
            {content.topTips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="shrink-0 font-bold text-blue-500 mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 p-3">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              {t.guideTipsAvoid}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{content.avoidTip}</p>
          </div>
        </section>

        {/* Popular Attractions */}
        {content.attractions && content.attractions.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {t.tmAttractionsTitle} {content.countryName}
              </h2>
            </div>
            <div className="space-y-3">
              {content.attractions.map((attraction) => (
                <div
                  key={attraction.name}
                  className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{attraction.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{attraction.detail}</p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {attraction.price}
                    </span>
                  </div>
                  {attraction.tip && (
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-blue-500 text-xs mt-0.5">💡</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{attraction.tip}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Festivals & Events */}
        {(() => {
          const countryFestivals = getFestivalsForCountry(country);
          if (countryFestivals.length === 0) return null;
          const currentMonth = new Date().getMonth();
          const nextMonth = (currentMonth + 1) % 12;
          return (
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {t.festivalsTitle}
                </h2>
              </div>
              <div className="space-y-3">
                {countryFestivals.map((festival) => {
                  const isThisMonth = festival.months.includes(currentMonth);
                  const isUpcoming = !isThisMonth && festival.months.includes(nextMonth);
                  const crowdClass =
                    festival.crowdLevel === "high"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      : festival.crowdLevel === "medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
                  const crowdLabel =
                    festival.crowdLevel === "high"
                      ? t.festivalsCrowdHigh
                      : festival.crowdLevel === "medium"
                      ? t.festivalsCrowdMedium
                      : t.festivalsCrowdLow;
                  return (
                    <div
                      key={festival.id}
                      className={`rounded-xl border p-4 space-y-2 ${
                        isThisMonth
                          ? "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950"
                          : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{festival.emoji}</span>
                          <div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                              {getFestivalName(festival.id, festival.name, lang)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{festival.duration}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 shrink-0">
                          {isThisMonth && (
                            <span className="text-[10px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-full">
                              {t.festivalsThisMonth}
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              {t.festivalsUpcoming}
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${crowdClass}`}>
                            {crowdLabel}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {festival.description}
                      </p>
                      {festival.priceImpact && (
                        <p className="text-xs font-semibold text-orange-700 dark:text-orange-400">
                          💰 {t.festivalsPriceImpact}: {festival.priceImpact}
                        </p>
                      )}
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 text-xs shrink-0 mt-0.5">💡</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          <span className="font-semibold">{t.festivalsTipLabel}:</span>{" "}
                          {getFestivalTravelTip(festival.id, festival.travelTip, lang)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })()}

        {/* Other guides */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {t.guideOtherGuides}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {otherCountries.map((c) => {
              const meta = COUNTRY_META[c];
              const name = getCountryName(t, c);
              return (
                <Link
                  key={c}
                  href={`/${lang}/how-to-pay/${c}`}
                  className="flex items-center gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <span>{meta.flag}</span>
                  <span>{name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Back */}
        <Link
          href="/"
          className="block w-full text-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm font-medium py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {t.guideBackBtn}
        </Link>
      </div>
    </main>
  );
}

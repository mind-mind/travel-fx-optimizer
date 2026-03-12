"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { translations } from "@/data/translations";
import type { Translations } from "@/data/translations";
import type { TravelMoneyGuide } from "@/data/travelMoneyGuides";

interface Props {
  guide: TravelMoneyGuide;
  otherGuides: TravelMoneyGuide[];
}

export function TravelMoneyContent({ guide, otherGuides }: Props) {
  const [t, setT] = useState<Translations>(translations.en);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as keyof typeof translations | null;
    if (stored && translations[stored]) {
      setT(translations[stored] as unknown as Translations);
      return;
    }
    const browserLang = navigator.language.toLowerCase().split("-")[0];
    const lang = (browserLang in translations ? browserLang : "en") as keyof typeof translations;
    setT(translations[lang] as unknown as Translations);
  }, []);

  function appMeta(name: string): { icon: string; palette: string } {
    const n = name.toLowerCase();
    if (/suica|pasmo|t-money|octopus|easycard|touch|opal|myki|ic card/.test(n))
      return { icon: "🚇", palette: "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300" };
    if (/apple pay|google pay|samsung pay|nfc|contactless/.test(n))
      return { icon: "📡", palette: "bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300" };
    if (/grab(?!pay)|careem|gojek|uber/.test(n))
      return { icon: "🛺", palette: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300" };
    if (/alipay|wechat|paytm|grabpay|gcash|maya|paymaya|truemoney|ovo|boost|noon|venmo/.test(n))
      return { icon: "📲", palette: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300" };
    if (/paynow|promptpay|duitnow|qris|upi|phonepe|zeropay|kakaopay|line pay/.test(n))
      return { icon: "🔳", palette: "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300" };
    if (/revolut|wise|monzo|starling/.test(n))
      return { icon: "💸", palette: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300" };
    if (/nets|unionpay|payme|cash app/.test(n))
      return { icon: "🏦", palette: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300" };
    return { icon: "📱", palette: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300" };
  }

  function tipTag(note: string): { label: string; style: string } | null {
    const n = note.toLowerCase();
    if (
      /tourist|foreigner|foreign card|passport/.test(n) &&
      /not|cannot|can't|require.*local|require.*korean|require.*japanese|require.*thai/.test(n)
    )
      return {
        label: t.tmLocalsOnly,
        style: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800",
      };
    if (/foreigner can|tourist can|foreigners can|visitors can|link.*foreign|foreign.*card/.test(n))
      return {
        label: t.tmTouristFriendly,
        style: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800",
      };
    if (/essential|must|recommended|everywhere/.test(n))
      return {
        label: t.tmEssential,
        style: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
      };
    return null;
  }

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
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{guide.flag}</span>
            <div>
              <p className="text-blue-200 text-sm font-medium">{t.tmHero}</p>
              <h1 className="text-2xl font-bold text-white leading-tight">{guide.h1}</h1>
            </div>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">{guide.heroTip}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-800/60 px-3 py-1.5">
            <span className="text-blue-200 text-sm">{t.tmDestCurrency}</span>
            <span className="text-white font-bold text-sm">{guide.currency}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* ── Overview: why FX fees hurt ─────────────────────────────── */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmFxLossTitle} {guide.name}?
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {t.tmFxLossDesc}
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="shrink-0 text-red-500 mt-0.5">①</span>
              <span>
                <strong className="text-gray-800 dark:text-gray-200">{t.tmFxFeeLabel}</strong>{" "}
                — {t.tmFxFeeDesc}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 text-red-500 mt-0.5">②</span>
              <span>
                <strong className="text-gray-800 dark:text-gray-200">{t.tmSpreadLabel}</strong>{" "}
                — {t.tmSpreadDesc}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 text-orange-500 mt-0.5">③</span>
              <span>
                <strong className="text-gray-800 dark:text-gray-200">{t.guideDccIntlTitle}</strong>{" "}
                — {t.tmDccDesc}
              </span>
            </li>
          </ul>
        </section>

        {/* ── Typical FX fee table ───────────────────────────────────── */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmFxTableTitle} {guide.name}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{t.tmColMethod}</th>
                  <th className="text-right py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{t.tmColCardFx}</th>
                  <th className="text-right py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{t.tmColSpread}</th>
                  <th className="text-right py-2 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{t.tmColTotal}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {[
                  { icon: "💳", label: t.tmRowStandard, fxFee: 2.5,  spread: 1.0,  best: false },
                  { icon: "💳", label: t.tmRowBasic,    fxFee: 3.5,  spread: 1.0,  best: false },
                  { icon: "✈️", label: t.tmRowTravel,   fxFee: 1.5,  spread: 1.0,  best: false },
                  { icon: "🏧", label: t.tmRowAtm,      fxFee: 2.5,  spread: 0.5,  best: false },
                  { icon: "⭐", label: t.tmRowNoFee,    fxFee: 0,    spread: 1.0,  best: false },
                  { icon: "💵", label: t.tmRowCash,     fxFee: 0,    spread: -0.5, best: true  },
                ].map((row) => {
                  const total = row.fxFee + row.spread;
                  return (
                    <tr key={row.label} className={row.best ? "bg-green-50/60 dark:bg-green-950/30" : ""}>
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-100">
                        {row.icon} {row.label}
                        {row.best && (
                          <span className="ml-2 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-1.5 py-0.5 rounded-full">
                            {t.tmBestRate}
                          </span>
                        )}
                      </td>
                      <td className={`py-2.5 pr-4 text-right tabular-nums ${row.fxFee > 0 ? "text-red-500" : "text-green-600 dark:text-green-400"}`}>
                        {row.fxFee > 0 ? `+${row.fxFee}%` : "0%"}
                      </td>
                      <td className={`py-2.5 pr-4 text-right tabular-nums ${row.spread > 0 ? "text-orange-500" : "text-green-600 dark:text-green-400"}`}>
                        {row.spread > 0 ? `+${row.spread}%` : `${row.spread}%`}
                      </td>
                      <td className={`py-2.5 text-right font-bold tabular-nums ${total > 2 ? "text-red-500" : total > 0 ? "text-orange-500" : "text-green-600 dark:text-green-400"}`}>
                        {total > 0 ? `+${total.toFixed(1)}%` : `${total.toFixed(1)}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            * {t.tmSpreadFootnote}
          </p>
        </section>

        {/* ── Example payment comparison ─────────────────────────────── */}
        {(() => {
          const amt = guide.exampleAmount;
          const fmtAmt = amt.toLocaleString("en");
          const extraCost = (pct: number) => Math.round(Math.abs(amt * pct / 100));
          const fmtExtra = (n: number) => n.toLocaleString("en");

          const scenarios = [
            { icon: "💳", label: t.tmScenStandard, totalPct: 3.5,  saving: false },
            { icon: "💳", label: t.tmScenBasic,    totalPct: 4.5,  saving: false },
            { icon: "✈️", label: t.tmScenTravel,   totalPct: 2.5,  saving: false },
            { icon: "🏧", label: t.tmScenAtm,      totalPct: 3.0,  saving: false },
            { icon: "⭐", label: t.tmScenNoFee,    totalPct: 1.0,  saving: false },
            { icon: "💵", label: t.tmScenCash,     totalPct: -0.5, saving: true  },
          ];

          const cheapestPct = Math.min(...scenarios.map((s) => s.totalPct));

          return (
            <section id="fee-comparison" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {t.tmExampleTitle} {fmtAmt} {guide.currency}
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.tmExampleDesc}
              </p>
              <div className="space-y-2">
                {scenarios.map((s) => {
                  const extra = extraCost(Math.abs(s.totalPct));
                  const isCheapest = s.totalPct === cheapestPct;
                  const sign = s.totalPct >= 0 ? "+" : "−";
                  const pctLabel = `${sign}${Math.abs(s.totalPct).toFixed(1)}%`;
                  const costLabel = s.saving
                    ? `${t.tmSave} ${fmtExtra(extra)} ${guide.currency}`
                    : extra === 0
                    ? t.tmNoExtraCost
                    : `+${fmtExtra(extra)} ${guide.currency} ${t.tmExtraLabel}`;

                  return (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                        isCheapest
                          ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{s.icon}</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                          {s.label}
                        </span>
                        {isCheapest && (
                          <span className="shrink-0 text-[10px] font-bold text-green-600 dark:text-green-300 bg-green-100 dark:bg-green-900 px-1.5 py-0.5 rounded-full">
                            {t.tmCheapest}
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className={`text-sm font-bold tabular-nums ${
                          s.saving ? "text-green-600 dark:text-green-400"
                          : s.totalPct <= 1 ? "text-amber-600 dark:text-amber-400"
                          : "text-red-500"
                        }`}>
                          {costLabel}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">{pctLabel} {t.tmVsMid}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t.tmActualCosts}{" "}
                <Link href={`/?country=${guide.countryCode}`} className="text-blue-500 hover:underline">
                  {t.tmUseCalc}
                </Link>
              </p>
            </section>
          );
        })()}

        {/* Best Payment Method */}
        <section id="best-card" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmBestPayTitle} {guide.name}
            </h2>
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              {t.tmRecommended}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {guide.bestPaymentMethod}
            </p>
          </div>
          {guide.cardTip && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{t.tmCardTip} </span>
              {guide.cardTip}
            </p>
          )}
        </section>

        {/* Local Payment Apps */}
        {guide.localPaymentApps.length > 0 && (() => {
          return (
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">
                    {t.tmLocalAppsTitle}
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {t.tmLocalAppsDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {guide.localPaymentApps.map((app) => {
                  const { icon, palette } = appMeta(app.name);
                  const tag = tipTag(app.note);
                  const [shortNote, ...rest] = app.note.split(/—|\.(?= )/);
                  const detail = rest.join(". ").trim();
                  return (
                    <div
                      key={app.name}
                      className={`flex items-start gap-3 rounded-xl border p-4 ${palette.split(" ").slice(0, 2).join(" ")} ${palette.split(" ").slice(2, 4).join(" ")}`}
                    >
                      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl border ${palette.split(" ").slice(4).join(" ")} bg-white/60 dark:bg-black/20`}>
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                            {app.name}
                          </p>
                          {tag && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tag.style}`}>
                              {tag.label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {shortNote.trim()}
                          {detail && <span className="text-gray-400 dark:text-gray-500"> — {detail}</span>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })()}

        {/* DCC Warning */}
        <section id="dcc" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmDccTitle}
            </h2>
          </div>
          <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 space-y-2">
            <p className="text-sm font-bold text-red-800 dark:text-red-300">
              DCC = Dynamic Currency Conversion
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
              {t.tmDccWarningPre} {guide.currency} {t.tmDccWarningSuf}
            </p>
            <p className="text-sm font-bold text-red-700 dark:text-red-300">
              {t.tmAlwaysPayIn} {guide.currency} {t.tmNotHomeCurrency}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {guide.dccNote}
          </p>
        </section>

        {/* Compare Rates CTA */}
        <section id="compare-banks" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmCompareTitle} {guide.name}
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.tmCompareDesc}
          </p>
          <Link
            href={`/?country=${guide.countryCode}`}
            className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors"
          >
            {t.tmCompareCta} {guide.name} ({guide.currency}) →
          </Link>
        </section>

        {/* Top Tips */}
        <section id="tips" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmTipsTitle} {guide.name}
            </h2>
          </div>
          <ul className="space-y-3">
            {guide.topTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="shrink-0 font-bold text-blue-500 mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ATM Tips */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏧</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmAtmTipsTitle} {guide.name}
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {guide.atmTip}
          </p>
        </section>

        {/* What to Avoid */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚫</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmAvoidTitle} {guide.name}
            </h2>
          </div>
          <ul className="space-y-3">
            {guide.avoidList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 text-red-500 font-bold mt-0.5">✗</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* VAT Refund */}
        {guide.vatInfo && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧾</span>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {t.tmVatTitle}
              </h2>
            </div>
            <div className="rounded-xl bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 p-4">
              <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                {guide.vatInfo}
              </p>
            </div>
          </section>
        )}

        {/* Popular Attractions */}
        {guide.attractions && guide.attractions.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {t.tmAttractionsTitle} {guide.name}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.tmAttractionsDesc}
            </p>
            <div className="space-y-3">
              {guide.attractions.map((attraction) => (
                <div
                  key={attraction.name}
                  className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug">
                        {attraction.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {attraction.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {attraction.ticketPrice}
                    </span>
                  </div>
                  {attraction.fxNote && (
                    <div className="flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 px-3 py-2">
                      <span className="shrink-0 text-amber-500 text-xs mt-0.5">💱</span>
                      <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                        {attraction.fxNote}
                      </p>
                    </div>
                  )}
                  {attraction.tip && (
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-blue-500 text-xs mt-0.5">💡</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {attraction.tip}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌏</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.tmOtherGuides}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {otherGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/travel-money/${g.slug}`}
                className="flex items-center gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors p-3 text-sm"
              >
                <span className="text-xl">{g.flag}</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs">{g.name}</p>
                  <p className="text-xs text-gray-400">{g.currency}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/"
            className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
          >
            {t.tmBackCalc}
          </Link>
        </section>
      </div>
    </main>
  );
}

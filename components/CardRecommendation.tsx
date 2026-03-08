"use client";

import { ComparisonResult } from "@/lib/types";
import { PaymentMethod } from "@/lib/types";
import { Translations } from "@/data/translations";
import { fmtCurrency, fmtCurrencyRound } from "@/lib/formatCurrency";
import {
  RECOMMENDED_CARDS,
  SAVINGS_BENCHMARK_FX_PERCENT,
  SAVINGS_SIMULATION_THRESHOLD_HOME,
  LOW_FX_THRESHOLD,
  HIGH_FX_THRESHOLD,
} from "@/data/cards";

interface Props {
  selected: ComparisonResult;
  amountForeign: number;
  midRate: number;
  method: PaymentMethod;
  homeCurrency: string;
  t: Translations;
}

const fmt = (n: number, currency: string) => fmtCurrency(n, currency);
const fmtRound = (n: number, currency: string) => fmtCurrencyRound(n, currency);

/** Determine badge colour tier based on FX fee */
function getFxTier(fee: number): "low" | "mid" | "high" {
  if (fee <= LOW_FX_THRESHOLD) return "low";
  if (fee <= HIGH_FX_THRESHOLD) return "mid";
  return "high";
}

// How many card suggestions to display
const TOP_N = 3;

export default function CardRecommendation({ selected, amountForeign, midRate, method, homeCurrency, t }: Props) {
  // Only meaningful for card-linked payment methods
  if (method === "Cash") return null;
  if (selected.fxFeePercent === 0) return null;

  const tier = getFxTier(selected.fxFeePercent);
  const midRateHome = amountForeign * midRate;

  const showSavings =
    selected.totalHome >= SAVINGS_SIMULATION_THRESHOLD_HOME &&
    selected.fxFeePercent > SAVINGS_BENCHMARK_FX_PERCENT;

  const potentialSaving = showSavings
    ? midRateHome * (selected.fxFeePercent - SAVINGS_BENCHMARK_FX_PERCENT) / 100
    : 0;

  // Top N lowest-fee cards, sorted ascending
  const topCards = [...RECOMMENDED_CARDS]
    .sort((a, b) => a.fxFeePercent - b.fxFeePercent)
    .slice(0, TOP_N);

  const badgeStyles = {
    low: {
      wrapper: "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700",
      dot: "bg-green-500",
      text: "text-green-800 dark:text-green-200",
      sub: "text-green-600 dark:text-green-400",
    },
    mid: {
      wrapper: "bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700",
      dot: "bg-amber-400",
      text: "text-amber-800 dark:text-amber-200",
      sub: "text-amber-600 dark:text-amber-400",
    },
    high: {
      wrapper: "bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700",
      dot: "bg-red-500",
      text: "text-red-800 dark:text-red-200",
      sub: "text-red-600 dark:text-red-400",
    },
  }[tier];

  const badgeLabel = {
    low: t.cardRecBadgeLow,
    mid: t.cardRecBadgeMid,
    high: t.cardRecBadgeHigh,
  }[tier];

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-5">
      {/* ── Section header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-1">
          💳 {t.cardRecTopN}
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          {t.cardRecTitle}
        </h2>
      </div>

      {/* ── FX Fee badge ── */}
      <div className={`rounded-xl border p-4 flex items-start gap-3 ${badgeStyles.wrapper}`}>
        <span className={`mt-1 shrink-0 h-2.5 w-2.5 rounded-full ${badgeStyles.dot}`} />
        <div className="min-w-0">
          <p className={`text-xs font-semibold ${badgeStyles.sub} mb-0.5`}>
            {t.cardRecBadgeLabel} {selected.fxFeePercent}% {t.cardRecFxFeeLabel}
          </p>
          <p className={`text-sm font-bold leading-snug ${badgeStyles.text}`}>
            {badgeLabel}
          </p>
        </div>
      </div>

      {/* ── Savings Simulation ── */}
      {showSavings && (
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400">
            💡 {t.cardRecSavingsTitle}
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            {t.cardRecSavingsPre}{" "}
            <span className="font-bold">{fmtRound(selected.totalHome, homeCurrency)}</span>{" "}
            {t.cardRecSavingsMid}{" "}
            <span className="font-bold">{selected.fxFeePercent}%</span>{" "}
            {t.cardRecSavingsTo}
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {fmtRound(potentialSaving, homeCurrency)}
            </span>{" "}
            {t.cardRecSavingsSuf}
          </p>
        </div>
      )}

      {/* ── Card Suggestions ── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {t.cardRecSuggestTitle}
        </p>
        {topCards.map((card) => {
          const isCurrent = card.fxFeePercent === selected.fxFeePercent;
          const savingVsCurrent = midRateHome * (selected.fxFeePercent - card.fxFeePercent) / 100;
          const showCardSaving = !isCurrent && savingVsCurrent > 0;

          return (
            <div
              key={card.id}
              className={`rounded-xl border p-4 space-y-2.5 ${
                card.fxFeePercent <= LOW_FX_THRESHOLD
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950"
                  : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
              }`}
            >
              {/* Card header row */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                    {card.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{card.bank}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      card.fxFeePercent <= LOW_FX_THRESHOLD
                        ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    ~{card.fxFeePercent}% {t.cardRecFxFeeLabel}
                  </span>
                </div>
              </div>

              {/* Fee details row */}
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {t.cardRecAnnualFee}:{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {card.annualFeeLabel}
                  </span>
                  {card.annualFeeWaivable && (
                    <span className="ml-1 text-blue-500">({t.cardRecWaivable})</span>
                  )}
                </span>
                {card.approximate && (
                  <span className="italic text-gray-400 dark:text-gray-500">
                    {t.cardRecApprox}
                  </span>
                )}
              </div>

              {/* Potential saving vs current selection */}
              {showCardSaving && (
                <p className="text-xs font-semibold text-green-700 dark:text-green-300">
                  ✓ {t.cardRecCardEstSaving}{fmtRound(savingVsCurrent, homeCurrency)} {t.cardRecCardEstSavingSuf}
                </p>
              )}

              {/* Verify link */}
              <a
                href={card.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                {t.cardRecVerify}
              </a>
            </div>
          );
        })}
      </div>

      {/* ── Transparency note ── */}
      <div className="flex items-start gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-4 py-3">
        <span className="shrink-0 text-gray-400 dark:text-gray-500 text-sm">ℹ️</span>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {t.cardRecTransparencyNote}
        </p>
      </div>
    </div>
  );
}

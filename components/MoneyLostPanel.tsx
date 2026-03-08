"use client";

import Link from "next/link";
import { ComparisonResult } from "@/lib/types";
import { fmtCurrency } from "@/lib/formatCurrency";
import { CODE_TO_COUNTRY } from "@/lib/guideConfig";

interface Props {
  selected: ComparisonResult;
  midRate: number;
  amountForeign: number;
  currency: string;
  homeCurrency: string;
  results: ComparisonResult[];
  countryCode?: string;
  lang?: string;
}



export default function MoneyLostPanel({
  selected,
  midRate,
  amountForeign,
  currency,
  homeCurrency,
  results,
  countryCode,
  lang,
}: Props) {
  const midHome = amountForeign * midRate;
  const guideCountry = countryCode ? (CODE_TO_COUNTRY[countryCode] ?? null) : null;
  const guideHref = guideCountry && lang ? `/${lang}/how-to-pay/${guideCountry}` : null;
  const lossVsMid = selected.totalHome - midHome;
  const cheapest = results.find((r) => r.isCheapest);
  const savingsVsBest = cheapest ? selected.totalHome - cheapest.totalHome : 0;

  // Already on best/free option
  if (lossVsMid <= 0.005 && savingsVsBest <= 0.005) {
    return (
      <div className="rounded-2xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎉</span>
          <div>
            <p className="text-sm font-bold text-green-800 dark:text-green-300">
              Best option — near-zero extra cost!
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">
              This is the most cost-effective way to pay{" "}
              {amountForeign.toLocaleString("en")} {currency}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const lossDisplay = Math.max(lossVsMid, 0);
  const lossPercent = midHome > 0 ? (lossDisplay / midHome) * 100 : 0;

  const breakdown: { label: string; percent: number; cost: number }[] = [];
  if (selected.fxFeePercent > 0) {
    breakdown.push({
      label: "Card FX fee",
      percent: selected.fxFeePercent,
      cost: selected.fxFeeHome,
    });
  }
  if (selected.spreadPercent > 0) {
    breakdown.push({
      label: "Exchange rate spread",
      percent: selected.spreadPercent,
      cost: selected.spreadCostHome,
    });
  }

  return (
    <div className="rounded-2xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-5 space-y-4">
      {/* Headline */}
      <div className="flex items-start gap-3">
        <span className="text-3xl leading-none mt-0.5">💸</span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-red-500 dark:text-red-400 mb-1">
            ⚠️ Hidden FX Charge Detected
          </p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200 leading-snug">
            You're overpaying{" "}
            <span className="text-2xl font-extrabold">
              {fmtCurrency(lossDisplay, homeCurrency)}
            </span>{" "}
            <span className="text-base font-semibold text-red-600 dark:text-red-400">
              (+{lossPercent.toFixed(1)}%)
            </span>
          </p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            vs the real mid-market rate — money that goes to your bank, not your trip
          </p>
        </div>
      </div>

      {/* Breakdown */}
      {breakdown.length > 0 && (
        <div className="bg-white/70 dark:bg-red-900/20 rounded-xl p-3 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Fee breakdown
          </p>
          {breakdown.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-600 dark:text-gray-300">
                {item.label}{" "}
                <span className="text-xs text-gray-400">(+{item.percent}%)</span>
              </span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                +{fmtCurrency(item.cost, homeCurrency)}
              </span>
            </div>
          ))}
          <div className="border-t border-red-100 dark:border-red-800 pt-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Total extra cost
            </span>
            <span className="font-bold text-red-600 dark:text-red-400">
              {fmtCurrency(lossDisplay, homeCurrency)}
            </span>
          </div>
        </div>
      )}

      {/* Educational microcopy */}
      <p className="text-xs text-red-500 dark:text-red-400 leading-relaxed">
        Many tourists unknowingly pay 3–8% more due to FX spreads and card fees. The right card or method can eliminate most of this cost.
      </p>

      {guideHref && (
        <Link
          href={guideHref}
          className="block w-full text-center rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-semibold py-3 transition-colors"
        >
          🗺️ How to avoid this fee — travel money guide →
        </Link>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ComparisonResult } from "@/lib/types";
import { CODE_TO_COUNTRY } from "@/lib/guideConfig";
import { Translations, Lang } from "@/data/translations";
import { fmtCurrency } from "@/lib/formatCurrency";

interface Props {
  selected: ComparisonResult;
  midRate: number;
  amountForeign: number;
  currency: string;
  homeCurrency: string;
  countryCode: string;
  t: Translations;
  lang: Lang;
}



export default function InsightPanel({
  selected,
  midRate,
  amountForeign,
  currency,
  homeCurrency,
  countryCode,
  t,
  lang,
}: Props) {
  const fmt = (n: number) => fmtCurrency(n, homeCurrency);
  const midRateHome = amountForeign * midRate;
  const lossHome = selected.totalHome - midRateHome;
  const lossPercent = midRateHome > 0 ? (lossHome / midRateHome) * 100 : 0;
  const guideCountry = CODE_TO_COUNTRY[countryCode] ?? null;
  const guideHref = guideCountry ? `/${lang}/how-to-pay/${guideCountry}` : null;
  const guideDisplayName = guideCountry
    ? guideCountry.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : countryCode;

  if (lossHome <= 0) {
    return (
      <div className="rounded-2xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✅</span>
          <div>
            <p className="text-sm font-bold text-green-800 dark:text-green-300">
              {t.insightBetterTitle}
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">
              {t.insightBetterPre}{" "}
              <span className="font-semibold">{fmt(Math.abs(lossHome))}</span>{" "}
              {t.insightBetterSuf}
            </p>
          </div>
        </div>

        {guideHref && (
          <Link
            href={guideHref}
            className="block w-full text-center rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 transition-colors"
          >
            📖 {t.insightCtaPre} {guideDisplayName} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">📊</span>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
          {t.insightTitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.insightMidRateLabel}</p>
          <p className="text-base font-bold text-gray-600 dark:text-gray-300">
            {fmt(midRateHome)}
          </p>
        </div>
        <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-800 p-3 text-center">
          <p className="text-xs text-red-500 dark:text-red-400 mb-1">{t.insightActualCostLabel}</p>
          <p className="text-base font-bold text-red-600 dark:text-red-400">
            {fmt(selected.totalHome)}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            {t.insightDiffLabel}
          </p>
          <p className="text-base font-bold text-red-600 dark:text-red-400">
            +{fmt(lossHome)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-red-500 dark:text-red-500">
            {t.insightPctLabel}
          </p>
          <p className="text-xs font-semibold text-red-500 dark:text-red-500">
            +{lossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="shrink-0 mt-0.5">💬</span>
        <p>
          {t.insightLossPre}{" "}
          <span className="font-bold text-red-600 dark:text-red-400">
            {fmt(lossHome)}
          </span>{" "}
          ({lossPercent.toFixed(2)}%) {t.insightLossSuf}
        </p>
      </div>

      {guideHref && (
        <Link
          href={guideHref}
          className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors"
        >
          📖 {t.insightCtaPre} {guideDisplayName} →
        </Link>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ComparisonResult } from "@/lib/types";
import { getGuideByCode } from "@/data/countryGuides";
import { Translations, Lang } from "@/data/translations";

interface Props {
  selected: ComparisonResult;
  midRate: number;
  amountForeign: number;
  currency: string;
  countryCode: string;
  t: Translations;
  lang: Lang;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export default function InsightPanel({
  selected,
  midRate,
  amountForeign,
  currency,
  countryCode,
  t,
  lang,
}: Props) {
  const midRateTHB = amountForeign * midRate;
  const lossTHB = selected.totalTHB - midRateTHB;
  const lossPercent = midRateTHB > 0 ? (lossTHB / midRateTHB) * 100 : 0;
  const guide = getGuideByCode(countryCode);
  const countryName = guide
    ? lang === "th"
      ? guide.countryName
      : guide.countryNameEn
    : "";

  if (lossTHB <= 0) {
    // Selected option is at or below mid-rate — show positive framing
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
              <span className="font-semibold">฿{fmt(Math.abs(lossTHB))}</span>{" "}
              {t.insightBetterSuf}
            </p>
          </div>
        </div>

        {guide && (
          <Link
            href={`/${guide.slug}`}
            className="block w-full text-center rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 transition-colors"
          >
            {t.insightCtaPre} {countryName} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📊</span>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
          {t.insightTitle}
        </p>
      </div>

      {/* Mid-rate vs actual */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.insightMidRateLabel}</p>
          <p className="text-base font-bold text-gray-600 dark:text-gray-300">
            ฿{fmt(midRateTHB)}
          </p>
        </div>
        <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-800 p-3 text-center">
          <p className="text-xs text-red-500 dark:text-red-400 mb-1">{t.insightActualCostLabel}</p>
          <p className="text-base font-bold text-red-600 dark:text-red-400">
            ฿{fmt(selected.totalTHB)}
          </p>
        </div>
      </div>

      {/* Loss highlight */}
      <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            {t.insightDiffLabel}
          </p>
          <p className="text-base font-bold text-red-600 dark:text-red-400">
            +฿{fmt(lossTHB)}
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

      {/* Explanation */}
      <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="shrink-0 mt-0.5">💬</span>
        <p>
          {t.insightLossPre}{" "}
          <span className="font-bold text-red-600 dark:text-red-400">
            ฿{fmt(lossTHB)}
          </span>{" "}
          ({lossPercent.toFixed(2)}%) {t.insightLossSuf}
        </p>
      </div>

      {/* CTA */}
      {guide && (
        <Link
          href={`/${guide.slug}`}
          className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors"
        >
          {t.insightCtaPre} {countryName} →
        </Link>
      )}
    </div>
  );
}

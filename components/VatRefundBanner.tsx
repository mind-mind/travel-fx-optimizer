"use client";

import { Translations } from "@/data/translations";

interface Props {
  amount: number;
  estimatedRefund: number;
  vatRate: number;
  minAmount: number;
  meetsMinimum: boolean;
  currency: string;
  t: Translations;
}

const fmt = (n: number, currency: string) =>
  n.toLocaleString("th-TH", {
    minimumFractionDigits: currency === "KRW" ? 0 : 2,
    maximumFractionDigits: currency === "KRW" ? 0 : 2,
  });

export default function VatRefundBanner({
  amount,
  estimatedRefund,
  vatRate,
  minAmount,
  meetsMinimum,
  currency,
  t,
}: Props) {
  const rateLabel = `${(vatRate * 100).toFixed(0)}%`;
  const shortfall = minAmount - amount;

  if (!meetsMinimum) {
    return (
      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🧾</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{t.vatBelowMinTitle}</p>

            <div className="mt-3 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 border border-amber-200 dark:border-amber-900">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.vatMinimum} ({rateLabel})</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {fmt(minAmount, currency)} {currency}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.vatBelowMin}</p>
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {fmt(shortfall, currency)} {currency} {t.vatBelowMinSuffix}
                </p>
              </div>
            </div>

            <p className="text-xs text-amber-700 dark:text-amber-400 mt-2.5 leading-snug">{t.vatWarning}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🧾</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">{t.vatTitle}</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">{t.vatMessage}</p>

          <div className="mt-3 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 border border-emerald-200 dark:border-emerald-900">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.vatPurchaseAmount}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {fmt(amount, currency)} {currency}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.vatEstRefund} ({rateLabel})</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                +{fmt(estimatedRefund, currency)} {currency}
              </p>
            </div>
          </div>

          <p className="text-xs text-amber-700 dark:text-amber-400 mt-2.5 leading-snug">{t.vatWarning}</p>
        </div>
      </div>
    </div>
  );
}

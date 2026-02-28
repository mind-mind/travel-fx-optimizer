"use client";

import { Translations } from "@/data/translations";

interface Props {
  amount: number;
  estimatedRefund: number;
  vatRate: number;
  currency: string;
  t: Translations;
}

const fmt = (n: number, currency: string) =>
  n.toLocaleString("th-TH", {
    minimumFractionDigits: currency === "KRW" ? 0 : 2,
    maximumFractionDigits: currency === "KRW" ? 0 : 2,
  });

export default function VatRefundBanner({ amount, estimatedRefund, vatRate, currency, t }: Props) {
  const rateLabel = `${(vatRate * 100).toFixed(0)}%`;

  return (
    <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🧾</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-800">{t.vatTitle}</p>
          <p className="text-xs text-emerald-700 mt-0.5">{t.vatMessage}</p>

          <div className="mt-3 flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-emerald-200">
            <div>
              <p className="text-xs text-gray-500">{t.vatPurchaseAmount}</p>
              <p className="text-sm font-semibold text-gray-800">
                {fmt(amount, currency)} {currency}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{t.vatEstRefund} ({rateLabel})</p>
              <p className="text-sm font-bold text-emerald-600">
                +{fmt(estimatedRefund, currency)} {currency}
              </p>
            </div>
          </div>

          <p className="text-xs text-amber-700 mt-2.5 leading-snug">{t.vatWarning}</p>
        </div>
      </div>
    </div>
  );
}

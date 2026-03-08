"use client";

import { ComparisonResult } from "@/lib/types";

interface Props {
  results: ComparisonResult[];
  homeCurrency: string;
}

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function getPayLabel(r: ComparisonResult): string {
  if (r.bank === "Cash") return "Pay with cash";
  if (r.method === "ATM") return "Withdraw cash at an ATM";
  if (r.bank === "No-fee card") return "Use a no-FX-fee card (e.g. Wise, Revolut)";
  if (r.bank === "Travel card") return "Use a travel card";
  if (r.bank === "Basic card") return `Pay with a basic card — ${r.method}`;
  return `Pay with ${r.bank} — ${r.method}`;
}

export default function BestMethodCard({
  results,
  homeCurrency,
}: Props) {
  const cheapestAll = results.filter((r) => r.isCheapest);
  const cheapest = cheapestAll[0] ?? null;
  const mostExpensive = results.reduce((a, b) =>
    a.totalHome > b.totalHome ? a : b
  );
  const maxSavings = cheapest ? mostExpensive.totalHome - cheapest.totalHome : 0;

  if (!cheapest || maxSavings < 0.01) return null;

  const isTie = cheapestAll.length > 1;

  return (
    <div className="rounded-2xl bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700 p-5 space-y-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-1">
          🏆 Cheapest way to pay right now
        </p>
        <p className="text-xl font-extrabold text-green-800 dark:text-green-200 leading-snug">
          {isTie
            ? cheapestAll.map((r) => getPayLabel(r)).join(" or ")
            : getPayLabel(cheapest)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white dark:bg-green-900/30 rounded-xl px-4 py-3 text-center">
          <p className="text-[11px] text-green-600 dark:text-green-400 font-medium mb-0.5">
            Total cost
          </p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">
            {fmt(cheapest.totalHome, homeCurrency)}
          </p>
        </div>
        <div className="flex-1 bg-white dark:bg-green-900/30 rounded-xl px-4 py-3 text-center">
          <p className="text-[11px] text-green-600 dark:text-green-400 font-medium mb-0.5">
            You save
          </p>
          <p className="text-2xl font-extrabold text-green-700 dark:text-green-300">
            {fmt(maxSavings, homeCurrency)}
          </p>
        </div>
      </div>

      <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">
        Compared to the most expensive option.
      </p>
    </div>
  );
}

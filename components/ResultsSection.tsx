"use client";

import { ComparisonResult } from "@/lib/types";
import { BankName, PaymentMethod } from "@/lib/types";
import { Translations } from "@/data/translations";

interface Props {
  results: ComparisonResult[];
  selectedBank: BankName;
  selectedMethod: PaymentMethod;
  amountForeign: number;
  midRate: number;
  currency: string;
  homeCurrency: string;
  rateTimestamp: string | null;
  rateFallback: boolean;
  refreshMinutes: number;
  t: Translations;
  /** If false, suppresses the green best-method callout (rendered separately by parent) */
  showBestCallout?: boolean;
}

function makeFmt(homeCurrency: string) {
  return (n: number) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: homeCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
}

const methodIcon: Record<string, string> = {
  "Credit Card": "💳",
  "Debit Card": "🏧",
  "Apple Pay": "🍎",
  "Google Pay": "🔵",
  Alipay: "🔵",
  "WeChat Pay": "🟢",
  ATM: "🏧",
  Cash: "💵",
};

export default function ResultsSection({
  results,
  selectedBank,
  selectedMethod,
  amountForeign,
  midRate,
  currency,
  homeCurrency,
  rateTimestamp,
  rateFallback,
  refreshMinutes,
  t,
  showBestCallout = true,
}: Props) {
  const fmt = makeFmt(homeCurrency);
  const selected = results.find(
    (r) => r.bank === selectedBank && r.method === selectedMethod
  );
  const cheapestAll = results.filter((r) => r.isCheapest);
  const cheapest = cheapestAll[0] ?? null;
  const isTie = cheapestAll.length > 1;
  const mostExpensive = results.reduce((a, b) => (a.totalHome > b.totalHome ? a : b));
  const maxSavings = cheapest ? mostExpensive.totalHome - cheapest.totalHome : 0;

  // Reference total for "extra cost vs standard" labels
  const standardRef = results.find(
    (r) => r.bank === "Standard card" && r.method === "Credit Card"
  ) ?? mostExpensive;

  const isSelectedCheapest = selected?.isCheapest ?? false;
  const potentialSaving =
    selected && cheapest && !isSelectedCheapest ? selected.totalHome - cheapest.totalHome : 0;

  // Separate cash from bank-tied results
  const cashResult = results.find((r) => r.bank === "Cash");
  const bankNames = [...new Set(results.filter((r) => r.bank !== "Cash").map((r) => r.bank))];
  const updatedAtLabel = rateTimestamp
    ? new Date(rateTimestamp).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  return (
    <div className="space-y-5">
      {/* 🏆 Best-option callout — hidden when rendered separately by parent */}
      {showBestCallout && cheapest && maxSavings > 0 && (
        <div className="rounded-2xl bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700 p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-0.5">
              {t.bestMethodNow}
            </p>
            <p className="text-sm font-bold text-green-800 dark:text-green-200 leading-snug">
              {isTie
                ? cheapestAll.map((r) => r.bank === "Cash" ? "💵 Cash" : `${methodIcon[r.method]} ${r.bank} (${r.method})`).join(", ")
                : cheapest.bank === "Cash" ? "💵 Cash" : `${methodIcon[cheapest.method]} ${cheapest.bank} — ${cheapest.method}`}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-green-600 dark:text-green-400">{t.maxPotentialSaving}</p>
            <p className="text-base font-bold text-green-700 dark:text-green-300">-{fmt(maxSavings)}</p>
          </div>
        </div>
      )}
      {/* Selected option summary card */}
      {selected && (
        <div
          className="rounded-2xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.yourSelection}
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {methodIcon[selected.method]} {selected.bank === "Cash" ? "Cash" : `${selected.bank} — ${selected.method}`}
              </p>
            </div>
            {isSelectedCheapest && (
              <span className="rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
                {isTie ? t.lowestCostTie : t.lowestCost}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{t.totalCost}</p>
              <p className="text-base font-bold text-gray-800 dark:text-gray-100">
                {fmt(selected.totalHome)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{t.fxFee}</p>
              <p className="text-base font-bold text-red-500">
                {fmt(selected.fxFeeHome)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{t.spreadCost}</p>
              <p className="text-base font-bold text-orange-500">
                {fmt(selected.spreadCostHome)}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t.effectiveRate}: {selected.effectiveRate.toFixed(4)} {homeCurrency}/{currency} &nbsp;·&nbsp;
            {t.fee}: {selected.fxFeePercent}%
          </p>
        </div>
      )}

      {/* Savings banner */}
      {!isSelectedCheapest && potentialSaving > 0 && cheapest && (() => {
        let payLabel = "Switch to a better option";
        if (cheapest.bank === "Cash") payLabel = "Pay with cash";
        else if (cheapest.bank === "No-fee card") payLabel = "Use a no-FX-fee card (e.g. Wise, Revolut)";
        else if (cheapest.bank === "Travel card") payLabel = "Use a travel card";
        else if (cheapest.method === "ATM") payLabel = "Withdraw at an ATM";
        else payLabel = `Switch to ${cheapest.bank}`;
        return (
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 p-4 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                {payLabel} and save{" "}
                <span className="font-extrabold text-base">{fmt(potentialSaving)}</span>{" "}
                on this payment
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                Total would be {fmt(cheapest.totalHome)} instead of {fmt(selected!.totalHome)}
              </p>
            </div>
          </div>
        );
      })()}

      {/* All options by bank */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {t.allOptions}
        </h2>
        <div className="space-y-3">
          {/* Cash — standalone card, no bank */}
          {cashResult && (() => {
            const isSelected = selectedMethod === "Cash";
            return (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950 border-b border-emerald-100 dark:border-emerald-900 flex items-center justify-between">
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">💵 Cash</p>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      {rateFallback ? "Estimated" : "Live estimate"} · Updated {updatedAtLabel}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Based on mid-market FX rate · No card fee · Refreshes every {refreshMinutes} min
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center justify-between px-4 py-3 ${
                    isSelected ? "ring-1 ring-inset ring-blue-400" : ""
                  }${cashResult.isCheapest ? " bg-green-50/50 dark:bg-green-950/30" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💵</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Cash</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {cashResult.effectiveRate.toFixed(4)} {homeCurrency}/{currency} · 0% fee
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                      {fmt(cashResult.totalHome)}
                    </p>
                    {cashResult.isCheapest && (
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                        {isTie ? t.lowestCostTie : "✓ Cheapest"}
                      </span>
                    )}
                    {!cashResult.isCheapest && cheapest && (
                      <span className="text-xs font-medium text-orange-500 dark:text-orange-400">
                        +{fmt(cashResult.totalHome - cheapest.totalHome)} vs cheapest
                      </span>
                    )}
                    {isSelected && !cashResult.isCheapest && (
                      <span className="text-xs font-semibold text-blue-500 block">{t.selected}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {bankNames.map((bankName) => {
            const bankResults = results.filter((r) => r.bank === bankName);
            return (
              <div
                key={bankName}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
              >
                <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{bankName}</p>
                    <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      rateFallback
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                    }`}>
                      {rateFallback ? "Estimated" : "Live estimate"}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Updated {updatedAtLabel} · every {refreshMinutes} min
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Based on mid-market FX rate
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {bankResults.map((r) => {
                    const isSelected =
                      r.bank === selectedBank && r.method === selectedMethod;
                    return (
                      <div
                        key={`${r.bank}-${r.method}`}
                        className={`flex items-center justify-between px-4 py-3 ${
                          isSelected ? "ring-1 ring-inset ring-blue-400" : ""
                        }${r.isCheapest ? " bg-green-50/50 dark:bg-green-950/30" : ""}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{methodIcon[r.method]}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                              {r.method}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {r.effectiveRate.toFixed(4)} {homeCurrency}/{currency}
                              {r.fxFeePercent > 0 ? ` + ${r.fxFeePercent}% fee` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            {fmt(r.totalHome)}
                          </p>
                          {r.isCheapest && (
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                              {isTie ? t.lowestCostTie : "✓ Cheapest"}
                            </span>
                          )}
                          {!r.isCheapest && r.totalHome < standardRef.totalHome && (
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                              Saves {fmt(standardRef.totalHome - r.totalHome)} vs standard
                            </span>
                          )}
                          {!r.isCheapest && r.totalHome >= standardRef.totalHome && cheapest && (
                            <span className="text-xs font-medium text-orange-500 dark:text-orange-400">
                              +{fmt(r.totalHome - cheapest.totalHome)} extra cost
                            </span>
                          )}
                          {isSelected && !r.isCheapest && (
                            <span className="text-xs font-semibold text-blue-500 block">
                              {t.selected}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DCC warning — shown whenever Credit Card is selected (transaction currency is foreign) */}
      {selectedMethod === "Credit Card" && (
        <div className="rounded-2xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
          <span className="text-2xl shrink-0">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              {t.dccWarningTitle}
            </p>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1 leading-relaxed">
              {t.dccWarningBody}
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Disclaimer</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
          {t.estimationNote}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
          Rates from exchangerate.host (mid-market). Actual rates charged by your card issuer may differ.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
          Note: Alipay/WeChat Pay calculations use the card-linked fee (same % as your selected card tier).
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Calculated on {amountForeign.toLocaleString("en")} {currency} · mid-market rate {midRate.toFixed(4)} {homeCurrency}/{currency}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Rate status: {rateFallback ? "Estimated (fallback)" : "Live estimate"} · Updated {updatedAtLabel} · every {refreshMinutes} min
        </p>
      </div>
    </div>
  );
}

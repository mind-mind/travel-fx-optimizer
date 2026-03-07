"use client";

import { ComparisonResult, BankName, PaymentMethod } from "@/lib/types";
import { BANKS, PAYMENT_METHODS } from "@/lib/fxData";
import { Translations } from "@/data/translations";

interface Props {
  results: ComparisonResult[];
  midRate: number;
  amountForeign: number;
  currency: string;
  homeCurrency: string;
  bank1: BankName;
  method1: PaymentMethod;
  bank2: BankName;
  method2: PaymentMethod;
  onBank2Change: (b: BankName) => void;
  onMethod2Change: (m: PaymentMethod) => void;
  t: Translations;
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
  Alipay: "🔵",
  "WeChat Pay": "🟢",
  Cash: "💵",
};

export default function ComparisonPanel({
  results,
  midRate,
  amountForeign,
  currency,
  homeCurrency,
  bank1,
  method1,
  bank2,
  method2,
  onBank2Change,
  onMethod2Change,
  t,
}: Props) {
  const fmt = makeFmt(homeCurrency);
  const r1 = results.find((r) => r.bank === bank1 && r.method === method1);
  const r2 = results.find((r) => r.bank === bank2 && r.method === method2);
  const midRateHome = amountForeign * midRate;

  function lossVsMid(r: ComparisonResult) {
    return r.totalHome - midRateHome;
  }

  function lossPercent(r: ComparisonResult) {
    return midRateHome > 0 ? ((r.totalHome - midRateHome) / midRateHome) * 100 : 0;
  }

  const r1Cheaper = r1 && r2 ? r1.totalHome < r2.totalHome : false;
  const r2Cheaper = r1 && r2 ? r2.totalHome < r1.totalHome : false;
  const isTie = r1 && r2 ? r1.totalHome === r2.totalHome : false;
  const diff = r1 && r2 ? Math.abs(r1.totalHome - r2.totalHome) : 0;

  const isCash2 = method2 === "Cash";

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-500 dark:text-purple-400 mb-1">
          {t.compareBadge}
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          {t.compareTitle}
        </h2>
      </div>

      {/* Second method selector */}
      <div className="space-y-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {t.compareSelectLabel}
        </p>

        {/* Method 2 */}
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              onClick={() => {
                onMethod2Change(m);
                if (m === "Cash") onBank2Change("Cash" as BankName);
                else if (method2 === "Cash") onBank2Change(BANKS.filter((b) => b !== "Cash")[0] as BankName);
              }}
              className={`rounded-xl border py-2 text-xs font-medium transition-colors ${
                method2 === m
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
              }`}
            >
              {methodIcon[m]} {m}
            </button>
          ))}
        </div>

        {/* Bank 2 — hide when Cash */}
        {!isCash2 && (
          <div className="flex gap-1.5 flex-wrap">
            {BANKS.filter((b) => b !== "Cash").map((b) => (
              <button
                key={b}
                onClick={() => onBank2Change(b as BankName)}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  bank2 === b
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Side-by-side comparison */}
      {r1 && r2 && (
        <div className="grid grid-cols-2 gap-3">
          {/* Option 1 */}
          <div
            className={`rounded-xl border-2 p-3 space-y-2 ${
              r1Cheaper
                ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950"
                : isTie
                ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950"
            }`}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.compareYourOption}
              </p>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-tight mt-0.5">
                {methodIcon[r1.method]}{" "}
                {r1.bank === "Cash" ? "Cash" : `${r1.bank}`}
                <br />
                <span className="font-normal text-gray-500 dark:text-gray-400">{r1.method}</span>
              </p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{t.compareTotal}</p>
              <p className={`text-base font-bold ${r1Cheaper ? "text-green-700 dark:text-green-300" : "text-gray-800 dark:text-gray-100"}`}>
                {fmt(r1.totalHome)}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{t.compareDiffMid}</p>
              <p className={`text-xs font-semibold ${lossVsMid(r1) > 0 ? "text-red-500" : "text-green-600"}`}>
                {lossVsMid(r1) > 0 ? "+" : ""}{fmt(lossVsMid(r1))}
                <span className="text-[10px] ml-1">({lossPercent(r1).toFixed(1)}%)</span>
              </p>
            </div>

            {r1Cheaper && (
              <span className="inline-block rounded-full bg-green-500 text-white text-[10px] font-bold px-2 py-0.5">
                {t.compareCheaperBadge}
              </span>
            )}
          </div>

          {/* Option 2 */}
          <div
            className={`rounded-xl border-2 p-3 space-y-2 ${
              r2Cheaper
                ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950"
                : isTie
                ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950"
            }`}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.compareVsLabel}
              </p>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-tight mt-0.5">
                {methodIcon[r2.method]}{" "}
                {r2.bank === "Cash" ? "Cash" : `${r2.bank}`}
                <br />
                <span className="font-normal text-gray-500 dark:text-gray-400">{r2.method}</span>
              </p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{t.compareTotal}</p>
              <p className={`text-base font-bold ${r2Cheaper ? "text-green-700 dark:text-green-300" : "text-gray-800 dark:text-gray-100"}`}>
                {fmt(r2.totalHome)}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{t.compareDiffMid}</p>
              <p className={`text-xs font-semibold ${lossVsMid(r2) > 0 ? "text-red-500" : "text-green-600"}`}>
                {lossVsMid(r2) > 0 ? "+" : ""}{fmt(lossVsMid(r2))}
                <span className="text-[10px] ml-1">({lossPercent(r2).toFixed(1)}%)</span>
              </p>
            </div>

            {r2Cheaper && (
              <span className="inline-block rounded-full bg-green-500 text-white text-[10px] font-bold px-2 py-0.5">
                {t.compareCheaperBadge}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Verdict */}
      {r1 && r2 && (
        <div
          className={`rounded-xl px-4 py-3 ${
            isTie
              ? "bg-gray-100 dark:bg-gray-800"
              : r1Cheaper
              ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
              : "bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800"
          }`}
        >
          {isTie ? (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
              {t.compareTieMsg}
            </p>
          ) : r1Cheaper ? (
            <div>
              <p className="text-sm font-bold text-green-800 dark:text-green-300">
                {t.compareR1CheaperTitle} {fmt(diff)}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                {method1} {bank1 !== "Cash" ? `(${bank1})` : ""} {t.compareR1SavesThan} {method2}{" "}
                {bank2 !== "Cash" ? `(${bank2})` : ""}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                {t.compareR2CheaperTitle} {fmt(diff)}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                {method2} {bank2 !== "Cash" ? `(${bank2})` : ""} {t.compareR2CheaperThan} {method1}{" "}
                {bank1 !== "Cash" ? `(${bank1})` : ""} {t.compareR2CheaperBy} {fmt(diff)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import PaymentForm from "@/components/PaymentForm";
import ResultsSection from "@/components/ResultsSection";
import VatRefundBanner from "@/components/VatRefundBanner";
import { BankName, PaymentMethod, ComparisonResult } from "@/lib/types";
import { calculateComparisons, getVatRefund } from "@/lib/calculator";
import { COUNTRIES } from "@/lib/fxData";
import { translations, Lang } from "@/data/translations";

const FALLBACK_RATES: Record<string, number> = {
  CNY: 4.90,
  JPY: 0.23,
  KRW: 0.026,
  SGD: 25.0,
  HKD: 4.50,
  TWD: 1.06,
};

export default function Home() {
  const [country, setCountry] = useState("CN");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState<BankName>("KBank");
  const [method, setMethod] = useState<PaymentMethod>("Credit Card");
  const [results, setResults] = useState<ComparisonResult[] | null>(null);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) ?? "th";
    }
    return "th";
  });

  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const t = translations[lang];

  function toggleLang() {
    const next: Lang = lang === "th" ? "en" : "th";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  const [midRate, setMidRate] = useState<number>(FALLBACK_RATES["CNY"]);
  const [rateTimestamp, setRateTimestamp] = useState<string | null>(null);
  const [rateFallback, setRateFallback] = useState(false);
  const [rateLoading, setRateLoading] = useState(true);

  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const currency = selectedCountry?.currency ?? "CNY";

  function handleCountryChange(v: string) {
    setCountry(v);
    setAmount("");
    setResults(null);
  }

  // Fetch live FX rate; re-runs whenever the destination currency changes
  useEffect(() => {
    setRateLoading(true);
    const fallback = FALLBACK_RATES[currency] ?? 4.9;
    fetch(`/api/fx?currency=${currency}`)
      .then((r) => r.json())
      .then((data) => {
        setMidRate(data.rate ?? fallback);
        setRateTimestamp(data.timestamp ?? null);
        setRateFallback(!!data.fallback);
      })
      .catch(() => {
        setMidRate(fallback);
        setRateFallback(true);
      })
      .finally(() => setRateLoading(false));
  }, [currency]);;

  // Auto-compare whenever amount or live rate changes
  useEffect(() => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      setResults(null);
      return;
    }
    setResults(calculateComparisons(parsed, midRate));
  }, [amount, midRate]);

  const parsedAmount = parseFloat(amount);
  const vat = parsedAmount > 0 ? getVatRefund(parsedAmount, country) : null;

  /** Decimal places for displayed FX rate depend on currency magnitude */
  function formatRate(rate: number, curr: string): string {
    const decimals = ["SGD", "HKD", "TWD"].includes(curr) ? 2 : 4;
    return rate.toFixed(decimals);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="pt-12 pb-8 px-4" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">{t.forTravelers}</p>
              <h1 className="text-2xl font-bold text-white leading-tight">
                {t.title}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                {t.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark((d) => !d)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-700 text-white text-base"
                aria-label="Toggle dark mode"
              >
                {dark ? "☀️" : "🌙"}
              </button>
              <button
                onClick={toggleLang}
                className="flex items-center gap-0.5 rounded-lg bg-blue-700 px-2.5 py-1.5 text-xs font-semibold"
                aria-label="Switch language"
              >
                <span className={lang === "th" ? "text-white" : "text-blue-300"}>TH</span>
                <span className="text-blue-400 mx-0.5">|</span>
                <span className={lang === "en" ? "text-white" : "text-blue-300"}>EN</span>
              </button>
            </div>
          </div>

          {/* Live FX rate badge */}
          <div className="mt-4 bg-blue-700 rounded-xl px-3 py-2.5 inline-block">
            {rateLoading ? (
              <span className="text-blue-200 text-xs">{t.loadingRate}</span>
            ) : (
              <>
                {/* Rate row */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">
                    1 {currency} = {formatRate(midRate, currency)} THB
                  </span>
                  <span
                    title="อัตรากลางจากตลาด (Mid-market rate) อาจแตกต่างจากอัตราที่ธนาคารเรียกเก็บจริง"
                    className={`cursor-help text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      rateFallback
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-green-400 text-green-900"
                    }`}
                  >
                    {rateFallback ? t.indicativeRate : t.liveRate}
                  </span>
                </div>
                {/* Source row */}
                <div className="mt-1 space-y-0.5 opacity-70">
                  <p className="text-xs text-blue-200">
                    แหล่งที่มา: exchangerate.host (Mid-market rate)
                  </p>
                  {rateTimestamp && (
                    <p className="text-xs text-blue-200">
                      อัปเดตล่าสุด:{" "}
                      {new Date(rateTimestamp).toLocaleString("th-TH", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      น.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-4 pb-12 space-y-5">
        <PaymentForm
          country={country}
          amount={amount}
          bank={bank}
          method={method}
          t={t}
          onCountryChange={handleCountryChange}
          onAmountChange={setAmount}
          onBankChange={setBank}
          onMethodChange={setMethod}
        />

        {vat?.vatEligible && (
          <VatRefundBanner
            amount={parsedAmount}
            estimatedRefund={vat.estimatedRefund}
            vatRate={vat.vatRate}
            minAmount={vat.minAmount}
            meetsMinimum={vat.meetsMinimum}
            currency={currency}
            t={t}
          />
        )}

        {results && (
          <ResultsSection
            results={results}
            selectedBank={bank}
            selectedMethod={method}
            amountCNY={parsedAmount}
            midRate={midRate}
            currency={currency}
            t={t}
          />
        )}
      </div>
    </main>
  );
}


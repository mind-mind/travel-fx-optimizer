"use client";

import { useState, useEffect } from "react";
import PaymentForm from "@/components/PaymentForm";
import ResultsSection from "@/components/ResultsSection";
import VatRefundBanner from "@/components/VatRefundBanner";
import InsightPanel from "@/components/InsightPanel";
import ComparisonPanel from "@/components/ComparisonPanel";
import LearnSection from "@/components/LearnSection";
import CardRecommendation from "@/components/CardRecommendation";
import PopularPairs from "@/components/PopularPairs";
import TravelMoneyTips from "@/components/TravelMoneyTips";
import SharePanel from "@/components/SharePanel";
import { BankName, PaymentMethod, ComparisonResult } from "@/lib/types";
import { calculateComparisons, getVatRefund } from "@/lib/calculator";
import { COUNTRIES, HOME_CURRENCIES } from "@/lib/fxData";
import { translations, Lang } from "@/data/translations";

const RATE_REFRESH_MS = 600_000; // 10 minutes

export default function Home() {
  const [country, setCountry] = useState("JP");
  const [homeCurrency, setHomeCurrency] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("homeCurrency") ?? "USD";
    }
    return "USD";
  });
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState<BankName>("Standard card");
  const [method, setMethod] = useState<PaymentMethod>("Credit Card");
  const [results, setResults] = useState<ComparisonResult[] | null>(null);

  // Comparison mode
  const [compareMode, setCompareMode] = useState(false);
  const [bank2, setBank2] = useState<BankName>("No-fee card");
  const [method2, setMethod2] = useState<PaymentMethod>("Cash");
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) ?? "en";
    }
    return "en";
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

  // Auto-detect home currency from IP on first visit (no saved preference)
  useEffect(() => {
    if (localStorage.getItem("homeCurrency")) return;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => {
        const currency = data.currency as string;
        const supported = HOME_CURRENCIES.map((c) => c.code);
        if (currency && supported.includes(currency)) {
          setHomeCurrency(currency);
          localStorage.setItem("homeCurrency", currency);
        }
      })
      .catch(() => {});
  }, []);

  function handleHomeCurrencyChange(v: string) {
    setHomeCurrency(v);
    localStorage.setItem("homeCurrency", v);
  }

  const t = translations[lang];

  function toggleLang() {
    const next: Lang = lang === "th" ? "en" : "th";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  const [midRate, setMidRate] = useState<number>(1.0);
  const [rateTimestamp, setRateTimestamp] = useState<string | null>(null);
  const [rateFallback, setRateFallback] = useState(false);
  const [rateLoading, setRateLoading] = useState(true);

  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const currency = selectedCountry?.currency ?? "CNY";

  const destCurrency = selectedCountry?.currency;
  const canSwap =
    !!destCurrency &&
    HOME_CURRENCIES.some((c) => c.code === destCurrency) &&
    COUNTRIES.some((c) => c.currency === homeCurrency);

  function handleSwap() {
    if (!canSwap || !destCurrency) return;
    const newCountry = COUNTRIES.find((c) => c.currency === homeCurrency);
    if (!newCountry) return;
    setHomeCurrency(destCurrency);
    localStorage.setItem("homeCurrency", destCurrency);
    setCountry(newCountry.code);
    setAmount("");
    setResults(null);
  }

  function handleCountryChange(v: string) {
    setCountry(v);
    setAmount("");
    setResults(null);
  }

  function handleMethodChange(m: PaymentMethod) {
    setMethod(m);
    if (m === "Cash") {
      setBank("Cash" as BankName);
    } else if (bank === ("Cash" as BankName)) {
      setBank("Standard card");
    }
    // ATM and all other methods keep the current card tier selection
  }

  // Fetch live FX rate; re-runs whenever the destination currency or home currency changes
  useEffect(() => {
    setRateLoading(true);
    let disposed = false;

    const fetchRate = () => {
      fetch(`/api/fx?from=${currency}&to=${homeCurrency}`)
        .then((r) => r.json())
        .then((data) => {
          if (disposed) return;
          setMidRate(data.rate ?? 1.0);
          setRateTimestamp(data.timestamp ?? new Date().toISOString());
          setRateFallback(!!data.fallback);
        })
        .catch(() => {
          if (disposed) return;
          setMidRate(1.0);
          setRateFallback(true);
          setRateTimestamp(new Date().toISOString());
        })
        .finally(() => {
          if (!disposed) setRateLoading(false);
        });
    };

    fetchRate();
    const timer = setInterval(fetchRate, RATE_REFRESH_MS);

    return () => {
      disposed = true;
      clearInterval(timer);
    };
  }, [currency, homeCurrency]);

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

  /** Format rate — use more decimals for small-unit currencies */
  function formatRate(rate: number, foreignCurr: string): string {
    const decimals = ["JPY", "KRW", "IDR", "VND"].includes(foreignCurr) ? 6 : 4;
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
                <span className={lang === "en" ? "text-white" : "text-blue-300"}>EN</span>
                <span className="text-blue-400 mx-0.5">|</span>
                <span className={lang === "th" ? "text-white" : "text-blue-300"}>TH</span>
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
                    1 {currency} = {formatRate(midRate, currency)} {homeCurrency}
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
                    Source: exchangerate.host (mid-market rate)
                  </p>
                  {rateTimestamp && (
                    <p className="text-xs text-blue-200">
                      Updated:{" "}
                      {new Date(rateTimestamp).toLocaleString("en", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
          homeCurrency={homeCurrency}
          t={t}
          onCountryChange={handleCountryChange}
          onAmountChange={setAmount}
          onBankChange={setBank}
          onMethodChange={handleMethodChange}
          onHomeCurrencyChange={handleHomeCurrencyChange}
          onSwap={handleSwap}
          canSwap={canSwap}
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
            amountForeign={parsedAmount}
            midRate={midRate}
            currency={currency}
            homeCurrency={homeCurrency}
            rateTimestamp={rateTimestamp}
            rateFallback={rateFallback}
            refreshMinutes={Math.floor(RATE_REFRESH_MS / 60_000)}
            t={t}
          />
        )}

        {/* Insight Panel — shown after calculation */}
        {results && parsedAmount > 0 && (() => {
          const selected = results.find((r) => r.bank === bank && r.method === method);
          return selected ? (
            <InsightPanel
              selected={selected}
              midRate={midRate}
              amountForeign={parsedAmount}
              currency={currency}
              homeCurrency={homeCurrency}
              countryCode={country}
              t={t}
              lang={lang}
            />
          ) : null;
        })()}

        {/* Card Recommendation Engine */}
        {results && parsedAmount > 0 && (() => {
          const selected = results.find((r) => r.bank === bank && r.method === method);
          return selected ? (
            <CardRecommendation
              selected={selected}
              amountForeign={parsedAmount}
              midRate={midRate}
              method={method}
              homeCurrency={homeCurrency}
              t={t}
            />
          ) : null;
        })()}

        {/* Share result */}
        {results && parsedAmount > 0 && (() => {
          const cheapest = results.find((r) => r.isCheapest);
          const selected = results.find((r) => r.bank === bank && r.method === method);
          const mostExpensive = results.reduce((a, b) => (a.totalHome > b.totalHome ? a : b));
          const savings = cheapest ? mostExpensive.totalHome - cheapest.totalHome : 0;
          return selected ? (
            <SharePanel
              homeCurrency={homeCurrency}
              currency={currency}
              amountForeign={parsedAmount}
              totalHome={selected.totalHome}
              bestMethod={cheapest ? `${cheapest.bank} (${cheapest.method})` : `${selected.bank} (${selected.method})`}
              savings={savings}
            />
          ) : null;
        })()}

        {/* Comparison Mode Toggle + Panel */}
        {results && parsedAmount > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => setCompareMode((v) => !v)}
              className={`w-full rounded-xl border py-3 text-sm font-semibold transition-colors ${
                compareMode
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {compareMode ? t.compareToggleClose : t.compareToggleOpen}
            </button>

            {compareMode && (
              <ComparisonPanel
                results={results}
                midRate={midRate}
                amountForeign={parsedAmount}
                currency={currency}
                homeCurrency={homeCurrency}
                bank1={bank}
                method1={method}
                bank2={bank2}
                method2={method2}
                onBank2Change={setBank2}
                onMethod2Change={setMethod2}
                t={t}
              />
            )}
          </div>
        )}

        {/* Learn Before You Go */}
        <LearnSection countryCode={country} t={t} lang={lang} />

        {/* Popular currency pair quick links */}
        <PopularPairs />

        {/* Travel money tips */}
        <TravelMoneyTips />
      </div>
    </main>
  );
}


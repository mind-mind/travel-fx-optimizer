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
import TravelMistakes from "@/components/TravelMistakes";
import InstantExample from "@/components/InstantExample";
import MoneyLostPanel from "@/components/MoneyLostPanel";
import BestMethodCard from "@/components/BestMethodCard";
import SharePanel from "@/components/SharePanel";
import TripEstimator from "@/components/TripEstimator";
import Link from "next/link";
import { BankName, PaymentMethod, ComparisonResult } from "@/lib/types";
import { calculateComparisons, getVatRefund } from "@/lib/calculator";
import { COUNTRIES, HOME_CURRENCIES } from "@/lib/fxData";
import { translations, Lang } from "@/data/translations";
import { fmtCurrency } from "@/lib/formatCurrency";
import { CODE_TO_COUNTRY } from "@/lib/guideConfig";
import { getFestivalsForMonth, COUNTRY_CODE_TO_GUIDE, getBudgetMonths } from "@/data/festivals";

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

  // Sticky bottom bar dismiss
  const [stickyDismissed, setStickyDismissed] = useState(false);

  // Comparison mode
  const [compareMode, setCompareMode] = useState(false);
  const [bank2, setBank2] = useState<BankName>("No-fee card");
  const [method2, setMethod2] = useState<PaymentMethod>("Cash");
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && saved in translations) return saved;
      // Auto-detect from browser language
      const browserLang = navigator.language.toLowerCase().split("-")[0];
      const langMap: Record<string, Lang> = { en: "en", th: "th", es: "es", zh: "zh", ja: "ja", ko: "ko" };
      return langMap[browserLang] ?? "en";
    }
    return "en";
  });

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncDarkState = () => setDark(root.classList.contains("dark"));
    syncDarkState();

    const observer = new MutationObserver(syncDarkState);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

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

  // Reset sticky bar whenever a new result is calculated
  useEffect(() => { setStickyDismissed(false); }, [results]);

  const parsedAmount = parseFloat(amount);
  const vat = parsedAmount > 0 ? getVatRefund(parsedAmount, country) : null;

  /** Format rate — use more decimals for small-unit currencies */
  function formatRate(rate: number, foreignCurr: string): string {
    const decimals = ["JPY", "KRW", "IDR", "VND"].includes(foreignCurr) ? 6 : 4;
    return rate.toFixed(decimals);
  }

  return (
    <main
      className="min-h-screen dark:bg-gray-950"
      style={dark ? undefined : { background: "linear-gradient(180deg, #EEF3FF 0%, #F4F7FF 100%)" }}
    >
      {/* Hero + travel context + calculator */}
      <section
        className="px-4 pt-12 pb-16 min-h-[900px]"
        style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)" }}
      >
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
                    {t.fxSourceLabel} exchangerate.host (mid-market rate)
                  </p>
                  {rateTimestamp && (
                    <p className="text-xs text-blue-200">
                      {t.fxUpdatedLabel}{" "}
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

          {/* ── Feature discovery chips + Festival calendar ── */}
          {(() => {
            const guideCountry = CODE_TO_COUNTRY[country]; // only set for the 7 guide countries
            const festivalKey = COUNTRY_CODE_TO_GUIDE[country]; // set for all 20+ countries
            const currentMonth = new Date().getMonth();
            const monthsWithFestivals = festivalKey
              ? Array.from({ length: 12 }, (_, i) =>
                  getFestivalsForMonth(i, festivalKey)
                )
              : [];
            const shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            return (
              <div className="mt-4 space-y-3">
                {/* Chips row */}
                <div className="flex flex-wrap gap-2">
                  {guideCountry && (
                    <Link
                      href={`/${lang}/how-to-pay/${guideCountry}`}
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full px-3 py-1.5 transition-colors"
                    >
                      🗺️ {selectedCountry?.name ?? guideCountry} Guide
                    </Link>
                  )}
                  <Link
                    href="/where-to-travel"
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full px-3 py-1.5 transition-colors"
                  >
                    🌍 Where to travel?
                  </Link>
                </div>

                {/* Peak season / budget warning */}
                {(() => {
                  if (!festivalKey) return null;
                  const currentMonth = new Date().getMonth();
                  const thisMonthFestivals = getFestivalsForMonth(currentMonth, festivalKey);
                  const highCrowdNow = thisMonthFestivals.filter(
                    (f) => f.crowdLevel === "high" && f.priceImpact
                  );
                  if (highCrowdNow.length === 0) return null;
                  const shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                  const budgetMonths = getBudgetMonths(festivalKey)
                    .filter((m) => m !== currentMonth)
                    .slice(0, 3)
                    .map((m) => shortMonths[m]);
                  return (
                    <div className="mt-3 rounded-xl bg-amber-500/20 border border-amber-400/30 px-4 py-3 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">⚠️</span>
                        <p className="text-xs font-bold text-amber-200">
                          Peak season — {highCrowdNow[0].name}
                        </p>
                      </div>
                      <p className="text-xs text-amber-100 leading-relaxed">
                        💰 {highCrowdNow[0].priceImpact}. Your FX fees aren't the only extra cost this trip.
                      </p>
                      {budgetMonths.length > 0 && (
                        <p className="text-xs text-amber-200">
                          ✨ Better value months: <span className="font-semibold">{budgetMonths.join(" · ")}</span>
                        </p>
                      )}
                    </div>
                  );
                })()}

                {/* Festival calendar strip */}
                {festivalKey && (
                  <div>
                    <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-widest mb-2">
                      🎉 Festival calendar — {selectedCountry?.name}
                    </p>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {shortMonths.map((m, i) => {
                        const festivals = monthsWithFestivals[i];
                        const hasFestival = festivals.length > 0;
                        const isNow = i === currentMonth;
                        return (
                          <div key={i} className="relative shrink-0">
                            {hasFestival ? (
                              guideCountry ? (
                                <Link
                                  href={`/${lang}/how-to-pay/${guideCountry}#festivals`}
                                  title={festivals.map(f => f.name).join(", ")}
                                  className={`flex flex-col items-center rounded-xl px-2.5 py-2 text-center transition-all ${
                                    isNow
                                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40 ring-2 ring-purple-300/50"
                                      : "bg-purple-500/35 hover:bg-purple-500/55 text-white border border-purple-400/40"
                                  }`}
                                >
                                  <span className="text-[10px] font-bold leading-none">{m}</span>
                                  <span className="text-[13px] leading-none mt-1">
                                    {festivals[0].emoji}
                                  </span>
                                </Link>
                              ) : (
                                <div
                                  title={festivals.map(f => f.name).join(", ")}
                                  className={`flex flex-col items-center rounded-xl px-2.5 py-2 text-center ${
                                    isNow
                                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40 ring-2 ring-purple-300/50"
                                      : "bg-purple-500/35 text-white border border-purple-400/40"
                                  }`}
                                >
                                  <span className="text-[10px] font-bold leading-none">{m}</span>
                                  <span className="text-[13px] leading-none mt-1">
                                    {festivals[0].emoji}
                                  </span>
                                </div>
                              )
                            ) : (
                              <div
                                className={`flex flex-col items-center rounded-xl px-2.5 py-2 text-center border ${
                                  isNow
                                    ? "bg-white/25 text-white border-white/40"
                                    : "bg-white/10 text-blue-200 border-white/10"
                                }`}
                              >
                                <span className="text-[10px] font-bold leading-none">{m}</span>
                                <span className="text-[13px] leading-none mt-1 opacity-0">·</span>
                              </div>
                            )}
                            {isNow && (
                              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-sm shadow-white/50" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          <div className="mt-10">
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
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-8 pb-28 space-y-5">

        {/* ── AFTER CALCULATION ── */}
        {results && parsedAmount > 0 && (() => {
          const selected = results.find((r) => r.bank === bank && r.method === method);
          const cheapest = results.find((r) => r.isCheapest);
          const mostExpensive = results.reduce((a, b) => (a.totalHome > b.totalHome ? a : b));
          const savings = cheapest ? mostExpensive.totalHome - cheapest.totalHome : 0;
          const lossVsMid = selected ? selected.totalHome - parsedAmount * midRate : 0;
          const midRateTotal = parsedAmount * midRate;
          const lossVsMidPercent = midRateTotal > 0 ? (lossVsMid / midRateTotal) * 100 : 0;
          return (
            <>
              {/* 1. Money Lost — most prominent result */}
              {selected && (
                <MoneyLostPanel
                  selected={selected}
                  midRate={midRate}
                  amountForeign={parsedAmount}
                  currency={currency}
                  homeCurrency={homeCurrency}
                  results={results}
                  countryCode={country}
                  lang={lang}
                  t={t}
                />
              )}

              {/* 2. Best Method Card */}
              <BestMethodCard results={results} homeCurrency={homeCurrency} countryCode={country} lang={lang} t={t} />

              {/* 3. VAT refund banner */}
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

              {/* 4. Full comparison table — best callout suppressed (rendered above as BestMethodCard) */}
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
                showBestCallout={false}
              />

              {/* 4. Insight panel */}
              {selected && (
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
              )}

              {/* 5. Card recommendation */}
              {selected && (
                <CardRecommendation
                  selected={selected}
                  amountForeign={parsedAmount}
                  midRate={midRate}
                  method={method}
                  homeCurrency={homeCurrency}
                  t={t}
                />
              )}

              {/* 7. Comparison mode */}
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

              {/* 8. Share result — placed after Compare vs Mid-market Rate */}
              {selected && (
                <SharePanel
                  homeCurrency={homeCurrency}
                  currency={currency}
                  amountForeign={parsedAmount}
                  totalHome={selected.totalHome}
                  bestMethod={cheapest ? `${cheapest.bank} (${cheapest.method})` : `${selected.bank} (${selected.method})`}
                  savings={savings}
                  lossVsMid={lossVsMid}
                  lossVsMidPercent={lossVsMidPercent}
                  countryCode={country}
                  countryName={selectedCountry?.name ?? ""}
                  countryFlag={selectedCountry?.flag ?? ""}
                  midRate={midRate}
                />
              )}

              {/* 9. Trip FX Fee Estimator */}
              <TripEstimator
                countryCode={country}
                countryName={selectedCountry?.name ?? ""}
                countryFlag={selectedCountry?.flag ?? ""}
                homeCurrency={homeCurrency}
              />
            </>
          );
        })()}

        {/* ── BEFORE CALCULATION: instant example ── */}
        {!results && (
          <InstantExample
            currency={currency}
            homeCurrency={homeCurrency}
            midRate={midRate}
            rateLoading={rateLoading}
            t={t}
          />
        )}

        {/* ── ALWAYS VISIBLE ── */}

        {/* Travel mistakes */}
        <TravelMistakes />

        {/* Where to Travel promo */}
        <Link
          href="/where-to-travel"
          className="block rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
        >
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest">
                {t.wttBadge}
              </p>
              <p className="text-base font-bold text-white leading-snug">
                {t.wttTitle}
              </p>
              <p className="text-xs text-blue-200 leading-relaxed hidden sm:block">
                {t.wttSubtitle}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 whitespace-nowrap transition-colors">
              {t.wttExploreCta}
            </span>
          </div>
        </Link>

        {/* Learn Before You Go */}
        <LearnSection countryCode={country} t={t} lang={lang} />

        {/* Popular currency pair quick links */}
        <PopularPairs />

        {/* Travel money tips */}
        <TravelMoneyTips t={t} />
      </div>

      {/* Sticky action bar ── shown when user is overpaying and hasn't dismissed */}
      {results && parsedAmount > 0 && !stickyDismissed && (() => {
        const sel = results.find((r) => r.bank === bank && r.method === method);
        if (!sel) return null;
        const loss = sel.totalHome - parsedAmount * midRate;
        if (loss < 0.5) return null;
        const cheap = results.find((r) => r.isCheapest);
        const saving = cheap ? sel.totalHome - cheap.totalHome : 0;
        const gc = CODE_TO_COUNTRY[country] ?? null;
        const gp = gc ? `/${lang}/how-to-pay/${gc}` : null;
        return (
          <div className="fixed bottom-0 inset-x-0 z-50 shadow-2xl">
            <div
              className="text-white"
              style={{ background: "linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)" }}
            >
              <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
                <span className="text-xl shrink-0" aria-hidden>💸</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight">
                    {t.stickyOverpaying} {fmtCurrency(loss, homeCurrency)} {t.stickyRightNow}
                  </p>
                  {saving > 0.5 && (
                    <p className="text-xs text-red-200 leading-tight mt-0.5">
                      {t.stickySwitchSave} {fmtCurrency(saving, homeCurrency)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {gp && (
                    <Link
                      href={gp}
                      className="rounded-lg bg-white text-red-700 font-bold text-xs px-3 py-2 hover:bg-red-50 transition-colors whitespace-nowrap"
                    >
                      {t.stickyHowToSave}
                    </Link>
                  )}
                  <button
                    onClick={() => setStickyDismissed(true)}
                    className="text-red-200 hover:text-white text-sm leading-none"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}


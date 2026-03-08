import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  TRAVEL_MONEY_GUIDES,
  TRAVEL_MONEY_SLUGS,
  getGuideByTravelSlug,
} from "@/data/travelMoneyGuides";

interface Props {
  params: { country: string };
}

export function generateStaticParams() {
  return TRAVEL_MONEY_SLUGS.map((slug) => ({ country: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideByTravelSlug(params.country);
  if (!guide) return { title: "Not Found" };
  return {
    title: guide.seoTitle + " | TravelWiseRate",
    description: guide.seoDescription,
    openGraph: {
      title: guide.seoTitle,
      description: guide.seoDescription,
      url: `https://travelwiserate.com/travel-money/${guide.slug}`,
    },
    alternates: {
      canonical: `https://travelwiserate.com/travel-money/${guide.slug}`,
    },
  };
}

export default function TravelMoneyPage({ params }: Props) {
  const guide = getGuideByTravelSlug(params.country);
  if (!guide) notFound();

  const otherGuides = TRAVEL_MONEY_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 8);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div
        className="pt-12 pb-10 px-4"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm transition-colors"
            >
              ← Back to Calculator
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{guide.flag}</span>
            <div>
              <p className="text-blue-200 text-sm font-medium">Travel Money Guide</p>
              <h1 className="text-2xl font-bold text-white leading-tight">{guide.h1}</h1>
            </div>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">{guide.heroTip}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-800/60 px-3 py-1.5">
            <span className="text-blue-200 text-sm">Destination currency:</span>
            <span className="text-white font-bold text-sm">{guide.currency}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* ── Overview: why FX fees hurt ─────────────────────────────── */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              How Much Do You Lose on FX Fees in {guide.name}?
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Most travelers silently pay{" "}
            <strong className="text-gray-800 dark:text-gray-100">3–6% more</strong> than the fair
            exchange rate every time they pay by card or withdraw from an ATM abroad. The cost comes
            from two sources stacked on top of each other:
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="shrink-0 text-red-500 mt-0.5">①</span>
              <span>
                <strong className="text-gray-800 dark:text-gray-200">Foreign transaction fee</strong>{" "}
                — charged by your card issuer (typically 2.5–3.5% for a standard bank card).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 text-red-500 mt-0.5">②</span>
              <span>
                <strong className="text-gray-800 dark:text-gray-200">Exchange rate spread</strong>{" "}
                — the gap between the mid-market rate and what Visa/Mastercard charge (typically
                0.5–1.5%).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 text-orange-500 mt-0.5">③</span>
              <span>
                <strong className="text-gray-800 dark:text-gray-200">Dynamic Currency Conversion (DCC)</strong>{" "}
                — an optional trap where the merchant converts to your home currency at a rate 3–8%
                worse. Always decline.
              </span>
            </li>
          </ul>
        </section>

        {/* ── Typical FX fee table ───────────────────────────────────── */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Typical Hidden FX Fees When Paying in {guide.name}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Payment method</th>
                  <th className="text-right py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Card FX fee</th>
                  <th className="text-right py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Rate spread</th>
                  <th className="text-right py-2 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Total extra cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {[
                  { icon: "💳", label: "Standard bank card",   fxFee: 2.5,  spread: 1.0, best: false },
                  { icon: "💳", label: "Basic / older card",   fxFee: 3.5,  spread: 1.0, best: false },
                  { icon: "✈️", label: "Travel rewards card",  fxFee: 1.5,  spread: 1.0, best: false },
                  { icon: "🏧", label: "ATM (standard card)",  fxFee: 2.5,  spread: 0.5, best: false },
                  { icon: "⭐", label: "No-fee card (Wise etc)", fxFee: 0,  spread: 1.0, best: false },
                  { icon: "💵", label: "Cash (good exchange booth)", fxFee: 0, spread: -0.5, best: true },
                ].map((row) => {
                  const total = row.fxFee + row.spread;
                  return (
                    <tr key={row.label} className={row.best ? "bg-green-50/60 dark:bg-green-950/30" : ""}>
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-100">
                        {row.icon} {row.label}
                        {row.best && (
                          <span className="ml-2 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-1.5 py-0.5 rounded-full">
                            Best rate
                          </span>
                        )}
                      </td>
                      <td className={`py-2.5 pr-4 text-right tabular-nums ${row.fxFee > 0 ? "text-red-500" : "text-green-600 dark:text-green-400"}`}>
                        {row.fxFee > 0 ? `+${row.fxFee}%` : "0%"}
                      </td>
                      <td className={`py-2.5 pr-4 text-right tabular-nums ${row.spread > 0 ? "text-orange-500" : "text-green-600 dark:text-green-400"}`}>
                        {row.spread > 0 ? `+${row.spread}%` : `${row.spread}%`}
                      </td>
                      <td className={`py-2.5 text-right font-bold tabular-nums ${total > 2 ? "text-red-500" : total > 0 ? "text-orange-500" : "text-green-600 dark:text-green-400"}`}>
                        {total > 0 ? `+${total.toFixed(1)}%` : `${total.toFixed(1)}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            * Spread percentages are estimates based on typical Visa/Mastercard network rates. Your card issuer&apos;s actual fee may differ — check your card terms.
          </p>
        </section>

        {/* ── Example payment comparison ─────────────────────────────── */}
        {(() => {
          const amt = guide.exampleAmount;
          const fmtAmt = amt.toLocaleString("en");
          const extraCost = (pct: number) => Math.round(Math.abs(amt * pct / 100));
          const fmtExtra = (n: number) => n.toLocaleString("en");

          const scenarios = [
            { icon: "💳", label: "Standard card",        totalPct: 3.5, saving: false },
            { icon: "💳", label: "Basic card",            totalPct: 4.5, saving: false },
            { icon: "✈️", label: "Travel card",           totalPct: 2.5, saving: false },
            { icon: "🏧", label: "ATM (standard card)",   totalPct: 3.0, saving: false },
            { icon: "⭐", label: "No-fee card",           totalPct: 1.0, saving: false },
            { icon: "💵", label: "Cash (best booth)",     totalPct: -0.5, saving: true },
          ] as const;

          const cheapestPct = Math.min(...scenarios.map((s) => s.totalPct));

          return (
            <section id="fee-comparison" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Example: Paying {fmtAmt} {guide.currency}
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Below is how much extra you pay (above the mid-market rate) depending on your
                payment method. These are approximate values based on typical fee structures.
              </p>
              <div className="space-y-2">
                {scenarios.map((s) => {
                  const extra = extraCost(Math.abs(s.totalPct));
                  const isCheapest = s.totalPct === cheapestPct;
                  const sign = s.totalPct >= 0 ? "+" : "−";
                  const pctLabel = `${sign}${Math.abs(s.totalPct).toFixed(1)}%`;
                  const costLabel = s.saving
                    ? `Save ${fmtExtra(extra)} ${guide.currency}`
                    : extra === 0
                    ? "No extra cost"
                    : `+${fmtExtra(extra)} ${guide.currency} extra`;

                  return (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                        isCheapest
                          ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{s.icon}</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                          {s.label}
                        </span>
                        {isCheapest && (
                          <span className="shrink-0 text-[10px] font-bold text-green-600 dark:text-green-300 bg-green-100 dark:bg-green-900 px-1.5 py-0.5 rounded-full">
                            Cheapest
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className={`text-sm font-bold tabular-nums ${
                          s.saving ? "text-green-600 dark:text-green-400"
                          : s.totalPct <= 1 ? "text-amber-600 dark:text-amber-400"
                          : "text-red-500"
                        }`}>
                          {costLabel}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">{pctLabel} vs mid-rate</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Actual costs depend on your card issuer and the current mid-market rate.{" "}
                <Link href={`/?country=${guide.countryCode}`} className="text-blue-500 hover:underline">
                  Use the live calculator →
                </Link>
              </p>
            </section>
          );
        })()}

        {/* Best Payment Method */}
        <section id="best-card" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Best Way to Pay in {guide.name}
            </h2>
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              ✅ Recommended:
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {guide.bestPaymentMethod}
            </p>
          </div>
          {guide.cardTip && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Card tip: </span>
              {guide.cardTip}
            </p>
          )}
        </section>

        {/* Local Payment Apps */}
        {guide.localPaymentApps.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Local Payment Apps
              </h2>
            </div>
            <ul className="space-y-3">
              {guide.localPaymentApps.map((app) => (
                <li
                  key={app.name}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="shrink-0 font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {app.name}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">— {app.note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* DCC Warning */}
        <section id="dcc" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Always Decline DCC
            </h2>
          </div>
          <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 space-y-2">
            <p className="text-sm font-bold text-red-800 dark:text-red-300">
              DCC = Dynamic Currency Conversion
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
              When a merchant or ATM offers to charge you in your home currency instead of {guide.currency} — always decline. The merchant&apos;s rate is typically 3–8% worse than your card network&apos;s rate.
            </p>
            <p className="text-sm font-bold text-red-700 dark:text-red-300">
              ✋ Always pay in {guide.currency} — not your home currency.
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {guide.dccNote}
          </p>
        </section>

        {/* Compare Rates CTA */}
        <section id="compare-banks" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Compare Live Rates for {guide.name}
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See real-time exchange rates and compare how much you&apos;d actually pay using different cards, ATMs, or cash for your trip to {guide.name}.
          </p>
          <Link
            href={`/?country=${guide.countryCode}`}
            className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors"
          >
            Compare Rates for {guide.name} ({guide.currency}) →
          </Link>
        </section>

        {/* Top Tips */}
        <section id="tips" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              5 Tips for Paying in {guide.name}
            </h2>
          </div>
          <ul className="space-y-3">
            {guide.topTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="shrink-0 font-bold text-blue-500 mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ATM Tips */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏧</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              ATM Tips for {guide.name}
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {guide.atmTip}
          </p>
        </section>

        {/* What to Avoid */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚫</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              What to Avoid in {guide.name}
            </h2>
          </div>
          <ul className="space-y-3">
            {guide.avoidList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 text-red-500 font-bold mt-0.5">✗</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* VAT Refund */}
        {guide.vatInfo && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧾</span>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                VAT / Tax Refund for Tourists
              </h2>
            </div>
            <div className="rounded-xl bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 p-4">
              <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                {guide.vatInfo}
              </p>
            </div>
          </section>
        )}

        {/* Related Guides */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌏</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Other Country Guides
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {otherGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/travel-money/${g.slug}`}
                className="flex items-center gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors p-3 text-sm"
              >
                <span className="text-xl">{g.flag}</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs">{g.name}</p>
                  <p className="text-xs text-gray-400">{g.currency}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/"
            className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
          >
            ← Back to Live Rate Calculator
          </Link>
        </section>
      </div>
    </main>
  );
}

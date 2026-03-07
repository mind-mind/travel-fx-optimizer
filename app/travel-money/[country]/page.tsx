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

        {/* Best Payment Method */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
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
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
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
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
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
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
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

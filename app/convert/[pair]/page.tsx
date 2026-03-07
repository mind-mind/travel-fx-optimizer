import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPairBySlug, getPairsFromCurrency, POPULAR_PAIR_SLUGS } from "@/data/currencyPairs";

interface Props {
  params: { pair: string };
}

export function generateStaticParams() {
  return POPULAR_PAIR_SLUGS.map((slug) => ({ pair: slug }));
}

async function getRate(from: string, to: string): Promise<{ rate: number; fallback: boolean }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://travelwiserate.com";
    const res = await fetch(`${baseUrl}/api/fx?from=${from}&to=${to}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return { rate: data.rate ?? 1, fallback: !!data.fallback };
  } catch {
    return { rate: 1, fallback: true };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pair = getPairBySlug(params.pair);
  if (!pair) return { title: "Currency Converter" };
  return {
    title: `${pair.from} to ${pair.to} — Live Exchange Rate | TravelWiseRate`,
    description: `Convert ${pair.fromName} (${pair.from}) to ${pair.toName} (${pair.to}). Live mid-market exchange rate, travel tips, and fee comparison for international travelers.`,
    openGraph: {
      title: `${pair.from} → ${pair.to} Exchange Rate`,
      description: `Live ${pair.from} to ${pair.to} rate with travel tips and payment cost comparison.`,
    },
  };
}

export default async function CurrencyPairPage({ params }: Props) {
  const pair = getPairBySlug(params.pair);
  if (!pair) notFound();

  const { rate, fallback } = await getRate(pair.from, pair.to);
  const relatedPairs = getPairsFromCurrency(pair.from).filter((p) => p.slug !== pair.slug).slice(0, 5);

  const examples = [1, 10, 100, 500, 1000].map((amount) => ({
    amount,
    result: (amount * rate).toFixed(2),
  }));

  const rateDisplay = rate < 0.01 ? rate.toFixed(6) : rate < 1 ? rate.toFixed(4) : rate.toFixed(4);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="pt-12 pb-8 px-4" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <nav className="mb-4">
            <Link href="/" className="text-blue-300 text-sm hover:text-white transition-colors">
              ← TravelWiseRate
            </Link>
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">
            {pair.fromFlag} {pair.from} to {pair.toFlag} {pair.to}
          </h1>
          <p className="text-blue-200 text-lg">
            {pair.fromName} to {pair.toName}
          </p>
          <div className="mt-5 bg-blue-700/60 rounded-2xl p-5 inline-block">
            <p className="text-blue-200 text-sm mb-1">Live mid-market rate</p>
            <p className="text-4xl font-bold text-white">
              1 {pair.from} = {rateDisplay} {pair.to}
            </p>
            <p className="text-xs text-blue-300 mt-2">
              {fallback ? "⚠️ Indicative rate (live rate unavailable)" : "✅ Live · Refreshes every 10 min"} · Source: exchangerate.host
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Quick conversion table */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
              Quick Conversion — {pair.from} to {pair.to}
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {pair.fromFlag} {pair.from}
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {pair.toFlag} {pair.to}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {examples.map(({ amount, result }) => (
                <tr key={amount} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">
                    {amount.toLocaleString("en")} {pair.from}
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-blue-600 dark:text-blue-400 text-right">
                    {parseFloat(result).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {pair.to}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Mid-market rate · Does not include bank fees or spread. Your actual cost depends on your card&apos;s FX fee (typically 0–3%).
            </p>
          </div>
        </section>

        {/* Full calculator CTA */}
        <section className="bg-blue-50 dark:bg-blue-950 rounded-2xl border border-blue-200 dark:border-blue-800 p-5">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
            💡 See your real total cost including card fees
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-4">
            The mid-market rate is just the starting point. Your bank or card will also charge a foreign transaction fee (0–3.5%) and a spread. Use our calculator to see the true cost.
          </p>
          <Link
            href={`/?from=${pair.from}&to=${pair.to}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Open Full Calculator →
          </Link>
        </section>

        {/* Travel money tip */}
        {pair.travelTip && (
          <section className="bg-amber-50 dark:bg-amber-950 rounded-2xl border border-amber-200 dark:border-amber-800 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-2">
              ✈️ Travel Money Tip
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              {pair.travelTip}
            </p>
          </section>
        )}

        {/* How fees work */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
            How much extra will you pay?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Beyond the mid-market rate, your card issuer charges a <strong>Foreign Transaction Fee</strong>.
            Here&apos;s how different card types compare on a 100 {pair.from} purchase:
          </p>
          <div className="space-y-2">
            {[
              { label: "No-fee travel card (Wise, Revolut)", fee: 0 },
              { label: "Travel rewards card", fee: 0 },
              { label: "Standard bank card", fee: 2.5 },
              { label: "Basic bank card", fee: 3.5 },
            ].map(({ label, fee }) => {
              const cost = (100 * rate * (1 + fee / 100));
              return (
                <div key={label} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{fee === 0 ? "0% FX fee" : `+${fee}% FX fee`}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${fee === 0 ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-200"}`}>
                      {cost.toFixed(2)} {pair.to}
                    </p>
                    {fee > 0 && (
                      <p className="text-xs text-red-500">
                        +{(100 * rate * fee / 100).toFixed(2)} extra
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Related pairs */}
        {relatedPairs.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              More {pair.from} conversions
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {relatedPairs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/convert/${p.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors group"
                >
                  <span className="text-lg">{p.toFlag}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      {p.from} → {p.to}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to calculator */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to full calculator
          </Link>
        </div>
      </div>
    </main>
  );
}

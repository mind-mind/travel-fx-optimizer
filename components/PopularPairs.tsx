"use client";

import Link from "next/link";
import { CURRENCY_PAIRS } from "@/data/currencyPairs";

// Show the first 10 pairs as "popular"
const FEATURED = CURRENCY_PAIRS.slice(0, 10);

export default function PopularPairs() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-1">
          🌍 Popular Conversions
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          Common currency pairs
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {FEATURED.map((pair) => (
          <Link
            key={pair.slug}
            href={`/convert/${pair.slug}`}
            className="flex items-center gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group"
          >
            <span className="text-base">{pair.fromFlag}</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">→</span>
            <span className="text-base">{pair.toFlag}</span>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 ml-0.5">
              {pair.from}/{pair.to}
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/convert/usd-to-eur"
        className="block text-center text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
      >
        See all currency pages →
      </Link>
    </div>
  );
}

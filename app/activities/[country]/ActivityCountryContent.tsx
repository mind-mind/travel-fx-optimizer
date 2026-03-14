"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ACTIVITY_CATEGORIES,
  getActivitiesByCountryAndCategory,
  getCountryMeta,
  type ActivityCategory,
} from "@/lib/data/activities";

interface Props {
  country: string;
}

export function ActivityCountryContent({ country }: Props) {
  const [category, setCategory] = useState<ActivityCategory | "all">("all");
  const countryMeta = getCountryMeta(country);

  const activities = useMemo(
    () => getActivitiesByCountryAndCategory(country, category),
    [country, category]
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <section
          className="rounded-2xl px-6 py-7 text-white"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
        >
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Destination Activities</p>
          <h1 className="text-3xl font-extrabold mt-1">
            Best Activities in {countryMeta?.flag} {countryMeta?.label}
          </h1>
          <p className="text-blue-100 text-sm mt-2 max-w-2xl">
            Browse top activities by category, then open Activity Planner to estimate your full trip cost.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Category Filter
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ActivityCategory | "all")}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100"
            >
              <option value="all">All categories</option>
              {ACTIVITY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {activities.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{a.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.category}</p>
                  </div>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300">${a.estimatedCost}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`/activity-planner?country=${country}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5"
          >
            Open Activity Planner →
          </Link>
        </section>
      </div>
    </main>
  );
}

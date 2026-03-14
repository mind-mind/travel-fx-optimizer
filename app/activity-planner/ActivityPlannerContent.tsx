"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ACTIVITY_CATEGORIES,
  ACTIVITY_COUNTRIES,
  getActivitiesByCountryAndCategory,
  getCountryMeta,
  type Activity,
  type ActivityCategory,
} from "@/lib/data/activities";

interface Props {
  initialCountry: string;
}

export function ActivityPlannerContent({ initialCountry }: Props) {
  const [country, setCountry] = useState(initialCountry);
  const [category, setCategory] = useState<ActivityCategory | "all">("all");
  const [travelDays, setTravelDays] = useState(5);
  const [hotelPerNight, setHotelPerNight] = useState(120);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const countryMeta = getCountryMeta(country) ?? getCountryMeta("japan");

  useEffect(() => {
    if (!countryMeta) return;
    setHotelPerNight(countryMeta.hotelPerNightUSD);
  }, [country, countryMeta?.hotelPerNightUSD]);

  const activities = useMemo(
    () => getActivitiesByCountryAndCategory(country, category),
    [country, category]
  );

  useEffect(() => {
    setSelectedIds(activities.slice(0, 3).map((a) => a.id));
  }, [country, category]);

  const selectedActivities = useMemo(
    () => activities.filter((a) => selectedIds.includes(a.id)),
    [activities, selectedIds]
  );

  const hotelCost = hotelPerNight * travelDays;
  const activityCost = selectedActivities.reduce((sum, a) => sum + a.estimatedCost, 0);
  const totalTripCost = hotelCost + activityCost;

  function toggleActivity(activity: Activity) {
    setSelectedIds((prev) =>
      prev.includes(activity.id) ? prev.filter((id) => id !== activity.id) : [...prev, activity.id]
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <section
          className="rounded-2xl px-6 py-7 text-white"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
        >
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Activity Planner</p>
          <h1 className="text-3xl font-extrabold mt-1">Plan Your Trip by Activities</h1>
          <p className="text-blue-100 text-sm mt-2 max-w-2xl">
            Select destination, pick activity style, and estimate your total trip cost including
            hotel and activities.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Trip Setup</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Destination
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100"
              >
                {ACTIVITY_COUNTRIES.map((c) => {
                  const meta = getCountryMeta(c);
                  return (
                    <option key={c} value={c}>
                      {meta?.flag} {meta?.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Activity Type
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Travel Days
                </label>
                <input
                  type="number"
                  min={1}
                  value={travelDays}
                  onChange={(e) => setTravelDays(Math.max(1, Number(e.target.value || 1)))}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Hotel / Night (USD)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={hotelPerNight}
                  onChange={(e) => setHotelPerNight(Math.max(0, Number(e.target.value || 0)))}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <Link
              href={`/activities/${country}`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5"
            >
              View {countryMeta?.label} activity page →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Cost Summary</h2>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                Hotel: <span className="font-semibold text-gray-900 dark:text-gray-100">${hotelPerNight}</span> × {travelDays} nights
              </p>
              <p className="font-bold text-gray-900 dark:text-gray-100">= ${hotelCost.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">Activities selected: {selectedActivities.length}</p>
              <p className="font-bold text-gray-900 dark:text-gray-100">= ${activityCost.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-4">
              <p className="text-xs text-blue-700 dark:text-blue-300 uppercase tracking-widest font-semibold">
                Estimated Total Trip Cost
              </p>
              <p className="text-3xl font-extrabold text-blue-800 dark:text-blue-200 mt-1">
                ${totalTripCost.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Recommended Activities for {countryMeta?.flag} {countryMeta?.label}
          </h2>

          {activities.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No activities found for this filter.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activities.map((a) => {
                const active = selectedIds.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleActivity(a)}
                    className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                      active
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{a.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.category}</p>
                      </div>
                      <p className="text-sm font-bold text-blue-700 dark:text-blue-300">${a.estimatedCost}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

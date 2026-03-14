import type { TravelApp } from "@/lib/data/travelApps";

interface DestinationAppsProps {
  countryName: string;
  apps: TravelApp[];
  labels: {
    title: string;
    empty: string;
    categories: Record<TravelApp["category"], string>;
  };
}

const CATEGORY_ORDER: TravelApp["category"][] = ["transport", "maps", "translation", "food", "payment"];

const CATEGORY_META: Record<TravelApp["category"], { icon: string }> = {
  transport: { icon: "🚌" },
  maps: { icon: "🗺️" },
  translation: { icon: "🗣️" },
  food: { icon: "🍜" },
  payment: { icon: "💳" },
};

export default function DestinationApps({ countryName, apps, labels }: DestinationAppsProps) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    apps: apps.filter((app) => app.category === category),
  })).filter((group) => group.apps.length > 0);

  return (
    <section className="rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">📱 {labels.title.replace("{country}", countryName)}</h3>

      {grouped.length === 0 ? (
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
          {labels.empty}
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {grouped.map((group) => (
            <div key={group.category} className="rounded-xl border border-black/5 bg-[#f5f7fb] px-3 py-2.5 dark:border-gray-700 dark:bg-gray-800/70">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                {CATEGORY_META[group.category].icon} {labels.categories[group.category]}
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {group.apps.map((app) => (
                  <li key={`${group.category}-${app.name}`} className="text-xs leading-relaxed text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{app.name}:</span> {app.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

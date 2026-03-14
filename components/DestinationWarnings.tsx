import type { TravelWarning } from "@/lib/data/travelWarnings";

interface DestinationWarningsProps {
  countryName: string;
  warnings: TravelWarning[];
  labels: {
    title: string;
    empty: string;
    categories: Record<TravelWarning["category"], string>;
  };
}

const CATEGORY_META: Record<TravelWarning["category"], { icon: string }> = {
  weather: { icon: "🌦️" },
  crowds: { icon: "👥" },
  scam: { icon: "🎭" },
  season: { icon: "📅" },
  safety: { icon: "🛡️" },
};

export default function DestinationWarnings({ countryName, warnings, labels }: DestinationWarningsProps) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">⚠️ {labels.title.replace("{country}", countryName)}</h3>

      {warnings.length === 0 ? (
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
          {labels.empty}
        </p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {warnings.map((warning, index) => {
            const meta = CATEGORY_META[warning.category];
            return (
              <li
                key={`${warning.category}-${index}`}
                className="rounded-xl border border-black/5 bg-[#f5f7fb] px-3 py-2.5 dark:border-gray-700 dark:bg-gray-800/70"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  {meta.icon} {labels.categories[warning.category]}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-700 dark:text-gray-200">{warning.message}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

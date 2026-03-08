"use client";

interface Props {
  currency: string;
  homeCurrency: string;
  midRate: number;
  rateLoading: boolean;
}

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

const EXAMPLE_AMOUNT: Record<string, number> = {
  JPY: 10000,
  KRW: 100000,
  CNY: 5000,
  THB: 5000,
  SGD: 500,
  HKD: 2000,
  TWD: 3000,
  EUR: 500,
  GBP: 300,
  USD: 500,
  AUD: 500,
  CAD: 500,
  CHF: 300,
  AED: 500,
  INR: 20000,
  MYR: 1000,
  VND: 1000000,
  IDR: 500000,
  PHP: 2000,
  MXN: 2000,
  NZD: 500,
  TRY: 2000,
  PLN: 500,
  SAR: 500,
};

export default function InstantExample({
  currency,
  homeCurrency,
  midRate,
  rateLoading,
}: Props) {
  if (rateLoading || midRate <= 0) return null;

  const amount = EXAMPLE_AMOUNT[currency] ?? 500;
  const midHome = amount * midRate;

  // Simulate card scenarios
  const nofeeTotal = midHome * (1 + 0.01); // No-fee card: 1% spread only
  const standardTotal = midHome * (1 + 0.01 + 0.025); // Standard: 2.5% FX fee + 1% spread
  const airportTotal = midHome * (1 + 0.12); // Airport exchange: ~12% worse

  const lossStandard = standardTotal - nofeeTotal;
  const lossAirport = airportTotal - nofeeTotal;

  const rows = [
    {
      label: "No-FX-fee card",
      total: nofeeTotal,
      tag: "Best",
      tagClass:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
    {
      label: "Standard credit card",
      total: standardTotal,
      tag: `+${fmt(lossStandard, homeCurrency)}`,
      tagClass: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    },
    {
      label: "Airport exchange",
      total: airportTotal,
      tag: `+${fmt(lossAirport, homeCurrency)}`,
      tagClass: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-5 space-y-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">
          Quick Example
        </p>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
          Paying {amount.toLocaleString("en")} {currency} abroad
        </p>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3 py-2.5"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {row.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {fmt(row.total, homeCurrency)}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${row.tagClass}`}
              >
                {row.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
        A standard card costs you an extra{" "}
        <span className="font-bold">{fmt(lossStandard, homeCurrency)}</span>{" "}
        vs a no-fee card.{" "}
        <span className="font-semibold">Enter your amount above</span> to see
        your exact cost.
      </p>
    </div>
  );
}

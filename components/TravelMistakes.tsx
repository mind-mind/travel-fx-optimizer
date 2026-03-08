const MISTAKES = [
  {
    emoji: "❌",
    title: 'Paying in your home currency abroad (DCC)',
    body: 'When a terminal asks "Pay in USD or local currency?" — always choose local. Dynamic Currency Conversion adds an invisible 3–8% surcharge that goes straight to the merchant.',
  },
  {
    emoji: "❌",
    title: "Airport currency exchange",
    body: "Airport FX booths charge 10–15% above the real mid-market rate. Exchange only enough cash for a taxi — use your card or a bank ATM for everything else.",
  },
  {
    emoji: "❌",
    title: "Using a standard credit card abroad",
    body: "Most banks silently add a 2–3% foreign transaction fee to every purchase. Switching to a no-FX-fee card (Wise, Revolut, Schwab) eliminates this entirely.",
  },
  {
    emoji: "❌",
    title: "Not checking the rate before you travel",
    body: "The mid-market rate is the \"real\" exchange rate. If you don't know it, you can't spot a bad deal — use this tool before every international payment.",
  },
];

export default function TravelMistakes() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/50 shadow-sm p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 dark:text-orange-400 mb-1">
          Common Mistakes
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          ⚠️ Travel Money Mistakes Tourists Make
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {MISTAKES.map((m) => (
          <div key={m.title} className="flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">{m.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-0.5">
                {m.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {m.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

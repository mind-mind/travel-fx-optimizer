const TIPS = [
  {
    icon: "✈️",
    title: "Avoid airport FX booths",
    body: "Airport exchange counters often charge 10–15% above mid-market rate. Exchange only enough for transport; use ATMs or your card for the rest.",
  },
  {
    icon: "💳",
    title: "Use a no-foreign-fee card",
    body: "Cards like Wise, Revolut, or Charles Schwab waive the typical 2.5–3% FX fee entirely, saving you real money on every purchase abroad.",
  },
  {
    icon: "🚫",
    title: "Always pay in local currency",
    body: "When a terminal asks \"Pay in USD or local?\" — choose local. Dynamic Currency Conversion (DCC) is marked up 3–8% and benefits the merchant, not you.",
  },
  {
    icon: "🏧",
    title: "Pick your ATM wisely",
    body: "Network ATMs (Citibank, HSBC) often offer better rates and lower fees than independent FX ATMs. Decline any \"fixed fee\" conversion offer.",
  },
  {
    icon: "📱",
    title: "Mobile wallets can beat cards",
    body: "In markets like Japan (PayPay), China (Alipay), or Thailand (PromptPay), local mobile payments sometimes give you mid-market rate with no markup.",
  },
  {
    icon: "🕐",
    title: "Check rates before you go",
    body: "Mid-market rates fluctuate daily. Knowing the fair rate before you travel helps you spot a bad deal — and walk away from it.",
  },
];

export default function TravelMoneyTips() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-1">
          💡 Travel Money Tips
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          How to pay less abroad
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {TIPS.map((tip) => (
          <div key={tip.title} className="flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">{tip.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-0.5">
                {tip.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {tip.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

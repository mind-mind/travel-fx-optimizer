import type { Translations } from "@/data/translations";

interface Props {
  t: Translations;
}

export default function TravelMoneyTips({ t }: Props) {
  const TIPS = [
    { icon: "✈️", title: t.tmTip1Title, body: t.tmTip1Body },
    { icon: "💳", title: t.tmTip2Title, body: t.tmTip2Body },
    { icon: "🚫", title: t.tmTip3Title, body: t.tmTip3Body },
    { icon: "🏧", title: t.tmTip4Title, body: t.tmTip4Body },
    { icon: "📱", title: t.tmTip5Title, body: t.tmTip5Body },
    { icon: "🕐", title: t.tmTip6Title, body: t.tmTip6Body },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-1">
          {t.tmTipsBadge}
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          {t.tmTipsHeading}
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

"use client";

import Link from "next/link";
import { getGuideByCountryCode } from "@/data/travelMoneyGuides";
import { Translations, Lang } from "@/data/translations";

interface Props {
  countryCode: string;
  t: Translations;
  lang: Lang;
}

interface LearnLink {
  icon: string;
  label: string;
  href: string;
  description: string;
}

export default function LearnSection({ countryCode, t, lang }: Props) {
  const guide = getGuideByCountryCode(countryCode);
  const countryName = guide
    ? guide.name
    : lang === "th" ? "ต่างประเทศ" : "Abroad";
  const guideBase = guide ? `/travel-money/${guide.slug}` : null;

  const links: LearnLink[] = [
    {
      icon: "💳",
      label: `${t.learnLink1Pre} ${countryName}${t.learnLink1Suf}`,
      href: guideBase ? `${guideBase}#best-card` : "/",
      description: t.learnLink1Desc,
    },
    {
      icon: "🧾",
      label: t.learnLink2,
      href: guideBase ? `${guideBase}#tips` : "/",
      description: t.learnLink2Desc,
    },
    {
      icon: "⚠️",
      label: t.learnLink3,
      href: guideBase ? `${guideBase}#dcc` : "/",
      description: t.learnLink3Desc,
    },
    {
      icon: "📊",
      label: `${t.learnLink4Pre} ${countryName}`,
      href: guideBase ? `${guideBase}#compare-banks` : "/",
      description: t.learnLink4Desc,
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-1">
          {t.learnBadge}
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          {t.learnTitleBase}{guide ? ` ${t.learnTitleTo}${countryName}` : ""}
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {t.learnSubtitle}
        </p>
      </div>

      {/* Links grid */}
      <div className="space-y-2">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="flex items-start gap-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800 transition-colors px-4 py-3 group"
          >
            <span className="text-xl shrink-0 mt-0.5">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors leading-snug">
                {link.label}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">
                {link.description}
              </p>
            </div>
            <span className="text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

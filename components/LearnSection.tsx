"use client";

import Link from "next/link";
import { CODE_TO_COUNTRY } from "@/lib/guideConfig";
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
  const guideCountry = CODE_TO_COUNTRY[countryCode] ?? null;
  const guideBase = guideCountry ? `/${lang}/how-to-pay/${guideCountry}` : null;
  // Country name comes from the loaded content page; use a generic fallback here
  const countryName = guideBase
    ? guideCountry!.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : lang === "th" ? "ต่างประเทศ" : "Abroad";

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
          {t.learnTitleBase}{guideCountry ? ` ${t.learnTitleTo}${countryName}` : ""}
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {t.learnSubtitle}
        </p>
      </div>

      {/* Primary guide CTA — full-width, prominent */}
      {guideBase && (
        <Link
          href={guideBase}
          className="flex items-center gap-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 transition-colors group"
        >
          <span className="text-2xl shrink-0">🗺️</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-snug">
              {countryName} Travel Money Guide
            </p>
            <p className="text-xs text-blue-200 mt-0.5">
              ATM fees · best cards · typical costs · attractions
            </p>
          </div>
          <span className="text-blue-200 group-hover:text-white transition-colors shrink-0">→</span>
        </Link>
      )}

      {/* Secondary links grid */}
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CountryGuide, COUNTRY_GUIDES } from "@/data/countryGuides";
import { translations, Lang } from "@/data/translations";

interface Props {
  guide: CountryGuide;
}

function FeeItem({
  name,
  detail,
  badge,
}: {
  name: string;
  detail: string;
  badge: "red" | "orange" | "gray";
}) {
  const badgeClass = {
    red: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  }[badge];

  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <span className={`shrink-0 mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeClass}`}>
        Fee
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

const FEE_DATA = {
  th: [
    {
      name: "FX Fee (Foreign Transaction Fee)",
      detail: "ค่าธรรมเนียมที่ธนาคารไทยเก็บจากการรูดบัตรในต่างประเทศ — ปกติ 1.5%–2.5% ของยอดที่รูด",
    },
    {
      name: "Spread",
      detail: "ส่วนต่างระหว่างเรทกลาง (mid-rate) กับเรทที่ธนาคารหรือบริการให้จริง — ปกติ 0.5%–2%",
    },
    {
      name: "ATM Fee",
      detail: "ค่าธรรมเนียมถอนเงินต่างประเทศ — ทั้งจากธนาคารไทยและธนาคารปลายทาง รวมกันอาจสูงถึง 200–300 บาทต่อครั้ง",
    },
    {
      name: "DCC Markup",
      detail: "มาร์คอัพพิเศษที่ร้านค้าเก็บเมื่อคุณเลือกจ่ายเป็นเงินบาท — มักสูงกว่าเรทธนาคาร 3%–10%",
    },
  ],
  en: [
    {
      name: "FX Fee (Foreign Transaction Fee)",
      detail: "Fee your Thai bank charges for foreign card use — typically 1.5%–2.5% of the transaction.",
    },
    {
      name: "Spread",
      detail: "The gap between mid-rate and the rate your bank/service actually gives — usually 0.5%–2%.",
    },
    {
      name: "ATM Fee",
      detail: "Withdrawal fees from both your Thai bank and the foreign ATM — combined can reach ฿200–300 per transaction.",
    },
    {
      name: "DCC Markup",
      detail: "Extra markup when you choose to pay in THB — often 3%–10% above the true bank rate.",
    },
  ],
};

export function GuideContent({ guide }: Props) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);
    const storedDark = localStorage.getItem("theme") === "dark";
    setDark(storedDark);
    if (storedDark) document.documentElement.classList.add("dark");
  }, []);

  const t = translations[lang];
  const otherGuides = COUNTRY_GUIDES.filter((g) => g.countryCode !== guide.countryCode);
  const countryName = lang === "th" ? guide.countryName : guide.countryNameEn;
  const heroTip = lang === "th" ? guide.heroTip : guide.heroTipEn;
  const bestPaymentMethod = lang === "th" ? guide.bestPaymentMethod : guide.bestPaymentMethodEn;
  const topTips = lang === "th" ? guide.topTips : guide.topTipsEn;
  const avoidTip = lang === "th" ? guide.avoidTip : guide.avoidTipEn;
  const dccNote = lang === "th" ? guide.dccNote : guide.dccNoteEn;
  const bestCard = lang === "th" ? guide.bestCardTh : guide.bestCardEn;
  const fees = FEE_DATA[lang];

  function toggleLang() {
    const next: Lang = lang === "th" ? "en" : "th";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  function toggleDark() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div
        className="pt-12 pb-10 px-4"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm transition-colors"
            >
              {t.guideBack}
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDark}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-700 text-white text-base"
                aria-label="Toggle dark mode"
              >
                {dark ? "☀️" : "🌙"}
              </button>
              <button
                onClick={toggleLang}
                className="flex items-center gap-0.5 rounded-lg bg-blue-700 px-2.5 py-1.5 text-xs font-semibold"
              >
                <span className={lang === "en" ? "text-white" : "text-blue-300"}>EN</span>
                <span className="text-blue-400 mx-0.5">|</span>
                <span className={lang === "th" ? "text-white" : "text-blue-300"}>TH</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{guide.flag}</span>
            <div>
              <p className="text-blue-200 text-sm font-medium">{t.guideHero}</p>
              <h1 className="text-2xl font-bold text-white leading-tight">
                {t.guideHeroTitle} {countryName} {t.guideHeroSuf}
              </h1>
            </div>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">{heroTip}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Best Card */}
        <section
          id="best-card"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideBestCardPre} {countryName} — {t.guideBestCardTitle}
            </h2>
          </div>
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">{t.guideBestCardRec}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">{bestCard}</p>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {t.guideBestCardMethod} <span className="font-bold">{bestPaymentMethod}</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t.guideBestCardCompare}{" "}
            <Link href={`/?country=${guide.countryCode}`} className="text-blue-500 hover:underline">
              {t.guideBestCardLink}
            </Link>
          </p>
        </section>

        {/* Fees */}
        <section
          id="fees"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧾</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideFeesTitle}
            </h2>
          </div>
          <div className="space-y-1">
            {fees.map((fee, i) => (
              <FeeItem
                key={i}
                name={fee.name}
                detail={fee.detail}
                badge={i === 1 ? "orange" : "red"}
              />
            ))}
          </div>
        </section>

        {/* DCC */}
        <section
          id="dcc"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideDccTitle}
            </h2>
          </div>
          <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 space-y-2">
            <p className="text-sm font-bold text-red-800 dark:text-red-300">
              DCC = Dynamic Currency Conversion
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
              {lang === "th"
                ? "คือการที่ร้านค้าหรือตู้ ATM เสนอให้คุณ \"จ่ายเป็นเงินบาท\" แทนที่จะเป็นสกุลท้องถิ่น ซึ่งฟังดูสะดวก แต่ร้านค้าจะเป็นผู้กำหนดอัตราแลกเปลี่ยนเอง ซึ่งมักสูงกว่าเรทจริง 3%–10%"
                : "This is when a merchant or ATM offers to charge you in Thai Baht instead of local currency. It sounds convenient, but the merchant sets the rate — which is typically 3%–10% worse than the true market rate."}
            </p>
            <p className="text-sm font-bold text-red-700 dark:text-red-300">
              ✋ {t.guideDccDecline} {guide.currency} {t.guideDccDeclineSuf}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{dccNote}</p>
        </section>

        {/* Bank Compare */}
        <section
          id="compare-banks"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3 scroll-mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideBankCompareTitle} {countryName}
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.guideBankCompareDesc}</p>
          <Link
            href={`/?country=${guide.countryCode}`}
            className="block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors"
          >
            {t.guideBankCompareCta} {countryName} →
          </Link>
        </section>

        {/* Tips */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {t.guideTipsTitle} {countryName}
            </h2>
          </div>
          <ul className="space-y-2">
            {topTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="shrink-0 font-bold text-blue-500 mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 p-3">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{t.guideTipsAvoid}</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{avoidTip}</p>
          </div>
        </section>

        {/* Other guides */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {t.guideOtherGuides}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {otherGuides.map((g) => (
              <Link
                key={g.countryCode}
                href={`/${g.slug}`}
                className="flex items-center gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
              >
                <span>{g.flag}</span>
                <span>{lang === "th" ? g.countryName : g.countryNameEn}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Back */}
        <Link
          href="/"
          className="block w-full text-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm font-medium py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {t.guideBackBtn}
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";

const LANG_OPTIONS: Array<{ value: Lang; label: string }> = [
  { value: "en", label: "🇺🇸 English" },
  { value: "th", label: "🇹🇭 ไทย" },
  { value: "es", label: "🇪🇸 Español" },
  { value: "zh", label: "🇨🇳 中文" },
  { value: "ja", label: "🇯🇵 日本語" },
  { value: "ko", label: "🇰🇷 한국어" },
];

const GUIDE_LANG_PATTERN = /^\/(en|th|es|zh|ja|ko)(?=\/how-to-pay\/)/;

export default function GlobalLanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && stored in translations) {
      setLang(stored);
      return;
    }

    const browserLang = navigator.language.toLowerCase().split("-")[0] as Lang;
    const detected = browserLang in translations ? browserLang : "en";
    localStorage.setItem("lang", detected);
    setLang(detected);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const nextDark = storedTheme === "dark";
    setDark(nextDark);
    root.classList.toggle("dark", nextDark);
  }, []);

  function toggleDarkMode() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  function handleChange(nextLang: Lang) {
    setLang(nextLang);
    localStorage.setItem("lang", nextLang);

    const search = searchParams.toString();
    const currentUrl = search ? `${pathname}?${search}` : pathname;

    if (GUIDE_LANG_PATTERN.test(pathname)) {
      const nextPath = pathname.replace(GUIDE_LANG_PATTERN, `/${nextLang}`);
      router.push(search ? `${nextPath}?${search}` : nextPath);
      return;
    }

    window.location.assign(currentUrl);
  }

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleDarkMode}
        className="rounded-xl border border-white/15 bg-slate-900/85 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm outline-none ring-0 transition hover:border-blue-400"
        aria-label="Toggle dark mode"
      >
        {dark ? "☀️" : "🌙"}
      </button>
      <label className="sr-only" htmlFor="global-language-selector">
        Select language
      </label>
      <select
        id="global-language-selector"
        value={lang}
        onChange={(e) => handleChange(e.target.value as Lang)}
        className="rounded-xl border border-white/15 bg-slate-900/85 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm outline-none ring-0 transition focus:border-blue-400"
        aria-label="Select language"
      >
        {LANG_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
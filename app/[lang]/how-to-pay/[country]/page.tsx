import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  VALID_LANGS,
  VALID_COUNTRIES,
  type GuideLang,
  type GuideCountry,
} from "@/lib/guideConfig";
import { getGuideContent } from "@/lib/getGuideContent";
import { translations } from "@/data/translations";
import { GuidePageContent } from "./GuidePageContent";

interface Props {
  params: { lang: string; country: string };
}

export function generateStaticParams() {
  return VALID_LANGS.flatMap((lang) =>
    VALID_COUNTRIES.map((country) => ({ lang, country }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as GuideLang;
  const country = params.country as GuideCountry;
  if (
    !VALID_LANGS.includes(lang) ||
    !VALID_COUNTRIES.includes(country)
  ) {
    return { title: "Not Found" };
  }
  const content = getGuideContent(lang, country);
  const t = translations[lang];
  return {
    title: `${t.guideHeroTitle} ${content.countryName} ${t.guideHeroSuf} | TravelWiseRate`,
    description: content.heroTip,
    alternates: {
      canonical: `/${lang}/how-to-pay/${country}`,
      languages: Object.fromEntries(
        VALID_LANGS.map((l) => [l, `/${l}/how-to-pay/${country}`])
      ),
    },
  };
}

export default function GuidePage({ params }: Props) {
  const lang = params.lang as GuideLang;
  const country = params.country as GuideCountry;

  if (!VALID_LANGS.includes(lang) || !VALID_COUNTRIES.includes(country)) {
    notFound();
  }

  const content = getGuideContent(lang, country);
  const t = translations[lang];

  return (
    <GuidePageContent
      content={content}
      t={t}
      lang={lang}
      country={country}
    />
  );
}

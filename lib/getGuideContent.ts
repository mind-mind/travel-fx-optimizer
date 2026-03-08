import type { CountryContent, GuideLang, GuideCountry } from "./guideConfig";

// EN
import enChina from "@/content/en/china.json";
import enJapan from "@/content/en/japan.json";
import enKorea from "@/content/en/korea.json";
import enSingapore from "@/content/en/singapore.json";
import enHongKong from "@/content/en/hong-kong.json";
import enTaiwan from "@/content/en/taiwan.json";
import enThailand from "@/content/en/thailand.json";

// TH
import thChina from "@/content/th/china.json";
import thJapan from "@/content/th/japan.json";
import thKorea from "@/content/th/korea.json";
import thSingapore from "@/content/th/singapore.json";
import thHongKong from "@/content/th/hong-kong.json";
import thTaiwan from "@/content/th/taiwan.json";
import thThailand from "@/content/th/thailand.json";

// ES
import esChina from "@/content/es/china.json";
import esJapan from "@/content/es/japan.json";
import esKorea from "@/content/es/korea.json";
import esSingapore from "@/content/es/singapore.json";
import esHongKong from "@/content/es/hong-kong.json";
import esTaiwan from "@/content/es/taiwan.json";
import esThailand from "@/content/es/thailand.json";

// ZH
import zhChina from "@/content/zh/china.json";
import zhJapan from "@/content/zh/japan.json";
import zhKorea from "@/content/zh/korea.json";
import zhSingapore from "@/content/zh/singapore.json";
import zhHongKong from "@/content/zh/hong-kong.json";
import zhTaiwan from "@/content/zh/taiwan.json";
import zhThailand from "@/content/zh/thailand.json";

// JA
import jaChina from "@/content/ja/china.json";
import jaJapan from "@/content/ja/japan.json";
import jaKorea from "@/content/ja/korea.json";
import jaSingapore from "@/content/ja/singapore.json";
import jaHongKong from "@/content/ja/hong-kong.json";
import jaTaiwan from "@/content/ja/taiwan.json";
import jaThailand from "@/content/ja/thailand.json";

// KO
import koChina from "@/content/ko/china.json";
import koJapan from "@/content/ko/japan.json";
import koKorea from "@/content/ko/korea.json";
import koSingapore from "@/content/ko/singapore.json";
import koHongKong from "@/content/ko/hong-kong.json";
import koTaiwan from "@/content/ko/taiwan.json";
import koThailand from "@/content/ko/thailand.json";

const CONTENT_MAP: Record<GuideLang, Record<GuideCountry, CountryContent>> = {
  en: {
    china: enChina,
    japan: enJapan,
    korea: enKorea,
    singapore: enSingapore,
    "hong-kong": enHongKong,
    taiwan: enTaiwan,
    thailand: enThailand,
  },
  th: {
    china: thChina,
    japan: thJapan,
    korea: thKorea,
    singapore: thSingapore,
    "hong-kong": thHongKong,
    taiwan: thTaiwan,
    thailand: thThailand,
  },
  es: {
    china: esChina,
    japan: esJapan,
    korea: esKorea,
    singapore: esSingapore,
    "hong-kong": esHongKong,
    taiwan: esTaiwan,
    thailand: esThailand,
  },
  zh: {
    china: zhChina,
    japan: zhJapan,
    korea: zhKorea,
    singapore: zhSingapore,
    "hong-kong": zhHongKong,
    taiwan: zhTaiwan,
    thailand: zhThailand,
  },
  ja: {
    china: jaChina,
    japan: jaJapan,
    korea: jaKorea,
    singapore: jaSingapore,
    "hong-kong": jaHongKong,
    taiwan: jaTaiwan,
    thailand: jaThailand,
  },
  ko: {
    china: koChina,
    japan: koJapan,
    korea: koKorea,
    singapore: koSingapore,
    "hong-kong": koHongKong,
    taiwan: koTaiwan,
    thailand: koThailand,
  },
};

export function getGuideContent(
  lang: GuideLang,
  country: GuideCountry
): CountryContent {
  return CONTENT_MAP[lang][country];
}

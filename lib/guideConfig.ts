export const VALID_LANGS = ["en", "th", "es", "zh", "ja", "ko"] as const;
export type GuideLang = (typeof VALID_LANGS)[number];

export const VALID_COUNTRIES = [
  "china",
  "japan",
  "korea",
  "singapore",
  "hong-kong",
  "taiwan",
  "thailand",
] as const;
export type GuideCountry = (typeof VALID_COUNTRIES)[number];

export interface FxFeeItem {
  name: string;
  detail: string;
}

export interface TypicalCost {
  item: string;
  range: string;
}

export interface Attraction {
  name: string;
  detail: string;
  price: string;
  tip?: string;
}

export interface CountryContent {
  countryName: string;
  currency: string;
  countryCode: string;
  countryFlag: string;
  heroTip: string;
  // Extended travel money guide fields (optional — populated per country)
  intro?: string;
  paymentMethods?: string;
  bestPaymentMethod: string;
  bestCard: string;
  atmInfo?: string;
  topTips: string[];
  avoidTip: string;
  dccNote: string;
  fxFeeItems: FxFeeItem[];
  typicalCosts?: TypicalCost[];
  attractions?: Attraction[];
  fxExamplePayment?: number;
  fxExampleMidCost?: string;
  fxExampleActualCost?: string;
  fxExampleHiddenFee?: string;
  fxExamplePct?: string;
  calculatorCta?: string;
}

export const COUNTRY_META: Record<
  GuideCountry,
  {
    code: string;
    currency: string;
    flag: string;
    atmFeeLocal: number;       // flat ATM surcharge in local currency (0 = none)
    exampleWithdrawal: number; // illustrative withdrawal amount in local currency
    fxFeePercent: number;      // combined FX fee % used in the cost example
  }
> = {
  china:       { code: "CN", currency: "CNY", flag: "🇨🇳", atmFeeLocal: 0,   exampleWithdrawal: 500,    fxFeePercent: 2.5 },
  japan:       { code: "JP", currency: "JPY", flag: "🇯🇵", atmFeeLocal: 110, exampleWithdrawal: 10000,  fxFeePercent: 2.5 },
  korea:       { code: "KR", currency: "KRW", flag: "🇰🇷", atmFeeLocal: 3000, exampleWithdrawal: 100000, fxFeePercent: 2.5 },
  singapore:   { code: "SG", currency: "SGD", flag: "🇸🇬", atmFeeLocal: 5,   exampleWithdrawal: 200,    fxFeePercent: 2.5 },
  "hong-kong": { code: "HK", currency: "HKD", flag: "🇭🇰", atmFeeLocal: 0,   exampleWithdrawal: 1000,   fxFeePercent: 2.5 },
  taiwan:      { code: "TW", currency: "TWD", flag: "🇹🇼", atmFeeLocal: 75,  exampleWithdrawal: 3000,   fxFeePercent: 2.5 },
  thailand:    { code: "TH", currency: "THB", flag: "🇹🇭", atmFeeLocal: 220, exampleWithdrawal: 10000,  fxFeePercent: 3   },
};

export const SLUG_TO_COUNTRY: Record<string, GuideCountry> = {
  "china-payment-guide": "china",
  "japan-payment-guide": "japan",
  "korea-payment-guide": "korea",
  "singapore-payment-guide": "singapore",
  "hong-kong-payment-guide": "hong-kong",
  "taiwan-payment-guide": "taiwan",
  "thailand-payment-guide": "thailand",
};

export const CODE_TO_COUNTRY: Record<string, GuideCountry> = {
  CN: "china",
  JP: "japan",
  KR: "korea",
  SG: "singapore",
  HK: "hong-kong",
  TW: "taiwan",
  TH: "thailand",
};

export const COUNTRY_LOCALE_KEY: Record<GuideCountry, string> = {
  china: "countryChina",
  japan: "countryJapan",
  korea: "countryKorea",
  singapore: "countrySingapore",
  "hong-kong": "countryHongKong",
  taiwan: "countryTaiwan",
  thailand: "countryThailand",
};

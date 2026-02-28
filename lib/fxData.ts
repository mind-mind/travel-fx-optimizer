import { Country, FxOption, BankName } from "./types";
import { banks } from "@/data/banks";

export const COUNTRIES: Country[] = [
  { code: "CN", name: "China",       currency: "CNY", flag: "🇨🇳", vatEligible: true,  vatRate: 0.11, vatMinAmount: 200    },
  { code: "JP", name: "Japan",       currency: "JPY", flag: "🇯🇵", vatEligible: true,  vatRate: 0.10, vatMinAmount: 5000   },
  { code: "KR", name: "South Korea", currency: "KRW", flag: "🇰🇷", vatEligible: true,  vatRate: 0.10, vatMinAmount: 30000  },
  { code: "SG", name: "Singapore",   currency: "SGD", flag: "🇸🇬", vatEligible: true,  vatRate: 0.09, vatMinAmount: 100    },
  { code: "HK", name: "Hong Kong",   currency: "HKD", flag: "🇭🇰", vatEligible: false },
  { code: "TW", name: "Taiwan",      currency: "TWD", flag: "🇹🇼", vatEligible: true,  vatRate: 0.05, vatMinAmount: 2000   },
];

export const BANKS = Object.values(banks).map((b) => b.name) as BankName[];
export const PAYMENT_METHODS = [
  "Credit Card",
  "Alipay",
  "WeChat Pay",
  "Cash",
] as const;

/**
 * Spread above mid-market per payment method.
 * Negative = better rate than mid-market (Cash advantage).
 */
export const METHOD_SPREAD_PERCENT: Record<string, number> = {
  "Credit Card": 1.0,
  Alipay: 1.5,
  "WeChat Pay": 1.5,
  Cash: -0.5,
};

/**
 * FX options: all bank × payment-method combinations.
 * Generated dynamically from banks config — add a bank there and it appears here.
 */
export const FX_OPTIONS: FxOption[] = Object.values(banks).flatMap((b) =>
  PAYMENT_METHODS.map((method) => ({
    bank: b.name as BankName,
    method,
    fxFeePercent: b.fxFeePercent,
    spreadPercent: METHOD_SPREAD_PERCENT[method],
  }))
);

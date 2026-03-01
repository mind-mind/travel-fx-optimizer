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

// Non-cash payment methods — these are tied to a specific bank
const BANK_METHODS = PAYMENT_METHODS.filter((m) => m !== "Cash");

/**
 * FX options:
 * - Bank × non-cash methods (Credit Card, Alipay, WeChat Pay).
 * - A single Cash option not tied to any bank.
 *
 * FX fee applies to all bank-tied methods (Credit Card, Alipay, WeChat Pay)
 * to model card-linked wallet usage. Cash has 0% bank FX fee.
 */
export const FX_OPTIONS: FxOption[] = [
  // Bank-tied methods
  ...Object.values(banks).flatMap((b) =>
    BANK_METHODS.map((method) => ({
      bank: b.name as BankName,
      method,
      fxFeePercent: b.fxFeePercent,
      spreadPercent: METHOD_SPREAD_PERCENT[method],
    }))
  ),
  // Cash — single standalone option, no bank fee
  {
    bank: "Cash" as BankName,
    method: "Cash" as (typeof PAYMENT_METHODS)[number],
    fxFeePercent: 0,
    spreadPercent: METHOD_SPREAD_PERCENT["Cash"],
  },
];

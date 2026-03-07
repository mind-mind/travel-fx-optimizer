import { Country, FxOption, BankName, PaymentMethod } from "./types";
import { banks } from "@/data/banks";
import { METHOD_SPREAD_PERCENT } from "./feeConfig";

export { METHOD_SPREAD_PERCENT };

export const COUNTRIES: Country[] = [
  // Asia
  { code: "CN", name: "China",        currency: "CNY", flag: "🇨🇳", vatEligible: true,  vatRate: 0.11, vatMinAmount: 200    },
  { code: "JP", name: "Japan",        currency: "JPY", flag: "🇯🇵", vatEligible: true,  vatRate: 0.10, vatMinAmount: 5000   },
  { code: "KR", name: "South Korea",  currency: "KRW", flag: "🇰🇷", vatEligible: true,  vatRate: 0.10, vatMinAmount: 30000  },
  { code: "SG", name: "Singapore",    currency: "SGD", flag: "🇸🇬", vatEligible: true,  vatRate: 0.09, vatMinAmount: 100    },
  { code: "HK", name: "Hong Kong",    currency: "HKD", flag: "🇭🇰", vatEligible: false },
  { code: "TW", name: "Taiwan",       currency: "TWD", flag: "🇹🇼", vatEligible: true,  vatRate: 0.05, vatMinAmount: 2000   },
  { code: "TH", name: "Thailand",     currency: "THB", flag: "🇹🇭", vatEligible: true,  vatRate: 0.07, vatMinAmount: 5000   },
  { code: "MY", name: "Malaysia",     currency: "MYR", flag: "🇲🇾", vatEligible: false },
  { code: "VN", name: "Vietnam",      currency: "VND", flag: "🇻🇳", vatEligible: false },
  { code: "ID", name: "Indonesia",    currency: "IDR", flag: "🇮🇩", vatEligible: false },
  { code: "PH", name: "Philippines",  currency: "PHP", flag: "🇵🇭", vatEligible: false },
  { code: "IN", name: "India",        currency: "INR", flag: "🇮🇳", vatEligible: false },
  // Europe
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧", vatEligible: true,  vatRate: 0.20, vatMinAmount: 30     },
  { code: "DE", name: "Germany",        currency: "EUR", flag: "🇩🇪", vatEligible: true,  vatRate: 0.19, vatMinAmount: 50     },
  { code: "FR", name: "France",         currency: "EUR", flag: "🇫🇷", vatEligible: true,  vatRate: 0.20, vatMinAmount: 100    },
  { code: "IT", name: "Italy",          currency: "EUR", flag: "🇮🇹", vatEligible: true,  vatRate: 0.22, vatMinAmount: 155    },
  { code: "ES", name: "Spain",          currency: "EUR", flag: "🇪🇸", vatEligible: true,  vatRate: 0.21, vatMinAmount: 90     },
  { code: "CH", name: "Switzerland",    currency: "CHF", flag: "🇨🇭", vatEligible: true,  vatRate: 0.077, vatMinAmount: 500   },
  { code: "TR", name: "Turkey",         currency: "TRY", flag: "🇹🇷", vatEligible: false },
  { code: "PL", name: "Poland",         currency: "PLN", flag: "🇵🇱", vatEligible: false },
  // Americas
  { code: "US", name: "United States",  currency: "USD", flag: "🇺🇸", vatEligible: false },
  { code: "CA", name: "Canada",         currency: "CAD", flag: "🇨🇦", vatEligible: false },
  { code: "MX", name: "Mexico",         currency: "MXN", flag: "🇲🇽", vatEligible: false },
  // Oceania
  { code: "AU", name: "Australia",      currency: "AUD", flag: "🇦🇺", vatEligible: true,  vatRate: 0.10, vatMinAmount: 300    },
  { code: "NZ", name: "New Zealand",    currency: "NZD", flag: "🇳🇿", vatEligible: false },
  // Middle East & Africa
  { code: "AE", name: "UAE",            currency: "AED", flag: "🇦🇪", vatEligible: true,  vatRate: 0.05, vatMinAmount: 250    },
  { code: "SA", name: "Saudi Arabia",   currency: "SAR", flag: "🇸🇦", vatEligible: false },
];

/** Currencies a user can select as their home (spending) currency */
export interface HomeCurrencyOption {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

export const HOME_CURRENCIES: HomeCurrencyOption[] = [
  { code: "USD", name: "US Dollar",          flag: "🇺🇸", symbol: "$"   },
  { code: "EUR", name: "Euro",               flag: "🇪🇺", symbol: "€"   },
  { code: "GBP", name: "British Pound",      flag: "🇬🇧", symbol: "£"   },
  { code: "THB", name: "Thai Baht",          flag: "🇹🇭", symbol: "฿"   },
  { code: "SGD", name: "Singapore Dollar",   flag: "🇸🇬", symbol: "S$"  },
  { code: "AUD", name: "Australian Dollar",  flag: "🇦🇺", symbol: "A$"  },
  { code: "CAD", name: "Canadian Dollar",    flag: "🇨🇦", symbol: "C$"  },
  { code: "JPY", name: "Japanese Yen",       flag: "🇯🇵", symbol: "¥"   },
  { code: "KRW", name: "South Korean Won",   flag: "🇰🇷", symbol: "₩"   },
  { code: "CNY", name: "Chinese Yuan",       flag: "🇨🇳", symbol: "¥"   },
  { code: "SAR", name: "Saudi Riyal",        flag: "🇸🇦", symbol: "﷼"   },
  { code: "PLN", name: "Polish Złoty",       flag: "🇵🇱", symbol: "zł"  },
  { code: "CHF", name: "Swiss Franc",        flag: "🇨🇭", symbol: "Fr." },
  { code: "HKD", name: "Hong Kong Dollar",   flag: "🇭🇰", symbol: "HK$" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$" },
  { code: "INR", name: "Indian Rupee",       flag: "🇮🇳", symbol: "₹"   },
];

/** Countries where mobile QR pay (Alipay, WeChat Pay) is commonly accepted */
const MOBILE_PAY_COUNTRIES = new Set(["CN", "HK", "TW", "SG", "MY", "JP", "KR", "TH", "VN", "ID", "PH"]);

export const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "Apple Pay",
  "Google Pay",
  "Alipay",
  "WeChat Pay",
  "ATM",
  "Cash",
] as const;

/** Payment methods available for a given destination country */
export function getAvailableMethods(countryCode: string): readonly PaymentMethod[] {
  if (MOBILE_PAY_COUNTRIES.has(countryCode)) return PAYMENT_METHODS;
  return PAYMENT_METHODS.filter((m) => m !== "Alipay" && m !== "WeChat Pay") as PaymentMethod[];
}

export const BANKS = Object.values(banks).map((b) => b.name) as BankName[];

// Card-tied methods: bank FX fee applies
const BANK_METHODS = PAYMENT_METHODS.filter((m) => m !== "Cash");

/**
 * FX options: card tier × card-tied methods + a standalone Cash option.
 */
export const FX_OPTIONS: FxOption[] = [
  ...Object.values(banks).flatMap((b) =>
    BANK_METHODS.map((method) => ({
      bank: b.name as BankName,
      method: method as PaymentMethod,
      fxFeePercent: b.fxFeePercent,
      spreadPercent: METHOD_SPREAD_PERCENT[method],
    }))
  ),
  {
    bank: "Cash" as BankName,
    method: "Cash" as PaymentMethod,
    fxFeePercent: 0,
    spreadPercent: METHOD_SPREAD_PERCENT["Cash"],
  },
];

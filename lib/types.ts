export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
  vatEligible: boolean;
  vatRate?: number;
  /** Minimum single-purchase amount (in local currency) required to qualify for VAT refund */
  vatMinAmount?: number;
}

// Generic card fee tier — replaces Thai-bank-specific names
export type BankName =
  | "No-fee card"
  | "Travel card"
  | "Standard card"
  | "Basic card"
  | "Cash";
export type PaymentMethod =
  | "Credit Card"
  | "Debit Card"
  | "Apple Pay"
  | "Google Pay"
  | "Alipay"
  | "WeChat Pay"
  | "Cash"
  | "ATM";

export interface FxOption {
  bank: BankName;
  method: PaymentMethod;
  /** Card FX fee as a percentage of converted amount */
  fxFeePercent: number;
  /** Spread above (or below) mid-market as a percentage */
  spreadPercent: number;
}

export interface ComparisonResult {
  bank: BankName;
  method: PaymentMethod;
  fxFeePercent: number;
  spreadPercent: number;
  /** Effective home-currency per 1 foreign-currency unit */
  effectiveRate: number;
  /** FX fee portion in home currency */
  fxFeeHome: number;
  /** Spread cost vs mid-market in home currency */
  spreadCostHome: number;
  /** Total home-currency cost */
  totalHome: number;
  /** Whether this is the cheapest option */
  isCheapest: boolean;
  /** How much the user saves vs the most expensive option (home currency) */
  savings: number;
}

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

export type BankName =
  | "KBank"
  | "SCB"
  | "Bangkok Bank"
  | "Krungsri"
  | "TTB"
  | "UOB Thailand";
export type PaymentMethod = "Credit Card" | "Alipay" | "WeChat Pay" | "Cash";

export interface FxOption {
  bank: BankName;
  method: PaymentMethod;
  /** Bank FX fee as a percentage of converted amount */
  fxFeePercent: number;
  /** Spread above (or below) mid-market as a percentage */
  spreadPercent: number;
}

export interface ComparisonResult {
  bank: BankName;
  method: PaymentMethod;
  fxFeePercent: number;
  spreadPercent: number;
  /** Effective THB/CNY rate = midRate × (1 + spreadPercent/100) */
  effectiveRate: number;
  /** FX fee portion in THB */
  fxFeeTHB: number;
  /** Spread cost vs mid-market in THB */
  spreadCostTHB: number;
  /** Total THB paid */
  totalTHB: number;
  /** Whether this is the cheapest option */
  isCheapest: boolean;
  /** How much the user saves vs the most expensive option (THB) */
  savings: number;
}

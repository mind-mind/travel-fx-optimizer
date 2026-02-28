import { ComparisonResult } from "./types";
import { FX_OPTIONS, COUNTRIES } from "./fxData";
import { BankName, PaymentMethod } from "./types";
import { calculateTotal } from "./calculate";

// Re-export calculateCost as an alias so existing callers don't break
export { calculateTotal as calculateCost };
export type { CalculateOutput as CalculationResult } from "./calculate";

/**
 * Compares all bank × payment-method combinations for a given amount and
 * live mid-market rate.
 *
 * @param amountCNY - Purchase amount in CNY
 * @param midRate   - Live mid-market THB per 1 CNY (from /api/fx)
 */
export function calculateComparisons(
  amountCNY: number,
  midRate: number
): ComparisonResult[] {
  const base = FX_OPTIONS.map((opt) => {
    const { totalTHB, fxFeeCost, spreadCost } = calculateTotal({
      amountCNY,
      midRate,
      fxFeePercent: opt.fxFeePercent,
      spreadPercent: opt.spreadPercent,
    });
    const effectiveRate = midRate * (1 + opt.spreadPercent / 100);
    return {
      ...opt,
      effectiveRate,
      fxFeeTHB: fxFeeCost,
      spreadCostTHB: spreadCost,
      totalTHB,
    };
  });

  const minTotal = Math.min(...base.map((r) => r.totalTHB));
  const maxTotal = Math.max(...base.map((r) => r.totalTHB));
  // Epsilon tolerance to handle floating-point rounding (0.001 THB)
  const EPSILON = 0.001;

  return base.map((r) => ({
    ...r,
    isCheapest: Math.abs(r.totalTHB - minTotal) < EPSILON,
    savings: Math.abs(r.totalTHB - minTotal) < EPSILON ? maxTotal - minTotal : 0,
  }));
}

/** @deprecated Use calculateComparisons instead */
export function calculateOptions(
  amountCNY: number,
  _bank: BankName,
  _method: PaymentMethod,
  _currency: string = "CNY",
  midRate: number = 4.9
): ComparisonResult[] {
  return calculateComparisons(amountCNY, midRate);
}

/** Return only the result for the user's chosen bank + method */
export function getSelectedResult(
  results: ComparisonResult[],
  bank: BankName,
  method: PaymentMethod
): ComparisonResult | undefined {
  return results.find((r) => r.bank === bank && r.method === method);
}

/** Return the cheapest result */
export function getCheapestResult(
  results: ComparisonResult[]
): ComparisonResult | undefined {
  return results.find((r) => r.isCheapest);
}

// ---------------------------------------------------------------------------
// VAT Refund
// ---------------------------------------------------------------------------

export interface VatRefundResult {
  /** Whether the country has any VAT refund scheme at all */
  vatEligible: boolean;
  /** Whether the entered amount meets the minimum purchase threshold */
  meetsMinimum: boolean;
  /** Both vatEligible and meetsMinimum are true */
  qualifies: boolean;
  /** VAT/GST rate as a decimal (e.g. 0.10 for 10%) */
  vatRate: number;
  /** Minimum purchase amount required in local currency (0 if N/A) */
  minAmount: number;
  /** Estimated refund in the destination currency (0 if !qualifies) */
  estimatedRefund: number;
}

/**
 * Returns VAT refund eligibility and estimated refund amount
 * based on verified country-specific thresholds.
 */
export function getVatRefund(
  amount: number,
  countryCode: string
): VatRefundResult {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  const vatEligible = !!(country?.vatEligible);
  const vatRate = country?.vatRate ?? 0;
  const minAmount = country?.vatMinAmount ?? 0;
  const meetsMinimum = vatEligible && amount >= minAmount && minAmount > 0;
  const qualifies = vatEligible && meetsMinimum;

  return {
    vatEligible,
    meetsMinimum,
    qualifies,
    vatRate,
    minAmount,
    estimatedRefund: qualifies
      ? parseFloat((amount * vatRate).toFixed(2))
      : 0,
  };
}


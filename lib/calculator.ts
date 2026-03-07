import { ComparisonResult } from "./types";
import { FX_OPTIONS, COUNTRIES } from "./fxData";
import { BankName, PaymentMethod } from "./types";
import { calculateTotal } from "./calculate";

// Re-export calculateCost as an alias so existing callers don't break
export { calculateTotal as calculateCost };
export type { CalculateOutput as CalculationResult } from "./calculate";

/**
 * Compares all card-tier × payment-method combinations for a given amount
 * and live mid-market rate.
 *
 * @param amountForeign - Purchase amount in the destination currency
 * @param midRate       - Live mid-market home-currency per 1 destination-currency unit
 */
export function calculateComparisons(
  amountForeign: number,
  midRate: number
): ComparisonResult[] {
  const base = FX_OPTIONS.map((opt) => {
    const { totalHome, fxFeeCost, spreadCost } = calculateTotal({
      amountForeign,
      midRate,
      fxFeePercent: opt.fxFeePercent,
      spreadPercent: opt.spreadPercent,
    });
    const effectiveRate = midRate * (1 + opt.spreadPercent / 100);
    return {
      ...opt,
      effectiveRate,
      fxFeeHome: fxFeeCost,
      spreadCostHome: spreadCost,
      totalHome,
    };
  });

  const minTotal = Math.min(...base.map((r) => r.totalHome));
  const maxTotal = Math.max(...base.map((r) => r.totalHome));
  const EPSILON = 0.001;

  return base.map((r) => ({
    ...r,
    isCheapest: Math.abs(r.totalHome - minTotal) < EPSILON,
    savings: Math.abs(r.totalHome - minTotal) < EPSILON ? maxTotal - minTotal : 0,
  }));
}

/** @deprecated Use calculateComparisons instead */
export function calculateOptions(
  amountForeign: number,
  _bank: BankName,
  _method: PaymentMethod,
  _currency: string = "USD",
  midRate: number = 1.0
): ComparisonResult[] {
  return calculateComparisons(amountForeign, midRate);
}

/** Return only the result for the user's chosen card tier + method */
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
  vatEligible: boolean;
  meetsMinimum: boolean;
  qualifies: boolean;
  vatRate: number;
  minAmount: number;
  estimatedRefund: number;
}

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


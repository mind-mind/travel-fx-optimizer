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

  return base.map((r) => ({
    ...r,
    isCheapest: r.totalTHB === minTotal,
    savings: r.totalTHB === minTotal ? maxTotal - minTotal : 0,
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
  /** Whether the country supports VAT refunds */
  qualifies: boolean;
  /** VAT rate as a decimal (e.g. 0.11 for 11%) */
  vatRate: number;
  /** Estimated refund in the destination currency */
  estimatedRefund: number;
}

/**
 * Returns VAT refund eligibility and estimated refund amount
 * based on the destination country config.
 */
export function getVatRefund(
  amount: number,
  countryCode: string
): VatRefundResult {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  const qualifies = !!(country?.vatEligible && amount > 0);
  const vatRate = country?.vatRate ?? 0;

  return {
    qualifies,
    vatRate,
    estimatedRefund: qualifies
      ? parseFloat((amount * vatRate).toFixed(2))
      : 0,
  };
}


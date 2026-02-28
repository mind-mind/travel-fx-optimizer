export interface CalculateInput {
  amountCNY: number;
  midRate: number;
  fxFeePercent: number;
  spreadPercent: number;
}

export interface CalculateOutput {
  totalTHB: number;
  fxFeeCost: number;
  spreadCost: number;
}

/**
 * Calculates total THB cost of a CNY payment, broken down into
 * FX fee and spread components.
 *
 * @param amountCNY    - Purchase amount in CNY
 * @param midRate      - Mid-market THB per 1 CNY (no markup)
 * @param fxFeePercent - Bank/card FX fee percentage (e.g. 3.0 = 3 %)
 * @param spreadPercent - Exchange-rate spread percentage above mid-market
 *                        (negative = better rate than mid, e.g. Cash = -0.5)
 */
export function calculateTotal({
  amountCNY,
  midRate,
  fxFeePercent,
  spreadPercent,
}: CalculateInput): CalculateOutput {
  const baseTHB = amountCNY * midRate;
  const fxFeeCost = baseTHB * (fxFeePercent / 100);
  const spreadCost = baseTHB * (spreadPercent / 100);
  const totalTHB = baseTHB + fxFeeCost + spreadCost;

  return { totalTHB, fxFeeCost, spreadCost };
}

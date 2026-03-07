export interface CalculateInput {
  amountForeign: number;
  midRate: number;
  fxFeePercent: number;
  spreadPercent: number;
}

export interface CalculateOutput {
  totalHome: number;
  fxFeeCost: number;
  spreadCost: number;
}

/**
 * Calculates total home-currency cost of a foreign-currency payment, broken
 * down into FX fee and spread components.
 *
 * @param amountForeign - Purchase amount in destination currency
 * @param midRate       - Mid-market home-currency per 1 foreign-currency unit
 * @param fxFeePercent  - Card FX fee percentage (e.g. 2.5 = 2.5 %)
 * @param spreadPercent - Exchange-rate spread % above mid-market
 *                        (negative = better rate than mid, e.g. Cash = -0.5)
 */
export function calculateTotal({
  amountForeign,
  midRate,
  fxFeePercent,
  spreadPercent,
}: CalculateInput): CalculateOutput {
  const baseHome = amountForeign * midRate;
  const fxFeeCost = baseHome * (fxFeePercent / 100);
  const spreadCost = baseHome * (spreadPercent / 100);
  const totalHome = baseHome + fxFeeCost + spreadCost;

  return { totalHome, fxFeeCost, spreadCost };
}

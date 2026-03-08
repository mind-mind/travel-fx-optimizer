/**
 * Formats a number as an ISO-code currency string.
 * Example: fmtCurrency(104.24, "AUD") → "AUD 104.24"
 *          fmtCurrency(10000, "JPY") → "JPY 10,000.00"
 */
export function fmtCurrency(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  const sign = amount < 0 ? "-" : "";
  return `${sign}${currency} ${formatted}`;
}

/**
 * Same as fmtCurrency but rounds to the nearest whole number.
 * Example: fmtCurrencyRound(1234.9, "AUD") → "AUD 1,235"
 */
export function fmtCurrencyRound(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(Math.round(amount)));
  const sign = amount < 0 ? "-" : "";
  return `${sign}${currency} ${formatted}`;
}

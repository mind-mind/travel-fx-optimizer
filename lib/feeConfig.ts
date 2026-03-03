/**
 * feeConfig.ts — centralised fee assumptions for all payment methods.
 *
 * These values are intentionally separated so they can be updated without
 * touching calculation or UI logic.  All values are percentages (%).
 *
 * Sources / rationale:
 *  - Credit Card / Alipay / WeChat Pay spreads: Visa/Mastercard wholesale
 *    spread above mid-market, typical for consumer cards.
 *  - Cash spread: Tourist exchange desks typically price cash slightly below
 *    mid-market (negative spread = user gets slightly LESS than mid-rate).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * How to update:
 *   1. Update the numeric value here.
 *   2. Re-deploy. No other file needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Estimated spread (%) above mid-market rate per payment method.
 * A positive value means the user pays MORE than mid-rate (i.e., cost).
 * A negative value means the user receives a rate BETTER than mid-rate
 * (e.g., a competitive cash exchange desk).
 */
export const METHOD_SPREAD_PERCENT: Record<string, number> = {
  /** ~1% over mid-market — typical Visa/Mastercard network spread */
  "Credit Card": 1.0,

  /** ~1.5% — card-linked Alipay applies the card's FX fee + a slightly wider spread */
  "Alipay": 1.5,

  /** ~1.5% — same basis as Alipay card-linked */
  "WeChat Pay": 1.5,

  /**
   * −0.5% — a competitive SuperRich / money-changer kiosk can sometimes
   * slightly beat mid-rate; modelled as a small negative spread.
   * Adjust toward 0% for airport counters, which are less competitive.
   */
  "Cash": -0.5,
};

/**
 * Bank-level FX fee percentages are stored per-bank in data/banks.ts
 * alongside their source URL and last-verified date.
 */

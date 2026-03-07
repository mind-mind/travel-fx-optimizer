/**
 * Generic card fee tiers for international travelers.
 *
 * FX fee = the "Foreign Transaction Fee" charged by the card issuer on every
 * foreign-currency purchase, on top of the Visa/Mastercard/Amex mid-market rate.
 *
 * These four tiers cover the range of cards available worldwide:
 *   no_fee   : Wise, Revolut, Charles Schwab, Starling, Monzo — 0% FX fee
 *   travel   : Chase Sapphire, Capital One Venture, Barclaycard Rewards — ~1.5%
 *   standard : Most typical bank debit/credit cards — ~2.5%
 *   basic    : Some older or regional bank cards — ~3.5%
 *
 * Always verify the exact rate with your card issuer before traveling.
 * Last reviewed: 2026-03-07
 */
export const banks = {
  no_fee: {
    name: "No-fee card" as const,
    fxFeePercent: 0,
    examples: "Wise, Revolut, Charles Schwab, Starling",
    description: "0% FX fee (e.g. Wise, Revolut, Charles Schwab, Starling)",
    sourceUrl: "https://wise.com",
    lastVerified: "2026-03-07",
  },
  travel: {
    name: "Travel card" as const,
    fxFeePercent: 1.5,
    examples: "Chase Sapphire, Capital One, Barclaycard",
    description: "Low-fee travel/rewards card (e.g. Chase Sapphire, Capital One Venture)",
    sourceUrl: "https://www.nerdwallet.com/best/credit-cards/no-foreign-transaction-fee",
    lastVerified: "2026-03-07",
  },
  standard: {
    name: "Standard card" as const,
    fxFeePercent: 2.5,
    examples: "Most Visa / Mastercard",
    description: "Typical bank credit/debit card (~2–2.5% FX fee)",
    sourceUrl: "https://www.nerdwallet.com/article/credit-cards/foreign-transaction-fees",
    lastVerified: "2026-03-07",
  },
  basic: {
    name: "Basic card" as const,
    fxFeePercent: 3.5,
    examples: "Older / regional bank cards",
    description: "Older or basic bank card (~3–3.5% FX fee)",
    sourceUrl: "https://www.nerdwallet.com/article/credit-cards/foreign-transaction-fees",
    lastVerified: "2026-03-07",
  },
} as const;

export type BankKey = keyof typeof banks;

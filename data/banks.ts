/**
 * Thai bank credit card FX fee reference data.
 *
 * FX fee = the "Foreign Transaction Fee" (ค่าธรรมเนียมการแปลงสกุลเงิน) charged
 * by the ISSUING Thai bank on top of the Visa/Mastercard mid-market rate.
 *
 * Regulatory context (BOT):
 *   The Bank of Thailand sets the MAXIMUM foreign transaction fee at 2.5%.
 *   Most Thai banks charge exactly this maximum. UOB Thailand is the only
 *   major issuer currently offering a below-maximum rate (1.85%).
 *
 * Last bulk review: 2026-03-03
 * Source: each bank's publicly published fee schedule (linked per entry).
 * Note: These rates are stable and change infrequently; verify with each
 *       bank's official fee table before any customer-facing publication.
 */
export const banks = {
  kbank: {
    name: "KBank",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.kasikornbank.com/th/personal/credit-card/pages/default.aspx",
    lastVerified: "2026-03-03",
  },
  scb: {
    name: "SCB",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.scb.co.th/th/personal-banking/cards/credit-cards/credit-card-service-fees.html",
    lastVerified: "2026-03-03",
  },
  ktc: {
    name: "KTC",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.ktc.co.th/en/credit-card/fees-and-rates",
    lastVerified: "2026-03-03",
  },
  bangkok: {
    name: "Bangkok Bank",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.bangkokbank.com/th-TH/Personal/Other-Services/View-Rates/Fees-and-Conditions-for-Bangkok-Bank-Credit-Cards",
    lastVerified: "2026-03-03",
  },
  krungsri: {
    name: "Krungsri",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.krungsri.com/en/personal/credit-card",
    lastVerified: "2026-03-03",
  },
  ttb: {
    name: "TTB",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.ttbbank.com/en/personal/credit-card",
    lastVerified: "2026-03-03",
  },
  uob: {
    name: "UOB Thailand",
    // UOB Thailand charges 1.85% — the lowest published FX fee among major
    // Thai issuers, confirmed via their official announcement page.
    fxFeePercent: 1.85,
    sourceUrl: "https://www.uob.co.th/personal/announcement/index.page",
    lastVerified: "2026-03-03",
  },
} as const;

export type BankKey = keyof typeof banks;

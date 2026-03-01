export const banks = {
  kbank: {
    name: "KBank",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.kasikornbank.com/th/personal/credit-card/pages/default.aspx",
    lastVerified: "2026-03-01",
  },
  scb: {
    name: "SCB",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.scb.co.th/th/personal-banking/cards/credit-cards/credit-card-service-fees.html",
    lastVerified: "2026-03-01",
  },
  ktc: {
    name: "KTC",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.ktc.co.th/en/credit-card/fees-and-rates",
    lastVerified: "2026-03-01",
  },
  bangkok: {
    name: "Bangkok Bank",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.bangkokbank.com/th-TH/Personal/Other-Services/View-Rates/Fees-and-Conditions-for-Bangkok-Bank-Credit-Cards",
    lastVerified: "2026-03-01",
  },
  krungsri: {
    name: "Krungsri",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.krungsri.com/en/personal/credit-card",
    lastVerified: "2026-03-01",
  },
  ttb: {
    name: "TTB",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.ttbbank.com/en/personal/credit-card",
    lastVerified: "2026-03-01",
  },
  uob: {
    name: "UOB Thailand",
    fxFeePercent: 1.85,
    sourceUrl: "https://www.uob.co.th/personal/announcement/index.page",
    lastVerified: "2026-03-01",
  },
} as const;

export type BankKey = keyof typeof banks;

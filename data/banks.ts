export const banks = {
  kbank: {
    name: "KBank",
    fxFeePercent: 3.0,
    sourceUrl: "https://www.kasikornbank.com",
    lastVerified: "2026-02-28",
  },
  scb: {
    name: "SCB",
    fxFeePercent: 2.75,
    sourceUrl: "https://www.scb.co.th",
    lastVerified: "2026-02-28",
  },
  ktc: {
    name: "KTC",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.ktc.co.th",
    lastVerified: "2026-03-01",
  },
  bangkok: {
    name: "Bangkok Bank",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.bangkokbank.com",
    lastVerified: "2026-02-28",
  },
  krungsri: {
    name: "Krungsri",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.krungsri.com",
    lastVerified: "2026-02-28",
  },
  ttb: {
    name: "TTB",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.ttbbank.com",
    lastVerified: "2026-02-28",
  },
  uob: {
    name: "UOB Thailand",
    fxFeePercent: 2.5,
    sourceUrl: "https://www.uob.co.th",
    lastVerified: "2026-02-28",
  },
} as const;

export type BankKey = keyof typeof banks;

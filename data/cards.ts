/**
 * cards.ts — Generic card tier recommendations for international travelers.
 *
 * These replace Thai-bank-specific suggestions with globally relevant
 * card categories that any traveler worldwide can identify with.
 */

export interface CardSuggestion {
  id: string;
  name: string;
  bank: string;
  fxFeePercent: number;
  annualFeeLabel: string;
  annualFeeWaivable: boolean;
  highlights: string[];
  highlightsEn: string[];
  approximate: boolean;
  sourceUrl: string;
  lastVerified: string;
}

export const SAVINGS_BENCHMARK_FX_PERCENT = 1.5;

/** Always show savings simulation regardless of trip amount */
export const SAVINGS_SIMULATION_THRESHOLD_HOME = 0;

export const LOW_FX_THRESHOLD = 1.5;   // ≤ 1.5% → green
export const HIGH_FX_THRESHOLD = 2.5;  // > 2.5% → red

export const RECOMMENDED_CARDS: CardSuggestion[] = [
  {
    id: "zero-fee-digital",
    name: "Zero-fee travel card",
    bank: "e.g. Wise, Revolut, Charles Schwab",
    fxFeePercent: 0,
    annualFeeLabel: "Free",
    annualFeeWaivable: false,
    highlights: [
      "ค่าธรรมเนียม FX 0% — ไม่มีค่าอัตราแลกเปลี่ยน",
      "ใช้อัตราแลกเปลี่ยนระหว่างธนาคาร (interbank rate)",
      "เหมาะที่สุดสำหรับนักเดินทางบ่อย",
    ],
    highlightsEn: [
      "0% foreign transaction fee",
      "True interbank exchange rates — no markup",
      "Best option for frequent travelers",
    ],
    approximate: true,
    sourceUrl: "https://wise.com",
    lastVerified: "2026-03-07",
  },
  {
    id: "travel-rewards",
    name: "Travel rewards card",
    bank: "e.g. Chase Sapphire, Amex Platinum",
    fxFeePercent: 0,
    annualFeeLabel: "$95–$695/yr",
    annualFeeWaivable: false,
    highlights: [
      "ค่าธรรมเนียม FX 0% พร้อม rewards points",
      "สิทธิพิเศษสำหรับนักเดินทาง lounge access",
      "เหมาะสำหรับผู้ที่เดินทางปีละหลายครั้ง",
    ],
    highlightsEn: [
      "0% foreign transaction fee with travel rewards",
      "Travel perks: lounge access, trip protection",
      "Ideal for frequent flyers and travelers",
    ],
    approximate: true,
    sourceUrl: "https://creditcards.chase.com/travel-credit-cards/sapphire/preferred",
    lastVerified: "2026-03-07",
  },
  {
    id: "low-fee-travel",
    name: "Low-fee travel card",
    bank: "Various issuers (1.5% FX)",
    fxFeePercent: 1.5,
    annualFeeLabel: "Free – $95/yr",
    annualFeeWaivable: true,
    highlights: [
      "ค่าธรรมเนียม FX ต่ำ (~1.5%)",
      "ดีกว่าบัตรธนาคารทั่วไป",
    ],
    highlightsEn: [
      "Low FX fee (~1.5%) — better than a standard bank card",
      "Widely available from many issuers",
    ],
    approximate: true,
    sourceUrl: "https://www.nerdwallet.com/best/credit-cards/no-foreign-transaction-fee",
    lastVerified: "2026-03-07",
  },
];

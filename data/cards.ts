/**
 * cards.ts — Credit card recommendation config for the smart card engine.
 *
 * How to update:
 *   - Add / remove entries in RECOMMENDED_CARDS.
 *   - Update fxFeePercent and lastVerified whenever you re-verify fees.
 *   - Set approximate: true for any value not taken from a primary bank source.
 *
 * IMPORTANT: This data is for educational comparison only.
 * Always link users to the bank's official page (sourceUrl) for final verification.
 */

export interface CardSuggestion {
  id: string;
  /** Card display name */
  name: string;
  /** Issuing bank */
  bank: string;
  /** Bank FX transaction fee as % of converted amount */
  fxFeePercent: number;
  /** Annual fee display label (e.g. "฿895/ปี" or "ฟรี") */
  annualFeeLabel: string;
  /** Whether annual fee can typically be waived (e.g. by spending threshold) */
  annualFeeWaivable: boolean;
  /** Key selling points — Thai */
  highlights: string[];
  /** Key selling points — English */
  highlightsEn: string[];
  /** Whether fxFeePercent is an exact verified figure (false = approximate) */
  approximate: boolean;
  /** Primary source URL for fee verification */
  sourceUrl: string;
  /** ISO date when data was last checked */
  lastVerified: string;
}

/**
 * Below the fee level that triggers the savings simulation.
 * "Switching to a ~2% FX card" is used as the reference benchmark.
 */
export const SAVINGS_BENCHMARK_FX_PERCENT = 2.0;

/**
 * totalTHB threshold above which we show the savings simulation.
 * Spec: show when trip amount > 10,000 THB equivalent.
 */
export const SAVINGS_SIMULATION_THRESHOLD_THB = 10_000;

/**
 * FX fee thresholds that drive the green / yellow / red badge.
 *
 * green  : fxFeePercent ≤ LOW_FX_THRESHOLD
 * yellow : LOW_FX_THRESHOLD < fxFeePercent ≤ HIGH_FX_THRESHOLD
 * red    : fxFeePercent > HIGH_FX_THRESHOLD
 */
export const LOW_FX_THRESHOLD = 2.0;   // ≤ 2.0% → green
export const HIGH_FX_THRESHOLD = 2.5;  // > 2.5% → red

/**
 * Recommended cards — sorted ascending by fxFeePercent.
 * The UI renders the top N (default 3) lowest-fee cards from this list.
 */
export const RECOMMENDED_CARDS: CardSuggestion[] = [
  {
    id: "ttb-flash",
    name: "TTB Flash Card",
    bank: "TTB",
    fxFeePercent: 1.5,
    annualFeeLabel: "ฟรี",
    annualFeeWaivable: false,
    highlights: [
      "ค่าธรรมเนียม FX ต่ำ ~1.5%",
      "ไม่มีค่าธรรมเนียมรายปี",
      "เหมาะสำหรับนักเดินทางบ่อย",
    ],
    highlightsEn: [
      "Low FX fee ~1.5%",
      "No annual fee",
      "Good for frequent travelers",
    ],
    approximate: true,
    sourceUrl: "https://www.ttbbank.com/en/personal/credit-card",
    lastVerified: "2026-03-03",
  },
  {
    id: "uob-yolo",
    name: "UOB YOLO Card",
    bank: "UOB Thailand",
    fxFeePercent: 1.85,
    annualFeeLabel: "฿895/ปี",
    annualFeeWaivable: true,
    highlights: [
      "ค่าธรรมเนียม FX เพียง 1.85%",
      "ยกเว้นค่าธรรมเนียมรายปีได้",
      "ใช้งานออนไลน์และต่างประเทศ",
    ],
    highlightsEn: [
      "FX fee only 1.85%",
      "Annual fee can be waived",
      "Great for online & overseas spend",
    ],
    approximate: false,
    sourceUrl: "https://www.uob.co.th/personal/announcement/index.page",
    lastVerified: "2026-03-03",
  },
  {
    id: "krungsri-visa-signature",
    name: "Krungsri Visa Signature",
    bank: "Krungsri",
    fxFeePercent: 2.0,
    annualFeeLabel: "฿2,000/ปี",
    annualFeeWaivable: true,
    highlights: [
      "ค่าธรรมเนียม FX 2.0% (บัตรระดับ Signature)",
      "สิทธิประโยชน์ท่องเที่ยวเพิ่มเติม",
      "ยกเว้นค่ารายปีเมื่อใช้ครบเงื่อนไข",
    ],
    highlightsEn: [
      "FX fee 2.0% (Signature tier)",
      "Travel benefits included",
      "Annual fee waivable",
    ],
    approximate: true,
    sourceUrl: "https://www.krungsri.com/en/personal/credit-card",
    lastVerified: "2026-03-03",
  },
];

export const th = {
  // Header
  forTravelers: "สำหรับนักเดินทางชาวไทย",
  title: "เครื่องมือเปรียบเทียบวิธีจ่ายเงินต่างประเทศ",
  subtitle: "เช็คก่อนจ่าย ป้องกันเสียเงินฟรี",

  // Form labels
  countryLabel: "ประเทศปลายทาง",
  cityLabel: "เลือกเมือง",
  cityOptional: "(ถ้ามี)",
  amountLabel: "จำนวนเงิน",
  bankLabel: "ธนาคารของคุณ",
  methodLabel: "วิธีการชำระเงิน",

  // Results
  yourSelection: "ตัวเลือกของคุณ",
  bestDeal: "ถูกที่สุด",
  recommendedTitle: "แนะนำสำหรับคุณ",
  recommendedSaves: "ประหยัดเทียบตัวเลือกที่แพงที่สุด",
  totalCost: "ยอดรวม (บาท)",
  fxFee: "ค่าธรรมเนียม FX",
  spreadCost: "ส่วนต่างอัตราแลกเปลี่ยน",
  effectiveRate: "อัตราที่ใช้จริง",
  fee: "ค่าธรรมเนียม",
  youCouldSave: "คุณสามารถประหยัดได้",
  switchTo: "เปลี่ยนไปใช้",
  totalOf: "ยอดรวม",
  allOptions: "เปรียบทุกตัวเลือก",
  cheapest: "ประหยัดสูงสุด",
  selected: "ที่คุณเลือก",

  // FX rate badge
  loadingRate: "กำลังโหลดอัตรา…",
  liveRate: "อัตราสด",
  indicativeRate: "อัตราอ้างอิง",

  // VAT
  vatTitle: "ยอดนี้อาจขอคืนภาษีได้",
  vatMessage: "กรุณาตรวจสอบเงื่อนไขการคืนภาษีของประเทศปลายทางก่อนเดินทางกลับ ส่วนใหญ่ต้องดำเนินการก่อนผ่านด่านตรวจคนเข้าเมืองที่สนามบิน",
  vatWarning: "บางสนามบินหรือบางเมืองอาจไม่มีบริการคืนภาษี กรุณาตรวจสอบข้อมูลล่าสุดจากแหล่งทางการ",
  vatPurchaseAmount: "ยอดซื้อ",
  vatEstRefund: "ภาษีที่คาดว่าจะได้คืน",
  vatEligible: "ยอดนี้อาจขอคืนภาษีได้",
  vatReminder: "กรุณาตรวจสอบเงื่อนไขการคืนภาษีก่อนเดินทางกลับ",

  // Disclaimer
  disclaimer: "อัตรานี้เป็นการประมาณการ อาจแตกต่างจากอัตราที่ธนาคารเรียกเก็บจริง",
  fxSource: "mid-market rate",
  basedOn: "คำนวณจาก",
};

export const en: typeof th = {
  // Header
  forTravelers: "For Thai Travelers",
  title: "Travel Payment Optimizer",
  subtitle: "Check before you pay — stop wasting money on bad FX",

  // Form labels
  countryLabel: "Destination Country",
  cityLabel: "City",
  cityOptional: "(optional)",
  amountLabel: "Amount",
  bankLabel: "Your Bank",
  methodLabel: "Payment Method",

  // Results
  yourSelection: "Your Selection",
  bestDeal: "Best Deal",
  recommendedTitle: "Recommended for you",
  recommendedSaves: "vs most expensive",
  totalCost: "Total Cost (THB)",
  fxFee: "FX Fee",
  spreadCost: "Spread Cost",
  effectiveRate: "Effective Rate",
  fee: "Fee",
  youCouldSave: "You could save",
  switchTo: "Switch to",
  totalOf: "for a total of",
  allOptions: "Compare all options",
  cheapest: "Best value",
  selected: "Selected",

  // FX rate badge
  loadingRate: "Loading rate…",
  liveRate: "Live",
  indicativeRate: "Indicative",

  // VAT
  vatTitle: "VAT refund may apply",
  vatMessage: "Check VAT refund conditions for your destination before returning. Most require claiming before immigration.",
  vatWarning: "Some airports or areas may not offer VAT refund services. Verify with official sources.",
  vatPurchaseAmount: "Purchase Amount",
  vatEstRefund: "Est. VAT Refund",
  vatEligible: "VAT refund may apply",
  vatReminder: "Check VAT refund conditions for your destination before returning.",

  // Disclaimer
  disclaimer: "Rates are indicative and may differ from actual bank charges.",
  fxSource: "mid-market rate",
  basedOn: "Based on",
};

export const translations = { th, en } as const;
export type Lang = keyof typeof translations;
export type Translations = typeof th;

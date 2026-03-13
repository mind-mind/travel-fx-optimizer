export interface CountryGuide {
  countryCode: string;
  countryName: string;          // Thai name
  countryNameEn: string;        // English name
  slug: string;                 // URL slug e.g. "japan-payment-guide"
  flag: string;
  currency: string;
  // Thai content
  heroTip: string;
  bestPaymentMethod: string;
  topTips: string[];
  avoidTip: string;
  dccNote: string;
  bestCardTh: string;
  // English content
  heroTipEn: string;
  bestPaymentMethodEn: string;
  topTipsEn: string[];
  avoidTipEn: string;
  dccNoteEn: string;
  bestCardEn: string;
}

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    countryCode: "CN",
    countryName: "จีน",
    countryNameEn: "China",
    slug: "china-payment-guide",
    flag: "🇨🇳",
    currency: "CNY",
    heroTip: "ในจีน Alipay และ WeChat Pay คือสองตัวเลือกหลัก — เชื่อมบัตรไทยแล้วจ่ายได้เลย",
    bestPaymentMethod: "Alipay / WeChat Pay (เชื่อมบัตรเครดิตไทย)",
    topTips: [
      "ลงทะเบียน Alipay หรือ WeChat Pay ก่อนออกเดินทาง แล้วเชื่อมบัตรเครดิตไทย",
      "สแกน QR Code จ่ายได้แทบทุกร้านในจีน — ไม่ต้องแลกเงินสดมาก",
      "ถ้าต้องใช้เงินสด ถอน CNY จาก ATM ที่รองรับ UnionPay (มีในสนามบิน)",
      "เลือกธนาคารที่มีค่าธรรมเนียม FX ต่ำ เช่น KBank, SCB",
      "ตรวจสอบเรทก่อนรูดบัตรทุกครั้ง — อย่ายอมรับเรทบาท (DCC)",
    ],
    avoidTip: "อย่ายอมรับ DCC เมื่อรูดบัตรที่ร้านค้าหรือโรงแรมในจีน",
    dccNote: "ในจีน ร้านค้าหลายแห่งเสนอให้จ่ายเป็นเงินบาท — ปฏิเสธทันทีและเลือกจ่ายเป็น CNY เสมอ",
    bestCardTh: "KBank Mastercard หรือ SCB Visa — ค่า FX fee ต่ำสุดในกลุ่ม",
    heroTipEn: "In China, Alipay and WeChat Pay are the dominant payment methods — link your card before you go.",
    bestPaymentMethodEn: "Alipay / WeChat Pay (linked to a low-fee credit card)",
    topTipsEn: [
      "Register Alipay or WeChat Pay before departure and link a low-fee international credit card.",
      "Scan-to-pay QR codes work almost everywhere in China — carry minimal cash.",
      "If you need cash, withdraw CNY from ATMs that support UnionPay (available at airports).",
      "Use a card with no foreign transaction fee — Wise, Revolut, or a no-fee card from your home bank.",
      "Always check the rate before swiping — never accept home-currency billing (DCC).",
    ],
    avoidTipEn: "Never accept DCC when paying by card at merchants or hotels in China.",
    dccNoteEn: "Many merchants in China may offer to charge in your home currency — always decline and choose to pay in CNY.",
    bestCardEn: "Wise or Revolut for near-interbank FX rates. Alternatively, any no-foreign-transaction-fee card from your home bank.",
  },
  {
    countryCode: "JP",
    countryName: "ญี่ปุ่น",
    countryNameEn: "Japan",
    slug: "japan-payment-guide",
    flag: "🇯🇵",
    currency: "JPY",
    heroTip: "ญี่ปุ่นยังเป็นสังคมเงินสด — ควรถือ JPY ติดตัวไว้บ้าง ควบคู่กับบัตรเครดิต",
    bestPaymentMethod: "เงินสด JPY + บัตรเครดิตค่าธรรมเนียมต่ำ",
    topTips: [
      "ถอน JPY ที่ตู้ ATM ของ Japan Post Bank หรือ 7-Eleven (7Bank) — รองรับบัตรต่างชาติ",
      "ร้านค้าเล็กในญี่ปุ่นหลายแห่งยังรับเฉพาะเงินสด",
      "ร้านสะดวกซื้อ (Lawson, FamilyMart) มักมี IC Card reader — ใช้ Suica ได้",
      "ใช้บัตรเครดิตในร้านใหญ่ ห้างสรรพสินค้า และโรงแรมได้สะดวก",
      "อย่าลืมขอคืน VAT 10% เมื่อซื้อสินค้าครบ 5,000 JPY ขึ้นไปในร้านเดียวกัน",
    ],
    avoidTip: "หลีกเลี่ยงการแลกเงินที่สนามบินฝั่งไทย — เรทแย่กว่าในญี่ปุ่นมาก",
    dccNote: "เมื่อรูดบัตรในญี่ปุ่น เลือก JPY เสมอ อย่าเลือก THB แม้ร้านค้าจะเสนอให้",
    bestCardTh: "KBank หรือ TTB Flash Card — ไม่มี Foreign Transaction Fee บางรุ่น",
    heroTipEn: "Japan is still a cash-heavy society — carry JPY alongside your credit card.",
    bestPaymentMethodEn: "Cash JPY + no-fee credit card",
    topTipsEn: [
      "Withdraw JPY from Japan Post Bank or 7-Eleven (7Bank) ATMs — they accept foreign cards.",
      "Many small shops in Japan are cash-only.",
      "Convenience stores (Lawson, FamilyMart) often accept IC cards — Suica works.",
      "Use your credit card at department stores, large restaurants, and hotels.",
      "Claim 10% VAT refund when you spend ¥5,000+ at the same store.",
    ],
    avoidTipEn: "Avoid exchanging money at your departure airport — rates are significantly worse than in Japan.",
    dccNoteEn: "When swiping your card in Japan, always choose JPY. Never accept your home currency if offered (DCC).",
    bestCardEn: "Wise or Revolut for zero-fee ATM withdrawals and near-interbank rates. Or use any no-foreign-transaction-fee card from your home bank.",
  },
  {
    countryCode: "KR",
    countryName: "เกาหลีใต้",
    countryNameEn: "South Korea",
    slug: "korea-payment-guide",
    flag: "🇰🇷",
    currency: "KRW",
    heroTip: "เกาหลีใต้รับบัตรเครดิตแทบทุกที่ — เติมเงิน T-Money Card สำหรับขนส่งสาธารณะ",
    bestPaymentMethod: "บัตรเครดิตไทย + T-Money Card",
    topTips: [
      "เกาหลีรับบัตรเครดิต Visa/Mastercard ได้ทั่วไป รวมถึงร้านสะดวกซื้อและตลาด",
      "ซื้อ T-Money Card ที่สนามบินหรือสถานีรถไฟฟ้า ใช้กับ BTS / รถเมล์ในกรุงโซล",
      "ถอน KRW ที่ตู้ ATM ของ KEB Hana Bank หรือ Shinhan Bank — รองรับบัตรต่างชาติ",
      "ตลาด Namdaemun / Dongdaemun บางร้านชอบเงินสด — มีติดกระเป๋าไว้",
      "ขอคืน VAT 10% ได้ที่ซุ้ม Tax Refund ในห้างหรือสนามบิน",
    ],
    avoidTip: "อย่าแลกเงิน KRW ในไทย — เรทต่ำมาก ควรถอนหรือแลกในเกาหลีโดยตรง",
    dccNote: "ในเกาหลี เมื่อรูดบัตรให้เลือกจ่ายเป็น KRW เสมอ หลีกเลี่ยง DCC ที่เสนอให้จ่ายเป็นบาท",
    bestCardTh: "KTC หรือ KBank Mastercard — ค่าธรรมเนียม FX ต่ำสำหรับสกุล KRW",
    heroTipEn: "South Korea accepts credit cards almost everywhere — top up a T-Money Card for public transit.",
    bestPaymentMethodEn: "Low-fee credit card + T-Money Card",
    topTipsEn: [
      "Visa/Mastercard is accepted widely in Korea, including convenience stores and markets.",
      "Buy a T-Money Card at the airport or subway station for the Seoul metro and buses.",
      "Withdraw KRW from KEB Hana Bank or Shinhan Bank ATMs — both accept foreign cards.",
      "Namdaemun / Dongdaemun markets prefer cash at smaller stalls — keep some on hand.",
      "Claim 10% VAT refund at department store kiosks or the airport.",
    ],
    avoidTipEn: "Never exchange KRW before you arrive — rates abroad are very poor. Withdraw or exchange in Korea directly.",
    dccNoteEn: "When paying by card in Korea, always select KRW. Decline if your home currency is offered (DCC).",
    bestCardEn: "Wise or Revolut for competitive FX rates on KRW. Any Visa/Mastercard with no foreign transaction fee works well.",
  },
  {
    countryCode: "SG",
    countryName: "สิงคโปร์",
    countryNameEn: "Singapore",
    slug: "singapore-payment-guide",
    flag: "🇸🇬",
    currency: "SGD",
    heroTip: "สิงคโปร์รับบัตรเครดิตได้ทุกที่ — แทบไม่ต้องถือเงินสดเลยก็ได้",
    bestPaymentMethod: "บัตรเครดิตไทยค่า FX ต่ำ",
    topTips: [
      "บัตรเครดิตคือตัวเลือกดีที่สุดในสิงคโปร์ — รับได้ทุกร้าน รวมถึง hawker centre ส่วนใหญ่",
      "PayNow / PayLah! ของสิงคโปร์ใช้ได้แค่กับบัญชีธนาคารสิงคโปร์ ไม่เหมาะกับนักท่องเที่ยวไทย",
      "ถอน SGD จาก ATM DBS / OCBC ในเมือง เรทดีกว่าแลกเงินที่ Money Changer",
      "Money Changer ใน Mustafa Centre หรือ People's Park — เรทดีมากเมื่อแลกเงินสด",
      "VAT 9% ขอคืนได้หากซื้อครบ SGD 100 ในร้านเดียวกัน",
    ],
    avoidTip: "หลีกเลี่ยงการแลกเงินที่สนามบิน Changi — เรทต่ำกว่าแหล่งแลกในเมือง",
    dccNote: "สิงคโปร์มีร้านค้าต่างชาติมาก — เมื่อรูดบัตรให้เลือก SGD เสมอ",
    bestCardTh: "KBank Visa หรือ Bangkok Bank — รองรับ Visa ทั่วไปในสิงคโปร์",
    heroTipEn: "Singapore accepts credit cards virtually everywhere — you barely need to carry cash.",
    bestPaymentMethodEn: "No-fee credit card",
    topTipsEn: [
      "Credit cards are the best option in Singapore — accepted at almost all hawker centres and shops.",
      "PayNow / PayLah! require a Singapore bank account and aren't suitable for international visitors.",
      "Withdraw SGD from DBS / OCBC ATMs in the city — better rates than airport money changers.",
      "Mustafa Centre or People's Park money changers offer some of the best cash exchange rates.",
      "Claim 9% GST refund on purchases of SGD 100+ at the same retailer.",
    ],
    avoidTipEn: "Avoid exchanging money at Changi Airport — rates are lower than city money changers.",
    dccNoteEn: "Singapore has many international retailers — always choose SGD when paying by card.",
    bestCardEn: "Any no-foreign-transaction-fee Visa or Mastercard. Wise and Revolut are popular choices for near-interbank SGD rates.",
  },
  {
    countryCode: "HK",
    countryName: "ฮ่องกง",
    countryNameEn: "Hong Kong",
    slug: "hong-kong-payment-guide",
    flag: "🇭🇰",
    currency: "HKD",
    heroTip: "Octopus Card คือสิ่งจำเป็นสำหรับขนส่งและร้านค้าทั่วฮ่องกง",
    bestPaymentMethod: "Octopus Card + บัตรเครดิต",
    topTips: [
      "ซื้อ Octopus Card ที่สถานีรถไฟ MTR สนามบิน — ใช้กับรถไฟ รถเมล์ เรือ และร้านสะดวกซื้อ",
      "ฮ่องกงรับบัตรเครดิตได้ทั่วไป โดยเฉพาะในห้างและร้านอาหาร",
      "ถอน HKD จาก ATM Hong Kong และ Shanghai Banking (HSBC) หรือ Hang Seng Bank",
      "ตลาดกลางคืนและร้านน้ำชำ — เตรียมเงินสดไว้บ้าง",
      "ฮ่องกงไม่มีระบบคืน VAT สำหรับนักท่องเที่ยว",
    ],
    avoidTip: "อย่าแลกเงินที่ Chungking Mansions ชั้นล่าง — เรทดูแปลก บางแห่งไม่ปลอดภัย",
    dccNote: "ในฮ่องกง เลือกจ่ายเป็น HKD เสมอ อย่ายอมรับตัวเลือก THB หากร้านค้าเสนอ",
    bestCardTh: "SCB JCB หรือ Krungsri — มีสิทธิพิเศษสำหรับการใช้จ่ายในฮ่องกง",
    heroTipEn: "Octopus Card is essential for transit and everyday purchases throughout Hong Kong.",
    bestPaymentMethodEn: "Octopus Card + credit card",
    topTipsEn: [
      "Buy an Octopus Card at the MTR Airport Express station — works on MTR, buses, ferries, and 7-Eleven.",
      "Credit cards are widely accepted at shopping malls and restaurants.",
      "Withdraw HKD from HSBC or Hang Seng Bank ATMs for competitive rates.",
      "Night markets and small grocery stores may be cash-only — carry some HKD.",
      "Hong Kong does not have a VAT refund scheme for tourists.",
    ],
    avoidTipEn: "Avoid ground-floor money changers in Chungking Mansions — rates can be misleading and some are unsafe.",
    dccNoteEn: "In Hong Kong, always choose HKD when paying by card. Decline if your home currency is offered (DCC).",
    bestCardEn: "Wise or Revolut for near-zero FX fees on HKD. Any no-foreign-transaction-fee card from your home bank works well.",
  },
  {
    countryCode: "TW",
    countryName: "ไต้หวัน",
    countryNameEn: "Taiwan",
    slug: "taiwan-payment-guide",
    flag: "🇹🇼",
    currency: "TWD",
    heroTip: "EasyCard คือบัตรจำเป็นสำหรับขนส่งมวลชนทั่วไต้หวัน",
    bestPaymentMethod: "EasyCard + บัตรเครดิต",
    topTips: [
      "ซื้อ EasyCard ที่สถานี MRT ไทเป — ใช้กับรถไฟ รถเมล์ และ 7-Eleven",
      "ร้านค้าในไนท์มาร์เก็ตมักรับแค่เงินสด — ถือ TWD ติดตัวไว้",
      "ถอน TWD จาก ATM ธนาคาร Cathay United หรือ E.SUN ในสะดวกซื้อ",
      "บัตรเครดิตใช้ได้กับร้านอาหารและห้างสรรพสินค้าขนาดใหญ่",
      "VAT 5% — ขอคืนได้ที่สนามบินหากซื้อครบ TWD 2,000",
    ],
    avoidTip: "หลีกเลี่ยงการแลกเงินที่ธนาคารในสนามบิน — เรทต่ำกว่าในเมือง",
    dccNote: "ในไต้หวัน เมื่อรูดบัตรเลือกจ่ายเป็น TWD เสมอ ไม่ใช่ THB",
    bestCardTh: "KBank หรือ SCB Mastercard — รองรับ Mastercard ทั่วไต้หวัน",
    heroTipEn: "EasyCard is a must-have for public transit throughout Taiwan.",
    bestPaymentMethodEn: "EasyCard + credit card",
    topTipsEn: [
      "Buy an EasyCard at a Taipei MRT station — works on MRT, buses, and 7-Eleven.",
      "Night market stalls are almost always cash-only — carry TWD with you.",
      "Withdraw TWD from Cathay United Bank or E.SUN ATMs inside convenience stores.",
      "Credit cards are accepted at larger restaurants and department stores.",
      "5% VAT refund available at the airport if you spend TWD 2,000+.",
    ],
    avoidTipEn: "Avoid exchanging money at airport bank counters — rates are lower than in-city options.",
    dccNoteEn: "In Taiwan, always choose TWD when swiping your card. Decline if your home currency is offered (DCC).",
    bestCardEn: "Any Mastercard or Visa with no foreign transaction fee. Wise and Revolut offer near-interbank TWD rates.",
  },
];

/** Look up a guide by URL slug */
export function getGuideBySlug(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.slug === slug);
}

/** Look up a guide by country code */
export function getGuideByCode(code: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.countryCode === code);
}

/** All valid slugs for generateStaticParams */
export const ALL_GUIDE_SLUGS = COUNTRY_GUIDES.map((g) => g.slug);

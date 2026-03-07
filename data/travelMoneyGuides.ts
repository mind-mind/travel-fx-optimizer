/**
 * Travel money guides for international travelers.
 * Each entry generates an SEO page at /travel-money/[slug]
 * and also supports short redirects like /travel-money-japan → /travel-money/japan.
 */

export interface TravelMoneyGuide {
  countryCode: string;
  slug: string;           // URL slug, e.g. "japan"
  name: string;           // English country name
  flag: string;
  currency: string;       // ISO 4217 destination currency
  altSlugs?: string[];    // extra slugs that redirect here (e.g. "europe" → "germany")

  // Page content (English-primary)
  heroTip: string;
  bestPaymentMethod: string;
  localPaymentApps: { name: string; note: string }[];
  topTips: string[];
  avoidList: string[];    // 3–5 things NOT to do
  dccNote: string;
  vatInfo: string | null; // null means no tourist VAT refund
  atmTip: string;
  cardTip: string;        // best card tier recommendation

  // SEO
  seoTitle: string;
  seoDescription: string;
  h1: string;
}

export const TRAVEL_MONEY_GUIDES: TravelMoneyGuide[] = [
  // ─── ASIA ────────────────────────────────────────────────────────────────
  {
    countryCode: "JP",
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    currency: "JPY",
    heroTip:
      "Japan is still a cash-heavy society. Carry ¥10,000–¥30,000 in cash at all times, and use a no-foreign-fee card for larger purchases.",
    bestPaymentMethod: "Cash (JPY) + low-fee credit/debit card",
    localPaymentApps: [
      { name: "Suica / Pasmo", note: "Rechargeable IC card — works on all trains, subways, buses, and many convenience stores." },
      { name: "PayPay", note: "Japan's dominant QR-pay app. Requires a Japanese number to register, so not ideal for tourists." },
      { name: "iD / QUICPay", note: "NFC payments supported at major chains — your phone's Google/Apple Pay may work." },
    ],
    topTips: [
      "Use 7-Eleven (7Bank) or Japan Post Bank ATMs — they accept all major foreign Visa/Mastercard cards and display English menus.",
      "Many traditional restaurants, small izakayas, and rural shops are cash-only — always ask before ordering.",
      "Buy a Suica card at any JR East station or via Apple Wallet — works on all Tokyo metro, JR trains, and the Narita Express.",
      "Large department stores (Isetan, Takashimaya) and chain restaurants (McDonald's, Starbucks) accept Visa/Mastercard.",
      "Claim 10% consumption tax refund at stores displaying 'Tax Free' signage when you spend ¥5,000+ in one transaction.",
    ],
    avoidList: [
      "Avoid exchanging money at airport counters in your home country — rates for JPY are notoriously bad outside Japan.",
      "Avoid standalone 'International ATM' machines in tourist spots — they charge high flat fees (¥500–¥1,000 per transaction).",
      "Never accept DCC (dynamic currency conversion) when swiping your card — always choose to pay in JPY.",
    ],
    dccNote:
      "When a card terminal asks 'Pay in JPY or your home currency?' — always choose JPY. Choosing your home currency lets the merchant set the rate, which is typically 3–8% worse.",
    vatInfo:
      "10% consumption tax is refundable for tourists. Spend ¥5,000 or more at a single store, show your passport, and the store processes the refund immediately (look for 'Japan Tax-Free' stickers).",
    atmTip:
      "7Bank ATMs (inside every 7-Eleven) charge ¥110 per withdrawal for foreign cards. Japan Post Bank ATMs are free but limited to business hours. Avoid airport exchange desks — their spread can be 5%+ above mid-market.",
    cardTip:
      "A no-foreign-fee card (Wise, Revolut, Charles Schwab) is ideal — you pay the mid-market rate with zero card fee. Standard bank cards cost an extra 2.5–3%.",
    seoTitle: "How to Pay in Japan Without Losing Money on Exchange Rates",
    seoDescription:
      "Complete guide to paying in Japan as a tourist: best ATMs, cash tips, Suica card, VAT refund, and how to avoid DCC and airport FX fees.",
    h1: "How to Pay in Japan — Travel Money Guide",
  },
  {
    countryCode: "TH",
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    currency: "THB",
    heroTip:
      "Thailand is cash-friendly. Licensed exchange booths (SuperRich, Vasu) offer significantly better rates than banks or airport counters.",
    bestPaymentMethod: "Cash (THB) from licensed exchange booths + card for large purchases",
    localPaymentApps: [
      { name: "PromptPay", note: "Thailand's national QR-pay — requires a Thai bank account, not suitable for tourists." },
      { name: "TrueMoney Wallet", note: "Accepted at 7-Eleven and some tourist areas. Foreigners can register with a passport." },
      { name: "Alipay", note: "Widely accepted in tourist areas due to Chinese visitors. Useful if you already have Alipay." },
    ],
    topTips: [
      "Exchange at SuperRich (orange or green) or Vasu exchange booths — they're in Bangkok shopping areas (Terminal 21, MBK) and offer mid-market-close rates.",
      "Most street food, night markets (Chatuchak, Patpong), tuk-tuks, and small shops are cash-only.",
      "Use ATMs from Bangkok Bank, Kasikorn (KBank), or SCB to avoid extra fees — most foreign ATMs charge ฿220 per withdrawal.",
      "Cards are widely accepted in 7-Eleven, hotel chains, malls, and modern restaurants.",
      "Negotiate prices in cash — many vendors offer a small discount over card payment.",
    ],
    avoidList: [
      "Avoid the Suvarnabhumi / Don Mueang airport exchange counters — their rates are 5–8% worse than city booths.",
      "Avoid 'Super Rich' fakes — only use the official orange-logo (superrich.co.th) or green-logo (superrichthailand.com) branches.",
      "Never accept DCC at Thai ATMs — they often show 'Do you want to be charged THB?' — always choose 'Continue without conversion'.",
    ],
    dccNote:
      "Thai ATMs from Aeon, Krungsri, and Bangkok Bank frequently prompt foreign cards with DCC. Always select 'Decline conversion' or 'Continue without conversion' to get your card's rate rather than the ATM's inflated rate.",
    vatInfo:
      "7% VAT is refundable for tourists. Spend ฿2,000+ at stores displaying 'VAT Refund for Tourists', get a PP10 form filled, and claim at the airport refund desk before departure.",
    atmTip:
      "All Thai ATMs charge foreign cards ฿220 flat fee. Minimize withdrawals by taking out larger amounts each time. Use a card that reimburses ATM fees (e.g., Charles Schwab) to offset this.",
    cardTip:
      "If using a card at malls or hotels, a no-fee card (Wise, Revolut) saves the 2.5% standard FX fee. For cash, exchange booths beat ATMs once you account for the ฿220 fee.",
    seoTitle: "How to Pay in Thailand — Best FX Rates, ATMs & Exchange Tips",
    seoDescription:
      "How to get the best exchange rate in Thailand as a tourist. Compare SuperRich booths vs ATMs vs cards, avoid airport rip-offs, and understand DCC at Thai ATMs.",
    h1: "How to Pay in Thailand — Travel Money Guide",
  },
  {
    countryCode: "KR",
    slug: "korea",
    name: "South Korea",
    flag: "🇰🇷",
    currency: "KRW",
    heroTip:
      "South Korea is one of the world's most card-friendly countries. Visa and Mastercard are accepted almost everywhere, even at small markets.",
    bestPaymentMethod: "Credit/debit card (Visa/Mastercard) + T-Money Card for transit",
    localPaymentApps: [
      { name: "T-Money", note: "Essential rechargeable card for Seoul Metro, buses, and convenience stores. Buy at any subway station." },
      { name: "KakaoPay", note: "Korea's biggest mobile payment app — requires a Korean phone number, not tourist-friendly." },
      { name: "Zero Pay", note: "QR-pay system for small businesses — less common but growing." },
    ],
    topTips: [
      "Buy a T-Money card (₩3,000) at Incheon Airport or any subway station — load it with ₩30,000–₩50,000 for subway and bus fares.",
      "Credit cards are accepted at virtually every restaurant, shop, and taxi in Seoul — you can travel almost cashless.",
      "KEB Hana Bank and Shinhan Bank ATMs are the most reliable for foreign cards — find them at airports, stations, and convenience stores.",
      "Traditional markets (Namdaemun, Gwangjang) and private street vendors may prefer cash — carry some KRW.",
      "Claim 10% VAT refund at Global Tax Free or Premier Tax Free kiosks in department stores, or at Incheon Airport BEFORE security.",
    ],
    avoidList: [
      "Avoid exchanging KRW outside Korea — rates are very poor at most international banks.",
      "Avoid Myeongdong 'tourist trap' exchange booths — rates look good on signs but fees are buried.",
      "Never accept DCC when paying by card in Korea.",
    ],
    dccNote:
      "DCC is less common in Korea than Southeast Asia, but still occurs at tourist-facing retailers. Always verify the currency shown on the terminal before confirming the charge.",
    vatInfo:
      "10% VAT refundable for tourists. Spend ₩30,000+ (sometimes ₩15,000) at participating stores. Look for 'Tax Refund' signs. Claim at Incheon Airport before check-in.",
    atmTip:
      "KEB Hana Bank and Shinhan ATMs (found in 7-Eleven) accept foreign cards with minimal fees. Woori and IBK ATMs also work but may have limited foreign card support.",
    cardTip:
      "Any Visa or Mastercard works well in Korea. A no-fee travel card saves the typical 2.5% bank FX markup on every purchase.",
    seoTitle: "How to Pay in South Korea — Cards, ATMs & T-Money Guide",
    seoDescription:
      "Full guide to paying in South Korea as a tourist: T-Money card for transit, best ATMs for foreign cards, credit card tips, and how to claim VAT refund.",
    h1: "How to Pay in South Korea — Travel Money Guide",
  },
  {
    countryCode: "SG",
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    heroTip:
      "Singapore is arguably the world's most cashless country. Cards and contactless payments are accepted nearly everywhere, including hawker centres.",
    bestPaymentMethod: "Contactless card or mobile pay (Apple Pay / Google Pay)",
    localPaymentApps: [
      { name: "PayNow", note: "Singapore's instant bank transfer — requires a local bank account, not for tourists." },
      { name: "GrabPay", note: "Grab's wallet — foreigners can top up with a credit card. Works at many Singapore merchants." },
      { name: "NETS", note: "Local debit network. Your foreign debit card may not work on NETS terminals even if it has a chip." },
    ],
    topTips: [
      "Almost every hawker centre (food court) has PayNow QR codes AND accepts cards via NETS or Visa/Mastercard — bring both just in case.",
      "Withdraw SGD from DBS, OCBC, or UOB ATMs inside the city — rates are close to mid-market.",
      "Mustafa Centre (Little India, open 24 hrs) offers excellent cash exchange rates for many currencies.",
      "Taxis and Grab/Gojek all accept cards and mobile pay — contactless is the norm.",
      "Claim 9% GST refund at eTRS kiosks in Changi Airport after spending SGD 100+ in one store.",
    ],
    avoidList: [
      "Avoid Changi Airport money changers for large amounts — city rates are better.",
      "Avoid paid ATMs in malls operated by third-party companies — fees can be SGD 10+ per withdrawal.",
      "Never accept DCC in Singapore — some tourist-facing shops still offer it.",
    ],
    dccNote:
      "Singapore's international retail environment means DCC is occasionally offered. When a terminal asks whether to charge in SGD or your home currency, always choose SGD.",
    vatInfo:
      "9% GST refundable for tourists spending SGD 100+ (before GST) in a single store. Register at any eTRS-enabled store and claim at Changi Airport eTRS self-help kiosks.",
    atmTip:
      "DBS/POSB ATMs (most common) have a small fee for foreign cards but good mid-market rates. Check if your card issuer has a partnership — Citibank, HSBC global accounts sometimes waive fees.",
    cardTip:
      "Singapore is so cashless that a no-foreign-fee card (Wise, Revolut, Charles Schwab) is the optimal choice — free mid-market rates on every tap.",
    seoTitle: "How to Pay in Singapore — Cashless Travel Money Guide",
    seoDescription:
      "How to pay in Singapore as a tourist: cards, contactless, PayNow, Mustafa Centre money exchange, and GST refund tips for international visitors.",
    h1: "How to Pay in Singapore — Travel Money Guide",
  },
  {
    countryCode: "TW",
    slug: "taiwan",
    name: "Taiwan",
    flag: "🇹🇼",
    currency: "TWD",
    heroTip:
      "Taiwan is a mix of cashless big cities and cash-heavy night markets. Get an EasyCard for transit and keep some TWD for markets and street food.",
    bestPaymentMethod: "EasyCard for transit + cash for markets + card for large purchases",
    localPaymentApps: [
      { name: "EasyCard", note: "Rechargeable card for MRT, buses, taxis, and 7-Eleven. Buy at any MRT station or 7-Eleven." },
      { name: "LINE Pay", note: "Popular mobile payment in Taiwan. Foreigners can link a foreign Visa/Mastercard." },
      { name: "JKopay", note: "Less common; use if you see it at a vendor." },
    ],
    topTips: [
      "Buy the EasyCard (NT$100 deposit) on arrival at Taoyuan Airport MRT — essential for all public transport in Taipei.",
      "Night markets (Shilin, Raohe, Jiufen) are cash-only — withdraw TWD before you go.",
      "7-Eleven ATMs (iCash) accept foreign Visa/Mastercard cards and work 24/7.",
      "Large restaurants, department stores (Sogo, Shin Kong Mitsukoshi), and hotels accept Visa/Mastercard.",
      "Taiwan has an 5% VAT — claim refund at the airport for purchases of NT$2,000+ in a single day at the same store.",
    ],
    avoidList: [
      "Avoid Taoyuan Airport exchange counters for amounts beyond NT$2,000 — city rates are better.",
      "Avoid cash advances on credit cards — high fees apply.",
      "Never accept DCC in Taiwan — choose TWD every time.",
    ],
    dccNote:
      "DCC may appear in popular tourist districts and department stores. Always confirm the payment is in TWD before approving.",
    vatInfo:
      "5% VAT refund for tourists spending NT$2,000+ in a single day at participating stores. Claim tax refund forms in-store and present them at the airport customs before going through immigration.",
    atmTip:
      "7-Eleven ATMs (inside every store, 24/7) accept foreign cards. Cathay United Bank and E.SUN ATMs are also reliable. Typical foreign card fee: NT$100 per withdrawal.",
    cardTip:
      "Visa and Mastercard have wide acceptance in cities. A no-fee card saves the standard 2.5% bank surcharge on card transactions.",
    seoTitle: "How to Pay in Taiwan — EasyCard, ATMs & Night Market Tips",
    seoDescription:
      "Complete travel money guide for Taiwan: EasyCard setup, best ATMs for foreigners, night market cash tips, and how to claim Taiwan's VAT refund.",
    h1: "How to Pay in Taiwan — Travel Money Guide",
  },
  {
    countryCode: "HK",
    slug: "hong-kong",
    name: "Hong Kong",
    flag: "🇭🇰",
    currency: "HKD",
    altSlugs: ["hongkong"],
    heroTip:
      "Hong Kong is card-friendly and cashless in modern areas, but traditional markets and older restaurants still prefer cash. The Octopus Card is essential.",
    bestPaymentMethod: "Octopus Card + credit card for large purchases",
    localPaymentApps: [
      { name: "Octopus", note: "Hong Kong's all-in-one contactless card — MTR, buses, trams, 7-Eleven, McDonald's, and more. Buy at any MTR station." },
      { name: "Alipay HK", note: "Accepted at retail chains and increasing number of restaurants. Foreigners can use regular Alipay international." },
      { name: "PayMe", note: "HSBC's payment app. Requires Hong Kong bank account — not tourist-friendly." },
    ],
    topTips: [
      "Buy an Octopus Card at Hong Kong airport's MTR station — HKD 150 card (HKD 100 value + HKD 50 deposit) gets you on all trains and buses.",
      "HSBC and Hang Seng Bank ATMs are widely available and accept foreign cards at competitive rates.",
      "Mong Kok and Central money changers (not Chungking Mansions ground floor) offer good cash exchange rates.",
      "Most traditional dim sum restaurants, wet markets, and street vendors prefer cash.",
      "Hong Kong has no tourist VAT refund scheme.",
    ],
    avoidList: [
      "Avoid ground-floor money changers in Chungking Mansions — known for misleading rate displays and pressure tactics.",
      "Avoid airport exchange counters for large amounts — rates are 3–5% worse than city.",
      "Never accept DCC in Hong Kong — always pay in HKD.",
    ],
    dccNote:
      "DCC is common at tourist shops in Tsim Sha Tsui and Causeway Bay. The terminal will show your home currency amount — decline and ask to pay in HKD.",
    vatInfo: null,
    atmTip:
      "HSBC ATMs (green, everywhere) and Hang Seng ATMs accept foreign cards with minimal fees. Avoid small third-party ATMs in convenience stores that charge flat fees of HKD 30–50.",
    cardTip:
      "Visa and Mastercard with low FX fees are ideal for Hong Kong's cashless retail. Keep some HKD cash for markets and older restaurants.",
    seoTitle: "How to Pay in Hong Kong — Octopus Card, ATMs & Money Tips",
    seoDescription:
      "Travel money guide for Hong Kong: Octopus Card setup, best ATMs for foreign cards, where to exchange cash, and how to avoid tourist traps at Chungking Mansions.",
    h1: "How to Pay in Hong Kong — Travel Money Guide",
  },
  {
    countryCode: "CN",
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    currency: "CNY",
    heroTip:
      "China runs on mobile QR-pay (Alipay and WeChat Pay). Set up at least one before you arrive — without it, daily life is difficult.",
    bestPaymentMethod: "Alipay International or WeChat Pay (linked to a foreign Visa/Mastercard)",
    localPaymentApps: [
      { name: "Alipay International", note: "Foreign tourists can now use Alipay directly — link your Visa/Mastercard in the app. Works at restaurants, shops, taxis, and more." },
      { name: "WeChat Pay Global", note: "Link a foreign card to WeChat Pay for use at QR-enabled merchants across China." },
      { name: "UnionPay", note: "Most mainland ATMs accept UnionPay cards. Foreign Visa/Mastercard ATM access is limited." },
    ],
    topTips: [
      "Download Alipay before departure and complete tourist verification — your foreign card (Visa/Mastercard/Amex) is accepted directly without a Chinese bank account.",
      "Most shops, restaurants, taxis, and street vendors only accept Alipay or WeChat Pay QR codes.",
      "ATM access is limited for foreign Visa/Mastercard — use Bank of China or ICBC ATMs which have better foreign card support.",
      "Carry CNY 500–1,000 in cash as a backup — some smaller cities have poor app connectivity.",
      "Hotels (international chains) and airport terminals accept foreign credit cards.",
    ],
    avoidList: [
      "Do NOT assume your Visa/Mastercard will work at street-level shops — most cannot process them.",
      "Avoid exchanging money at unauthorized street exchanges — illegal and commonly fraudulent.",
      "Never accept DCC in China — always pay in CNY.",
    ],
    dccNote:
      "DCC may occur at international hotels in China. When presented with a card terminal, always select CNY to use your card network's exchange rate.",
    vatInfo:
      "China's 13% VAT is reclaimable at designated tax refund airports (Beijing, Shanghai, Guangzhou, Shenzhen). Spend ¥200+ at a single store, get a tax refund form, and claim at the airport customs hall.",
    atmTip:
      "Bank of China and ICBC ATMs at airports and major shopping districts are most reliable for foreign Visa/Mastercard. Expect a withdrawal limit of CNY 2,000–3,000 per transaction. ATM fees: CNY 25–50 per withdrawal.",
    cardTip:
      "Your best card for China is one linked to Alipay or WeChat Pay. For ATM withdrawals, bring a no-foreign-fee card to minimize the 2.5% bank surcharge.",
    seoTitle: "How to Pay in China as a Tourist — Alipay, WeChat Pay & ATM Guide",
    seoDescription:
      "Essential guide to paying in China: how to set up Alipay for foreigners, WeChat Pay international, best ATMs for foreign cards, and cash tips for travelers.",
    h1: "How to Pay in China — Travel Money Guide",
  },
  {
    countryCode: "VN",
    slug: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    currency: "VND",
    heroTip:
      "Vietnam is still very cash-based, especially outside major cities. Carry VND at all times — the currency's large denominations can be confusing at first.",
    bestPaymentMethod: "Cash (VND) + card for hotels and larger restaurants",
    localPaymentApps: [
      { name: "MoMo", note: "Vietnam's most popular mobile wallet — requires a Vietnamese phone number, not suitable for tourists." },
      { name: "ZaloPay", note: "Growing payment app, same limitation as MoMo for foreign tourists." },
      { name: "Grab", note: "Most tourists use Grab for rides and GrabFood — links to a foreign credit card." },
    ],
    topTips: [
      "Withdraw VND on arrival from Vietcombank or Techcombank ATMs — they accept foreign cards with good rates.",
      "Street food stalls, xe om (motorbike taxis), local shops, and markets are cash-only.",
      "Be careful with note confusion — VND 500,000 (pink) looks similar to VND 20,000 (green) to newcomers. Always check amounts carefully.",
      "Hotels, tourist restaurants, and tour operators in Hanoi and Ho Chi Minh City accept Visa/Mastercard.",
      "USD is sometimes accepted in tourist areas — but the rate is usually worse than using VND.",
    ],
    avoidList: [
      "Avoid USD for everyday purchases — the rate vendors use is typically 3–5% below official rates.",
      "Avoid private money exchanges on the street — unauthorized and often offer bad rates.",
      "Never accept DCC in Vietnam — always choose VND.",
    ],
    dccNote:
      "DCC is common at Vietnamese ATMs — Sacombank and some Techcombank ATMs specifically prompt for it. Decline all currency conversion offers and choose to continue in VND.",
    vatInfo:
      "Vietnam's 10% VAT is technically refundable at a few major airports (Noi Bai, Tan Son Nhat) via a manual process — but the practical threshold and process make it rarely worthwhile for tourists.",
    atmTip:
      "Vietcombank ATMs (blue, very common) accept foreign cards well. Techcombank and BIDV are also reliable. Maximum per withdrawal: VND 5,000,000–10,000,000. ATM fee: VND 30,000–80,000 per transaction.",
    cardTip:
      "A no-foreign-fee card is valuable for hotel check-ins and tour bookings. For daily spending, cash is king — budget your ATM withdrawals carefully to avoid frequent fees.",
    seoTitle: "How to Pay in Vietnam — Cash, ATMs & Tourist Money Tips",
    seoDescription:
      "Vietnam travel money guide: best ATMs for foreign cards, VND cash tips, avoiding DCC, tourist VAT refund, and whether to use USD in Vietnam.",
    h1: "How to Pay in Vietnam — Travel Money Guide",
  },
  {
    countryCode: "ID",
    slug: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    currency: "IDR",
    heroTip:
      "Indonesia's large denominations can be daunting (Rp 50,000 ≈ USD 3), but cash is essential. Cards are widely accepted in Bali's tourist belt and Jakarta malls.",
    bestPaymentMethod: "Cash (IDR) + card for hotels, popular restaurants, and malls",
    localPaymentApps: [
      { name: "GoPay", note: "Gojek's wallet — foreigners can link a foreign Visa/Mastercard for ride payments." },
      { name: "OVO", note: "Accepted at many Grab partners. Requires Indonesian phone to register." },
      { name: "QRIS", note: "Universal QR standard across Indonesian payment apps — scan at most modern merchants." },
    ],
    topTips: [
      "Withdraw IDR on arrival at Soekarno-Hatta airport (Jakarta) or Ngurah Rai (Bali) — BCA and Mandiri ATMs work for foreign cards.",
      "Licensed money changers in Seminyak and Kuta (Bali) often offer better rates than ATMs for USD and AUD cash.",
      "Always count your money at the exchange counter before walking away — miscounts are occasionally reported.",
      "Card acceptance is growing fast in Bali resorts, restaurants, and surf shops — less in Ubud markets and rural areas.",
      "Use Grab for taxi fares to avoid tourist price negotiations — pay by credit card.",
    ],
    avoidList: [
      "Avoid roadside 'money changers' with unusually high rates — some use trick counting to shortchange tourists.",
      "Avoid airport exchange counters if you can — rates are typically 5–8% worse than city.",
      "Never accept DCC in Indonesia — Indonesian ATMs frequently push it.",
    ],
    dccNote:
      "ATMs in Bali and Jakarta often present DCC prompts. The message may say 'Do you accept the exchange rate?' — always decline and proceed to get the standard network rate.",
    vatInfo:
      "Indonesia has 11% VAT but no tourist refund scheme. Prices at tourist markets are negotiable — use IDR cash to get better deals.",
    atmTip:
      "BCA (blue ATMs) are the most reliable for foreign Visa/Mastercard in Bali and Jakarta. Mandiri and BNI also work. Daily limit: Rp 5,000,000–10,000,000. ATM fees: Rp 25,000–50,000 per withdrawal.",
    cardTip:
      "Visa and Mastercard work at hotels and tourist restaurants. A no-foreign-fee card saves the 2.5–3% bank surcharge that adds up quickly on an Indonesian holiday.",
    seoTitle: "How to Pay in Indonesia / Bali — Cash, ATMs & Tourist Money Tips",
    seoDescription:
      "Indonesia/Bali travel money guide: best ATMs for foreign cards, safe money changers, IDR cash tips, DCC warnings at Indonesian ATMs, and Rupiah denomination guide.",
    h1: "How to Pay in Indonesia — Travel Money Guide",
  },
  {
    countryCode: "MY",
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    currency: "MYR",
    heroTip:
      "Malaysia is a cashless-friendly destination in cities. Cards and e-wallets are common in Kuala Lumpur; cash is still preferred in smaller towns and markets.",
    bestPaymentMethod: "Card (Visa/Mastercard) + some MYR cash for markets",
    localPaymentApps: [
      { name: "Touch 'n Go eWallet", note: "Malaysia's dominant e-wallet. Foreigners can register and top up with a Visa/Mastercard. Works for highways, transit, and many merchants." },
      { name: "Boost", note: "Growing mobile payment — less coverage than Touch 'n Go." },
      { name: "DuitNow QR", note: "Universal QR standard — commonly displayed at restaurants and shops." },
    ],
    topTips: [
      "Get a Touch 'n Go card at KLIA — essential for KL Sentral express trains and LRT metro in Kuala Lumpur.",
      "CIMB and Maybank ATMs accept foreign Visa/Mastercard easily — widely distributed in malls and KLIA.",
      "Petaling Street (Chinatown) and Jalan TAR market vendors prefer cash — carry MYR 200–500.",
      "Grab is the dominant ride-hailing app in Malaysia — links to foreign credit cards.",
      "Malaysia has no tourist GST refund scheme following the 2018 abolition of GST.",
    ],
    avoidList: [
      "Avoid KLIA airport money changers for large amounts — rates in KL city (KLCC, Bukit Bintang) are 3–5% better.",
      "Avoid unofficial money changers on Jalan Bukit Bintang who solicit on the street.",
      "Never accept DCC in Malaysia.",
    ],
    dccNote:
      "DCC is occasionally offered at hotels and international retailers in KL. Always confirm the terminal shows MYR before approving payment.",
    vatInfo:
      "Malaysia replaced GST with Sales & Service Tax (SST) in 2018. No tourist VAT refund is currently available.",
    atmTip:
      "Maybank (yellow, everywhere) and CIMB ATMs are most reliable for foreign cards. HSBC and Alliance work too. Typical fee: MYR 10–15 per foreign card withdrawal. Daily limit: MYR 3,000–5,000.",
    cardTip:
      "Visa and Mastercard have excellent coverage in KL's malls, Grab, and chain restaurants. A no-foreign-fee card is ideal for eliminating the 2.5% surcharge on your spending.",
    seoTitle: "How to Pay in Malaysia — Touch 'n Go, ATMs & Kuala Lumpur Money Tips",
    seoDescription:
      "Malaysia travel money guide for tourists: Touch 'n Go card setup, best ATMs for foreign cards, cash tips for markets, and whether to exchange money at KLIA airport.",
    h1: "How to Pay in Malaysia — Travel Money Guide",
  },
  {
    countryCode: "PH",
    slug: "philippines",
    name: "Philippines",
    flag: "🇵🇭",
    currency: "PHP",
    heroTip:
      "The Philippines is still heavily cash-based outside Manila. Bring or withdraw enough PHP before heading to islands or rural areas where ATMs can be scarce.",
    bestPaymentMethod: "Cash (PHP) + card for hotels and city restaurants",
    localPaymentApps: [
      { name: "GCash", note: "Philippines' leading e-wallet. Foreigners can create a limited account linked to a Visa/Mastercard — works at many merchants." },
      { name: "Maya (formerly PayMaya)", note: "Fintech app accepting foreign cards. Growing acceptance nationwide." },
      { name: "Grab", note: "Works for GrabCar rides linked to foreign credit card." },
    ],
    topTips: [
      "Withdraw PHP on arrival at NAIA Airport — BDO, Metrobank, and BPI ATMs accept foreign cards.",
      "Bring extra cash when heading to Palawan, Siargao, or Visayas — ATMs run out quickly on islands and some accept foreign cards unreliably.",
      "Money changers at Ninoy Aquino (NAIA) Terminal 3 and BGC Taguig offer fair exchange rates for USD and AUD.",
      "Malls (SM, Ayala, Robinsons) widely accept Visa/Mastercard — cards work well in Metro Manila.",
      "Tipping is customary in restaurants (10%) — keep small PHP notes for this.",
    ],
    avoidList: [
      "Avoid carrying excessive cash to beaches and tourist hotspots — pickpocketing in crowded areas is reported.",
      "Avoid airport arrival hall money changers outside the secure area.",
      "Never accept DCC in the Philippines.",
    ],
    dccNote:
      "Philippine ATMs (especially BancNet) frequently offer DCC. The prompt may say 'Proceed with conversion?' — always choose 'No' or 'Decline'.",
    vatInfo:
      "Philippines' 12% VAT does not have a tourist refund scheme.",
    atmTip:
      "BDO and BPI ATMs have the best foreign card acceptance. Metrobank and Chinabank also work. On islands, BancNet ATMs are common but not all support foreign Visa/Mastercard. Daily limit: PHP 10,000–20,000. Fees: PHP 250 per withdrawal.",
    cardTip:
      "A no-foreign-fee card is useful in Manila and major resort hotels. For daily island life, cash is essential — plan ATM stops carefully.",
    seoTitle: "How to Pay in the Philippines — Cash, ATMs & Island Travel Tips",
    seoDescription:
      "Philippines travel money guide: best ATMs for Palawan and Manila, how to avoid DCC, cash tips for islands, GCash for foreigners, and PHP currency tips.",
    h1: "How to Pay in the Philippines — Travel Money Guide",
  },
  {
    countryCode: "IN",
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    heroTip:
      "India has undergone a digital payments revolution — UPI is used everywhere, but you'll need cash INR for rural areas, autos, and small street vendors.",
    bestPaymentMethod: "Cash (INR) + card for urban shops and restaurants",
    localPaymentApps: [
      { name: "PhonePe / Google Pay / Paytm", note: "UPI-based apps dominate India — require an Indian bank account. As a tourist, you can only use them via card-linked international mode." },
      { name: "Razorpay", note: "Used by many tourist-facing online bookings — accepts foreign cards." },
    ],
    topTips: [
      "Withdraw INR from SBI, HDFC, or ICICI ATMs on arrival — they have the best foreign card support.",
      "Carry INR cash for auto-rickshaws, chai stalls, local buses, and smaller dhabas — UPI requires an Indian bank account.",
      "Cards are widely accepted at hotels, tourist restaurants in Delhi/Mumbai/Goa, and larger stores.",
      "India has a de facto USD 100 ATM limit through INR equivalent — plan multiple withdrawals.",
      "Beware of counterfeit notes — ₹2,000 and ₹500 notes are commonly counterfeited. Withdraw from bank ATMs only.",
    ],
    avoidList: [
      "Avoid unregistered money changers on the street — illegal in India and potentially fraudulent.",
      "Avoid withdrawing from third-party ATMs in tourist areas (Agra, Jaipur fort areas) — high fees and reliability issues.",
      "Never accept DCC in India.",
    ],
    dccNote:
      "DCC is less structured in India but some hotel and restaurant terminals may attempt to charge in your home currency. Confirm payment is in INR before approving.",
    vatInfo:
      "India's GST (5–28% depending on category) does not have a tourist refund scheme.",
    atmTip:
      "HDFC, ICICI, and Axis Bank ATMs are most reliable for foreign cards. SBI (State Bank of India) ATMs are everywhere but sometimes have queues. Daily withdrawal limit: INR 10,000–25,000. Fee: typically INR 100–250.",
    cardTip:
      "Visa and Mastercard with low FX fees work well in urban India. A no-fee card (Wise, Revolut) is ideal — India's 2.5% bank surcharge adds up on longer trips.",
    seoTitle: "How to Pay in India — Cash, ATMs & UPI for Tourists",
    seoDescription:
      "India travel money guide: best ATMs for foreign cards, how to use UPI as a tourist, INR cash tips, counterfeit note awareness, and how to pay in Goa, Delhi, and Jaipur.",
    h1: "How to Pay in India — Travel Money Guide",
  },

  // ─── EUROPE ──────────────────────────────────────────────────────────────
  {
    countryCode: "DE",
    slug: "europe",
    name: "Europe (Eurozone)",
    flag: "🇪🇺",
    currency: "EUR",
    altSlugs: ["germany", "france", "italy", "spain"],
    heroTip:
      "Europe is largely cashless in northern countries; Mediterranean nations still prefer cash for small purchases. A no-foreign-fee card is your best travel companion.",
    bestPaymentMethod: "No-foreign-fee credit or debit card (Visa/Mastercard)",
    localPaymentApps: [
      { name: "Apple Pay / Google Pay", note: "Widely accepted across the Eurozone — your NFC card linked to your phone works virtually everywhere." },
      { name: "Revolut / Wise", note: "European fintech favourites — open a EUR account to avoid conversion fees entirely." },
      { name: "PayByPhone", note: "Common for parking payments in Western Europe — requires a local number." },
    ],
    topTips: [
      "Germany and Austria still have a strong cash culture — carry €100–200 for smaller restaurants, market stalls, and local shops.",
      "France, Spain, Italy, and the Netherlands are mostly cashless — contactless card is accepted even at café counters.",
      "Exchange USD/GBP at reputable city exchange bureaux (Change Group, Eurochange) or withdraw from bank ATMs — avoid airport exchange desks.",
      "European ATMs charge €3–5 per withdrawal for foreign cards — minimize ATM trips by withdrawing more at once.",
      "VAT refund is available on goods (not services) bought in EU shops — see rates per country below.",
    ],
    avoidList: [
      "Avoid Euronet ATMs (bright yellow, often near tourist attractions) — they charge very high fees and push DCC aggressively.",
      "Avoid exchanging money at hotel reception desks — rates are typically 5–8% worse than a bank ATM.",
      "Never accept DCC in Europe — Euronet and some airport ATMs are notorious for prompting it.",
    ],
    dccNote:
      "Euronet ATMs in Europe are infamous for DCC — they offer a fixed exchange rate that is significantly worse than your card network's rate. Always click 'Decline conversion' and withdraw in EUR.",
    vatInfo:
      "EU VAT refund is available for non-EU tourists. Minimum purchase varies: France €100, Germany €50, Italy €155, Spain €90. Get a VAT form in-store and claim at the airport 'Tax Refund' desk before checking in.",
    atmTip:
      "Use bank ATMs (BNP Paribas, Deutsche Bank, ING, La Caixa) to get near-mid-market rates. Avoid standalone ATMs in tourist zones — clearly branded Euronet machines are the worst offenders.",
    cardTip:
      "A Wise or Revolut card in EUR is optimal — you spend from a EUR balance with zero conversion. If using a regular card, no-foreign-fee cards (Starling, Charles Schwab, Chase Sapphire) eliminate the 2.5–3% bank markup.",
    seoTitle: "How to Pay in Europe — Best Cards, ATM Tips & Avoid FX Fees",
    seoDescription:
      "Europe travel money guide: how to avoid Euronet ATM fees, best no-foreign-fee cards, European VAT refund guide, and cashless vs cash by country.",
    h1: "How to Pay in Europe — Travel Money Guide",
  },
  {
    countryCode: "GB",
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    altSlugs: ["uk", "britain"],
    heroTip:
      "The UK is one of the world's most contactless-friendly countries. Cards and Apple/Google Pay are accepted almost universally — even on the London Underground.",
    bestPaymentMethod: "Contactless card or phone (Apple Pay / Google Pay)",
    localPaymentApps: [
      { name: "Monzo / Starling", note: "UK-based fintech banks offering fee-free spending — popular even for tourists via temporary accounts." },
      { name: "Revolut", note: "Founded in London — open a GBP account for zero-fee spending in the UK." },
      { name: "Apple Pay / Google Pay", note: "Accepted on London buses, Tube, Elizabeth Line, and in virtually all shops." },
    ],
    topTips: [
      "Use your contactless card or phone directly on London's Underground, Overground, and buses — faster and cheaper than buying an Oyster card for longer stays.",
      "UK law prohibits surcharges on card payments — you pay the same price whether paying by cash or card.",
      "Cash (GBP £5, £10, £20 notes) is still used in traditional pubs, markets, and street food vendors — keep some on hand.",
      "Use Wise or Revolut for the best GBP rates to avoid 2.5–3% standard bank FX fees.",
      "The UK no longer offers tourist VAT refunds since January 2021 (post-Brexit change).",
    ],
    avoidList: [
      "Avoid bureaux de change at Heathrow, Gatwick, or St Pancras — rates are 5–10% worse than mid-market.",
      "Avoid standalone ATMs in convenience stores ('Link' network) — they may charge £1.75–2.00 per withdrawal.",
      "Never accept DCC in the UK — though less common than elsewhere, it still occurs at some ATMs and tourist-facing tills.",
    ],
    dccNote:
      "DCC in the UK is less aggressive than in Southeast Asia but still occurs at some card terminals, particularly at tourist shops and airports. If the terminal shows your home currency, ask staff to process in GBP.",
    vatInfo:
      "The UK no longer offers tourist VAT refunds (ended January 2021 after Brexit). This is a significant change from the previous 20% refund scheme.",
    atmTip:
      "Free ATMs are marked 'Free Withdrawals' — most Barclays, NatWest, Lloyds, HSBC, and Post Office ATMs are free for withdrawals even for foreign cards (your own bank may still charge a foreign transaction fee). Avoid ATMs that charge a flat fee.",
    cardTip:
      "A no-foreign-fee card is essential for the UK — the standard 2.5–3% bank surcharge adds up quickly in London's expensive environment. Starling, Monzo, Chase UK, and Wise are popular choices.",
    seoTitle: "How to Pay in the UK — Contactless, London Underground & No FX Fees",
    seoDescription:
      "UK travel money guide: using contactless payment on the London Tube, best no-FX-fee cards for the UK, cash vs card in Britain, and why tourist VAT refunds ended.",
    h1: "How to Pay in the United Kingdom — Travel Money Guide",
  },
  {
    countryCode: "US",
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    altSlugs: ["united-states", "america"],
    heroTip:
      "The US is card-dominant but lags behind Europe and Asia in contactless adoption. Most city transactions work well with Visa/Mastercard; carry some USD cash for tips and small vendors.",
    bestPaymentMethod: "Credit card (Visa/Mastercard) + USD cash for tips and small purchases",
    localPaymentApps: [
      { name: "Venmo", note: "Used by locals for peer transfers — requires a US bank account, not useful for tourists." },
      { name: "Cash App", note: "Same limitation as Venmo for tourists." },
      { name: "Apple Pay / Google Pay", note: "Growing rapidly — accepted at major chains including Whole Foods, Walgreens, Trader Joe's, and urban restaurants." },
    ],
    topTips: [
      "US has no flat-rate tipping — restaurant tips of 18–22% and hotel/taxi tips of $2–5 are customary and often left in cash.",
      "Keep USD $50–100 in small bills ($1, $5, $10) for tips, street food, farmers markets, and vending machines.",
      "Withdraw USD from any bank ATM — Charles Schwab and Capital One debit cards reimburse ATM fees worldwide.",
      "Gas stations, parking meters, and some food trucks may require exact cash — always have some on hand.",
      "Sales tax (5–11%, varies by state) is NOT included in listed prices — always add it mentally when budgeting.",
    ],
    avoidList: [
      "Avoid currency exchange kiosks inside airports (Travelex, ICE) — rates are 8–12% worse than mid-market.",
      "Avoid paying in USD with a card that has foreign transaction fees — the 3% adds up on a long US trip.",
      "Avoid ATMs inside casinos and tourist attractions — they often charge $5–10 flat fees.",
    ],
    dccNote:
      "DCC is uncommon in the US since USD is the local currency. However, some tourist-facing services may quote your home currency — always confirm USD billing.",
    vatInfo:
      "The US does not have a federal VAT refund scheme for tourists. Some states (Louisiana) have limited refund programs for in-store purchases, but they're rarely practical.",
    atmTip:
      "Bank ATMs (Chase, Bank of America, Wells Fargo, Citibank) are everywhere in cities and charge $3–5 for non-customers. The Charles Schwab Investor Checking Account is famous for refunding all ATM fees worldwide — worth getting before a US trip.",
    cardTip:
      "A no-foreign-fee Visa or Mastercard is essential. Many standard non-US cards charge 2.5–3% on USD transactions. Chase Sapphire, Amex Platinum, and Wise debit are among the most popular options.",
    seoTitle: "How to Pay in the USA as a Tourist — Cards, Cash & Tipping Guide",
    seoDescription:
      "USA travel money guide: best cards for the US, how much cash to carry, tipping etiquette, ATM fees, sales tax explanation, and avoiding airport currency exchange.",
    h1: "How to Pay in the USA — Travel Money Guide",
  },
  {
    countryCode: "AU",
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    heroTip:
      "Australia is one of the most cashless societies in the world. Contactless payments are so common that many vendors have stopped accepting cash entirely.",
    bestPaymentMethod: "Contactless card (Visa/Mastercard) or phone (Apple/Google Pay)",
    localPaymentApps: [
      { name: "Apple Pay / Google Pay", note: "Universally accepted — works on trains, buses, taxis, and virtually all retail." },
      { name: "Opal (Sydney)", note: "NSW's transit card — now you can tap your Visa/Mastercard directly on Sydney trains and buses." },
      { name: "Myki (Melbourne)", note: "Victoria's transit card — foreign cards can tap directly on Melbourne trams and trains." },
    ],
    topTips: [
      "In Sydney and Melbourne, tap your Visa/Mastercard directly on transit gates — no physical card needed if you have Apple/Google Pay.",
      "Australia legally caps card surcharges at 0.5–1.5% — some restaurants add a small surcharge for card payments, legally required to be displayed.",
      "Currency exchange in city CBDs (Sydney, Melbourne) at competitive money changers — rates are typically better than airports.",
      "Coffee culture runs on card — very few cafes in Australia require cash.",
      "Claim 10% GST refund at the airport via the Tourist Refund Scheme (TRS) for AUD 300+ spent in one store.",
    ],
    avoidList: [
      "Avoid airport currency exchange for more than a small emergency amount — rates are 5–8% worse than city.",
      "Avoid ATMs that display large fee warnings — look for bank ATMs (CBA, ANZ, NAB, Westpac).",
      "Never accept DCC in Australia.",
    ],
    dccNote:
      "DCC in Australia is uncommon but still found at some hotel ATMs and older terminals. Verify the currency shown is AUD before completing payment.",
    vatInfo:
      "10% GST refund available for tourists via the Tourist Refund Scheme (TRS) at international airports. Spend AUD 300+ in one store, keep receipts, and claim at the TRS counter before departure.",
    atmTip:
      "CBA (CommBank), ANZ, NAB, and Westpac ATMs are the 'Big Four' — widely available in cities. Foreign cards may be charged AUD 2–5 per visit. Some ATMs charge nothing — check the screen before proceeding.",
    cardTip:
      "A no-foreign-fee Visa or Mastercard is ideal. Australia's cashless environment means your card will be your primary payment — go for one with 0% FX fee to avoid the 2.5–3% bank surcharge on every transaction.",
    seoTitle: "How to Pay in Australia — Contactless Cards, Transit & GST Refund",
    seoDescription:
      "Australia travel money guide: how to tap your card on Sydney trains, AUD cash vs card, best no-FX-fee cards, GST refund via TRS, and money tips for Melbourne, Brisbane, and Cairns.",
    h1: "How to Pay in Australia — Travel Money Guide",
  },
  {
    countryCode: "AE",
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    altSlugs: ["dubai", "abu-dhabi"],
    heroTip:
      "Dubai and Abu Dhabi are ultra-modern and card-friendly — contactless is the norm in malls, restaurants, and taxis. Cash is mainly needed for souks and small local shops.",
    bestPaymentMethod: "Contactless card (Visa/Mastercard) + AED cash for souks and small payments",
    localPaymentApps: [
      { name: "Apple Pay / Google Pay", note: "Widely accepted in Dubai Mall, airport, and most modern retailers." },
      { name: "Careem Pay", note: "Ride-hailing and payment — links to foreign Visa/Mastercard." },
      { name: "Noon Pay", note: "UAE e-commerce and in-app payments — growing acceptance." },
    ],
    topTips: [
      "Use Careem or Uber for rides — both accept foreign credit cards. Fixed airport taxi rates apply from Dubai Airport.",
      "Gold Souk and Deira Spice Market vendors prefer cash — carry AED 200–500.",
      "ATMs from Emirates NBD, FAB, and Abu Dhabi Commercial Bank accept foreign Visa/Mastercard well.",
      "Dubai Mall and Abu Dhabi malls have money exchange kiosks — Al Ansari Exchange offers competitive rates.",
      "UAE has no income or tourist VAT refund for everyday purchases — the 5% VAT paid stays with the government.",
    ],
    avoidList: [
      "Avoid exchanging money at airport arrival halls — rates are 3–5% worse than city exchange counters.",
      "Avoid informal money changers outside licensed exchange houses.",
      "Never accept DCC in the UAE.",
    ],
    dccNote:
      "DCC is uncommon in the UAE but occurs at some hotel terminals and older ATMs. Choose to pay in AED to benefit from your card's exchange rate.",
    vatInfo:
      "UAE's 5% VAT does have a Tourist Refund Scheme — spend AED 250+ at registered stores, get a Planet tax-free form, and claim at Dubai or Abu Dhabi airport Tax Free kiosks before check-in.",
    atmTip:
      "Emirates NBD, Mashreq, and FAB ATMs are everywhere in Dubai. Fees for foreign cards: AED 10–20 per withdrawal. Rates are close to mid-market — reliable and safe.",
    cardTip:
      "A no-foreign-fee Visa or Mastercard is ideal for the UAE. The UAE's AED is pegged to USD (fixed rate), so there's no exchange rate volatility — just minimize the bank's 2.5% markup.",
    seoTitle: "How to Pay in Dubai & UAE — Cards, Cash & Shopping Tips",
    seoDescription:
      "UAE / Dubai travel money guide: best payment methods for Dubai, souks cash tips, contactless in Dubai Mall, AED exchange rate tips, and Tourist Refund Scheme information.",
    h1: "How to Pay in UAE / Dubai — Travel Money Guide",
  },
];

export const TRAVEL_MONEY_SLUGS = TRAVEL_MONEY_GUIDES.map((g) => g.slug);

export function getGuideByTravelSlug(slug: string): TravelMoneyGuide | undefined {
  return TRAVEL_MONEY_GUIDES.find(
    (g) => g.slug === slug || (g.altSlugs ?? []).includes(slug)
  );
}

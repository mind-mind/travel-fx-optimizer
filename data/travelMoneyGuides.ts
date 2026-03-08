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
  /**
   * Representative spend used on the fee-comparison table (in destination currency).
   * Pick a round number that feels realistic for a single purchase or day's spend.
   */
  exampleAmount: number;

  // Popular attractions with ticket prices and optional FX note
  attractions?: {
    name: string;
    description: string;
    ticketPrice: string;   // e.g. "¥2,000" or "Free"
    fxNote?: string;       // e.g. "Paying by card adds ~¥60 in FX fees"
    tip?: string;          // e.g. "Book online to skip queues"
  }[];

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
    exampleAmount: 10000,
    attractions: [
      {
        name: "Senso-ji Temple",
        description: "Tokyo's oldest temple and most visited site — free to enter the grounds, with a small fee for the inner sanctum.",
        ticketPrice: "Free / ¥200 inner hall",
        fxNote: "Street vendors and the Nakamise shopping street are cash-only — a standard card adds ~¥30 in FX fees per ¥2,000 purchase.",
        tip: "Arrive before 8 am to explore without crowds.",
      },
      {
        name: "teamLab Planets Tokyo",
        description: "Immersive digital art museum in Toyosu — advance booking recommended.",
        ticketPrice: "¥3,200",
        fxNote: "Book online with a no-FX card to avoid ~¥96 extra on a standard bank card.",
        tip: "Book tickets online at least 2 weeks in advance — frequently sells out.",
      },
      {
        name: "Mount Fuji (5th Station)",
        description: "Japan's iconic peak — free to visit the 5th Station; the climbing season (July–Sept) has a ¥2,000 conservation fee.",
        ticketPrice: "Free / ¥2,000 (climbing season)",
        fxNote: "Pay the gate fee in cash — card terminals are not always available at the trailhead.",
        tip: "Start the ascent before midnight to reach the summit at sunrise.",
      },
      {
        name: "Shinjuku Gyoen National Garden",
        description: "Stunning garden combining French, English, and Japanese styles — beautiful during cherry blossom season.",
        ticketPrice: "¥500",
        fxNote: "Card accepted at the gate — a standard card adds ~¥15 in FX fees.",
        tip: "Visit in late March–early April for the best cherry blossom viewing.",
      },
      {
        name: "Fushimi Inari Shrine (Kyoto)",
        description: "Iconic thousands-of-torii-gates mountain hike outside Kyoto — one of Japan's most photographed landmarks.",
        ticketPrice: "Free",
        tip: "Hike to the top (2–3 hrs) for stunning views with far fewer tourists than the lower gates.",
      },
    ],
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
    exampleAmount: 2000,
    attractions: [
      {
        name: "Grand Palace & Wat Phra Kaew",
        description: "Bangkok's most iconic landmark — the Grand Palace complex and the sacred Emerald Buddha temple.",
        ticketPrice: "฿500",
        fxNote: "Card accepted at the main entrance — a standard card adds ~฿15 in fees. Bring cash for smaller vendors inside.",
        tip: "Dress code is strictly enforced — shoulders and knees must be covered. Free sarongs are available but queues are long.",
      },
      {
        name: "Wat Pho",
        description: "Temple of the Reclining Buddha — a massive 46-metre gold buddha and Thailand's oldest public university.",
        ticketPrice: "฿200",
        fxNote: "Cash only at the gate — a 7-Eleven ATM nearby charges ฿220 for foreign cards.",
        tip: "Combine with the Grand Palace in one morning — they're a short walk apart.",
      },
      {
        name: "Chiang Mai Night Bazaar",
        description: "Massive nightly market with local handicrafts, street food, and cultural performances.",
        ticketPrice: "Free entry",
        fxNote: "Cash only for most vendors — budgeting ฿500–1,000 in small notes is recommended.",
        tip: "Bargaining is expected — start at 50% of the asking price.",
      },
      {
        name: "Phi Phi Islands Day Tour",
        description: "Emerald lagoons and white-sand beaches made famous by 'The Beach' — accessible by speedboat from Phuket or Krabi.",
        ticketPrice: "฿1,200–฿2,500",
        fxNote: "Most tour operators accept cards — a standard bank card adds ~฿75 in FX fees on a ฿3,000 tour.",
        tip: "Book directly at the pier the evening before to get the best rate.",
      },
      {
        name: "Ayutthaya Historical Park",
        description: "UNESCO World Heritage ancient capital — stunning ruined temples and buddha statues just 80 km from Bangkok.",
        ticketPrice: "฿50 per temple (3–5 sites recommended)",
        fxNote: "Temple fees are cash-only. A day of sightseeing costs ฿150–250 — carry small notes.",
        tip: "Hire a bicycle from the pier (฿50/day) to reach all major sites at your own pace.",
      },
    ],
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
    exampleAmount: 50000,
    attractions: [
      {
        name: "Gyeongbokgung Palace",
        description: "Korea's grandest Joseon-era palace — includes the National Folk Museum and changing-of-the-guard ceremony.",
        ticketPrice: "₩3,000",
        fxNote: "Card accepted — a standard bank card adds ~₩90 in FX fees. Cash is fine at the gate.",
        tip: "Wear a hanbok (traditional dress) rented nearby for free entry — photo spots are excellent.",
      },
      {
        name: "N Seoul Tower",
        description: "Iconic observation tower on Namsan Mountain — 360° panoramic views over Seoul. Accessible by cable car or walking trail.",
        ticketPrice: "₩21,000 (observation deck)",
        fxNote: "Card accepted. A standard bank card adds ~₩630 in FX fees — use a no-FX card to save.",
        tip: "The cable car (₩15,500 return) is worth it. Visit at sunset for the city lights.",
      },
      {
        name: "Demilitarized Zone (DMZ) Tour",
        description: "Half-day or full-day guided tour to the North Korean border — a unique and sobering historical experience.",
        ticketPrice: "₩55,000–₩110,000",
        fxNote: "Most tour operators accept Visa/Mastercard — a standard card adds ~₩2,750 on a ₩110,000 tour.",
        tip: "Book at least 3 days in advance — ID/passport required and some areas restrict entry.",
      },
      {
        name: "Lotte World",
        description: "The world's largest indoor theme park, combined with an outdoor Magic Island — rides, performances, and a skating rink.",
        ticketPrice: "₩62,000 (1-day pass)",
        fxNote: "Card accepted in-park — a standard bank card adds ~₩1,860 on entry; food/drinks inside also add up.",
        tip: "Buy tickets online (official app) for a ₩5,000–10,000 discount vs gate price.",
      },
      {
        name: "Bukchon Hanok Village",
        description: "Living museum of traditional Korean hanok houses — photo-perfect alleys with mountain and palace views.",
        ticketPrice: "Free",
        tip: "Visit early morning (before 9 am) — residents ask for quiet. Avoid weekends.",
      },
    ],
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
    exampleAmount: 200,
    attractions: [
      {
        name: "Gardens by the Bay",
        description: "Futuristic garden with the iconic Supertree Grove, Cloud Forest, and Flower Dome conservatories.",
        ticketPrice: "S$28 (conservatories combo)",
        fxNote: "Card accepted — a standard bank card adds ~S$0.70 in FX fees on admission.",
        tip: "The outdoor Supertree Grove is free. The free Supertree light show runs nightly at 7:45 pm & 8:45 pm.",
      },
      {
        name: "Universal Studios Singapore",
        description: "Southeast Asia's only Universal Studios — with themed zones from Jurassic Park to Transformers and Minions.",
        ticketPrice: "S$83",
        fxNote: "Buy online with a no-FX card — a standard bank card adds ~S$2.50 on the ticket price.",
        tip: "Arrive at rope-drop (10 am) and head straight to Battlestar Galactica and Revenge of the Mummy first.",
      },
      {
        name: "Singapore Zoo & Night Safari",
        description: "World-renowned open-concept zoo by the Seletar Reservoir, with the only world-class night zoo next door.",
        ticketPrice: "S$49 (zoo) / S$55 (Night Safari)",
        fxNote: "Cards accepted — consider a combo ticket (S$85) bought online for best value.",
        tip: "The Night Safari's tram ride at 9 pm offers the best animal viewing after a long feeding day.",
      },
      {
        name: "ArtScience Museum",
        description: "Iconic lotus-shaped museum at Marina Bay Sands — combining art, science, and technology exhibitions.",
        ticketPrice: "S$20",
        fxNote: "Card accepted. Save S$5 by buying online ahead of time.",
        tip: "The permanent Future World exhibition is worth the standalone visit.",
      },
      {
        name: "Chinatown Food Street & Maxwell Hawker Centre",
        description: "Singapore's best known hawker centres for authentic local dishes — Hainanese chicken rice, laksa, char kway teow.",
        ticketPrice: "From S$4–6 per dish",
        fxNote: "Many stalls now accept PayNow QR — but cash (S$5–10 notes) is still preferred at older stalls.",
        tip: "Tian Tian Chicken Rice at Maxwell is famous worldwide. Arrive before noon or queue for 30+ minutes.",
      },
    ],
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
    exampleAmount: 3000,
    attractions: [
      {
        name: "Taipei 101 Observatory",
        description: "Iconic skyscraper with an indoor observation deck on the 89th floor and outdoor deck on the 91st — stunning views over Taipei.",
        ticketPrice: "NT$600",
        fxNote: "Card accepted at the ticket counter — a standard bank card adds ~NT$18 in FX fees.",
        tip: "Book online to skip the queue. Evening visits offer the best cityscape views.",
      },
      {
        name: "Shilin Night Market",
        description: "Taiwan's most famous night market — hundreds of food stalls, games, and shopping spread across two floors.",
        ticketPrice: "Free entry",
        fxNote: "Almost entirely cash-only. Bring NT$500–1,000 in small notes for snacks and shopping.",
        tip: "Don't miss oyster vermicelli (oō-á-mī), scallion pancakes, and XXL chicken steaks.",
      },
      {
        name: "National Palace Museum",
        description: "One of the world's greatest collections of Chinese imperial artefacts — over 700,000 pieces covering 8,000 years of history.",
        ticketPrice: "NT$350",
        fxNote: "Card accepted. Consider a no-FX card to save the ~NT$10 standard bank surcharge.",
        tip: "The Jadeite Cabbage and Meat-Shaped Stone are the star exhibits — find them on the 3rd floor.",
      },
      {
        name: "Jiufen Old Street",
        description: "The atmospheric hillside teahouse town believed to have inspired Studio Ghibli's Spirited Away — stunning sea views.",
        ticketPrice: "Free entry",
        fxNote: "Teahouses and shops are mostly cash-only. Bring NT$300–500 for tea and snacks.",
        tip: "Visit on a weekday to avoid weekend crowds. Golden hour lighting is magical.",
      },
      {
        name: "Taroko Gorge National Park",
        description: "Dramatic marble gorge and mountain scenery in eastern Taiwan — one of Asia's most spectacular natural parks.",
        ticketPrice: "Free (some trails require permits)",
        tip: "The Shakadang Trail and Swallow Grotto are the most accessible. Helmets are required in the gorge tunnels.",
      },
    ],
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
    exampleAmount: 800,
    attractions: [
      {
        name: "The Peak Tram & Sky Terrace",
        description: "Hong Kong's historic funicular railway to Victoria Peak — offering the most iconic skyline view in Asia.",
        ticketPrice: "HK$188 (return + Sky Terrace 428)",
        fxNote: "Card accepted at the tram station — a standard bank card adds ~HK$6 in FX fees.",
        tip: "Buy combo tickets online. Visit at dusk when the city lights up for the best effect.",
      },
      {
        name: "Star Ferry Harbour Crossing",
        description: "Iconic century-old ferry crossing between Tsim Sha Tsui and Central — one of the world's great cheap thrills.",
        ticketPrice: "HK$3.40 (lower deck) / HK$4.20 (upper deck)",
        fxNote: "Cash or Octopus card only — no credit cards accepted. Cheapest and most scenic way to cross the harbour.",
        tip: "Take the upper deck. The evening crossing between 7–8 pm has the city lights in full effect.",
      },
      {
        name: "Ocean Park Hong Kong",
        description: "Theme park and marine life aquarium built into sea cliffs — with panda habitats, roller coasters, and shows.",
        ticketPrice: "HK$498",
        fxNote: "Card accepted. A standard bank card adds ~HK$15 in FX fees — buy online with a no-FX card.",
        tip: "Weekday visits avoid long queues. The cable car and Hong Kong Fisherman's Wharf are highlights.",
      },
      {
        name: "Chi Lin Nunnery & Nan Lian Garden",
        description: "Serene Tang-dynasty wooden nunnery and classic Chinese garden — a peaceful contrast to Hong Kong's urban density.",
        ticketPrice: "Free",
        tip: "Combine with nearby Diamond Hill MTR stop. The lotus pond is especially beautiful in summer.",
      },
      {
        name: "Mong Kok Street Markets",
        description: "Street market district with the Ladies' Market, Flower Market, Bird Garden, and Goldfish Market.",
        ticketPrice: "Free entry",
        fxNote: "Cash only for almost all vendors. Bring HK$200–500 in small notes for shopping and street snacks.",
        tip: "Bargain on everything — start at 60% of the first asking price.",
      },
    ],
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
    exampleAmount: 500,
    attractions: [
      {
        name: "Great Wall of China (Mutianyu section)",
        description: "The best-preserved and tourist-friendly section of the Great Wall — with a cable car and toboggan descent.",
        ticketPrice: "¥65 + cable car ¥120",
        fxNote: "Pay via Alipay or cash — linking a foreign card to Alipay is easiest for tourists.",
        tip: "Take a bus from Dongzhimen (Beijing) to avoid overpriced tour packages. Go Tuesday–Thursday for fewer crowds.",
      },
      {
        name: "Forbidden City (Palace Museum)",
        description: "The world's largest preserved palace complex — 24 emperors' home and China's most visited attraction.",
        ticketPrice: "¤60",
        fxNote: "Tickets must be booked online in advance (foreigners need a passport). Pay via Alipay linked to a foreign card.",
        tip: "Tickets sell out weeks ahead — book on the official Palace Museum website. Google is blocked in China.",
      },
      {
        name: "Terracotta Warriors (Xi'an)",
        description: "Emperor Qin Shi Huang's army of over 8,000 life-size clay soldiers — one of archaeology's greatest discoveries.",
        ticketPrice: "¥120",
        fxNote: "Accept card payment at the site — or use Alipay International.",
        tip: "Pit 1 has the most warriors. Hire an official guide on-site for context — it completely transforms the experience.",
      },
      {
        name: "Zhangjiajie National Forest Park",
        description: "Other-worldly floating sandstone pillars that inspired the Avatar film — reached via the world's longest glass bridge.",
        ticketPrice: "¥258 (3-day park pass)",
        fxNote: "Pay via Alipay or WeChat Pay inside the park. ATM access in the park is limited.",
        tip: "Stay 2 nights inside the park to beat the day-tripper crowds on the Hallelujah Mountain trail.",
      },
      {
        name: "The Bund, Shanghai",
        description: "Shanghai's famous waterfront promenade with Art Deco colonial buildings facing the futuristic Pudong skyline.",
        ticketPrice: "Free",
        fxNote: "Walking is free, but Pudong skyline views require a ferry (¥2) or tunnel (¥30) across the river.",
        tip: "The view from the rooftop bar of the Waldorf Astoria (no minimum spend before 6 pm) is stunning.",
      },
    ],
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
    exampleAmount: 500000,
    attractions: [
      {
        name: "Ha Long Bay Cruise",
        description: "UNESCO World Heritage limestone karsts rising from emerald waters — best experienced on a 2-day overnight junk cruise.",
        ticketPrice: "VND 2,200,000–5,000,000 (per person, 2-day)",
        fxNote: "Most tour operators in Hanoi accept Visa/Mastercard. A standard bank card adds ~VND 110,000 on a VND 4,400,000 cruise.",
        tip: "Book directly with your Hanoi guesthouse to save 20–30% vs walking agents on the street.",
      },
      {
        name: "Hoi An Ancient Town",
        description: "Lantern-lit UNESCO trading port with Japanese merchant houses, tailor shops, and outstanding street food.",
        ticketPrice: "VND 120,000 (5-site combo ticket)",
        fxNote: "Entrance fees are cash-only. Most tailors and restaurants accept cards — a standard card adds ~VND 3,600 per VND 120,000.",
        tip: "The Full Moon Lantern Festival (15th of every lunar month) is magical — special lantern tickets required.",
      },
      {
        name: "Cu Chi Tunnels",
        description: "The legendary underground tunnel network used by Viet Cong soldiers during the Vietnam War — near Ho Chi Minh City.",
        ticketPrice: "VND 130,000",
        fxNote: "Cash only at the ticket gate. Nearby restaurants accept cards but charge in VND.",
        tip: "Crawl the 'extra-widened' tourist tunnel (still very tight) for an authentic claustrophobic experience.",
      },
      {
        name: "Hue Imperial Citadel",
        description: "Vast fortified palace complex — former seat of the Nguyen emperors. Includes the Forbidden Purple City ruins.",
        ticketPrice: "VND 200,000",
        fxNote: "Cards accepted at main ticket booth. A standard bank card adds ~VND 6,000 in FX fees.",
        tip: "Hire a bicycle outside the citadel entrance (VND 60,000/day) to explore the surrounding royal tombs.",
      },
      {
        name: "Sa Pa Trekking",
        description: "Dramatic rice-terrace landscapes and Hmong hill tribe villages in northern Vietnam's Hoang Lien mountain range.",
        ticketPrice: "Free (guided treks VND 350,000–800,000)",
        fxNote: "Guides require cash payment in VND. ATM access is limited in Sa Pa town — withdraw in Hanoi before travel.",
        tip: "Trek to Lao Chai and Ta Van villages rather than Fansipan cable car for a more authentic experience.",
      },
    ],
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
    exampleAmount: 500000,
    attractions: [
      {
        name: "Borobudur Temple",
        description: "The world's largest Buddhist temple — a 9th-century UNESCO masterpiece of Buddhist cosmology in Central Java.",
        ticketPrice: "Rp 375,000 (foreign tourist)",
        fxNote: "Card accepted at the ticket office. A standard bank card adds ~Rp 11,250 in FX fees.",
        tip: "Book the sunrise package (from Rp 500,000) for the most spectacular experience before crowds arrive.",
      },
      {
        name: "Tanah Lot Temple, Bali",
        description: "Iconic sea temple perched on a rock formation — most photographed at sunset when waves crash around its base.",
        ticketPrice: "Rp 60,000",
        fxNote: "Cash or card accepted. Carry IDR cash for offerings and nearby warung food stalls.",
        tip: "Arrive 90 minutes before sunset to secure a spot on the lower viewing platform.",
      },
      {
        name: "Ubud Sacred Monkey Forest Sanctuary",
        description: "Ancient Hindu temple complex inhabited by over 700 free-roaming macaques — set in dense tropical forest.",
        ticketPrice: "Rp 50,000",
        fxNote: "Card accepted at gate. A standard bank card adds ~Rp 1,500 in fees.",
        tip: "Secure all bags, sunglasses, and any food. Don't make direct eye contact with monkeys.",
      },
      {
        name: "Komodo National Park",
        description: "Home to the Komodo dragon, the world's largest lizard — plus pristine coral reefs and pink sand beaches.",
        ticketPrice: "IDR 150,000 entry + IDR 100,000 conservation fee",
        fxNote: "Cash only at park reception. Exchange IDR in Labuan Bajo before arriving — limited ATMs.",
        tip: "Book a 2-day liveaboard to reach the remote pink beach and best diving sites.",
      },
      {
        name: "Mount Bromo Sunrise Trek",
        description: "Volcanic crater lake surrounded by a sea of sand — the most iconic sunrise view in Java.",
        ticketPrice: "IDR 220,000 (foreigners)",
        fxNote: "Jeep hire (Rp 400,000–600,000) and guide fees require cash in IDR.",
        tip: "Wake at 3 am and reach the viewpoint by 4:30 am for the best unobstructed sunrise.",
      },
    ],
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
    exampleAmount: 300,
    attractions: [
      {
        name: "Petronas Twin Towers",
        description: "The world's tallest twin skyscrapers — the Skybridge on floor 41 and the observation deck on floor 86 offer stunning KL views.",
        ticketPrice: "RM 89.90",
        fxNote: "Card accepted at the ticket office. A standard bank card adds ~RM 2.70 in FX fees.",
        tip: "Tickets sell out fast — book online weeks ahead. The Skybridge (floor 41) offers the most dramatic views.",
      },
      {
        name: "Batu Caves",
        description: "Sacred Hindu temple caves accessed via 272 colourful steps — home to a 42.7m golden Lord Murugan statue.",
        ticketPrice: "Free (RM 5 steep trail caves)",
        fxNote: "Entirely free to visit. Small cash donation expected at the temple entrance.",
        tip: "Dress respectfully (cover knees and shoulders) and watch out for macaque monkeys at the top.",
      },
      {
        name: "Langkawi Cable Car (SkyCab)",
        description: "Steep gondola ride to the summit of Gunung Mat Cincang — with one of the world's steepest cable car sections.",
        ticketPrice: "RM 55 (return)",
        fxNote: "Card accepted. A standard bank card adds ~RM 1.65 in FX fees on the ticket.",
        tip: "Go on a clear morning — cloud cover arrives by noon. Combine with the Langkawi Sky Bridge (RM 15 extra).",
      },
      {
        name: "Melaka UNESCO Historic District",
        description: "Malaysia's most preserved colonial town with Portuguese, Dutch, and British layers — stunning Baba-Nyonya culture.",
        ticketPrice: "Free to walk; Baba-Nyonya Museum RM 16",
        fxNote: "Museums accept cash or card. River cruise (RM 30) is cash-only.",
        tip: "Jonker Street Night Market (Friday-Sunday) is unmissable — the best street food concentration in Malaysia.",
      },
      {
        name: "KL Bird Park",
        description: "The world's largest free-flight bird aviary — over 3,000 birds from 200 species roaming through a rainforest enclosure.",
        ticketPrice: "RM 67",
        fxNote: "Card accepted at the entrance. A standard bank card adds ~RM 2 in fees.",
        tip: "Visit in the morning when birds are most active. The hornbill feeding session (10 am/3 pm) is a highlight.",
      },
    ],
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
    exampleAmount: 3000,
    attractions: [
      {
        name: "Puerto Princesa Underground River",
        description: "UNESCO World Heritage subterranean river through cathedral-like cave chambers — one of the New 7 Wonders of Nature.",
        ticketPrice: "PHP 450 (environmental fee) + PHP 300 (boat)",
        fxNote: "Cash only at the park entrance. ATMs in Puerto Princesa city are reliable; bring enough PHP.",
        tip: "Book the paddle boat tour months ahead — daily visitor numbers are strictly limited.",
      },
      {
        name: "Chocolate Hills, Bohol",
        description: "Over 1,200 perfectly cone-shaped limestone hills that turn chocolate-brown in dry season — one of the Philippines' most surreal landscapes.",
        ticketPrice: "PHP 50 (viewpoint)",
        fxNote: "Cash only. The full Bohol day trip (including Tarsier Sanctuary) runs PHP 1,500-2,000 per person.",
        tip: "Combine with the Tarsier Sanctuary (PHP 100) to see the world's smallest primate in its natural habitat.",
      },
      {
        name: "Intramuros, Manila",
        description: "The 16th-century walled Spanish colonial city at the heart of Manila — Fort Santiago, San Agustin Church, and cobblestone streets.",
        ticketPrice: "PHP 75 (Fort Santiago)",
        fxNote: "Most sites accept cash. Card acceptance inside Intramuros restaurants is patchy.",
        tip: "Explore by bamboo bike rental (PHP 100/hr) and visit the Manila Cathedral for free.",
      },
      {
        name: "Siargao Island Surfing",
        description: "The 'surfing capital of the Philippines' — Cloud 9 is one of Asia's most famous reef breaks. Also great for island hopping.",
        ticketPrice: "PHP 200-400 (surf lesson/day)",
        fxNote: "Mostly cash-only on the island. Bring PHP from General Santos or Cebu — ATMs on Siargao have limited cash.",
        tip: "The best surf is July-November. Island hopping to Naked Island and Daku Island costs PHP 1,000-1,500 per boat.",
      },
      {
        name: "Whale Shark Watching, Oslob",
        description: "Swim alongside whale sharks in their morning feeding ground off the coast of Cebu — a bucket-list experience.",
        ticketPrice: "PHP 1,000 (snorkelling with sharks)",
        fxNote: "Cash only at the registration centre. Bring enough PHP from Cebu City.",
        tip: "Arrive by 6 am for the fewest sharks and clearest water. Guide accompaniment is mandatory.",
      },
    ],
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
    exampleAmount: 5000,
    attractions: [
      {
        name: "Taj Mahal, Agra",
        description: "The world's most iconic monument to love — a UNESCO World Heritage marble mausoleum commissioned by Mughal emperor Shah Jahan.",
        ticketPrice: "INR 1,100 (foreigners)",
        fxNote: "Card accepted at the main ticket office. A standard bank card adds ~INR 33 in FX fees. Watch for unofficial 'helper' touts outside the gates.",
        tip: "Enter via the East or West gate to avoid the longer South gate queue. Dawn entry is magical with few crowds.",
      },
      {
        name: "Amber Fort, Jaipur",
        description: "Magnificent hilltop Rajput fort and palace complex above Maota Lake — one of Rajasthan's finest architectural gems.",
        ticketPrice: "INR 550 (foreigners)",
        fxNote: "Card accepted with occasional connectivity issues — carry INR cash as backup. A standard bank card adds ~INR 17 in fees.",
        tip: "Take the paved path to the summit rather than an elephant or jeep for better views and ethical travel.",
      },
      {
        name: "Kerala Backwaters Houseboat",
        description: "Overnight stay on a traditional kettuvallam rice-barge through the palm-lined waterways of Alleppey — one of India's most unique experiences.",
        ticketPrice: "INR 8,000-15,000 (per night, houseboat)",
        fxNote: "Most operators accept card for bookings; cash tipping for crew (INR 500-1,000 pp) is customary.",
        tip: "Book a private boat rather than a shared tour. Sunset on the backwaters is unforgettable — negotiate a mooring spot near rice paddies.",
      },
      {
        name: "Varanasi Ghats & Ganga Aarti",
        description: "The world's oldest living city — sacred bathing ghats along the Ganges River, and the spectacular nightly fire ceremony at Dashashwamedh Ghat.",
        ticketPrice: "Free (boat ride INR 200-500)",
        fxNote: "Boat rides and puja offerings are cash-only in INR. Bring INR 200-500 in small notes.",
        tip: "Watch the Ganga Aarti from a row boat on the river for the best unobstructed view (6:30-7:15 pm).",
      },
      {
        name: "Jaipur City Palace & Jantar Mantar",
        description: "The royal palace still occupied by Jaipur's royal family, combined with UNESCO-listed Jantar Mantar — an 18th-century stone astronomical observatory.",
        ticketPrice: "INR 700 (foreigners, City Palace)",
        fxNote: "Card accepted. A standard bank card adds ~INR 21 in fees. The combo ticket with Amber Fort saves money.",
        tip: "Hire an official guide inside the City Palace (INR 500) — the artefacts and rooms come alive with context.",
      },
    ],
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
    exampleAmount: 200,
    attractions: [
      {
        name: "Eiffel Tower, Paris",
        description: "The world's most visited paid monument — 300-metre iron tower with three observation levels over the Seine river.",
        ticketPrice: "EUR 29.40 (summit, online)",
        fxNote: "Book and pay online with a no-FX card. A standard bank card adds ~EUR 0.90 per ticket.",
        tip: "Book summit tickets 2-3 months ahead — they sell out entirely. Stairs to level 2 are a fraction of the price.",
      },
      {
        name: "Colosseum & Roman Forum, Rome",
        description: "The ancient world's greatest amphitheatre — once hosting gladiatorial combat for 50,000 spectators.",
        ticketPrice: "EUR 16 (standard) / EUR 22 (with MAXXI access)",
        fxNote: "Buy online to skip queues. A standard bank card adds ~EUR 0.50 in FX fees per ticket.",
        tip: "Book a guided underground or arena floor tour — these areas are extraordinary and require advance tickets.",
      },
      {
        name: "Sagrada Familia, Barcelona",
        description: "Gaudi's unfinished but awe-inspiring basilica — a UNESCO masterpiece of organic architecture still under construction since 1882.",
        ticketPrice: "EUR 26 (standard) / EUR 36 (with towers)",
        fxNote: "Online purchase only. A standard bank card adds ~EUR 0.90 in FX fees per ticket.",
        tip: "Book the tower access with the Nativity Tower — the views over Barcelona's Eixample grid are spectacular.",
      },
      {
        name: "Rijksmuseum, Amsterdam",
        description: "The Netherlands' national art museum — home to Rembrandt, Vermeer, and the finest Dutch Golden Age collection in the world.",
        ticketPrice: "EUR 22.50",
        fxNote: "Card accepted. A standard bank card adds ~EUR 0.70 in FX fees per ticket.",
        tip: "Book online to skip the queue. The Night Watch hall (Room 2) is best visited at 9 am or near closing.",
      },
      {
        name: "Acropolis & Parthenon, Athens",
        description: "2,500-year-old temple complex crowning Athens — one of Western civilization's most significant archaeological sites.",
        ticketPrice: "EUR 20 (includes 6 nearby sites)",
        fxNote: "Card accepted at ticket booths. The combo ticket gives better value than individual site entries.",
        tip: "Arrive at opening (8 am) to beat the midday heat and coach tour crowds. The Lighting ceremony at dusk is free to watch from Filopappou Hill.",
      },
    ],
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
      "A no-foreign-fee card is essential for the UK — the standard 2.5–3% bank surcharge adds up quickly in London's expensive environment. Starling, Monzo, Chase UK, and Wise are popular choices.",    exampleAmount: 150,
    attractions: [
      {
        name: "Tower of London",
        description: "900-year-old royal fortress on the Thames — home to the Crown Jewels, Beefeaters, and ravens that guard the kingdom.",
        ticketPrice: "GBP 33.60 (adult, online)",
        fxNote: "Book online with a no-FX card. A standard bank card adds ~GBP 1 in FX fees per admission.",
        tip: "A Yeoman Warder tour is included in entry and leaves from the main gate hourly — not to be missed.",
      },
      {
        name: "British Museum",
        description: "The world's first public national museum — 8 million artefacts spanning 2 million years of human history, from the Rosetta Stone to the Elgin Marbles.",
        ticketPrice: "Free",
        tip: "Arrive at 10 am and head directly to Room 4 (Rosetta Stone) before the crowds. Free audio guides available on the app.",
      },
      {
        name: "Stonehenge",
        description: "Britain's most iconic prehistoric monument — 5,000-year-old standing stones on Salisbury Plain, shrouded in archaeological mystery.",
        ticketPrice: "GBP 23.10 (adult, timed entry)",
        fxNote: "Must be booked online. A standard bank card adds ~GBP 0.70 in FX fees per ticket.",
        tip: "Book the earliest available morning slot — the stones emerge from mist dramatically. The shuttle bus from the visitor centre is included.",
      },
      {
        name: "Windsor Castle",
        description: "The world's oldest and largest occupied castle — official weekend residence of King Charles III, with State Apartments open to visitors.",
        ticketPrice: "GBP 30 (adult)",
        fxNote: "Card accepted at the gate. A standard bank card adds ~GBP 0.90 in FX fees.",
        tip: "Check the website before visiting — if the Royal Standard is flying, the King is in residence and some rooms may be closed.",
      },
      {
        name: "Edinburgh Castle",
        description: "Dramatic volcanic rock fortress dominating the Scottish capital skyline — home to the Scottish Crown Jewels and the Stone of Destiny.",
        ticketPrice: "GBP 19.50 (adult)",
        fxNote: "Card accepted. Online booking saves GBP 2 versus gate price.",
        tip: "The One O'Clock Gun fires from the castle battery every weekday at 1 pm — a traditional Edinburgh ritual since 1861.",
      },
    ],
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
    exampleAmount: 150,
    attractions: [
      {
        name: "Grand Canyon National Park",
        description: "One of the world's great natural wonders — a mile-deep canyon carved by the Colorado River over 5 million years.",
        ticketPrice: "USD 35 (vehicle pass, 7 days)",
        fxNote: "The America the Beautiful annual pass (USD 80) covers all US national parks for 12 months — worth it for 3+ parks.",
        tip: "South Rim is best for first-timers. Bright Angel Trail gives dramatic rim views without the dangerous inner-canyon descent.",
      },
      {
        name: "Statue of Liberty & Ellis Island",
        description: "America's most iconic symbol of freedom — the copper statue gifted by France, with Ellis Island immigration museum next door.",
        ticketPrice: "USD 24.30 (ferry + crown reserved)",
        fxNote: "Book ferry tickets online. A no-FX card avoids the ~USD 0.75 standard bank surcharge per ticket.",
        tip: "Crown tickets sell out 6+ months ahead. Reserve access (general statue interior) is still impressive and available 3-4 months out.",
      },
      {
        name: "Smithsonian Museums, Washington D.C.",
        description: "The world's largest museum complex — 19 museums and galleries including the National Air and Space Museum, Natural History, and American History.",
        ticketPrice: "Free",
        tip: "The Air and Space Museum (Mall location) and Natural History Museum are the most popular. Go on a Tuesday or Wednesday morning to avoid school groups.",
      },
      {
        name: "Yosemite National Park",
        description: "California's crown jewel — towering granite cliffs (El Capitan, Half Dome), giant sequoias, and dramatic waterfalls in the Sierra Nevada.",
        ticketPrice: "USD 35 (vehicle, 7 days)",
        fxNote: "Timed-entry reservation (free but required May-Sept) must be booked 2-3 weeks ahead.",
        tip: "Valley View and Valley Floor Loop offer the best Half Dome and El Capitan views at no extra cost. Sunrise beats midday dramatically.",
      },
      {
        name: "Walt Disney World, Orlando",
        description: "The world's most visited theme park resort — four theme parks including Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom.",
        ticketPrice: "From USD 109/day (Magic Kingdom)",
        fxNote: "Book park tickets and dining 60 days ahead. A no-FX card saves ~USD 3-5 on ticket purchases for a family.",
        tip: "Buy the Lightning Lane Multi Pass for popular rides to avoid 90+ minute queue times at peak seasons.",
      },
    ],
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
    exampleAmount: 250,
    attractions: [
      {
        name: "Sydney Opera House",
        description: "Jorn Utzon's UNESCO-listed masterpiece on Sydney Harbour — guided tours reveal the concert halls, backstage areas, and the building's wild construction story.",
        ticketPrice: "AUD 43 (guided tour)",
        fxNote: "Card accepted. A standard bank card adds ~AUD 1.30 per ticket. Book online via the official site.",
        tip: "An Opera Bar sunset drink (same promontory, no ticket needed) is one of Sydney's quintessential experiences.",
      },
      {
        name: "Great Barrier Reef Day Tour",
        description: "The world's largest coral reef system — over 2,900 individual reefs stretching 2,300 km along Queensland's coast.",
        ticketPrice: "AUD 159-250 (day boat tour from Cairns)",
        fxNote: "Most operators accept card. A standard bank card adds ~AUD 5-8 in FX fees on a day tour.",
        tip: "Outer reef pontoons (Agincourt, Norman) have better coral than inner reef — worth paying extra for the faster vessel.",
      },
      {
        name: "Uluru (Ayers Rock)",
        description: "Sacred Anangu sandstone monolith in the Red Centre — 348 metres high, glowing red at sunrise and sunset.",
        ticketPrice: "AUD 38 (Uluru-Kata Tjuta 3-day pass)",
        fxNote: "Climbing Uluru is permanently closed since 2019 out of respect for Aboriginal custodians. Card accepted at the park gate.",
        tip: "The sunrise viewing area (Talinguru Nyakunytjaku) fills up — arrive 45 minutes early. The circumnavigation walk (10 km) reveals cave art.",
      },
      {
        name: "Melbourne Royal Botanic Gardens",
        description: "36 hectares of curated gardens beside the Yarra River — one of the world's finest botanical gardens, free to visit year-round.",
        ticketPrice: "Free",
        tip: "The Ian Potter Foundation Children's Garden and Ornamental Lake are highlights. Evening summer concerts (Garden Symphony) are a local institution.",
      },
      {
        name: "Bondi to Coogee Coastal Walk",
        description: "Australia's most iconic urban coastal walk — 6 km of clifftop paths, rock pools, and ocean baths between Sydney's famous beaches.",
        ticketPrice: "Free",
        tip: "Walk south from Bondi to Coogee for the best clifftop views. The Bondi Icebergs ocean pool (AUD 8) entry is a highlight.",
      },
    ],
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
    exampleAmount: 400,
    attractions: [
      {
        name: "Burj Khalifa Observation Deck",
        description: "The world's tallest building at 828 metres — observation decks on levels 124 and 148 with views stretching to the Arabian Gulf.",
        ticketPrice: "AED 149 (Level 124) / AED 379 (At the Top SKY, level 148)",
        fxNote: "Book online with a no-FX card to save ~AED 5-11 vs using a standard bank card.",
        tip: "Sunset tickets (3-4 pm slot) are the most popular and most expensive. Book 2+ weeks ahead. The free Dubai Fountain show below is spectacular at 6 pm.",
      },
      {
        name: "Dubai Frame",
        description: "150-metre picture frame structure straddling old and new Dubai — with a glass-floored sky bridge and panoramic views of both sides of the city.",
        ticketPrice: "AED 50",
        fxNote: "Card accepted. A standard bank card adds ~AED 1.50 in FX fees.",
        tip: "Best visited at sunset for the contrast between Old Dubai (Deira) and modern New Dubai (Sheikh Zayed Road).",
      },
      {
        name: "Dubai Museum & Al Fahidi Historic District",
        description: "The original Dubai Fort converted into a museum of pre-oil Emirati life — with the atmospheric Al Fahidi neighbourhood of wind-tower courtyard houses nearby.",
        ticketPrice: "AED 3 (museum)",
        fxNote: "Near-free entry — cash is easiest for the AED 3 ticket.",
        tip: "Walk the Al Seef waterfront and catch the abra water taxi across the Creek to Deira Gold Souk (AED 1 per person).",
      },
      {
        name: "Desert Safari with Dune Bashing",
        description: "Classic Dubai desert experience — 4x4 dune driving, camel riding, sandboarding, and a Bedouin camp dinner under the stars.",
        ticketPrice: "AED 200-350 (private transfers included)",
        fxNote: "Most operators accept Visa/Mastercard. A standard bank card adds ~AED 8-11 in FX fees on a AED 350 package.",
        tip: "Book with a well-reviewed private operator rather than hotel concierge — same quality at 30-40% lower price.",
      },
      {
        name: "Ferrari World Abu Dhabi",
        description: "The world's largest indoor theme park — home to Formula Rossa, the fastest roller coaster on earth (240 km/h), plus Italian theming and Ferrari exhibits.",
        ticketPrice: "AED 395 (all-inclusive)",
        fxNote: "Card accepted. A standard bank card adds ~AED 12 in FX fees on the ticket price.",
        tip: "The 90-minute drive from Dubai is well worth it. Hit Formula Rossa first — queues build throughout the day.",
      },
    ],
    seoTitle: "How to Pay in Dubai & UAE — Cards, Cash & Shopping Tips",
    seoDescription:
      "UAE / Dubai travel money guide: best payment methods for Dubai, souks cash tips, contactless in Dubai Mall, AED exchange rate tips, and Tourist Refund Scheme information.",
    h1: "How to Pay in UAE / Dubai — Travel Money Guide",
  },
];

export const TRAVEL_MONEY_SLUGS = TRAVEL_MONEY_GUIDES.map((g) => g.slug);

export function getGuideByCountryCode(code: string): TravelMoneyGuide | undefined {
  return TRAVEL_MONEY_GUIDES.find((g) => g.countryCode === code);
}

export function getGuideByTravelSlug(slug: string): TravelMoneyGuide | undefined {
  return TRAVEL_MONEY_GUIDES.find(
    (g) => g.slug === slug || (g.altSlugs ?? []).includes(slug)
  );
}

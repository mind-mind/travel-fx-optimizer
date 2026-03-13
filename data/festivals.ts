import type { GuideCountry } from "@/lib/guideConfig";

/** Extends GuideCountry to cover every country in the FX calculator */
export type FestivalCountry =
  | GuideCountry
  | "malaysia"
  | "vietnam"
  | "indonesia"
  | "philippines"
  | "india"
  | "uk"
  | "germany"
  | "france"
  | "italy"
  | "spain"
  | "switzerland"
  | "turkey"
  | "poland"
  | "usa"
  | "canada"
  | "mexico"
  | "australia"
  | "new-zealand"
  | "uae"
  | "saudi-arabia";

export interface Festival {
  id: string;
  country: FestivalCountry;
  emoji: string;
  name: string;
  months: number[]; // 0-indexed: 0 = Jan, 11 = Dec
  duration: string;
  description: string;
  travelTip: string;
  crowdLevel: "low" | "medium" | "high";
  priceImpact?: string;
}

/** ISO-2 country code → FestivalCountry slug (all calculator countries) */
export const COUNTRY_CODE_TO_GUIDE: Record<string, FestivalCountry> = {
  // Asia — guide countries
  JP: "japan",
  CN: "china",
  KR: "korea",
  SG: "singapore",
  HK: "hong-kong",
  TW: "taiwan",
  TH: "thailand",
  // Asia — extended
  MY: "malaysia",
  VN: "vietnam",
  ID: "indonesia",
  PH: "philippines",
  IN: "india",
  // Europe
  GB: "uk",
  DE: "germany",
  FR: "france",
  IT: "italy",
  ES: "spain",
  CH: "switzerland",
  TR: "turkey",
  PL: "poland",
  // Americas
  US: "usa",
  CA: "canada",
  MX: "mexico",
  // Oceania
  AU: "australia",
  NZ: "new-zealand",
  // Middle East
  AE: "uae",
  SA: "saudi-arabia",
};

export const FESTIVALS: Festival[] = [
  // ── Japan ─────────────────────────────────────────────────────────────────
  {
    id: "jp-sakura",
    country: "japan",
    emoji: "🌸",
    name: "Cherry Blossom (Sakura)",
    months: [2, 3],
    duration: "2–3 weeks",
    description:
      "Japan's iconic cherry blossom season transforms parks and streets into pink canopies. Hanami (flower-viewing) parties fill every public park from late March through mid-April.",
    travelTip:
      "Hotels book out months in advance — reserve early and expect prices 50–100% above normal. The Japan Meteorological Corporation publishes annual bloom forecasts in January.",
    crowdLevel: "high",
    priceImpact: "Hotels 50–100% higher",
  },
  {
    id: "jp-goldenweek",
    country: "japan",
    emoji: "🎏",
    name: "Golden Week",
    months: [3, 4],
    duration: "~10 days (Apr 29 – May 5)",
    description:
      "Japan's biggest holiday cluster — four national holidays in one week means the whole country travels simultaneously. Trains, highways, and major tourist spots are packed without exception.",
    travelTip:
      "The priciest travel week in Japan. Book accommodation and shinkansen tickets at least 3 months ahead. Rural onsen towns are a smarter choice than major cities.",
    crowdLevel: "high",
    priceImpact: "Flights & hotels at peak annual pricing",
  },
  {
    id: "jp-obon",
    country: "japan",
    emoji: "🏮",
    name: "Obon Festival",
    months: [7],
    duration: "3 days (mid-August)",
    description:
      "Japan's Buddhist festival honouring the spirits of ancestors. Traditional Bon Odori dances take place in temple grounds and public squares. Many Japanese return to their home towns.",
    travelTip:
      "Mid-August is as busy as Golden Week for domestic travel — trains sell out and hotel prices spike. Book at least 6 weeks ahead for popular spots like Kyoto.",
    crowdLevel: "high",
    priceImpact: "Hotels 30–50% higher",
  },
  {
    id: "jp-koyo",
    country: "japan",
    emoji: "🍁",
    name: "Autumn Foliage (Kōyō)",
    months: [10, 11],
    duration: "2–4 weeks (Nov – early Dec)",
    description:
      "Japan's second most photographed season after cherry blossom. Mountain slopes and temple gardens in Kyoto, Nikko, and Nara turn vivid red, orange, and gold from late October.",
    travelTip:
      "Almost as busy as sakura season. Kyoto's Tofuku-ji and Arashiyama are the most photogenic — arrive at dawn to beat crowds. Book 2–3 months ahead.",
    crowdLevel: "high",
    priceImpact: "Hotels 40–80% higher at top spots",
  },

  // ── China ─────────────────────────────────────────────────────────────────
  {
    id: "cn-cny",
    country: "china",
    emoji: "🧧",
    name: "Chinese New Year (Spring Festival)",
    months: [0, 1],
    duration: "15 days (Jan/Feb, lunar calendar)",
    description:
      "The world's largest annual migration. Streets fill with lanterns, fireworks, and lion dances, but many shops and restaurants close for up to two weeks as millions of people travel home.",
    travelTip:
      "Domestic transport is extremely congested and booked solid. Many businesses close for 1–2 weeks. Budget travellers should avoid China during this period — all prices 2–3× higher.",
    crowdLevel: "high",
    priceImpact: "All prices 2–3× higher",
  },
  {
    id: "cn-dragonboat",
    country: "china",
    emoji: "🚣",
    name: "Dragon Boat Festival",
    months: [5],
    duration: "3 days",
    description:
      "Colourful dragon boat races on rivers and lakes across China. Traditional zongzi (sticky rice dumplings) are eaten nationwide. Race venues are festive but manageable.",
    travelTip:
      "A public holiday with moderate travel. Chengdu and Guilin are excellent choices to combine the races with sightseeing. Most tourist sites remain open and accessible.",
    crowdLevel: "medium",
  },
  {
    id: "cn-midautumn",
    country: "china",
    emoji: "🥮",
    name: "Mid-Autumn Festival",
    months: [8, 9],
    duration: "3 days",
    description:
      "Families reunite to eat mooncakes and admire the full moon. Lantern displays light up parks and public squares. A public holiday, but more relaxed than the two Golden Weeks.",
    travelTip:
      "Moderate travel period. Most tourist sites are open and accessible. Mooncake gift boxes make excellent edible souvenirs — look for premium brands in department stores.",
    crowdLevel: "medium",
  },
  {
    id: "cn-nationalday",
    country: "china",
    emoji: "🎆",
    name: "National Day Golden Week",
    months: [9],
    duration: "7 days (Oct 1–7)",
    description:
      "China's October 1 national holiday triggers one of the world's biggest travel surges. Major attractions like the Great Wall and West Lake reach capacity every day.",
    travelTip:
      "Second busiest period after Spring Festival. Tourist sites are overwhelmingly crowded. Book accommodation weeks ahead and consider lesser-known cities.",
    crowdLevel: "high",
    priceImpact: "Hotels & transport 2× higher",
  },

  // ── Korea ─────────────────────────────────────────────────────────────────
  {
    id: "kr-seollal",
    country: "korea",
    emoji: "🎎",
    name: "Seollal (Lunar New Year)",
    months: [0, 1],
    duration: "3 days",
    description:
      "Korea's most important traditional holiday. Families gather for ancestral rites and traditional games like yutnori. Many restaurants and shops in major cities close.",
    travelTip:
      "Major transport blackout — trains sell out weeks ahead. Many city businesses close. Gyeongbokgung and Bukchon Village host free traditional cultural performances.",
    crowdLevel: "high",
    priceImpact: "Transport sold out weeks ahead",
  },
  {
    id: "kr-cherry",
    country: "korea",
    emoji: "🌸",
    name: "Cherry Blossom Season",
    months: [3],
    duration: "2 weeks (early–mid April)",
    description:
      "Korea's cherry blossoms rival Japan's in beauty. Jinhae's Gunhangje Festival draws millions, and Seoul's Yeouido Hangang Park turns completely pink.",
    travelTip:
      "April is Korea's most popular tourist month. Jinhae books out fast — stay in Changwon and day-trip. Seoul's Jamsil and Yeouido are the best city viewing spots.",
    crowdLevel: "high",
    priceImpact: "Hotels 30–50% higher",
  },
  {
    id: "kr-chuseok",
    country: "korea",
    emoji: "🌕",
    name: "Chuseok (Harvest Festival)",
    months: [8, 9],
    duration: "3 days",
    description:
      "Korea's 'Thanksgiving' — families travel home to share food, play traditional games, and visit ancestral graves. Seoul partially empties out while rural areas fill up.",
    travelTip:
      "Biggest travel period of the year — book transport 1–2 months ahead. Many businesses close, but tourist sites stay open. A surprisingly peaceful time to be in Seoul.",
    crowdLevel: "high",
    priceImpact: "Transport sold out 1–2 months ahead",
  },
  {
    id: "kr-biff",
    country: "korea",
    emoji: "🎬",
    name: "Busan Int'l Film Festival (BIFF)",
    months: [9],
    duration: "10 days (early October)",
    description:
      "Asia's premier film festival draws stars, directors, and cinema fans from around the world to Busan's Haeundae Beach district. Screenings are affordable and accessible.",
    travelTip:
      "Great reason to visit Korea's second city — less crowded and cheaper than Seoul. Book Haeundae Beach hotels a month ahead. The beach atmosphere during October is excellent.",
    crowdLevel: "medium",
  },

  // ── Singapore ─────────────────────────────────────────────────────────────
  {
    id: "sg-cny",
    country: "singapore",
    emoji: "🧧",
    name: "Chinese New Year",
    months: [0, 1],
    duration: "15 days",
    description:
      "Singapore's Chinatown transforms with elaborate light-ups and street markets. The River Hongbao festival at Marina Bay Sands is a spectacular free event with fireworks.",
    travelTip:
      "A fantastic time to visit — energetic atmosphere without the chaos of mainland China. Chinatown restaurants book out on reunion dinner eve — plan ahead.",
    crowdLevel: "medium",
    priceImpact: "Hotels slightly higher",
  },
  {
    id: "sg-nationalday",
    country: "singapore",
    emoji: "🎆",
    name: "National Day",
    months: [7],
    duration: "1 day (August 9)",
    description:
      "Singapore's independence day features an elaborate national parade, military fly-pasts, and one of Asia's best fireworks displays over the Marina Bay skyline.",
    travelTip:
      "Marina Bay hotels sell out months ahead for parade views. Apply for the National Day Parade ballot by April. Public transport is extended but very packed.",
    crowdLevel: "high",
    priceImpact: "Marina Bay hotels sell out months ahead",
  },
  {
    id: "sg-formula1",
    country: "singapore",
    emoji: "🏎️",
    name: "Formula 1 Singapore Grand Prix",
    months: [8],
    duration: "3 days (September)",
    description:
      "The only night race on the F1 calendar, set against Singapore's glittering skyscrapers. The city-centre street circuit makes it one of the world's most atmospheric race venues.",
    travelTip:
      "Race weekend triggers the biggest hotel price spike of the year — book 6+ months ahead. Even non-F1 fans enjoy the extraordinary city atmosphere during race week.",
    crowdLevel: "high",
    priceImpact: "Hotels 100–200% higher on race weekend",
  },
  {
    id: "sg-deepavali",
    country: "singapore",
    emoji: "🪔",
    name: "Deepavali (Festival of Lights)",
    months: [9, 10],
    duration: "1 month of celebrations",
    description:
      "Little India is illuminated with thousands of lights. The Deepavali Festival Village along Campbell Lane offers shopping, street food, and cultural performances all month.",
    travelTip:
      "One of the best times to photograph Little India. Restaurants serve special festival menus with dishes unavailable year-round. Excellent for food lovers and photographers.",
    crowdLevel: "medium",
  },

  // ── Hong Kong ─────────────────────────────────────────────────────────────
  {
    id: "hk-cny",
    country: "hong-kong",
    emoji: "🧧",
    name: "Chinese New Year",
    months: [0, 1],
    duration: "3–5 days",
    description:
      "Hong Kong's Victoria Harbour fireworks are among the world's most spectacular CNY celebrations. Temple fairs, flower markets at Victoria Park, and lion dances fill the streets.",
    travelTip:
      "Book harbour-view hotels months ahead for the fireworks night. Many shops close on the first two days — stock up on cash beforehand.",
    crowdLevel: "high",
    priceImpact: "Harbour-view hotels sell out",
  },
  {
    id: "hk-dragonboat",
    country: "hong-kong",
    emoji: "🚣",
    name: "Dragon Boat Festival",
    months: [5],
    duration: "3 days",
    description:
      "Hong Kong hosts some of Asia's most competitive dragon boat races, including the internationally renowned Stanley International Dragon Boat Championships.",
    travelTip:
      "Stanley and Aberdeen waterfront are the best spots. Races start early morning — arrive by 8am for the best viewing. Restaurants along Stanley Main Street fill up fast.",
    crowdLevel: "medium",
  },
  {
    id: "hk-midautumn",
    country: "hong-kong",
    emoji: "🏮",
    name: "Mid-Autumn Festival",
    months: [8, 9],
    duration: "3 days",
    description:
      "Victoria Park hosts a giant lantern carnival. The Tai Hang fire dragon dance — a century-old tradition — is a uniquely Hong Kong spectacle not to be missed.",
    travelTip:
      "The Tai Hang fire dragon procession draws huge free crowds — arrive 2 hours early for a good spot. MTR is packed after dark; allow extra travel time.",
    crowdLevel: "high",
  },
  {
    id: "hk-winedine",
    country: "hong-kong",
    emoji: "🍷",
    name: "Wine & Dine Festival",
    months: [10],
    duration: "4 days (November)",
    description:
      "One of Asia's biggest food and wine events, held along the West Kowloon Cultural District waterfront with 300+ wines, gourmet food stalls, and harbour views.",
    travelTip:
      "Tickets sell out quickly — buy online in advance. Evening sessions with harbour and skyline views are the most popular. November nights can be cool; dress in layers.",
    crowdLevel: "medium",
  },

  // ── Taiwan ────────────────────────────────────────────────────────────────
  {
    id: "tw-lantern",
    country: "taiwan",
    emoji: "🏮",
    name: "Pingxi Sky Lantern Festival",
    months: [1],
    duration: "1–3 days (February, Lantern Festival)",
    description:
      "One of the world's most iconic festival events — thousands of glowing sky lanterns rise simultaneously into the night. Nearby Shifen waterfall and old street add to the experience.",
    travelTip:
      "Pingxi's train is packed solid — pre-book special festival trains or take a taxi from Ruifang. Accommodation near Pingxi triples in price; consider staying in Taipei.",
    crowdLevel: "high",
    priceImpact: "Accommodation near Pingxi 3× higher",
  },
  {
    id: "tw-dragonboat",
    country: "taiwan",
    emoji: "🚣",
    name: "Dragon Boat Festival",
    months: [5],
    duration: "3 days",
    description:
      "Tainan and Taipei host exciting community dragon boat races. Zongzi (sticky rice dumplings) are sold at every convenience store and street stall nationwide.",
    travelTip:
      "A public holiday with domestic travel surges — book intercity trains a week ahead. Tamsui River races in New Taipei City are free to watch.",
    crowdLevel: "medium",
  },
  {
    id: "tw-ghost",
    country: "taiwan",
    emoji: "👻",
    name: "Ghost Month",
    months: [7],
    duration: "1 month (7th lunar month)",
    description:
      "During the 7th lunar month, the 'gates of the underworld' open. Many Taiwanese avoid big decisions and travel, making this the quietest tourist month of the year.",
    travelTip:
      "Excellent for budget travellers — fewer domestic tourists, reliably lower hotel prices, and fascinating ghost-related temple ceremonies to observe. A hidden gem month.",
    crowdLevel: "low",
    priceImpact: "Hotels 15–25% cheaper",
  },
  {
    id: "tw-moonfestival",
    country: "taiwan",
    emoji: "🥮",
    name: "Moon Festival",
    months: [8, 9],
    duration: "3 days",
    description:
      "Unlike elsewhere, Taiwan's Moon Festival is synonymous with outdoor BBQ. Families and friends grill together in parks and on rooftops under the full moon.",
    travelTip:
      "A fun and unique cultural experience for visitors. Supermarkets sell elaborate mooncake gift boxes in beautiful packaging — a distinctive souvenir to bring home.",
    crowdLevel: "medium",
  },

  // ── Thailand ──────────────────────────────────────────────────────────────
  {
    id: "th-songkran",
    country: "thailand",
    emoji: "💦",
    name: "Songkran (Thai New Year)",
    months: [3],
    duration: "3–7 days (April 13–15, extended in cities)",
    description:
      "The world's biggest water fight. Bangkok's Silom and Khaosan Road, Chiang Mai's old city moat, and Phuket's Bangla Road become epic street water battles for days.",
    travelTip:
      "Waterproof your phone and wallet — you will get soaked. All transport is booked 4–6 weeks ahead. Hotel prices double in major cities. Embrace it — it's unforgettable.",
    crowdLevel: "high",
    priceImpact: "Hotels 2× higher, transport sold out weeks ahead",
  },
  {
    id: "th-cny",
    country: "thailand",
    emoji: "🧧",
    name: "Chinese New Year",
    months: [0, 1],
    duration: "3–5 days",
    description:
      "Bangkok's Yaowarat (Chinatown) transforms with gold decorations, street food you won't find year-round, and lion dances spilling onto the streets. Phuket Old Town celebrates elaborately too.",
    travelTip:
      "Yaowarat gets extremely crowded on the eve — arrive before sunset or at midnight to avoid peak congestion. The best Thai-Chinese street food comes out for this festival.",
    crowdLevel: "medium",
  },
  {
    id: "th-loykrathong",
    country: "thailand",
    emoji: "🪷",
    name: "Loy Krathong & Yi Peng",
    months: [10],
    duration: "1–3 days (November full moon)",
    description:
      "Thousands of lotus-shaped floats drift down rivers nationwide (Loy Krathong). In Chiang Mai, sky lanterns (khom loi) fill the night sky in one of the world's most magical spectacles.",
    travelTip:
      "Chiang Mai's Yi Peng is iconic — book accommodation 4–6 months ahead. Bangkok's Asiatique and Sukhothai are excellent alternatives without the extreme crowds.",
    crowdLevel: "high",
    priceImpact: "Chiang Mai hotels sell out months ahead",
  },
  {
    id: "th-vegetarian",
    country: "thailand",
    emoji: "🌿",
    name: "Vegetarian Festival (Phuket)",
    months: [9],
    duration: "9 days (October, lunar calendar)",
    description:
      "Phuket's most intense festival — nine days of strict vegetarianism, fire-walking, and the famous body-piercing rituals performed by devotees in trance states.",
    travelTip:
      "Not for the faint-hearted — the piercing ceremonies are intense to witness. October is low season in Phuket, making it a great time for budget accommodation.",
    crowdLevel: "low",
  },

  // ── Malaysia ──────────────────────────────────────────────────────────────
  {
    id: "my-cny",
    country: "malaysia",
    emoji: "🧧",
    name: "Chinese New Year",
    months: [0, 1],
    duration: "15 days (Jan/Feb, lunar calendar)",
    description:
      "Malaysia's second-largest festival after Hari Raya. Penang and Kuala Lumpur's Chinatown light up with lanterns, lion dances, and street food bazaars. A fantastic multicultural celebration.",
    travelTip:
      "Hotels in Penang book out for CNY — reserve 2 months ahead. Most Chinese-owned businesses close for 1–2 days. A great time to try open-house traditions with locals.",
    crowdLevel: "high",
    priceImpact: "Hotels 20–40% higher, especially Penang",
  },
  {
    id: "my-hariraya",
    country: "malaysia",
    emoji: "🌙",
    name: "Hari Raya Aidilfitri (Eid al-Fitr)",
    months: [2, 3],
    duration: "1 month (dates move each year ~10 days earlier)",
    description:
      "Malaysia's biggest holiday. Cities quiet as millions return to home villages (kampung). The preceding Ramadan month sees night markets (bazaar Ramadan) open until midnight across the country.",
    travelTip:
      "Inter-city transport books out completely. Most small restaurants closed during the first 2 days of Eid. Petronas Towers and major malls stay open. Ask about open house invitations — Malaysians are famously welcoming.",
    crowdLevel: "high",
    priceImpact: "All transport sold out — book 4 weeks ahead",
  },
  {
    id: "my-thaipusam",
    country: "malaysia",
    emoji: "🪷",
    name: "Thaipusam",
    months: [0, 1],
    duration: "3 days (January/February, lunar calendar)",
    description:
      "One of the world's most dramatic Hindu festivals. Batu Caves near KL draws over a million devotees and spectators. Kavadi carriers pierce their bodies and climb 272 steps to the temple.",
    travelTip:
      "A public holiday in KL and Penang. The procession from KL city centre starts at dawn — arrive by 4am for the best experience. Photography is welcome but be respectful.",
    crowdLevel: "high",
    priceImpact: "Hotels near Batu Caves sell out",
  },
  {
    id: "my-deepavali",
    country: "malaysia",
    emoji: "🪔",
    name: "Deepavali",
    months: [9, 10],
    duration: "1 month of celebrations",
    description:
      "Malaysia's Festival of Lights. Little India in KL and Penang transforms with elaborate light-ups. Open houses across the country invite everyone to enjoy traditional Indian sweets and dishes.",
    travelTip:
      "A national public holiday. An excellent time to experience Malaysia's multicultural character. Try muruku, ladoos, and other Deepavali sweets at any Indian restaurant.",
    crowdLevel: "medium",
  },

  // ── Vietnam ───────────────────────────────────────────────────────────────
  {
    id: "vn-tet",
    country: "vietnam",
    emoji: "🎆",
    name: "Tết Nguyên Đán (Lunar New Year)",
    months: [0, 1],
    duration: "7+ days (Jan/Feb, exact date varies)",
    description:
      "Vietnam's most important holiday. The entire country shuts down — streets empty out, shops close, and millions of people travel home. Cities like Hanoi and Ho Chi Minh become ghost towns.",
    travelTip:
      "Most restaurants, shops, and tourist services close for 3–7 days around Tết. If you travel during this period, stock up beforehand and book hotels that confirm they stay open. Flights are fully booked 2 months ahead.",
    crowdLevel: "high",
    priceImpact: "Flights 2–3× higher; most services closed",
  },
  {
    id: "vn-midautumn",
    country: "vietnam",
    emoji: "🏮",
    name: "Tết Trung Thu (Mid-Autumn Festival)",
    months: [8],
    duration: "3 days (September, lunar calendar)",
    description:
      "Hoi An's Ancient Town glows entirely by lantern light on the monthly full moon night (turning off electric lights). Mooncakes are exchanged and lantern parade processions fill the streets.",
    travelTip:
      "Hoi An's lantern festival nights are extraordinary — plan your trip around the full moon. Accommodation in Hoi An sells out fast on these nights. Book 4–6 weeks ahead.",
    crowdLevel: "high",
    priceImpact: "Hoi An hotels sell out on lantern nights",
  },
  {
    id: "vn-reunification",
    country: "vietnam",
    emoji: "🇻🇳",
    name: "Reunification Day & May Day",
    months: [3, 4],
    duration: "4–5 days (Apr 30 – May 1)",
    description:
      "Vietnam's biggest secular holiday combines Reunification Day (Apr 30) and May Day (May 1). A 4-day weekend triggers massive domestic travel, especially to beach resorts.",
    travelTip:
      "Beach resorts in Da Nang, Nha Trang, and Phu Quoc fully book out. Domestic flights sell out weeks ahead. Book 6+ weeks in advance for a beach holiday.",
    crowdLevel: "high",
    priceImpact: "Beach resort hotels sold out; flights 2× higher",
  },

  // ── Indonesia ─────────────────────────────────────────────────────────────
  {
    id: "id-eid",
    country: "indonesia",
    emoji: "🌙",
    name: "Eid al-Fitr (Lebaran)",
    months: [2, 3],
    duration: "2 weeks of travel surge (dates move ~10 days earlier each year)",
    description:
      "Indonesia's biggest annual migration — 'mudik'. Tens of millions travel home to villages across the archipelago. Jakarta empties; streets are deserted. One of Asia's most dramatic travel events.",
    travelTip:
      "Book transport 3–4 weeks ahead — buses, trains, and ferries sell out. Jakarta is surprisingly pleasant during Lebaran as traffic disappears. Most tourist sites in Bali and Yogyakarta stay open.",
    crowdLevel: "high",
    priceImpact: "All inter-island transport sold out weeks ahead",
  },
  {
    id: "id-nyepi",
    country: "indonesia",
    emoji: "🤫",
    name: "Nyepi (Bali Day of Silence)",
    months: [2, 3],
    duration: "1 day (Balinese New Year, March/April)",
    description:
      "Bali's unique Day of Silence — no flights, no vehicles, no lights, no noise for 24 hours. Ngurah Rai Airport completely closes. The island goes entirely quiet for spiritual reflection.",
    travelTip:
      "Airlines cancel all Bali flights on Nyepi day — check dates before booking. The night before features spectacular Ogoh-ogoh monster parade processions. An unforgettable and unique experience.",
    crowdLevel: "medium",
  },
  {
    id: "id-bali-arts",
    country: "indonesia",
    emoji: "🎭",
    name: "Bali Arts Festival",
    months: [5, 6],
    duration: "1 month (June–July)",
    description:
      "Bali's showcase of traditional art, dance, music, and crafts held at the Bali Arts Centre in Denpasar. Daily performances of Kecak, Legong, and Barong dances with top local troupes.",
    travelTip:
      "June–July is Bali's peak dry season — perfect weather and busiest tourist month. Book accommodation at least 6–8 weeks ahead. Festival performances are free or very affordable.",
    crowdLevel: "high",
    priceImpact: "Bali hotels 40–60% higher in peak dry season",
  },

  // ── Philippines ───────────────────────────────────────────────────────────
  {
    id: "ph-sinulog",
    country: "philippines",
    emoji: "💃",
    name: "Sinulog Festival (Cebu)",
    months: [0],
    duration: "9 days (third week of January)",
    description:
      "The Philippines' most spectacular street festival. Millions of people fill Cebu City in a riot of colour, music, and dancing for the feast of the Santo Niño. The grand parade is 8+ hours of non-stop performance.",
    travelTip:
      "Book Cebu City accommodation 3–4 months ahead — the entire city fills up. Prices triple around festival weekend. Book flights to Cebu 2+ months ahead.",
    crowdLevel: "high",
    priceImpact: "Hotels 3× higher; flights sell out months ahead",
  },
  {
    id: "ph-holyweek",
    country: "philippines",
    emoji: "✝️",
    name: "Holy Week & Easter",
    months: [2, 3],
    duration: "5 days (Maundy Thursday – Easter Sunday)",
    description:
      "The Philippines' most important religious season. The country shuts down almost completely — banks close, most businesses stop, and the entire population seems to move at once.",
    travelTip:
      "All transport — air, land, and sea — sells out weeks ahead. Beach resorts in Boracay, Palawan, and Siargao fully book out. Plan and book at least 6 weeks ahead for beach travel.",
    crowdLevel: "high",
    priceImpact: "All transport and beach resorts sold out weeks ahead",
  },
  {
    id: "ph-christmas",
    country: "philippines",
    emoji: "🎄",
    name: "Christmas Season",
    months: [10, 11],
    duration: "3 months (the Philippines starts celebrating in September!)",
    description:
      "The world's longest Christmas celebration. The Philippines begins playing carols in September and peaks through December. Giant parol (star lanterns) are hung everywhere. Simbang Gabi (9-night Christmas mass) is widely attended.",
    travelTip:
      "December is peak travel season. Book flights home or onward 2–3 months ahead. Christmas Eve and Christmas Day see most businesses closed — stock up the day before. A magical time to experience Filipino warmth and culture.",
    crowdLevel: "high",
    priceImpact: "Flights 50% higher; hotels at annual peak pricing",
  },

  // ── India ─────────────────────────────────────────────────────────────────
  {
    id: "in-holi",
    country: "india",
    emoji: "🌈",
    name: "Holi (Festival of Colours)",
    months: [2],
    duration: "2 days (March, full moon day)",
    description:
      "India's most joyful festival. People drench each other in coloured powder and water in streets across North India. Mathura and Vrindavan (birthplace of Krishna) host the most electric celebrations.",
    travelTip:
      "Protect your camera and phone — the powder gets everywhere. Wear old white clothes to make colours pop. March is an excellent time to visit Delhi and Agra — perfect weather before summer heat arrives.",
    crowdLevel: "high",
    priceImpact: "Hotels 20–30% higher in Mathura/Vrindavan",
  },
  {
    id: "in-diwali",
    country: "india",
    emoji: "🪔",
    name: "Diwali (Festival of Lights)",
    months: [9, 10],
    duration: "5 days (October/November, lunar calendar)",
    description:
      "India's biggest festival. Every city transforms into lights, fireworks, and celebrations. Jaipur and Udaipur are stunning. Markets overflow with sweets, gifts, and diyas (oil lamps). The Grand Diwali Mela in Mumbai is spectacular.",
    travelTip:
      "A fantastic time to visit — the atmosphere is electric. Accommodation fills up in Rajasthan — book 4–6 weeks ahead. Air quality in Delhi deteriorates significantly due to fireworks; check AQI before visiting.",
    crowdLevel: "high",
    priceImpact: "Hotels in Rajasthan 40–60% higher",
  },
  {
    id: "in-goldenseason",
    country: "india",
    emoji: "☀️",
    name: "Golden Tourist Season",
    months: [9, 10, 11, 0, 1],
    duration: "5 months (October – February)",
    description:
      "India's peak tourist season runs October through February when weather is mild across most of the country. The Taj Mahal, Rajasthan's forts, Kerala's backwaters, and Goa's beaches are all at their best.",
    travelTip:
      "Book the Taj Mahal city hotels (Agra) and Rajasthan circuit accommodation 2–3 months ahead. December–January sees the highest demand for Goa beach resorts. Avoid Rajasthan in April–June (extreme heat).",
    crowdLevel: "high",
    priceImpact: "Hotels 30–70% higher than monsoon low season",
  },

  // ── United Kingdom ────────────────────────────────────────────────────────
  {
    id: "gb-edinburghfringe",
    country: "uk",
    emoji: "🎭",
    name: "Edinburgh Festival Fringe",
    months: [7],
    duration: "25 days (August)",
    description:
      "The world's largest arts festival. Edinburgh transforms in August with 3,000+ shows across 300 venues. Street performers fill the Royal Mile. Every type of performance imaginable, from stand-up to opera.",
    travelTip:
      "Edinburgh August accommodation sells out months ahead — book 4–6 months in advance. Prices triple vs. normal months. Glasgow (45 min away by train) is a cheaper base. Buy festival passes for best ticket access.",
    crowdLevel: "high",
    priceImpact: "Edinburgh hotels 3× higher in August",
  },
  {
    id: "gb-notting-hill",
    country: "uk",
    emoji: "🥁",
    name: "Notting Hill Carnival",
    months: [7],
    duration: "2 days (August bank holiday weekend)",
    description:
      "Europe's largest street carnival and the UK's biggest celebration of Caribbean culture. Two million people attend the West London street parade over the August bank holiday weekend.",
    travelTip:
      "London is busy but transport runs. Book accommodation well ahead for August. The main parade day (Monday) is busiest — arrive early and keep valuables secure in the crowds.",
    crowdLevel: "high",
  },
  {
    id: "gb-christmas",
    country: "uk",
    emoji: "🎄",
    name: "Christmas & New Year's Eve",
    months: [11],
    duration: "1 month (December)",
    description:
      "London's Oxford Street, Carnaby Street, and Covent Garden illuminate with elaborate Christmas lights. Winter Wonderland in Hyde Park runs throughout December. NYE fireworks over the Thames are world-famous.",
    travelTip:
      "NYE hotel prices in London increase 2–3× — book months ahead. The Thames fireworks sell balloted tickets only; apply by October. Christmas Day is quiet — most attractions close. Boxing Day sales at Harrods draw huge crowds.",
    crowdLevel: "high",
    priceImpact: "London hotels 2–3× higher around NYE",
  },
  {
    id: "gb-summer",
    country: "uk",
    emoji: "☀️",
    name: "British Summer Peak",
    months: [5, 6, 7],
    duration: "3 months (June–August)",
    description:
      "The UK's peak tourist season — Wimbledon (June/July), Royal Ascot (June), Glastonbury (June), and the summer school holidays (July–Aug) all converge. London is at its most expensive and most lively.",
    travelTip:
      "Book central London accommodation 2–3 months ahead in summer. The Lake District and Highlands become very popular — expect queues at major attractions. Museums remain free.",
    crowdLevel: "high",
    priceImpact: "UK hotels 30–50% higher than winter",
  },

  // ── Germany ───────────────────────────────────────────────────────────────
  {
    id: "de-oktoberfest",
    country: "germany",
    emoji: "🍺",
    name: "Oktoberfest (Munich)",
    months: [8, 9],
    duration: "16 days (mid-September to first Sunday in October)",
    description:
      "The world's largest beer festival. Six million visitors pack Munich's Theresienwiese each year for 1-litre steins, traditional Bavarian food, fairground rides, and oompah bands. The atmosphere is unlike anything else.",
    travelTip:
      "Munich accommodation sells out completely — book 6+ months ahead. Staying in nearby Augsburg or even Salzburg (1.5hr away) can save 50–70%. Arrive early on weekdays for the best seat in tents.",
    crowdLevel: "high",
    priceImpact: "Munich hotels 200–400% higher during Oktoberfest",
  },
  {
    id: "de-christmas",
    country: "germany",
    emoji: "🎄",
    name: "Christmas Markets (Weihnachtsmärkte)",
    months: [11],
    duration: "4 weeks (late November through December 24)",
    description:
      "Germany invented Christmas markets. Nuremberg's Christkindlesmarkt, Cologne's cathedral market, and Hamburg's Rathausmarkt are world-famous. Glühwein, lebkuchen, and handmade ornaments are the highlights.",
    travelTip:
      "Late November before school holidays offers the best experience with smaller crowds. Book Cologne and Nuremberg accommodation 2–3 months ahead. All markets close on Christmas Eve.",
    crowdLevel: "high",
    priceImpact: "Hotels 30–60% higher near major markets in December",
  },
  {
    id: "de-carnival",
    country: "germany",
    emoji: "🎭",
    name: "Karneval / Fasching",
    months: [1, 2],
    duration: "Several weeks, peak on Rosenmontag (Feb/Mar)",
    description:
      "Germany's pre-Lenten carnival. Cologne's Rosenmontag parade draws over 1 million spectators. Düsseldorf and Mainz also celebrate elaborately. Costumes are mandatory and streets party until midnight.",
    travelTip:
      "Cologne accommodation fills completely during Rosenmontag week — book 3 months ahead. The parade route along the Rhine is free. Expect significant disruption to normal services.",
    crowdLevel: "high",
    priceImpact: "Cologne hotels sold out around Rosenmontag",
  },

  // ── France ────────────────────────────────────────────────────────────────
  {
    id: "fr-summer",
    country: "france",
    emoji: "🏖️",
    name: "French Summer Holidays (Grandes Vacances)",
    months: [6, 7],
    duration: "8 weeks (July–August)",
    description:
      "The entire country goes on holiday simultaneously. The French Riviera (Nice, Cannes, Saint-Tropez), Brittany, and Paris itself see massive tourist peaks. The whole country decamps to the coast and countryside.",
    travelTip:
      "August is the most expensive month — Paris actually empties of locals while filling with tourists. Book Côte d'Azur accommodation 3–4 months ahead. July 14 (Bastille Day) sees fireworks everywhere.",
    crowdLevel: "high",
    priceImpact: "French Riviera hotels 2–3× higher in peak summer",
  },
  {
    id: "fr-christmas",
    country: "france",
    emoji: "🎄",
    name: "Christmas & New Year",
    months: [11],
    duration: "4 weeks (December)",
    description:
      "Paris's Champs-Élysées lights up with one of Europe's most celebrated Christmas illuminations. Alsace's Strasbourg and Colmar host France's most traditional Christmas markets. NYE on the Champs-Élysées draws 300,000.",
    travelTip:
      "Paris hotels around NYE book out months ahead. The Strasbourg Christmas market (open late November) is best visited on weekdays. January 1 public transport is limited.",
    crowdLevel: "high",
    priceImpact: "Paris hotels 2× higher around NYE",
  },
  {
    id: "fr-nice-carnival",
    country: "france",
    emoji: "🎭",
    name: "Nice Carnival",
    months: [1, 2],
    duration: "2 weeks (February)",
    description:
      "Europe's biggest winter carnival. Nice fills with giant floral floats and masked parades for two weeks in February. The Battle of Flowers parade is a highlight — 100,000 blooms thrown from floats.",
    travelTip:
      "Nice in February is sunny and mild compared to the rest of Europe. Hotels book up — reserve 4–6 weeks ahead. Grand parade tickets sell out — buy online early.",
    crowdLevel: "medium",
    priceImpact: "Nice hotels 20–40% higher during carnival",
  },

  // ── Italy ─────────────────────────────────────────────────────────────────
  {
    id: "it-venice-carnival",
    country: "italy",
    emoji: "🎭",
    name: "Venice Carnival (Carnevale di Venezia)",
    months: [1],
    duration: "2 weeks (February, ending on Shrove Tuesday)",
    description:
      "One of the world's most famous and photogenic festivals. Venice fills with elaborate baroque costumes and masks. St. Mark's Square hosts daily masked balls and costume contests. The canals become a theatre.",
    travelTip:
      "Venice hotels double or triple in price — book 3–4 months ahead. Day-trippers from across Italy flood in; staying in Padua (30 min by train) is a significantly cheaper alternative.",
    crowdLevel: "high",
    priceImpact: "Venice hotels 2–3× higher during Carnival",
  },
  {
    id: "it-easter",
    country: "italy",
    emoji: "✝️",
    name: "Easter & Holy Week (Settimana Santa)",
    months: [2, 3],
    duration: "1 week (March/April, dates vary)",
    description:
      "Italy shuts down for Easter. The Pope's Easter Sunday Mass in St. Peter's Square draws hundreds of thousands. Florence and Rome are at their most beautiful — and most crowded — in the spring sunshine.",
    travelTip:
      "School holidays fall after Easter — Rome and Florence accommodation fills for 2 weeks. Book 8 weeks ahead. Restaurants post limited Easter menus. Pre-book the Colosseum and Vatican to avoid 2-hour queues.",
    crowdLevel: "high",
    priceImpact: "Rome & Florence hotels 40–70% higher",
  },
  {
    id: "it-ferragosto",
    country: "italy",
    emoji: "🏖️",
    name: "Ferragosto (August Summer Peak)",
    months: [7],
    duration: "1 month (all of August)",
    description:
      "Italy's national summer holiday. The entire country takes August off. Coastal resorts—Amalfi Coast, Cinque Terre, Sicily—are absolutely packed. Many city restaurants and businesses close for 2–4 weeks.",
    travelTip:
      "August is Italy's most expensive and most crowded month. Small-town Italy can feel abandoned as everyone goes coastal. Visiting cities like Florence is actually peaceful during Ferragosto — locals leave, prices drop slightly.",
    crowdLevel: "high",
    priceImpact: "Coastal resorts at annual peak pricing",
  },

  // ── Spain ──────────────────────────────────────────────────────────────────
  {
    id: "es-semana-santa",
    country: "spain",
    emoji: "✝️",
    name: "Semana Santa (Holy Week)",
    months: [2, 3],
    duration: "1 week (March/April, dates vary)",
    description:
      "Spain's most dramatic religious event. Seville's elaborate paso processions, with thousands of penitents in robes carrying ornate floats through narrow streets, are among the world's most powerful spectacles.",
    travelTip:
      "Seville books out completely for Semana Santa — reserve 3–4 months ahead. Málaga, Granada, and Valladolid also have impressive processions. Book early for any Andalusia travel this week.",
    crowdLevel: "high",
    priceImpact: "Seville hotels 3× higher during Semana Santa",
  },
  {
    id: "es-sanfermin",
    country: "spain",
    emoji: "🐂",
    name: "San Fermín / Running of the Bulls (Pamplona)",
    months: [6],
    duration: "9 days (July 6–14)",
    description:
      "Pamplona's legendary festival. Nine straight days of non-stop partying, with the daily 8am bull run through narrow streets as the centrepiece. Everyone wears white and red. Noise, chaos, community.",
    travelTip:
      "Pamplona accommodation sells out completely — book 6 months ahead. Fans without rooms camp in the city park. The run is dangerous — watch from balconies if not participating. Nearby Logroño city is a calmer (and cheaper) base.",
    crowdLevel: "high",
    priceImpact: "Pamplona hotels sold out; city residents rent rooms for 500€+/night",
  },
  {
    id: "es-summer",
    country: "spain",
    emoji: "☀️",
    name: "Spanish Summer Peak",
    months: [6, 7],
    duration: "2 months (July–August)",
    description:
      "Spain's coastal resorts — Barcelona's beaches, Costa del Sol, Ibiza, Mallorca — are at absolute capacity from July through August. European holiday season floods the country with tourists.",
    travelTip:
      "Barcelona beaches are dangerously overcrowded in August — the city actively discourages beach tourism in peak summer. Ibiza and Mallorca require early booking (3+ months). Andalusia is extremely hot (40°C+).",
    crowdLevel: "high",
    priceImpact: "Coastal Spain hotels 50–100% higher than shoulder",
  },

  // ── Switzerland ───────────────────────────────────────────────────────────
  {
    id: "ch-ski",
    country: "switzerland",
    emoji: "⛷️",
    name: "Ski Season Peak",
    months: [11, 0, 1, 2],
    duration: "4 months (December–March)",
    description:
      "Switzerland's Alps attract skiers and winter sports enthusiasts to Zermatt, Verbier, Davos, and St. Moritz. The Christmas–New Year window and February school holidays are the most expensive periods.",
    travelTip:
      "Zermatt and Verbier are among Europe's priciest ski resorts year-round — prices surge further in peak ski weeks. Book Christmas/New Year chalets or hotels 4–6 months ahead. February half-term is the most congested.",
    crowdLevel: "high",
    priceImpact: "Swiss ski resorts at annual peak; Zermatt hotels 2–3× normal",
  },
  {
    id: "ch-summer",
    country: "switzerland",
    emoji: "🏔️",
    name: "Summer Alpine Season",
    months: [5, 6, 7],
    duration: "3 months (June–August)",
    description:
      "Switzerland's famous Alpine scenery — Jungfrau, Matterhorn, Grindelwald — is most accessible in summer. Lake Geneva, Lucerne, and Interlaken are buzzing with outdoor activities and tourists.",
    travelTip:
      "Jungfraujoch train tickets book out in summer — reserve at least 2 weeks ahead. Interlaken area hotels fill up with package tourists. Switzerland is expensive year-round; budget €200+/day for accommodation.",
    crowdLevel: "high",
    priceImpact: "Peak summer pricing throughout; Interlaken hotels 2× shoulder season",
  },
  {
    id: "ch-montreux",
    country: "switzerland",
    emoji: "🎵",
    name: "Montreux Jazz Festival",
    months: [6],
    duration: "16 days (July)",
    description:
      "One of the world's most prestigious music festivals on the shores of Lake Geneva. International headliners attract fans from around the world. Many free outdoor concerts alongside ticketed headline shows.",
    travelTip:
      "Montreux book 2–3 months ahead for festival period. Many free lake-side concerts happen daily. Geneva (1hr away) works as a base. Book shuttle trains from Geneva-Montreux in advance.",
    crowdLevel: "medium",
  },

  // ── Turkey ────────────────────────────────────────────────────────────────
  {
    id: "tr-summer",
    country: "turkey",
    emoji: "🏖️",
    name: "Coastal Peak Season",
    months: [5, 6, 7, 8],
    duration: "4 months (June–September)",
    description:
      "Turkey's Aegean and Mediterranean coasts — Bodrum, Marmaris, Antalya, Fethiye — reach peak tourist season. Istanbul also hits peak prices in summer with European tourists on holiday.",
    travelTip:
      "Book Bodrum and Fethiye accommodation 3–4 months ahead. August is the hottest and most expensive month. Cappadocia balloon flights sell out for months in advance — book as soon as dates are confirmed.",
    crowdLevel: "high",
    priceImpact: "Coastal Turkey hotels 50–100% higher in peak summer",
  },
  {
    id: "tr-ramadan",
    country: "turkey",
    emoji: "🌙",
    name: "Ramadan & Eid (Ramazan Bayramı)",
    months: [2, 3],
    duration: "1 month + 3 days (dates move ~10 days earlier each year)",
    description:
      "Ramadan transforms Turkish cities after dark. Istanbul's Sultan Ahmed mosque hosts nightly iftar food stalls and illuminated minarets. Eid (3-day public holiday) brings the country to a halt.",
    travelTip:
      "Istanbul's Grand Bazaar and restaurants may have reduced hours during Ramadan. Eid is an important family holiday — many businesses close for 3 days. A fascinating cultural time to visit Istanbul.",
    crowdLevel: "medium",
  },
  {
    id: "tr-tulip",
    country: "turkey",
    emoji: "🌷",
    name: "Istanbul Tulip Festival",
    months: [3],
    duration: "1 month (April)",
    description:
      "Istanbul plants over 30 million tulips across its parks and boulevards each April. Emirgan Park and all major tourist areas are awash with colour. Tulips originated in Turkey — this is the homecoming celebration.",
    travelTip:
      "April is Istanbul's most photogenic month. The tulip displays at Emirgan Park peak mid-April. Combined with mild spring weather, April is arguably the best time to visit Istanbul.",
    crowdLevel: "medium",
  },

  // ── Poland ────────────────────────────────────────────────────────────────
  {
    id: "pl-christmas",
    country: "poland",
    emoji: "🎄",
    name: "Christmas Markets & Season",
    months: [11],
    duration: "4 weeks (late November through December 24)",
    description:
      "Kraków's Main Square Christmas market is one of Europe's most beautiful and least commercialised. Warsaw and Wrocław also host excellent markets. Poland's Christmas traditions run deep — carp for Christmas Eve dinner, homemade pierogi.",
    travelTip:
      "Kraków's market is most beautiful in early December before crowds peak. Hotels are very affordable by Western European standards. Wrocław is increasingly popular for Christmas trips — book 6 weeks ahead.",
    crowdLevel: "high",
    priceImpact: "Hotels 20–40% higher in December vs October",
  },
  {
    id: "pl-summer",
    country: "poland",
    emoji: "☀️",
    name: "Polish Summer Peak",
    months: [6, 7],
    duration: "2 months (July–August)",
    description:
      "Poland's best summer weather brings domestic and European tourists to the Baltic coast (Gdańsk, Sopot), lakes region (Masuria), and mountain resorts (Zakopane). Kraków and Warsaw bustle with summer tourism.",
    travelTip:
      "Poland offers outstanding value compared to Western Europe. Book Sopot and Gdańsk Baltic coast accommodation 6–8 weeks ahead. Mountain resort Zakopane in the Tatras is a weekend favourite.",
    crowdLevel: "medium",
  },

  // ── USA ───────────────────────────────────────────────────────────────────
  {
    id: "us-thanksgiving",
    country: "usa",
    emoji: "🦃",
    name: "Thanksgiving & Black Friday",
    months: [10],
    duration: "5 days (4th Thursday in November)",
    description:
      "America's biggest family holiday. Airports record their highest passenger volumes of the year over the Thanksgiving travel window. Macy's Thanksgiving Day Parade in NYC draws 3+ million spectators.",
    travelTip:
      "Book domestic US flights 2–3 months ahead — routes fill and prices soar. Car rental agencies run out of vehicles. Most tourist attractions stay open. NYC Parade hotels sell out completely.",
    crowdLevel: "high",
    priceImpact: "US domestic flights 50–100% higher; NYC hotels at peak",
  },
  {
    id: "us-july4",
    country: "usa",
    emoji: "🎆",
    name: "Independence Day (July 4th)",
    months: [6],
    duration: "Long weekend",
    description:
      "America's National Day. NYC's spectacular Macy's fireworks over the Hudson, Washington DC's National Mall fireworks, and Boston's Pops concert on the Esplanade are the classic celebrations.",
    travelTip:
      "NYC and DC hotels book out for July 4th — reserve 2 months ahead. Boston's Esplanade fills with 500,000+ people; arrive early. Nationwide fireworks make July 4th the best night to be anywhere in the USA.",
    crowdLevel: "high",
    priceImpact: "Major city hotels 30–50% higher over July 4th weekend",
  },
  {
    id: "us-christmas",
    country: "usa",
    emoji: "🎄",
    name: "Christmas & New Year's Eve",
    months: [11],
    duration: "2 weeks (Dec 23 – Jan 1)",
    description:
      "NYC's Rockefeller Centre Christmas tree and ball drop in Times Square are globally iconic. Chicago's Millennium Park, San Francisco's Union Square, and New Orleans' French Quarter all celebrate elaborately.",
    travelTip:
      "Times Square NYE is free but requires 12+ hours of standing — dress in extreme layers. NYC hotel minimum stays rise to 3–5 nights over NYE. Las Vegas NYE is popular but very expensive.",
    crowdLevel: "high",
    priceImpact: "NYC & Las Vegas hotels 2–4× normal around NYE",
  },
  {
    id: "us-springbreak",
    country: "usa",
    emoji: "🏄",
    name: "Spring Break",
    months: [2, 3],
    duration: "2–4 weeks (March–April, varies by state)",
    description:
      "US college and school spring breaks flood beach destinations nationwide. Miami Beach, Cancún (nearby), PCB Florida, and Myrtle Beach fill with students. Orlando's theme parks hit peak attendance.",
    travelTip:
      "Miami and Florida beaches are extremely crowded in March. Book theme park tickets (Disney, Universal) 4–6 weeks ahead. Hotel prices peak during spring break weeks.",
    crowdLevel: "high",
    priceImpact: "Florida beach resorts 50–80% higher during spring break",
  },

  // ── Canada ────────────────────────────────────────────────────────────────
  {
    id: "ca-summer",
    country: "canada",
    emoji: "🏞️",
    name: "Canadian Summer Peak",
    months: [5, 6, 7],
    duration: "3 months (June–August)",
    description:
      "Canada's short but glorious summer — Banff and Jasper national parks, Vancouver's Stanley Park, PEI's beaches, and Quebec City's festivals (including the Just for Laughs comedy fest). July 1 Canada Day features free celebrations nationwide.",
    travelTip:
      "Banff and Jasper lodge accommodation books out months ahead — reserve 4–6 months ahead for August. Banff is one of Canada's most expensive destinations. Quebec City's summer festival (July) is fantastically atmospheric.",
    crowdLevel: "high",
    priceImpact: "Banff & Jasper hotels at annual peak; 2–3× shoulder pricing",
  },
  {
    id: "ca-christmas",
    country: "canada",
    emoji: "🎄",
    name: "Christmas & NYE",
    months: [11],
    duration: "2 weeks (Dec 23 – Jan 2)",
    description:
      "Quebec City's Winter Carnival preview leads into Christmas. Whistler's ski season is at peak. Toronto and Montreal shopping centres draw holiday shoppers. Niagara Falls illuminates with Festival of Lights.",
    travelTip:
      "Whistler ski accommodation books out for New Year's Eve — reserve 3+ months ahead. Quebec City's Château Frontenac is stunning under snow — book well ahead for holiday period.",
    crowdLevel: "high",
    priceImpact: "Whistler hotels at annual peak pricing",
  },

  // ── Mexico ────────────────────────────────────────────────────────────────
  {
    id: "mx-dayofthedead",
    country: "mexico",
    emoji: "💀",
    name: "Día de los Muertos (Day of the Dead)",
    months: [10],
    duration: "3 days (Oct 31 – Nov 2)",
    description:
      "One of the world's most extraordinary cultural celebrations. Oaxaca, Mexico City's Mixquic neighbourhood, and Pátzcuaro in Michoacán host the most atmospheric altars, marigold carpets, and candlelit cemetery vigils.",
    travelTip:
      "Oaxaca books out completely — reserve 3–4 months ahead. A deeply respectful occasion: dress appropriately and observe rather than intrude. The Mexico City parade (CDMX) now draws massive crowds.",
    crowdLevel: "high",
    priceImpact: "Oaxaca hotels 2–3× higher; sold out months ahead",
  },
  {
    id: "mx-christmas",
    country: "mexico",
    emoji: "🎄",
    name: "Christmas & New Year",
    months: [11],
    duration: "2 weeks (Dec 23 – Jan 1)",
    description:
      "Mexico's posada processions, piñatas, and midnight mass on Christmas Eve are quintessential. Cancún and Los Cabos beach resorts fill with international holidaymakers for Christmas and NYE.",
    travelTip:
      "Cancún and Los Cabos need 3–4 months' advance booking for December. NYE beachfront hotels are extremely expensive. A perfect time for cultural tourism inland in Oaxaca or Mérida.",
    crowdLevel: "high",
    priceImpact: "Mexican beach resorts at annual peak pricing",
  },
  {
    id: "mx-easter",
    country: "mexico",
    emoji: "✝️",
    name: "Semana Santa (Holy Week / Easter)",
    months: [2, 3],
    duration: "1 week (March/April)",
    description:
      "Mexico's biggest domestic travel holiday. Beaches from Cancún to Puerto Vallarta fill with Mexican families escaping the interior. Taxco's elaborate processions are among Latin America's most dramatic.",
    travelTip:
      "Mexican beach resorts are at their most expensive and crowded during Semana Santa. Book 6+ weeks ahead. Traveling inland (Oaxaca, San Cristóbal, Mérida) during this week offers cultural festivals with fewer foreign tourists.",
    crowdLevel: "high",
    priceImpact: "Beach resorts 50–80% higher during Semana Santa",
  },

  // ── Australia ──────────────────────────────────────────────────────────────
  {
    id: "au-nye",
    country: "australia",
    emoji: "🎆",
    name: "New Year's Eve (Sydney Harbour)",
    months: [11],
    duration: "1 night (December 31)",
    description:
      "Sydney Harbour's NYE fireworks are among the world's most spectacular celebrations — and December is Australian summer. The Opera House and Harbour Bridge form the backdrop to midnight fireworks seen by 1+ billion people on TV.",
    travelTip:
      "Sydney harbour-view accommodation sells out 6+ months ahead for NYE. Free vantage points fill by midday — stake your spot by 2pm. Opera House area restaurants require NYE packages at premium prices.",
    crowdLevel: "high",
    priceImpact: "Sydney harbour hotels sold out months ahead; 3–5× normal pricing",
  },
  {
    id: "au-summer",
    country: "australia",
    emoji: "🏄",
    name: "Australian Summer Peak",
    months: [11, 0, 1],
    duration: "3 months (December–February)",
    description:
      "Australian summer is peak tourist season. Great Barrier Reef in Queensland, Byron Bay surf beaches, the Whitsundays, and Uluru all hit maximum visitor numbers. School holidays in December–January drive domestic demand.",
    travelTip:
      "Reef tours and Whitsunday sailing trips book out over summer — reserve 4–6 weeks ahead. Queensland (Dec–Feb) can have severe cyclone season; check travel advisories. Melbourne hosts the Australian Open tennis in January.",
    crowdLevel: "high",
    priceImpact: "Australian resort Hotels 30–60% higher in summer peak",
  },
  {
    id: "au-easter",
    country: "australia",
    emoji: "🐣",
    name: "Easter Long Weekend",
    months: [2, 3],
    duration: "4 days (Good Friday – Easter Monday, March/April)",
    description:
      "Australia's biggest domestic travel weekend — coastal towns, Great Ocean Road, and Snowy Mountains ski resorts all fill up. Easter Show in Sydney is a massive family event.",
    travelTip:
      "Book the Great Ocean Road accommodation (Lorne, Aireys Inlet) 6–8 weeks ahead — it sells out completely. Melbourne city hotels are surprisingly affordable over Easter as locals leave the city.",
    crowdLevel: "high",
    priceImpact: "Coastal resorts fully booked; prices 40–60% higher",
  },

  // ── New Zealand ────────────────────────────────────────────────────────────
  {
    id: "nz-summer",
    country: "new-zealand",
    emoji: "🏔️",
    name: "New Zealand Summer Peak",
    months: [11, 0, 1],
    duration: "3 months (December–February)",
    description:
      "New Zealand summer — Queenstown adventure activities, Milford Sound cruises, and the Bay of Islands — hit peak season. Auckland celebrates NYE with Sky Tower fireworks. Summer is perfect for both adventure and beaches.",
    travelTip:
      "Milford Sound cruises and Queenstown bungee/skydive operators book out 2–3 weeks ahead in January. Accommodation across NZ is 30–50% more expensive than winter. Fiordland can experience intense summer rain.",
    crowdLevel: "high",
    priceImpact: "NZ accommodation 30–50% higher than winter",
  },
  {
    id: "nz-easter",
    country: "new-zealand",
    emoji: "🐣",
    name: "Easter Long Weekend",
    months: [2, 3],
    duration: "4 days (Good Friday – Easter Monday)",
    description:
      "New Zealand's busiest domestic long weekend. Coromandel Peninsula, Bay of Plenty, and Marlborough wine region fill with Aucklanders and Wellingtonians heading out of the cities.",
    travelTip:
      "State Highway 1 north of Auckland is notorious for Easter traffic. Book Coromandel accommodation 6–8 weeks ahead. Queenstown in autumn (March/April) has spectacular foliage — book early for this increasingly popular season.",
    crowdLevel: "high",
    priceImpact: "Popular domestic destinations sold out weeks ahead",
  },

  // ── UAE ───────────────────────────────────────────────────────────────────
  {
    id: "ae-dsf",
    country: "uae",
    emoji: "🛍️",
    name: "Dubai Shopping Festival (DSF)",
    months: [0, 1],
    duration: "1 month (January–February)",
    description:
      "Dubai goes all-in on retail: massive discounts at malls, nightly fireworks, raffles for cars and gold, and entertainment across the city. Draws 5+ million visitors from across South Asia and the Arab world.",
    travelTip:
      "DSF month sees Dubai hotels at their most competitive (paradoxically) — good deals available if you book 4–6 weeks ahead. January–February is Dubai's ideal weather window: 24–28°C with low humidity.",
    crowdLevel: "high",
    priceImpact: "Hotels full but competitive — book early for best rates",
  },
  {
    id: "ae-winter",
    country: "uae",
    emoji: "☀️",
    name: "Peak Tourist Season",
    months: [10, 11, 0, 1, 2],
    duration: "5 months (November–March)",
    description:
      "Dubai and Abu Dhabi's main tourist season — ideal weather (22–30°C) with no humidity. Formula 1 Abu Dhabi Grand Prix (November), New Year's Eve at Burj Khalifa, and beach season all peak in this window.",
    travelTip:
      "F1 Abu Dhabi Grand Prix weekend sees UAE hotel prices spike 200–300% — book 6+ months ahead. Burj Khalifa NYE viewing area requires day-time reservations. November–February is the undisputed best time to visit.",
    crowdLevel: "high",
    priceImpact: "UAE hotels 40–70% higher vs summer; F1 weekend 3× normal",
  },
  {
    id: "ae-summer",
    country: "uae",
    emoji: "🥵",
    name: "Summer (Extreme Heat Warning)",
    months: [5, 6, 7, 8],
    duration: "4 months (June–September)",
    description:
      "Dubai and Abu Dhabi summer: 40–48°C with extreme humidity. Outdoor activity is impossible during daylight. Most activities are indoor-only (malls, ski Dubai, indoor adventure parks). Tourist numbers drop dramatically.",
    travelTip:
      "Summer is the cheapest time to visit the UAE — hotels cut prices 50–60%. Dubai's malls offer legitimate deals. Budget for constant taxi/Uber as walking outdoors in daytime is dangerous. Indoor attractions remain fully operational.",
    crowdLevel: "low",
    priceImpact: "Hotels 40–60% cheaper — best value window; heat risk outdoors",
  },

  // ── Saudi Arabia ──────────────────────────────────────────────────────────
  {
    id: "sa-hajj",
    country: "saudi-arabia",
    emoji: "🕌",
    name: "Hajj Season",
    months: [4, 5],
    duration: "5 days (Islamic calendar, dates move ~10 days earlier each year)",
    description:
      "The world's largest annual pilgrimage to Mecca — 2+ million pilgrims from around the globe. Access to Mecca and Medina is restricted to Muslims. Jeddah, Riyadh, and Dhahran are affected by massive domestic travel.",
    travelTip:
      "Non-Muslims cannot travel to Mecca during Hajj and should factor this into itineraries. SA domestic transport is very congested during Hajj. Hotels near Jeddah airport (closest to Mecca) sell out completely.",
    crowdLevel: "high",
    priceImpact: "Jeddah hotels fully booked; all SAR transport at peak",
  },
  {
    id: "sa-ramadan",
    country: "saudi-arabia",
    emoji: "🌙",
    name: "Ramadan",
    months: [2, 3],
    duration: "1 month (dates move ~10 days earlier each year)",
    description:
      "Saudi Arabia's most important month. Working hours shorten, many restaurants are closed during daylight, and entertainment is limited. After sunset, cities come alive with iftar gatherings, illuminated streets, and late-night socialising.",
    travelTip:
      "Eating, drinking, or smoking in public during daylight during Ramadan is illegal for everyone (not just Muslims). Evenings are vibrant and welcoming. Riyadh's Boulevard and Jeddah's waterfront are atmospheric after iftar.",
    crowdLevel: "medium",
  },
  {
    id: "sa-national",
    country: "saudi-arabia",
    emoji: "🇸🇦",
    name: "Saudi National Day",
    months: [8],
    duration: "2 days (September 23)",
    description:
      "Saudi Arabia's national day celebration features spectacular fireworks, concerts (including major international artists), and free public events across Riyadh, Jeddah, and Dammam. Green colour floods the country.",
    travelTip:
      "A festive and accessible time to visit Saudi Arabia. Hotels fill with Saudi domestic travellers — book 3–4 weeks ahead. Riyadh's Boulevard entertainment district hosts major performances.",
    crowdLevel: "medium",
  },
];

export function getFestivalsForCountry(country: FestivalCountry): Festival[] {
  return FESTIVALS.filter((f) => f.country === country);
}

export function getFestivalsForMonth(
  month: number,
  country?: FestivalCountry
): Festival[] {
  return FESTIVALS.filter(
    (f) => f.months.includes(month) && (!country || f.country === country)
  );
}

/** Returns months (0-indexed) with no high-crowd festivals for a country — good value months */
export function getBudgetMonths(country: FestivalCountry): number[] {
  const highCrowdMonths = new Set(
    FESTIVALS.filter((f) => f.country === country && f.crowdLevel === "high")
      .flatMap((f) => f.months)
  );
  return Array.from({ length: 12 }, (_, i) => i).filter(
    (m) => !highCrowdMonths.has(m)
  );
}

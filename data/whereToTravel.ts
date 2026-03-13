export type WeatherType = "cool" | "mild" | "warm";

export interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  /** Average temperature (°C) per month — index 0 = January, 11 = December */
  avgTempByMonth: number[];
  flightPriceEstimate: string;
  /** Best month indices (0-based) to visit */
  bestMonths: number[];
  tags: string[];
  currency: string;
  countryCode: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "japan",
    name: "Japan",
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    description:
      "Cherry blossoms, ancient temples, and world-class food. Tokyo blends ultramodern with timeless culture.",
    avgTempByMonth: [4, 5, 9, 15, 19, 23, 27, 29, 25, 19, 13, 7],
    flightPriceEstimate: "$600–$1,200",
    bestMonths: [2, 3, 9, 10],
    tags: ["culture", "food", "temples"],
    currency: "JPY",
    countryCode: "JP",
  },
  {
    id: "south-korea",
    name: "South Korea",
    city: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    description:
      "K-pop culture, ancient palaces, vibrant street food markets, and cutting-edge city vibes.",
    avgTempByMonth: [0, 2, 7, 14, 19, 23, 27, 28, 23, 17, 10, 3],
    flightPriceEstimate: "$500–$1,000",
    bestMonths: [3, 4, 8, 9],
    tags: ["culture", "food", "shopping"],
    currency: "KRW",
    countryCode: "KR",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    city: "Zurich / Alps",
    country: "Switzerland",
    flag: "🇨🇭",
    description:
      "Stunning Alpine scenery, world-class skiing in winter, and breathtaking scenic train journeys.",
    avgTempByMonth: [0, 1, 5, 10, 14, 18, 21, 20, 16, 11, 5, 1],
    flightPriceEstimate: "$700–$1,400",
    bestMonths: [5, 6, 7, 11],
    tags: ["mountains", "skiing", "nature"],
    currency: "CHF",
    countryCode: "CH",
  },
  {
    id: "norway",
    name: "Norway",
    city: "Oslo / Tromsø",
    country: "Norway",
    flag: "🇳🇴",
    description:
      "Witness the Northern Lights in winter or the midnight sun in summer among epic Nordic fjords.",
    avgTempByMonth: [-4, -4, -1, 5, 11, 16, 19, 18, 13, 7, 2, -2],
    flightPriceEstimate: "$600–$1,300",
    bestMonths: [5, 6, 7, 11],
    tags: ["fjords", "northern lights", "hiking"],
    currency: "NOK",
    countryCode: "NO",
  },
  {
    id: "thailand",
    name: "Thailand",
    city: "Bangkok / Chiang Mai",
    country: "Thailand",
    flag: "🇹🇭",
    description:
      "Tropical beaches, ornate temples, sizzling street food, and affordable luxury await in the Land of Smiles.",
    avgTempByMonth: [26, 28, 30, 32, 32, 31, 30, 30, 29, 28, 27, 26],
    flightPriceEstimate: "$400–$900",
    bestMonths: [10, 11, 0, 1],
    tags: ["beach", "temples", "food"],
    currency: "THB",
    countryCode: "TH",
  },
  {
    id: "bali",
    name: "Bali",
    city: "Ubud / Seminyak",
    country: "Indonesia",
    flag: "🇮🇩",
    description:
      "Lush rice terraces, surf beaches, Hindu temples, and a thriving wellness scene on the Island of the Gods.",
    avgTempByMonth: [27, 27, 27, 28, 28, 27, 27, 27, 27, 28, 28, 27],
    flightPriceEstimate: "$500–$1,000",
    bestMonths: [6, 7, 8],
    tags: ["beach", "surfing", "spiritual"],
    currency: "IDR",
    countryCode: "ID",
  },
  {
    id: "mexico",
    name: "Mexico",
    city: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    description:
      "Rich Aztec history, world-famous cuisine, colorful neighborhoods, and one of the world's great capital cities.",
    avgTempByMonth: [14, 16, 19, 21, 22, 20, 18, 19, 18, 17, 16, 14],
    flightPriceEstimate: "$250–$600",
    bestMonths: [2, 3, 4, 10, 11],
    tags: ["history", "food", "culture"],
    currency: "MXN",
    countryCode: "MX",
  },
  {
    id: "greece",
    name: "Greece",
    city: "Athens / Santorini",
    country: "Greece",
    flag: "🇬🇷",
    description:
      "Ancient ruins, whitewashed villages, crystal-clear Aegean waters, and magnificent Mediterranean cuisine.",
    avgTempByMonth: [10, 11, 13, 17, 22, 27, 32, 32, 28, 23, 16, 12],
    flightPriceEstimate: "$500–$1,100",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "beach", "islands"],
    currency: "EUR",
    countryCode: "GR",
  },
  {
    id: "italy",
    name: "Italy",
    city: "Rome / Florence",
    country: "Italy",
    flag: "🇮🇹",
    description:
      "Timeless art, iconic cuisine, romantic cities, and ancient history waiting around every corner.",
    avgTempByMonth: [8, 9, 12, 16, 21, 26, 30, 30, 26, 20, 14, 9],
    flightPriceEstimate: "$500–$1,000",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "food", "art"],
    currency: "EUR",
    countryCode: "IT",
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    city: "Hong Kong",
    country: "Hong Kong",
    flag: "🇭🇰",
    description:
      "A dazzling skyline, world-class dim sum, night markets, and a unique blend of East-meets-West energy unlike anywhere else.",
    avgTempByMonth: [17, 17, 19, 23, 27, 29, 31, 31, 29, 26, 22, 19],
    flightPriceEstimate: "$450–$1,000",
    bestMonths: [9, 10, 11, 0],
    tags: ["food", "shopping", "city"],
    currency: "HKD",
    countryCode: "HK",
  },
  {
    id: "taiwan",
    name: "Taiwan",
    city: "Taipei",
    country: "Taiwan",
    flag: "🇹🇼",
    description:
      "Night markets overflowing with street food, dramatic mountain scenery, hot springs, and a famously welcoming culture.",
    avgTempByMonth: [16, 16, 18, 22, 26, 29, 31, 31, 28, 25, 22, 18],
    flightPriceEstimate: "$400–$900",
    bestMonths: [9, 10, 11, 2],
    tags: ["food", "nature", "culture"],
    currency: "TWD",
    countryCode: "TW",
  },
  {
    id: "china",
    name: "China",
    city: "Beijing / Shanghai",
    country: "China",
    flag: "🇨🇳",
    description:
      "The Great Wall, the Forbidden City, futuristic Shanghai, and ancient traditions spanning thousands of years — all in one vast country.",
    avgTempByMonth: [-3, 0, 7, 15, 21, 26, 29, 28, 22, 15, 7, 0],
    flightPriceEstimate: "$500–$1,100",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "culture", "food"],
    currency: "CNY",
    countryCode: "CN",
  },

  // ── Southeast Asia ────────────────────────────────────────────────────────
  {
    id: "singapore",
    name: "Singapore",
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    description:
      "A gleaming city-state of futuristic architecture, world-class hawker food, lush gardens, and impeccable infrastructure.",
    avgTempByMonth: [27, 27, 28, 28, 29, 29, 28, 28, 28, 28, 27, 27],
    flightPriceEstimate: "$400–$900",
    bestMonths: [1, 2, 6, 7],
    tags: ["food", "city", "shopping"],
    currency: "SGD",
    countryCode: "SG",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    city: "Hanoi / Ho Chi Minh City",
    country: "Vietnam",
    flag: "🇻🇳",
    description:
      "Glowing lantern towns, emerald Halong Bay limestone karsts, French-influenced cuisine, and one of Asia's most scenic train routes.",
    avgTempByMonth: [17, 18, 21, 25, 28, 29, 29, 29, 28, 25, 22, 19],
    flightPriceEstimate: "$350–$850",
    bestMonths: [1, 2, 10, 11],
    tags: ["nature", "food", "culture"],
    currency: "VND",
    countryCode: "VN",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    city: "Kuala Lumpur / Penang",
    country: "Malaysia",
    flag: "🇲🇾",
    description:
      "Petronas Towers, multicultural street food, pristine rainforests, and colonial Penang's UNESCO heritage quarter.",
    avgTempByMonth: [27, 28, 28, 29, 29, 28, 28, 28, 28, 28, 27, 27],
    flightPriceEstimate: "$350–$800",
    bestMonths: [5, 6, 7, 1, 2],
    tags: ["food", "nature", "culture"],
    currency: "MYR",
    countryCode: "MY",
  },
  {
    id: "philippines",
    name: "Philippines",
    city: "Manila / Palawan",
    country: "Philippines",
    flag: "🇵🇭",
    description:
      "Over 7,000 islands of powder-white beaches, turquoise lagoons, vibrant coral reefs, and warm Filipino hospitality.",
    avgTempByMonth: [26, 27, 28, 29, 30, 29, 28, 28, 28, 28, 27, 26],
    flightPriceEstimate: "$400–$900",
    bestMonths: [11, 0, 1, 2],
    tags: ["beach", "diving", "islands"],
    currency: "PHP",
    countryCode: "PH",
  },
  {
    id: "india",
    name: "India",
    city: "Delhi / Rajasthan",
    country: "India",
    flag: "🇮🇳",
    description:
      "The Taj Mahal, Rajasthan's golden forts, Holi's riot of colour, Kerala's backwaters, and an overwhelming, unforgettable sensory experience.",
    avgTempByMonth: [15, 17, 22, 29, 34, 34, 31, 29, 29, 26, 20, 16],
    flightPriceEstimate: "$450–$1,000",
    bestMonths: [9, 10, 11, 0, 1],
    tags: ["history", "culture", "temples"],
    currency: "INR",
    countryCode: "IN",
  },

  // ── Middle East ───────────────────────────────────────────────────────────
  {
    id: "uae",
    name: "UAE (Dubai)",
    city: "Dubai / Abu Dhabi",
    country: "UAE",
    flag: "🇦🇪",
    description:
      "Record-breaking skyscrapers, desert safaris, luxury shopping, and a Formula 1 race under the night sky.",
    avgTempByMonth: [19, 20, 23, 27, 32, 34, 36, 37, 34, 30, 25, 21],
    flightPriceEstimate: "$400–$900",
    bestMonths: [10, 11, 0, 1, 2],
    tags: ["luxury", "shopping", "desert"],
    currency: "AED",
    countryCode: "AE",
  },
  {
    id: "turkey",
    name: "Turkey",
    city: "Istanbul / Cappadocia",
    country: "Turkey",
    flag: "🇹🇷",
    description:
      "Hot air balloons over Cappadocia's fairy chimneys, the magnificent Hagia Sophia, Turkish baths, and some of the world's finest cuisine.",
    avgTempByMonth: [6, 7, 9, 14, 19, 24, 27, 27, 23, 18, 12, 8],
    flightPriceEstimate: "$350–$800",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "culture", "food"],
    currency: "TRY",
    countryCode: "TR",
  },

  // ── Europe ────────────────────────────────────────────────────────────────
  {
    id: "france",
    name: "France",
    city: "Paris / Provence",
    country: "France",
    flag: "🇫🇷",
    description:
      "The Eiffel Tower, world-class museums, lavender fields, Michelin-starred dining, and the most-visited country on Earth for a reason.",
    avgTempByMonth: [5, 6, 9, 13, 17, 21, 23, 23, 19, 15, 9, 6],
    flightPriceEstimate: "$450–$1,000",
    bestMonths: [3, 4, 5, 8, 9],
    tags: ["art", "food", "romance"],
    currency: "EUR",
    countryCode: "FR",
  },
  {
    id: "spain",
    name: "Spain",
    city: "Barcelona / Madrid",
    country: "Spain",
    flag: "🇪🇸",
    description:
      "Gaudí's surreal architecture, flamenco, world-famous tapas, La Tomatina, and long sun-drenched evenings on the Mediterranean.",
    avgTempByMonth: [10, 11, 14, 17, 21, 26, 29, 29, 26, 21, 14, 11],
    flightPriceEstimate: "$400–$950",
    bestMonths: [3, 4, 5, 8, 9],
    tags: ["art", "food", "beach"],
    currency: "EUR",
    countryCode: "ES",
  },
  {
    id: "germany",
    name: "Germany",
    city: "Berlin / Munich / Rhine",
    country: "Germany",
    flag: "🇩🇪",
    description:
      "Oktoberfest's legendary beer halls, magical Christmas markets, Berlin's cutting-edge art scene, and fairy-tale Bavarian castles.",
    avgTempByMonth: [1, 2, 6, 11, 16, 19, 22, 22, 18, 12, 6, 2],
    flightPriceEstimate: "$400–$900",
    bestMonths: [4, 5, 8, 11],
    tags: ["culture", "food", "history"],
    currency: "EUR",
    countryCode: "DE",
  },
  {
    id: "uk",
    name: "United Kingdom",
    city: "London / Edinburgh",
    country: "United Kingdom",
    flag: "🇬🇧",
    description:
      "Buckingham Palace, the Scottish Highlands, the world's best museums (free!), and the Edinburgh Fringe — the world's largest arts festival.",
    avgTempByMonth: [5, 6, 8, 11, 14, 18, 20, 20, 17, 13, 9, 6],
    flightPriceEstimate: "$350–$900",
    bestMonths: [4, 5, 6, 7],
    tags: ["culture", "history", "art"],
    currency: "GBP",
    countryCode: "GB",
  },
  {
    id: "poland",
    name: "Poland",
    city: "Kraków / Warsaw",
    country: "Poland",
    flag: "🇵🇱",
    description:
      "Europe's best-preserved medieval city centre, Europe's most beautiful Christmas market, and outstanding food at a fraction of Western prices.",
    avgTempByMonth: [0, 1, 5, 11, 17, 20, 22, 22, 18, 12, 6, 2],
    flightPriceEstimate: "$350–$800",
    bestMonths: [4, 5, 6, 11],
    tags: ["history", "food", "budget"],
    currency: "PLN",
    countryCode: "PL",
  },

  // ── Americas ──────────────────────────────────────────────────────────────
  {
    id: "usa",
    name: "United States",
    city: "New York / LA / National Parks",
    country: "United States",
    flag: "🇺🇸",
    description:
      "New York City's skyline, Yosemite's granite peaks, Route 66, the Grand Canyon, and an unmatched diversity of experiences across 50 states.",
    avgTempByMonth: [3, 4, 9, 15, 21, 26, 29, 28, 24, 18, 12, 5],
    flightPriceEstimate: "$300–$800",
    bestMonths: [3, 4, 5, 8, 9],
    tags: ["city", "nature", "road trip"],
    currency: "USD",
    countryCode: "US",
  },
  {
    id: "canada",
    name: "Canada",
    city: "Vancouver / Banff / Quebec",
    country: "Canada",
    flag: "🇨🇦",
    description:
      "Banff's turquoise glacial lakes, Niagara Falls, Quebec City's old-world charm, and some of the world's most breathtaking wilderness.",
    avgTempByMonth: [-5, -3, 2, 9, 15, 19, 22, 22, 17, 10, 4, -2],
    flightPriceEstimate: "$350–$850",
    bestMonths: [6, 7, 8],
    tags: ["nature", "mountains", "wildlife"],
    currency: "CAD",
    countryCode: "CA",
  },

  // ── Oceania ───────────────────────────────────────────────────────────────
  {
    id: "australia",
    name: "Australia",
    city: "Sydney / Great Barrier Reef",
    country: "Australia",
    flag: "🇦🇺",
    description:
      "Sydney Harbour's iconic Opera House, the Great Barrier Reef, Uluru at sunset, and unique wildlife found nowhere else on earth.",
    avgTempByMonth: [26, 26, 24, 22, 18, 16, 15, 16, 18, 21, 23, 25],
    flightPriceEstimate: "$700–$1,500",
    bestMonths: [2, 3, 8, 9, 10],
    tags: ["nature", "beach", "wildlife"],
    currency: "AUD",
    countryCode: "AU",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    city: "Queenstown / Fiordland",
    country: "New Zealand",
    flag: "🇳🇿",
    description:
      "Milford Sound's dramatic fjords, Hobbiton's rolling green hills, Queenstown's extreme adventures, and Māori cultural experiences.",
    avgTempByMonth: [18, 18, 16, 13, 10, 8, 7, 8, 10, 13, 15, 17],
    flightPriceEstimate: "$800–$1,600",
    bestMonths: [11, 0, 1, 2],
    tags: ["nature", "adventure", "hiking"],
    currency: "NZD",
    countryCode: "NZ",
  },
];

export function getWeatherType(temp: number): WeatherType {
  if (temp < 15) return "cool";
  if (temp < 25) return "mild";
  return "warm";
}

export function getDestinationsForMonth(
  monthIndex: number,
  weather: WeatherType
): Destination[] {
  return DESTINATIONS.filter(
    (d) => getWeatherType(d.avgTempByMonth[monthIndex]) === weather
  );
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const WEATHER_CONFIG: Record<
  WeatherType,
  { label: string; icon: string; rangeLabel: string; description: string; color: string }
> = {
  cool: {
    label: "Cool",
    icon: "❄️",
    rangeLabel: "Under 15°C / 59°F",
    description: "Crisp air, fewer crowds, ideal for city exploring",
    color: "blue",
  },
  mild: {
    label: "Mild",
    icon: "🌤️",
    rangeLabel: "15–24°C / 59–75°F",
    description: "Perfect sightseeing weather — not too hot, not too cold",
    color: "green",
  },
  warm: {
    label: "Warm / Hot",
    icon: "☀️",
    rangeLabel: "25°C+ / 77°F+",
    description: "Beach weather, tropical vibes, and long sunny days",
    color: "orange",
  },
};

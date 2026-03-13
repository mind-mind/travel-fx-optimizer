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

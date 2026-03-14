export interface TravelApp {
  country: string;
  category: "transport" | "translation" | "maps" | "food" | "payment";
  name: string;
  description: string;
  iosLink?: string;
  androidLink?: string;
}

export const TRAVEL_APPS: TravelApp[] = [
  {
    country: "japan",
    category: "transport",
    name: "Japan Travel by NAVITIME",
    description: "Train routes, JR pass planning, and travel guides.",
  },
  {
    country: "japan",
    category: "translation",
    name: "Google Translate",
    description: "Camera translation and speech translation for menus and signs.",
  },
  {
    country: "japan",
    category: "maps",
    name: "Google Maps",
    description: "Reliable transit directions with station exits and transfer timings.",
  },
  {
    country: "japan",
    category: "payment",
    name: "Wise",
    description: "Track exchange rates and spend from a multi-currency balance.",
  },
  {
    country: "thailand",
    category: "transport",
    name: "Grab",
    description: "Ride-hailing for Bangkok and major tourist cities.",
  },
  {
    country: "thailand",
    category: "maps",
    name: "Google Maps",
    description: "Best for BTS/MRT navigation and walking route estimates.",
  },
  {
    country: "thailand",
    category: "food",
    name: "Wongnai",
    description: "Restaurant discovery with local reviews and neighborhood picks.",
  },
  {
    country: "france",
    category: "transport",
    name: "Citymapper",
    description: "Public transit planning for Paris with disruption alerts.",
  },
  {
    country: "france",
    category: "translation",
    name: "DeepL",
    description: "Natural French translation for quick travel communication.",
  },
  {
    country: "france",
    category: "food",
    name: "TheFork",
    description: "Restaurant booking with discounts in major cities.",
  },
  {
    country: "korea",
    category: "maps",
    name: "Naver Map",
    description: "More accurate local navigation than global maps in Korea.",
  },
  {
    country: "korea",
    category: "translation",
    name: "Papago",
    description: "Strong Korean translation with image and voice support.",
  },
  {
    country: "singapore",
    category: "transport",
    name: "MyTransport.SG",
    description: "Real-time public transport arrival times and route updates.",
  },
  {
    country: "singapore",
    category: "food",
    name: "Chope",
    description: "Restaurant reservations and dining deals.",
  },
  {
    country: "china",
    category: "transport",
    name: "DiDi",
    description: "Ride-hailing app widely used in major Chinese cities.",
  },
  {
    country: "china",
    category: "payment",
    name: "Alipay",
    description: "Main mobile wallet for daily payments and transit in China.",
  },
  {
    country: "china",
    category: "maps",
    name: "Baidu Maps",
    description: "Local map detail and public transit guidance.",
  },
];

export function getTravelAppsByCountry(country: string): TravelApp[] {
  return TRAVEL_APPS.filter((app) => app.country === country);
}

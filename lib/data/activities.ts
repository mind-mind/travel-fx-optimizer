export type ActivityCategory =
  | "chill"
  | "relax"
  | "adventure"
  | "culture"
  | "food"
  | "nature"
  | "shopping";

export interface Activity {
  id: string;
  country: string;
  name: string;
  category: ActivityCategory;
  estimatedCost: number;
  currency: string;
}

export interface CountryActivityMeta {
  country: string;
  label: string;
  flag: string;
  hotelPerNightUSD: number;
}

export const COUNTRY_ACTIVITY_META: CountryActivityMeta[] = [
  { country: "japan", label: "Japan", flag: "🇯🇵", hotelPerNightUSD: 120 },
  { country: "thailand", label: "Thailand", flag: "🇹🇭", hotelPerNightUSD: 65 },
  { country: "korea", label: "South Korea", flag: "🇰🇷", hotelPerNightUSD: 95 },
  { country: "china", label: "China", flag: "🇨🇳", hotelPerNightUSD: 85 },
  { country: "singapore", label: "Singapore", flag: "🇸🇬", hotelPerNightUSD: 170 },
];

export const ACTIVITIES: Activity[] = [
  // Japan
  { id: "onsen", country: "japan", name: "Onsen hot spring", category: "relax", estimatedCost: 30, currency: "USD" },
  { id: "tea-ceremony", country: "japan", name: "Tea ceremony", category: "chill", estimatedCost: 40, currency: "USD" },
  { id: "fuji-hike", country: "japan", name: "Mount Fuji hiking", category: "adventure", estimatedCost: 80, currency: "USD" },
  { id: "kyoto-temples", country: "japan", name: "Kyoto temple pass", category: "culture", estimatedCost: 20, currency: "USD" },
  { id: "tokyo-food-tour", country: "japan", name: "Tokyo local food tour", category: "food", estimatedCost: 55, currency: "USD" },
  { id: "arashiyama-bamboo", country: "japan", name: "Arashiyama bamboo walk", category: "nature", estimatedCost: 15, currency: "USD" },
  { id: "tokyo-outlet", country: "japan", name: "Tokyo outlet shopping run", category: "shopping", estimatedCost: 35, currency: "USD" },

  // Thailand
  { id: "beach-spa", country: "thailand", name: "Beach spa session", category: "relax", estimatedCost: 35, currency: "USD" },
  { id: "island-hopping", country: "thailand", name: "Island hopping day trip", category: "chill", estimatedCost: 45, currency: "USD" },
  { id: "scuba-diving", country: "thailand", name: "Scuba diving excursion", category: "adventure", estimatedCost: 70, currency: "USD" },
  { id: "jungle-trekking", country: "thailand", name: "Jungle trekking tour", category: "adventure", estimatedCost: 50, currency: "USD" },
  { id: "bangkok-temples", country: "thailand", name: "Bangkok temple tour", category: "culture", estimatedCost: 25, currency: "USD" },
  { id: "street-food-tour", country: "thailand", name: "Bangkok street food tour", category: "food", estimatedCost: 25, currency: "USD" },
  { id: "national-park-trip", country: "thailand", name: "Khao Sok nature trip", category: "nature", estimatedCost: 60, currency: "USD" },
  { id: "chatuchak-shopping", country: "thailand", name: "Chatuchak market shopping", category: "shopping", estimatedCost: 20, currency: "USD" },

  // Korea
  { id: "jimjilbang", country: "korea", name: "Jimjilbang spa experience", category: "relax", estimatedCost: 18, currency: "USD" },
  { id: "han-river-picnic", country: "korea", name: "Han River picnic", category: "chill", estimatedCost: 12, currency: "USD" },
  { id: "bukhansan-hike", country: "korea", name: "Bukhansan mountain hike", category: "adventure", estimatedCost: 28, currency: "USD" },
  { id: "palace-tour-seoul", country: "korea", name: "Seoul royal palace tour", category: "culture", estimatedCost: 22, currency: "USD" },
  { id: "gwangjang-market", country: "korea", name: "Gwangjang market food crawl", category: "food", estimatedCost: 30, currency: "USD" },
  { id: "jeju-nature", country: "korea", name: "Jeju nature day trip", category: "nature", estimatedCost: 65, currency: "USD" },
  { id: "myeongdong-shopping", country: "korea", name: "Myeongdong shopping district", category: "shopping", estimatedCost: 30, currency: "USD" },

  // China
  { id: "tea-house-hangzhou", country: "china", name: "Hangzhou tea house visit", category: "chill", estimatedCost: 20, currency: "USD" },
  { id: "great-wall-hike", country: "china", name: "Great Wall hiking tour", category: "adventure", estimatedCost: 60, currency: "USD" },
  { id: "forbidden-city", country: "china", name: "Forbidden City tour", category: "culture", estimatedCost: 25, currency: "USD" },
  { id: "chengdu-food", country: "china", name: "Chengdu food experience", category: "food", estimatedCost: 35, currency: "USD" },
  { id: "zhangjiajie", country: "china", name: "Zhangjiajie nature tour", category: "nature", estimatedCost: 90, currency: "USD" },
  { id: "shanghai-shopping", country: "china", name: "Shanghai Nanjing Road shopping", category: "shopping", estimatedCost: 40, currency: "USD" },

  // Singapore
  { id: "gardens-bay", country: "singapore", name: "Gardens by the Bay evening", category: "chill", estimatedCost: 18, currency: "USD" },
  { id: "sentosa-adventure", country: "singapore", name: "Sentosa adventure pass", category: "adventure", estimatedCost: 75, currency: "USD" },
  { id: "heritage-walk", country: "singapore", name: "Chinatown heritage walk", category: "culture", estimatedCost: 20, currency: "USD" },
  { id: "hawker-tour", country: "singapore", name: "Hawker center food tour", category: "food", estimatedCost: 35, currency: "USD" },
  { id: "macritchie-trail", country: "singapore", name: "MacRitchie nature trail", category: "nature", estimatedCost: 10, currency: "USD" },
  { id: "orchard-shopping", country: "singapore", name: "Orchard Road shopping", category: "shopping", estimatedCost: 45, currency: "USD" },
];

export const ACTIVITY_CATEGORIES: Array<{ value: ActivityCategory; label: string }> = [
  { value: "chill", label: "Chill" },
  { value: "relax", label: "Relax" },
  { value: "adventure", label: "Adventure" },
  { value: "culture", label: "Culture" },
  { value: "food", label: "Food" },
  { value: "nature", label: "Nature" },
  { value: "shopping", label: "Shopping" },
];

export const ACTIVITY_COUNTRIES = COUNTRY_ACTIVITY_META.map((c) => c.country);

export function getCountryMeta(country: string): CountryActivityMeta | undefined {
  return COUNTRY_ACTIVITY_META.find((c) => c.country === country);
}

export function getActivitiesByCountry(country: string): Activity[] {
  return ACTIVITIES.filter((a) => a.country === country);
}

export function getActivitiesByCountryAndCategory(
  country: string,
  category: ActivityCategory | "all"
): Activity[] {
  return ACTIVITIES.filter(
    (a) => a.country === country && (category === "all" || a.category === category)
  );
}

export function getTopActivitiesByCountry(country: string, limit = 8): Activity[] {
  return getActivitiesByCountry(country).slice(0, limit);
}

export interface TravelWarning {
  country: string;
  category: "weather" | "crowds" | "scam" | "season" | "safety";
  message: string;
}

export const TRAVEL_WARNINGS: TravelWarning[] = [
  {
    country: "japan",
    category: "crowds",
    message: "Avoid peak Sakura weekends in Tokyo due to extreme crowds and long transit queues.",
  },
  {
    country: "japan",
    category: "season",
    message: "Avoid late summer midday outdoor plans (Jul-Aug) because humidity and heat are intense.",
  },
  {
    country: "thailand",
    category: "weather",
    message: "Avoid Chiang Mai during burning season (Feb-Apr) due to heavy air pollution.",
  },
  {
    country: "thailand",
    category: "scam",
    message: "Avoid unmetered tuk-tuks and gem-shop detours around major attractions.",
  },
  {
    country: "china",
    category: "crowds",
    message: "Avoid National Day Golden Week routes without pre-booking, as trains and hotels surge in price.",
  },
  {
    country: "china",
    category: "safety",
    message: "Avoid unofficial station taxis; use verified ride apps or official taxi queues.",
  },
  {
    country: "korea",
    category: "season",
    message: "Avoid booking Seoul stays during major holiday weeks without flexible plans due to heavy traffic and closures.",
  },
  {
    country: "korea",
    category: "weather",
    message: "Avoid mountain hikes during monsoon periods when trails can become slippery and dangerous.",
  },
  {
    country: "singapore",
    category: "weather",
    message: "Avoid full-day outdoor itineraries without rain backup, as tropical storms can appear suddenly.",
  },
  {
    country: "singapore",
    category: "scam",
    message: "Avoid unofficial ticket sellers near event venues and tourist hotspots.",
  },
  {
    country: "france",
    category: "scam",
    message: "Avoid petition and bracelet scams around major landmarks in central Paris.",
  },
  {
    country: "france",
    category: "crowds",
    message: "Avoid museum visits at midday in peak summer; early morning slots are significantly calmer.",
  },
  {
    country: "italy",
    category: "safety",
    message: "Avoid carrying valuables in open outer pockets around crowded transit hubs.",
  },
  {
    country: "spain",
    category: "season",
    message: "Avoid late-afternoon plans in midsummer heatwaves, especially inland cities.",
  },
  {
    country: "uk",
    category: "weather",
    message: "Avoid day trips without a rain layer; weather can shift quickly even in summer.",
  },
  {
    country: "usa",
    category: "safety",
    message: "Avoid leaving luggage visible in parked cars in major city areas.",
  },
  {
    country: "australia",
    category: "weather",
    message: "Avoid unprotected midday sun exposure; UV levels can be extreme year-round.",
  },
  {
    country: "uae",
    category: "season",
    message: "Avoid long outdoor walking routes in peak summer afternoons due to extreme heat.",
  },
];

export function getTravelWarningsByCountry(country: string): TravelWarning[] {
  return TRAVEL_WARNINGS.filter((warning) => warning.country === country);
}

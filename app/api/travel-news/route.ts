import { NextResponse } from "next/server";

export interface TravelAdvisory {
  iso: string;
  name: string;
  /** Risk score 1.0 (very safe) – 5.0 (do not travel) */
  score: number;
  message: string;
  updated: string;
  source: string;
}

export interface BannedAirline {
  name: string;
  /** ISO 3166-1 alpha-2 code of the airline's home country */
  countryCode: string;
  country: string;
  iata: string;
  reason: string;
}

/**
 * Travel advisory scores and messages for major destinations.
 * Scores: 1.0 = very safe, 2.0 = normal precautions, 3.0 = caution,
 *         4.0 = reconsider travel, 5.0 = do not travel.
 * Based on US State Dept, UK FCDO, and Australian DFAT advisories — March 2026.
 */
const STATIC_ADVISORIES: Record<string, TravelAdvisory> = {
  JP: { iso: "JP", name: "Japan", score: 1.5, updated: "2026-01", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/japan-travel-advisory.html", message: "Exercise normal precautions. Very low crime. Natural disaster (earthquake/typhoon) risk exists — follow local emergency guidance." },
  TH: { iso: "TH", name: "Thailand", score: 2.5, updated: "2026-02", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/thailand-travel-advisory.html", message: "Exercise increased caution. Deep southern provinces (Pattani, Yala, Narathiwat, Songkhla) have ongoing insurgent violence — avoid those regions. Political protests may occur with little notice in Bangkok." },
  FR: { iso: "FR", name: "France", score: 2.5, updated: "2025-12", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/france-travel-advisory.html", message: "Exercise increased caution due to terrorism. Remain highly vigilant at tourist sites, transport hubs, and large public gatherings." },
  CN: { iso: "CN", name: "China", score: 3.0, updated: "2026-01", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/china-travel-advisory.html", message: "Exercise increased caution. Arbitrary enforcement of local laws, including exit bans, may apply to foreign nationals. Heightened surveillance exists near Tibet, Xinjiang, and Hong Kong. Avoid protests." },
  KR: { iso: "KR", name: "South Korea", score: 1.5, updated: "2025-12", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/south-korea-travel-advisory.html", message: "Exercise normal precautions. Very safe overall. North Korea's military activities near the border pose a background risk — follow local authority guidance if incidents occur." },
  SG: { iso: "SG", name: "Singapore", score: 1.0, updated: "2025-11", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/singapore-travel-advisory.html", message: "Exercise normal precautions. One of the safest destinations globally. Very low crime. Strict local laws apply — be mindful of rules on narcotics, chewing gum, and public behaviour." },
  HK: { iso: "HK", name: "Hong Kong", score: 3.0, updated: "2026-01", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/hong-kong-travel-advisory.html", message: "Exercise increased caution. The National Security Law has significantly expanded authorities' power to detain individuals, including foreigners. Avoid political demonstrations entirely." },
  TW: { iso: "TW", name: "Taiwan", score: 2.0, updated: "2026-02", source: "", message: "Exercise increased caution due to cross-strait tensions. Taiwan is not recognized by the PRC; monitor diplomatic developments. Taiwan itself is safe for tourists, but US and EU governments advise awareness of geopolitical risk." },
  MY: { iso: "MY", name: "Malaysia", score: 2.0, updated: "2025-12", source: "", message: "Exercise increased caution. Petty crime (bag snatching, phone theft) is common in KL city centre. Eastern Sabah coastal areas have a kidnapping-for-ransom risk — avoid." },
  VN: { iso: "VN", name: "Vietnam", score: 1.5, updated: "2025-11", source: "", message: "Exercise normal precautions. Low overall crime risk. Petty theft in cities and road traffic accidents are the primary hazards. Avoid unlit streets at night in major cities." },
  ID: { iso: "ID", name: "Indonesia", score: 2.5, updated: "2026-01", source: "", message: "Exercise increased caution due to terrorism risk and natural disasters. Papua / Papua Highlands: high-risk zone — avoid. Bali, Java, and main tourist areas remain broadly safe for tourists." },
  PH: { iso: "PH", name: "Philippines", score: 3.0, updated: "2026-02", source: "", message: "Exercise high caution. Sulu Archipelago and parts of Mindanao: Do Not Travel — active terrorism and kidnapping. Metro Manila and main tourist areas require vigilance against petty crime and scams." },
  IN: { iso: "IN", name: "India", score: 2.5, updated: "2025-12", source: "", message: "Exercise increased caution. Jammu & Kashmir and Manipur have elevated conflict risk — avoid. Nationwide concerns include petty crime, scams targeting tourists, and traffic safety." },
  GB: { iso: "GB", name: "United Kingdom", score: 2.0, updated: "2025-12", source: "", message: "Exercise increased caution due to terrorism risk rated 'Substantial' by UK authorities. Remain vigilant in crowded public spaces, transport hubs, and tourist attractions." },
  DE: { iso: "DE", name: "Germany", score: 1.5, updated: "2025-11", source: "", message: "Exercise normal precautions. Low overall risk. Isolated terrorist incidents have occurred historically — stay aware in crowded public spaces and at major events." },
  IT: { iso: "IT", name: "Italy", score: 1.5, updated: "2025-11", source: "", message: "Exercise normal precautions. Pickpocketing and bag snatching are common at major tourist sites (Rome Colosseum, Milan Duomo, Naples central station). Keep valuables secure." },
  ES: { iso: "ES", name: "Spain", score: 1.5, updated: "2025-12", source: "", message: "Exercise normal precautions. Petty crime in tourist areas (Barcelona La Rambla, Madrid metro). Terrorism awareness applies. Isolated civil unrest has occurred in Catalonia." },
  CH: { iso: "CH", name: "Switzerland", score: 1.0, updated: "2025-10", source: "", message: "Exercise normal precautions. Consistently one of the safest countries in the world. Minimal crime risk for tourists." },
  TR: { iso: "TR", name: "Turkey", score: 3.5, updated: "2026-02", source: "", message: "Reconsider travel. Terrorism risk throughout the country. Southeastern Turkey (near Syrian and Iraqi borders): Do Not Travel. PKK-related attacks and suicide bombings have occurred in major cities. Avoid large public gatherings." },
  PL: { iso: "PL", name: "Poland", score: 1.5, updated: "2025-12", source: "", message: "Exercise normal precautions. Low crime rate. Monitor developments related to the Russia-Ukraine conflict in neighbouring countries — no direct threat to Poland currently." },
  US: { iso: "US", name: "United States", score: 2.0, updated: "2026-01", source: "", message: "Exercise increased caution. Certain major urban areas have elevated violent crime rates. Civil unrest protests can occur. Natural disasters (hurricanes, wildfires) vary by region and season." },
  CA: { iso: "CA", name: "Canada", score: 1.5, updated: "2025-11", source: "", message: "Exercise normal precautions. Low risk overall. Be mindful of wildlife hazards in wilderness areas and extreme weather in northern regions." },
  MX: { iso: "MX", name: "Mexico", score: 3.5, updated: "2026-02", source: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/mexico-travel-advisory.html", message: "Reconsider travel. High rates of crime, kidnapping, and carjacking in many states. Colima, Guerrero, Michoacán, Tamaulipas, and Zacatecas: Do Not Travel. Cancun, Los Cabos, and other resort areas: exercise high caution." },
  AU: { iso: "AU", name: "Australia", score: 1.5, updated: "2025-11", source: "", message: "Exercise normal precautions. Very safe destination. Natural hazards include bushfires (summer), cyclones (northern coast), and marine stingers. Follow local seasonal warnings." },
  NZ: { iso: "NZ", name: "New Zealand", score: 1.0, updated: "2025-10", source: "", message: "Exercise normal precautions. Very safe with low crime. Active volcanic zones and earthquake risk exist — heed all local geological warnings." },
  AE: { iso: "AE", name: "United Arab Emirates", score: 2.5, updated: "2026-03", source: "", message: "Exercise increased caution due to regional tensions. The UAE itself is stable and well-policed, but proximity to the Iran-Israel conflict, ongoing Houthi drone and missile activity in the Gulf region, and cross-border tensions elevate background risk. Strict local laws apply — alcohol, public displays of affection, and criticism of the government carry serious legal consequences." },
  SA: { iso: "SA", name: "Saudi Arabia", score: 3.5, updated: "2026-02", source: "", message: "Reconsider travel. Houthi missile and drone attacks from Yemen have targeted Riyadh and other Saudi cities. Terrorism risk across the country. Women and LGBTQ+ travellers face significant legal restrictions. The southern border region near Yemen is particularly dangerous." },
};

/**
 * Airlines on the EU Air Safety List (banned or restricted from EU/EEA airspace).
 * Source: EC Air Safety List — transport.ec.europa.eu/transport-modes/air/safety/air-ban_en
 * Last verified: March 2026. Always cross-check with the official list before travel.
 * countryCode: ISO2 of the airline's home country.
 */
const EU_BANNED_AIRLINES: BannedAirline[] = [
  { name: "Ariana Afghan Airlines", countryCode: "AF", country: "Afghanistan", iata: "FG", reason: "All operations banned — EU Air Safety List" },
  { name: "Kam Air", countryCode: "AF", country: "Afghanistan", iata: "RQ", reason: "All operations banned — EU Air Safety List" },
  { name: "FLYONE ARMENIA", countryCode: "AM", country: "Armenia", iata: "F7", reason: "All operations banned — EU Air Safety List" },
  { name: "Blue Wing Airlines", countryCode: "SR", country: "Suriname", iata: "BUW", reason: "All operations banned — EU Air Safety List" },
  { name: "Iran Air", countryCode: "IR", country: "Iran", iata: "IR", reason: "All operations banned from EU airspace — EU Air Safety List" },
  { name: "Iran Aseman Airlines", countryCode: "IR", country: "Iran", iata: "EP", reason: "All operations banned from EU airspace — EU Air Safety List" },
  { name: "Mahan Air", countryCode: "IR", country: "Iran", iata: "W5", reason: "Banned from EU airspace + US OFAC sanctions for IRGC links" },
  { name: "All DRC-certified carriers", countryCode: "CD", country: "Congo (DRC)", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "Most Angola carriers (excl. TAAG)", countryCode: "AO", country: "Angola", iata: "—", reason: "Listed on EU Air Safety List" },
  { name: "Most Kyrgyzstan carriers (excl. Avia Traffic Co.)", countryCode: "KG", country: "Kyrgyzstan", iata: "—", reason: "Partially listed on EU Air Safety List" },
  { name: "All Nepal-certified carriers", countryCode: "NP", country: "Nepal", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "All Sierra Leone carriers", countryCode: "SL", country: "Sierra Leone", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "All Sudan carriers", countryCode: "SD", country: "Sudan", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "All Libya-certified carriers", countryCode: "LY", country: "Libya", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "All Equatorial Guinea carriers", countryCode: "GQ", country: "Equatorial Guinea", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "All Somalia carriers", countryCode: "SO", country: "Somalia", iata: "—", reason: "All carriers banned from EU airspace — EU Air Safety List" },
  { name: "Air Zimbabwe", countryCode: "ZW", country: "Zimbabwe", iata: "UM", reason: "Listed on EU Air Safety List" },
  { name: "Pakistan International Airlines (PIA)", countryCode: "PK", country: "Pakistan", iata: "PK", reason: "Banned from EU airspace following pilot licence fraud investigation (2020, ban ongoing)" },
  { name: "Most Congo Republic carriers", countryCode: "CG", country: "Congo (Republic)", iata: "—", reason: "Listed on EU Air Safety List" },
];

export async function GET() {
  return NextResponse.json({
    advisories: STATIC_ADVISORIES,
    bannedAirlines: EU_BANNED_AIRLINES,
    fetchedAt: new Date().toISOString(),
    dataAsOf: "2026-03",
  });
}

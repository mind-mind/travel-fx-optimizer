import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Map ISO 3166-1 alpha-2 country codes to their primary currency */
const CURRENCY_BY_COUNTRY: Record<string, string> = {
  // Americas
  US: "USD", CA: "CAD", MX: "MXN", BR: "BRL", AR: "ARS",
  CL: "CLP", CO: "COP", PE: "PEN",
  // Europe
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
  BE: "EUR", AT: "EUR", PT: "EUR", GR: "EUR", FI: "EUR",
  IE: "EUR", SK: "EUR", SI: "EUR", LU: "EUR", MT: "EUR",
  CY: "EUR", EE: "EUR", LV: "EUR", LT: "EUR",
  GB: "GBP", CH: "CHF", NO: "NOK", SE: "SEK", DK: "DKK",
  PL: "PLN", CZ: "CZK", HU: "HUF", RO: "RON",
  // Asia-Pacific
  JP: "JPY", KR: "KRW", CN: "CNY", HK: "HKD", TW: "TWD",
  TH: "THB", SG: "SGD", MY: "MYR", ID: "IDR", PH: "PHP",
  VN: "VND", IN: "INR", PK: "PKR",
  AU: "AUD", NZ: "NZD",
  // Middle East & Africa
  AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD",
  ZA: "ZAR", NG: "NGN", KE: "KES", EG: "EGP",
  // Israel
  IL: "ILS",
};

export async function GET(req: NextRequest) {
  // 1. Vercel / Cloudflare edge geo headers (zero latency, most reliable)
  const countryHeader =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry");

  if (countryHeader && countryHeader !== "XX" && countryHeader !== "T1") {
    return NextResponse.json({
      country: countryHeader,
      currency: CURRENCY_BY_COUNTRY[countryHeader] ?? "USD",
      source: "header",
    });
  }

  // 2. Fall back to ipapi.co (free: 30k requests/month)
  try {
    const ip =
      req.headers.get("x-real-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const apiUrl = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";
    const resp = await fetch(apiUrl, { next: { revalidate: 3600 } });
    if (resp.ok) {
      const data = await resp.json();
      const cc: string = data.country_code ?? "US";
      return NextResponse.json({
        country: cc,
        currency: (data.currency as string) ?? CURRENCY_BY_COUNTRY[cc] ?? "USD",
        source: "ipapi",
      });
    }
  } catch {
    // silent — fall through to default
  }

  return NextResponse.json({ country: "US", currency: "USD", source: "fallback" });
}

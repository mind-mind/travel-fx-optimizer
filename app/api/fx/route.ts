import { NextRequest, NextResponse } from "next/server";

/**
 * Approximate indicative rates as USD per 1 unit of each currency.
 * Used only when the live API is unavailable.
 * Source: approximate market rates as of early 2026.
 */
const USD_PER_UNIT: Record<string, number> = {
  USD: 1.0,
  EUR: 1.08,
  GBP: 1.27,
  JPY: 0.0066,
  THB: 0.028,
  SGD: 0.74,
  KRW: 0.00069,
  CNY: 0.138,
  AUD: 0.63,
  CAD: 0.74,
  HKD: 0.129,
  TWD: 0.031,
  CHF: 1.11,
  AED: 0.272,
  INR: 0.012,
  NZD: 0.58,
  MYR: 0.22,
  IDR: 0.000062,
  PHP: 0.017,
  VND: 0.000040,
  SAR: 0.267,
  PLN: 0.246,
  MXN: 0.049,
  TRY: 0.028,
};

/** Cross-rate: units of `to` per 1 `from`, computed via USD as pivot */
function getFallbackRate(from: string, to: string): number {
  const fromUSD = USD_PER_UNIT[from];
  const toUSD = USD_PER_UNIT[to];
  if (!fromUSD || !toUSD) return 1;
  return fromUSD / toUSD;
}

export async function GET(req: NextRequest) {
  // Support both legacy ?currency=XXX (assumes to=USD) and ?from=XXX&to=YYY
  const from = req.nextUrl.searchParams.get("from")
    ?? req.nextUrl.searchParams.get("currency")
    ?? "USD";
  const to = req.nextUrl.searchParams.get("to") ?? "USD";

  const fallbackRate = getFallbackRate(from, to);

  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) throw new Error(`exchangerate.host status ${res.status}`);

    const data = await res.json();
    const rate: number = data?.rates?.[to];

    if (!rate || typeof rate !== "number") throw new Error("Invalid rate");

    return NextResponse.json({
      rate,
      from,
      to,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        rate: fallbackRate,
        from,
        to,
        timestamp: new Date().toISOString(),
        fallback: true,
      },
      { status: 200 }
    );
  }
}

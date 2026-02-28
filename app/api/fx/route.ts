import { NextRequest, NextResponse } from "next/server";

/** Indicative fallback mid-market rates (X per 1 THB, inverted below) */
const FALLBACK_RATES: Record<string, number> = {
  CNY: 4.90,
  JPY: 0.23,
  KRW: 0.026,
  SGD: 25.0,
  HKD: 4.50,
  TWD: 1.06,
};

export async function GET(req: NextRequest) {
  const currency = req.nextUrl.searchParams.get("currency") ?? "CNY";
  const fallbackRate = FALLBACK_RATES[currency] ?? 4.9;

  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=${currency}&symbols=THB`,
      {
        // Cache for 10 minutes via Next.js fetch revalidation
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      throw new Error(`exchangerate.host responded with ${res.status}`);
    }

    const data = await res.json();
    const rate: number = data?.rates?.THB;

    if (!rate || typeof rate !== "number") {
      throw new Error("Invalid rate in response");
    }

    return NextResponse.json({
      rate,
      currency,
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Fallback to indicative mid-market rate when API is unavailable
    return NextResponse.json(
      {
        rate: fallbackRate,
        currency,
        timestamp: new Date().toISOString(),
        fallback: true,
      },
      { status: 200 }
    );
  }
}

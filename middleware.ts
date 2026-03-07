import { NextRequest, NextResponse } from "next/server";

/**
 * Redirects:
 *  1. Short-form currency pair URLs → /convert/
 *     e.g. /usd-to-eur → /convert/usd-to-eur
 *  2. Travel money short URLs → /travel-money/
 *     e.g. /travel-money-japan → /travel-money/japan
 */
const PAIR_RE = /^\/([a-zA-Z]{3}-to-[a-zA-Z]{3})\/?$/;
const TRAVEL_RE = /^\/travel-money-([a-zA-Z0-9-]+)\/?$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Currency pair redirect: /usd-to-eur → /convert/usd-to-eur
  const pairMatch = pathname.match(PAIR_RE);
  if (pairMatch) {
    const url = req.nextUrl.clone();
    url.pathname = `/convert/${pairMatch[1].toLowerCase()}`;
    return NextResponse.redirect(url, 308);
  }

  // Travel money redirect: /travel-money-japan → /travel-money/japan
  const travelMatch = pathname.match(TRAVEL_RE);
  if (travelMatch) {
    const url = req.nextUrl.clone();
    url.pathname = `/travel-money/${travelMatch[1].toLowerCase()}`;
    return NextResponse.redirect(url, 308);
  }
}

export const config = {
  // Run on all paths except Next.js internals and known static paths.
  // NOTE: exclude "travel-money/" (with slash) not "travel-money" so that
  // /travel-money-japan still passes through and gets redirected.
  matcher: ["/((?!_next|api|convert|travel-money/|robots.txt|sitemap.xml|ads.txt|google).*))"],
};

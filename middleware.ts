import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect short-form currency pair URLs to the full /convert/ path.
 * e.g. /usd-to-eur  → /convert/usd-to-eur
 *      /USD-TO-EUR  → /convert/usd-to-eur
 *
 * Pattern: exactly 3-letter code, literal "-to-", exactly 3-letter code.
 */
const PAIR_RE = /^\/([a-zA-Z]{3}-to-[a-zA-Z]{3})\/?$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const match = pathname.match(PAIR_RE);
  if (match) {
    const url = req.nextUrl.clone();
    url.pathname = `/convert/${match[1].toLowerCase()}`;
    return NextResponse.redirect(url, 308);
  }
}

export const config = {
  // Run on all paths except Next.js internals and known static paths
  matcher: ["/((?!_next|api|convert|robots.txt|sitemap.xml|ads.txt|google).*)"],
};

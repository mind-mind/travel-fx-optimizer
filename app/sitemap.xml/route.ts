import { NextResponse } from "next/server";
import { POPULAR_PAIR_SLUGS } from "@/data/currencyPairs";
import { TRAVEL_MONEY_SLUGS } from "@/data/travelMoneyGuides";

export const dynamic = "force-static";

export function GET() {
  const baseUrl = "https://travelwiserate.com";
  const lastModified = new Date().toISOString().split("T")[0];

  const pairUrls = POPULAR_PAIR_SLUGS.map(
    (slug) => `  <url>
    <loc>${baseUrl}/convert/${slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("\n");

  const guideUrls = TRAVEL_MONEY_SLUGS.map(
    (slug) => `  <url>
    <loc>${baseUrl}/travel-money/${slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/where-to-travel</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${pairUrls}
${guideUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

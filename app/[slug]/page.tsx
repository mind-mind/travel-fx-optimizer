import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGuideBySlug, ALL_GUIDE_SLUGS } from "@/data/countryGuides";
import { GuideContent } from "./GuideContent";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return ALL_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Not Found" };
  return {
    title: `How to Pay in ${guide.countryNameEn} (Avoid FX Fees) | TravelWiseRate`,
    description: `Learn how to pay in ${guide.countryNameEn} without losing money on exchange rates. Best cards, ATM tips, DCC warnings, and bank comparisons for international travelers.`,
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();
  return <GuideContent guide={guide} />;
}


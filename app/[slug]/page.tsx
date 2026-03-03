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
    title: `${guide.countryNameEn} Payment Guide for Thai Travelers`,
    description: `Compare credit cards, cash, and the best payment methods for Thai travelers in ${guide.countryNameEn} (${guide.currency}). Tips, DCC warnings, and bank comparisons.`,
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();
  return <GuideContent guide={guide} />;
}


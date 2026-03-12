import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TRAVEL_MONEY_GUIDES,
  TRAVEL_MONEY_SLUGS,
  getGuideByTravelSlug,
} from "@/data/travelMoneyGuides";
import { TravelMoneyContent } from "./TravelMoneyContent";

interface Props {
  params: { country: string };
}

export function generateStaticParams() {
  return TRAVEL_MONEY_SLUGS.map((slug) => ({ country: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideByTravelSlug(params.country);
  if (!guide) return { title: "Not Found" };
  return {
    title: guide.seoTitle + " | TravelWiseRate",
    description: guide.seoDescription,
    openGraph: {
      title: guide.seoTitle,
      description: guide.seoDescription,
      url: `https://travelwiserate.com/travel-money/${guide.slug}`,
    },
    alternates: {
      canonical: `https://travelwiserate.com/travel-money/${guide.slug}`,
    },
  };
}

export default function TravelMoneyPage({ params }: Props) {
  const guide = getGuideByTravelSlug(params.country);
  if (!guide) notFound();

  const otherGuides = TRAVEL_MONEY_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 8);

  return <TravelMoneyContent guide={guide} otherGuides={otherGuides} />;
}

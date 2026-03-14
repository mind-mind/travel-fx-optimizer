import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ACTIVITY_COUNTRIES,
  getCountryMeta,
  getTopActivitiesByCountry,
} from "@/lib/data/activities";
import { ActivityCountryContent } from "./ActivityCountryContent";

interface Props {
  params: { country: string };
}

export function generateStaticParams() {
  return ACTIVITY_COUNTRIES.map((country) => ({ country }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getCountryMeta(params.country);
  if (!meta) return { title: "Not Found" };

  return {
    title: `Best Activities in ${meta.label} | TravelWiseRate`,
    description: `Top activities in ${meta.label} by category, with estimated costs and a direct link to the Activity Planner.`,
    alternates: {
      canonical: `https://travelwiserate.com/activities/${params.country}`,
    },
    openGraph: {
      title: `Best Activities in ${meta.label}`,
      description: `Find top things to do in ${meta.label} and plan total trip cost with Activity Planner.`,
      url: `https://travelwiserate.com/activities/${params.country}`,
    },
  };
}

export default function ActivityCountryPage({ params }: Props) {
  if (!ACTIVITY_COUNTRIES.includes(params.country)) {
    notFound();
  }

  const topActivities = getTopActivitiesByCountry(params.country, 8);
  if (topActivities.length === 0) {
    notFound();
  }

  return <ActivityCountryContent country={params.country} />;
}

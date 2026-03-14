import type { Metadata } from "next";
import { ActivityPlannerContent } from "./ActivityPlannerContent";
import { ACTIVITY_COUNTRIES } from "@/lib/data/activities";

interface Props {
  searchParams?: { country?: string };
}

export const metadata: Metadata = {
  title: "Activity Planner | TravelWiseRate",
  description:
    "Plan your trip by activity type and estimate travel cost including hotels and activity spend.",
  alternates: {
    canonical: "https://travelwiserate.com/activity-planner",
  },
};

export default function ActivityPlannerPage({ searchParams }: Props) {
  const requested = searchParams?.country?.toLowerCase();
  const initialCountry = requested && ACTIVITY_COUNTRIES.includes(requested) ? requested : "japan";

  return <ActivityPlannerContent initialCountry={initialCountry} />;
}

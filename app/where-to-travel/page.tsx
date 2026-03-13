import type { Metadata } from "next";
import { WhereToTravelContent } from "./WhereToTravelContent";

export const metadata: Metadata = {
  title: "Where to Travel This Month | TravelWiseRate",
  description:
    "Discover the best travel destinations for any month. Filter by cool, mild, or warm weather and see average temperatures, flight price estimates, and travel tips for Japan, Thailand, Italy, Greece, Norway, and more.",
  alternates: {
    canonical: "/where-to-travel",
  },
  openGraph: {
    title: "Where Should You Travel This Month?",
    description:
      "Find your perfect destination by month and weather preference. Compare temperatures, flight prices, and travel tips across 9 top destinations.",
    type: "website",
  },
};

export default function WhereToTravelPage() {
  return <WhereToTravelContent />;
}

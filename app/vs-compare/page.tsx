import type { Metadata } from "next";
import VsCompareContent from "./VsCompareContent";

export const metadata: Metadata = {
  title: "Destination VS Compare | TravelWiseRate",
  description:
    "Compare two travel destinations side by side for weather, flight cost, festival timing, VAT refund, and travel style.",
  alternates: {
    canonical: "/vs-compare",
  },
};

export default function VsComparePage() {
  return <VsCompareContent />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | TravelWiseRate",
  description:
    "Learn what TravelWiseRate does and how we help travelers avoid hidden FX and payment fees.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About TravelWiseRate</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        TravelWiseRate helps travelers compare payment methods abroad so they can avoid hidden
        foreign exchange fees and choose better ways to pay.
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        The calculators and guides on this site are for educational planning purposes and should not
        be considered financial advice. Rates and fees can change by bank, card, merchant, and
        destination.
      </p>
    </main>
  );
}

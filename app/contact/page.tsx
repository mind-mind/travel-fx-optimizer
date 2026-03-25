import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TravelWiseRate",
  description: "Contact TravelWiseRate.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Questions, corrections, or partnership requests are welcome.
      </p>
      <p className="mt-3 text-gray-700 dark:text-gray-300">
        Email: support@travelwiserate.com
      </p>
    </main>
  );
}

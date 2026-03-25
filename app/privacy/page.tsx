import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TravelWiseRate",
  description: "Privacy policy for TravelWiseRate.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Privacy Policy</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">Last updated: March 25, 2026</p>

      <section className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          We use analytics and advertising services, including Google AdSense, to understand traffic
          and support this website.
        </p>
        <p>
          Third-party vendors, including Google, may use cookies to serve ads based on prior visits
          to this and other websites. You can manage ad personalization through Google ad settings.
        </p>
        <p>
          We do not sell personal information. If you contact us, we only use your message details
          to respond.
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Payment Optimizer",
  description: "Find the cheapest way to pay abroad as a Thai traveler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

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
      <head>
        {/* Prevent flash of unstyled content for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

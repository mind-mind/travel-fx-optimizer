import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Payment Optimizer",
  description: "Find the cheapest way to pay abroad as a Thai traveler",
  verification: {
    google: "AVOj9qFgtPCQrtA-OfOtnc1aCsMEDjga5elLe6JNVnk",
  },
  other: {
    "google-adsense-account": "ca-pub-2107207218808903",
  },
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
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2107207218808903"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

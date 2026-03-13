import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelWiseRate — Avoid Hidden FX Fees",
  description: "See exactly what hidden fees cost you before you pay. Compare credit card, cash, and mobile payment costs abroad, get destination travel guides, discover festivals, and find out where to travel this month.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="AVOj9qFgtPCQrtA-OfOtnc1aCsMEDjga5elLe6JNVnk" />
        {/* Google AdSense account */}
        <meta name="google-adsense-account" content="ca-pub-2107207218808903" />
        {/* Prevent flash of unstyled content for dark mode */}
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
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
      <body>
        {children}
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DGP8GRE798"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DGP8GRE798');`}
        </Script>
      </body>
    </html>
  );
}

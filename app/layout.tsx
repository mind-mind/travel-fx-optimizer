import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import Link from "next/link";
import GlobalLanguageSelector from "@/components/GlobalLanguageSelector";
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
        {/* Prevent flash of unstyled content for dark mode */}
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2107207218808903"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Suspense fallback={null}>
          <GlobalLanguageSelector />
        </Suspense>
        {children}
        <footer className="border-t border-gray-200 bg-white px-4 py-8 text-sm text-gray-600 dark:border-gray-800 dark:bg-[#020617] dark:text-gray-300">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p>© {new Date().getFullYear()} TravelWiseRate</p>
            <nav aria-label="Footer">
              <ul className="flex items-center gap-4">
                <li>
                  <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
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

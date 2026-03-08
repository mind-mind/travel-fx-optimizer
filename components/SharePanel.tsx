"use client";

import { useState } from "react";

interface Props {
  homeCurrency: string;
  currency: string;
  amountForeign: number;
  totalHome: number;
  bestMethod: string;
  savings: number;
  lossVsMid?: number;
}

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function SharePanel({
  homeCurrency,
  currency,
  amountForeign,
  totalHome,
  bestMethod,
  savings,
  lossVsMid = 0,
}: Props) {
  const [copied, setCopied] = useState(false);

  const amtStr = amountForeign.toLocaleString("en");
  const text =
    lossVsMid > 0.01
      ? `I could lose ${fmt(lossVsMid, homeCurrency)} paying ${amtStr} ${currency} abroad with a standard card. Check how much YOU lose →`
      : `I calculated my travel money cost: ${amtStr} ${currency} = ${fmt(totalHome, homeCurrency)} via ${bestMethod}` +
        (savings > 0 ? `, saving ${fmt(savings, homeCurrency)} vs a standard bank card` : "") +
        `. Compare yours free ↓`;
  const siteUrl = "https://travelwiserate.com";
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(siteUrl);

  const links = [
    {
      label: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      className: "bg-black text-white hover:bg-gray-800",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      className: "bg-green-500 text-white hover:bg-green-600",
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      className: "bg-sky-500 text-white hover:bg-sky-600",
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
      className: "bg-orange-500 text-white hover:bg-orange-600",
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(siteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-base">📤</span>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Share your result</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${l.className}`}
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="rounded-xl px-3.5 py-2 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

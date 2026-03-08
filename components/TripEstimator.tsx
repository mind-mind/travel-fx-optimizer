"use client";

import { useState, useRef, useCallback } from "react";
import { fmtCurrency } from "@/lib/formatCurrency";

interface CardTier {
  label: string;
  fxPct: number;   // card FX fee %
  spreadPct: number; // network spread %
  color: string;
  bg: string;
  darkBg: string;
  border: string;
  darkBorder: string;
}

const CARD_TIERS: CardTier[] = [
  {
    label: "No-FX card",
    fxPct: 0,
    spreadPct: 0,
    color: "text-green-700 dark:text-green-300",
    bg: "bg-green-50",
    darkBg: "dark:bg-green-950",
    border: "border-green-200",
    darkBorder: "dark:border-green-800",
  },
  {
    label: "Travel card",
    fxPct: 1.5,
    spreadPct: 1.0,
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50",
    darkBg: "dark:bg-blue-950",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800",
  },
  {
    label: "Standard card",
    fxPct: 2.5,
    spreadPct: 1.0,
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50",
    darkBg: "dark:bg-amber-950",
    border: "border-amber-200",
    darkBorder: "dark:border-amber-800",
  },
  {
    label: "Basic card",
    fxPct: 3.5,
    spreadPct: 1.0,
    color: "text-red-700 dark:text-red-300",
    bg: "bg-red-50",
    darkBg: "dark:bg-red-950",
    border: "border-red-200",
    darkBorder: "dark:border-red-800",
  },
];

function totalFxPct(tier: CardTier) {
  return tier.fxPct + tier.spreadPct;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function generateTripCard(
  canvas: HTMLCanvasElement,
  opts: {
    countryName: string;
    countryFlag: string;
    budget: number;
    homeCurrency: string;
    selectedTier: CardTier;
    fxLoss: number;
    totalFxPercent: number;
    savings: number;
  },
) {
  const { countryName, countryFlag, budget, homeCurrency, selectedTier, fxLoss, totalFxPercent, savings } = opts;

  const S = 1080;
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  // Background
  ctx.fillStyle = "#F1F5F9";
  ctx.fillRect(0, 0, S, S);

  // Header band
  const HEADER_H = 200;
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(0, 0, S, HEADER_H);
  ctx.fillStyle = "#2563EB";
  ctx.fillRect(0, HEADER_H - 8, S, 8);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 58px system-ui, -apple-system, sans-serif";
  ctx.fillText("TravelWiseRate", 60, 108);

  ctx.font = "bold 28px system-ui, sans-serif";
  const badge = "Trip FX Estimator";
  const bW = ctx.measureText(badge).width + 28;
  roundRect(ctx, S - bW - 52, 58, bW, 46, 10);
  ctx.fillStyle = "#2563EB"; ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(badge, S - bW - 38, 90);

  ctx.fillStyle = "#93C5FD";
  ctx.font = "30px system-ui, sans-serif";
  ctx.fillText("How much do hidden FX fees cost your trip?", 60, 162);

  // Country + trip info
  ctx.font = "80px system-ui, sans-serif";
  ctx.fillStyle = "#1E293B";
  ctx.fillText(countryFlag, 54, 322);

  ctx.font = "bold 58px system-ui, sans-serif";
  ctx.fillStyle = "#1E293B";
  ctx.fillText(countryName, 192, 296);

  ctx.font = "34px system-ui, sans-serif";
  ctx.fillStyle = "#475569";
  ctx.fillText(`Trip budget: ${fmtCurrency(budget, homeCurrency)}  ·  ${selectedTier.label}`, 192, 344);

  // Divider
  ctx.strokeStyle = "#CBD5E1"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(60, 382); ctx.lineTo(S - 60, 382); ctx.stroke();

  // Loss section
  ctx.font = "bold 34px system-ui, sans-serif";
  ctx.fillStyle = "#B45309";
  ctx.fillText("💸 Estimated FX fees on your trip", 60, 432);

  ctx.font = "34px system-ui, sans-serif";
  ctx.fillStyle = "#64748B";
  ctx.fillText("You could lose", 60, 488);

  ctx.font = "bold 100px system-ui, sans-serif";
  ctx.fillStyle = "#DC2626";
  ctx.fillText(fmtCurrency(fxLoss, homeCurrency), 60, 600);

  ctx.font = "bold 40px system-ui, sans-serif";
  ctx.fillStyle = "#EF4444";
  ctx.fillText(`+${totalFxPercent.toFixed(1)}% of trip budget to FX fees`, 60, 654);

  // Savings row
  ctx.strokeStyle = "#CBD5E1";
  ctx.beginPath(); ctx.moveTo(60, 684); ctx.lineTo(S - 60, 684); ctx.stroke();

  ctx.font = "32px system-ui, sans-serif";
  ctx.fillStyle = "#64748B";
  ctx.fillText("Switching to a no-FX card saves", 60, 730);

  ctx.font = "bold 64px system-ui, sans-serif";
  ctx.fillStyle = "#15803D";
  ctx.fillText(fmtCurrency(savings, homeCurrency), 60, 812);

  ctx.font = "28px system-ui, sans-serif";
  ctx.fillStyle = "#94A3B8";
  ctx.fillText("on the same trip budget", 60, 854);

  // Divider + footer
  ctx.strokeStyle = "#CBD5E1";
  ctx.beginPath(); ctx.moveTo(60, 878); ctx.lineTo(S - 60, 878); ctx.stroke();

  ctx.font = "bold 30px system-ui, sans-serif";
  ctx.fillStyle = "#1E293B";
  ctx.fillText("Many travelers lose 3–8% of their entire budget to hidden FX fees.", 60, 924);

  ctx.font = "italic 24px system-ui, sans-serif";
  ctx.fillStyle = "#94A3B8";
  ctx.fillText("Estimates based on typical card fees + exchange rate spreads.", 60, 962);

  ctx.fillStyle = "#0F172A";
  ctx.fillRect(0, 980, S, S - 980);

  ctx.font = "30px system-ui, sans-serif";
  ctx.fillStyle = "#93C5FD";
  ctx.fillText("Calculate your trip FX fees at", 60, 1026);

  ctx.font = "bold 50px system-ui, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("TravelWiseRate.com", 60, 1072);
}

interface Props {
  countryCode: string;
  countryName: string;
  countryFlag: string;
  homeCurrency: string;
}

export default function TripEstimator({ countryCode, countryName, countryFlag, homeCurrency }: Props) {
  const [budget, setBudget] = useState("");
  const [selectedTierIdx, setSelectedTierIdx] = useState(2); // Default: Standard card
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardDataUrl, setCardDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const parsedBudget = parseFloat(budget.replace(/,/g, ""));
  const hasResult = parsedBudget > 0;

  const selectedTier = CARD_TIERS[selectedTierIdx];
  const fxPct = totalFxPct(selectedTier);
  const fxLoss = hasResult ? parsedBudget * fxPct / 100 : 0;
  const noFeeBase = hasResult ? parsedBudget * totalFxPct(CARD_TIERS[0]) / 100 : 0;
  const savings = Math.max(0, fxLoss - noFeeBase);

  const shareUrl = `https://travelwiserate.com/?country=${countryCode}&home=${homeCurrency}`;
  const shareText = hasResult
    ? `✈️ FX fee alert! A ${selectedTier.label} on a ${fmtCurrency(parsedBudget, homeCurrency)} trip to ${countryName} could cost ${fmtCurrency(fxLoss, homeCurrency)} in hidden fees (+${fxPct.toFixed(1)}%). Switch to a no-FX card and keep ${fmtCurrency(savings, homeCurrency)} extra: `
    : "";

  const buildCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasResult) return;
    generateTripCard(canvas, {
      countryName,
      countryFlag,
      budget: parsedBudget,
      homeCurrency,
      selectedTier,
      fxLoss,
      totalFxPercent: fxPct,
      savings,
    });
    setCardDataUrl(canvas.toDataURL("image/png"));
  }, [countryName, countryFlag, parsedBudget, homeCurrency, selectedTier, fxLoss, fxPct, savings, hasResult]);

  function handleShareOpen() {
    setShareOpen(true);
    setTimeout(buildCard, 60);
  }

  function handleDownload() {
    if (!cardDataUrl) return;
    const a = document.createElement("a");
    a.href = cardDataUrl;
    a.download = `travelwiserate-trip-${countryCode}-${parsedBudget}${homeCurrency}.png`;
    a.click();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  }

  const socialLinks = [
    {
      label: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      className: "bg-black text-white hover:bg-gray-800",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + shareUrl)}`,
      className: "bg-green-500 text-white hover:bg-green-600",
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      className: "bg-sky-500 text-white hover:bg-sky-600",
    },
  ];

  // Max bar width for comparison bars
  const maxPct = totalFxPct(CARD_TIERS[CARD_TIERS.length - 1]);

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">✈️</span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-500 dark:text-purple-400">
            Trip FX Fee Estimator
          </p>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 leading-snug">
            How much will FX fees cost your whole trip?
          </h2>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        {/* Budget input */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
            Total trip budget ({homeCurrency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400 dark:text-gray-500 pointer-events-none">
              {homeCurrency}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              placeholder="e.g. 2000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-14 pr-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Card tier selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
            Your card type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CARD_TIERS.map((tier, i) => (
              <button
                key={tier.label}
                onClick={() => setSelectedTierIdx(i)}
                className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                  selectedTierIdx === i
                    ? `${tier.bg} ${tier.darkBg} ${tier.border} ${tier.darkBorder} ring-2 ring-offset-1 ring-purple-400`
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <p className={`text-xs font-bold ${selectedTierIdx === i ? tier.color : "text-gray-700 dark:text-gray-200"}`}>
                  {tier.label}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                  FX fee ~{totalFxPct(tier).toFixed(1)}%
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {hasResult ? (
        <div className="space-y-4">
          {/* Main loss display */}
          <div className={`rounded-xl border p-4 space-y-2 ${selectedTier.bg} ${selectedTier.darkBg} ${selectedTier.border} ${selectedTier.darkBorder}`}>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Estimated FX cost for your trip to {countryName}
            </p>
            <div className="flex items-end gap-2">
              <p className={`text-3xl font-extrabold ${selectedTier.color}`}>
                {fmtCurrency(fxLoss, homeCurrency)}
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 pb-0.5">
                +{fxPct.toFixed(1)}% of {fmtCurrency(parsedBudget, homeCurrency)}
              </p>
            </div>
            <div className="w-full bg-white/60 dark:bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-current transition-all duration-500"
                style={{ width: `${Math.min(100, (fxPct / maxPct) * 100)}%`, color: "currentColor" }}
              />
            </div>
            {selectedTierIdx > 0 && savings > 0 && (
              <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                💡 Switch to a No-FX card → save {fmtCurrency(savings, homeCurrency)} on this trip
              </p>
            )}
          </div>

          {/* Comparison table */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
              Cost comparison by card type
            </p>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {CARD_TIERS.map((tier, i) => {
                const loss = parsedBudget * totalFxPct(tier) / 100;
                const isSelected = i === selectedTierIdx;
                const barWidth = `${Math.min(100, (totalFxPct(tier) / maxPct) * 100)}%`;
                return (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedTierIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? "bg-white dark:bg-gray-900"
                        : "hover:bg-white/80 dark:hover:bg-gray-900/50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-semibold ${isSelected ? tier.color : "text-gray-600 dark:text-gray-300"}`}>
                          {tier.label}
                        </span>
                        <span className={`text-xs font-bold ${i === 0 ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-300"}`}>
                          {i === 0 ? "Free" : `${fmtCurrency(loss, homeCurrency)}`}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === 0 ? "bg-green-500" :
                            i === 1 ? "bg-blue-500" :
                            i === 2 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: barWidth }}
                        />
                      </div>
                    </div>
                    {isSelected && (
                      <span className="shrink-0 text-xs font-bold text-purple-600 dark:text-purple-400">← you</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed">
            Estimates include card FX fee + exchange rate spread. Actual costs vary by card issuer and transaction type. Does not include ATM cash withdrawal fees.
          </p>

          {/* Share */}
          {!shareOpen ? (
            <button
              onClick={handleShareOpen}
              className="w-full rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950 py-3.5 flex items-center justify-center gap-2.5 text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            >
              <span className="text-lg">📤</span>
              <span className="font-semibold text-purple-700 dark:text-purple-300">
                Share — my trip FX loss is{" "}
                <span className="font-extrabold text-red-600 dark:text-red-400">
                  {fmtCurrency(fxLoss, homeCurrency)}
                </span>
              </span>
            </button>
          ) : (
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">📤</span>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Share my trip estimate</p>
                </div>
                <button
                  onClick={() => setShareOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none px-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <canvas ref={canvasRef} className="hidden" aria-hidden />

              {cardDataUrl ? (
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cardDataUrl} alt="Trip FX fee estimate share card" className="w-full" />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-3 flex items-center justify-center gap-2 transition-colors"
                  >
                    ⬇ Download image
                  </button>
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 h-24 flex items-center justify-center">
                  <span className="text-sm text-gray-400 animate-pulse">Generating card…</span>
                </div>
              )}

              <button
                onClick={handleCopyLink}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? "✓ Link copied!" : "🔗 Copy link to calculator"}
              </button>

              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Share directly to</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((l) => (
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
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 text-center space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Enter your budget above
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            See exactly how much FX fees eat into your trip
          </p>
        </div>
      )}
    </div>
  );
}

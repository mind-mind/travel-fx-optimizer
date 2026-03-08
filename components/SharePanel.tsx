"use client";

import { useState, useRef, useCallback } from "react";
import { fmtCurrency } from "@/lib/formatCurrency";

interface Props {
  homeCurrency: string;
  currency: string;
  amountForeign: number;
  totalHome: number;
  bestMethod: string;
  savings: number;
  lossVsMid?: number;
  lossVsMidPercent?: number;
  countryCode: string;
  countryName: string;
  countryFlag: string;
  /** Mid-market rate (foreign → home) used to show the home-currency equivalent */
  midRate: number;
}

function fmtNum(n: number) {
  return new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(n);
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

// Clean display label for bestMethod — avoids "Cash (Cash)" duplication
function cleanMethodLabel(method: string): string {
  // "Cash (Cash)" → "💵 Cash"
  if (/^cash\s*\(cash\)$/i.test(method.trim())) return "💵 Cash";
  // "ATM (ATM)" → "🏧 ATM"
  if (/^atm\s*\(atm\)$/i.test(method.trim())) return "🏧 ATM";
  // "No-fee card (Credit Card)" → keep as-is with slight cleanup
  return method.replace(/\(([^)]+)\)/, "($1)").trim();
}

function generateShareCard(
  canvas: HTMLCanvasElement,
  opts: {
    countryFlag: string;
    countryName: string;
    currency: string;
    amountForeign: number;
    midRate: number;
    lossVsMid: number;
    lossVsMidPercent: number;
    bestMethod: string;
    savings: number;
    homeCurrency: string;
  },
) {
  const {
    countryFlag, countryName, currency, amountForeign, midRate,
    lossVsMid, lossVsMidPercent, bestMethod, savings, homeCurrency,
  } = opts;

  const S = 1080;
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  // ── Background ───────────────────────────────────────────────
  ctx.fillStyle = "#F1F5F9";
  ctx.fillRect(0, 0, S, S);

  // ── Header band (dark navy, 0–200) ───────────────────────────
  const HEADER_H = 200;
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(0, 0, S, HEADER_H);
  ctx.fillStyle = "#2563EB";
  ctx.fillRect(0, HEADER_H - 8, S, 8);

  // Brand + badge
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 62px system-ui, -apple-system, sans-serif";
  ctx.fillText("TravelWiseRate", 60, 110);

  ctx.font = "bold 30px system-ui, sans-serif";
  const badgeLabel = "FX Fee Check";
  const badgeW = ctx.measureText(badgeLabel).width + 28;
  const badgeX = S - badgeW - 52;
  const badgeY = 58;
  roundRect(ctx, badgeX, badgeY, badgeW, 48, 10);
  ctx.fillStyle = "#2563EB"; ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(badgeLabel, badgeX + 14, badgeY + 34);

  ctx.fillStyle = "#93C5FD";
  ctx.font = "32px system-ui, sans-serif";
  ctx.fillText("Travel money FX fee calculator", 60, 164);

  // ── Country row (208–415) ─────────────────────────────────────
  ctx.font = "84px system-ui, sans-serif";
  ctx.fillStyle = "#1E293B";
  ctx.fillText(countryFlag, 54, 324);

  ctx.font = "bold 62px system-ui, sans-serif";
  ctx.fillStyle = "#1E293B";
  ctx.fillText(countryName, 192, 298);

  // "Paying X,XXX CURRENCY"
  ctx.font = "36px system-ui, sans-serif";
  ctx.fillStyle = "#475569";
  ctx.fillText(`Paying ${fmtNum(amountForeign)} ${currency}`, 192, 346);

  // "≈ HOME_AMOUNT" — home-currency equivalent for clarity
  const homeEquivStr = `\u2248 ${fmtCurrency(amountForeign * midRate, homeCurrency)}`;
  ctx.font = "bold 36px system-ui, sans-serif";
  ctx.fillStyle = "#2563EB";
  ctx.fillText(homeEquivStr, 192, 390);

  // ── Divider ───────────────────────────────────────────────────
  ctx.strokeStyle = "#CBD5E1"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(60, 418); ctx.lineTo(S - 60, 418); ctx.stroke();

  // ── Loss section (428–710) ────────────────────────────────────
  // Hook line — amber
  ctx.font = "bold 36px system-ui, sans-serif";
  ctx.fillStyle = "#B45309";
  ctx.fillText("\u{1F4B8} Hidden FX fee detected", 60, 468);

  // Clarifying label: which currency the loss is in
  ctx.font = "30px system-ui, sans-serif";
  ctx.fillStyle = "#94A3B8";
  ctx.fillText(`Extra cost in your home currency (${homeCurrency})`, 60, 508);

  // "You are overpaying" label
  ctx.font = "36px system-ui, sans-serif";
  ctx.fillStyle = "#64748B";
  ctx.fillText("You are overpaying", 60, 548);

  // Big overpay amount
  const overpayStr = fmtCurrency(Math.max(lossVsMid, 0), homeCurrency);
  ctx.font = "bold 92px system-ui, sans-serif";
  ctx.fillStyle = "#DC2626";
  ctx.fillText(overpayStr, 60, 644);

  // Percent — own line, prominent
  if (lossVsMidPercent > 0) {
    const pctStr = `+${lossVsMidPercent.toFixed(1)}% hidden FX fee`;
    ctx.font = "bold 40px system-ui, sans-serif";
    ctx.fillStyle = "#EF4444";
    ctx.fillText(pctStr, 60, 692);
  }

  // ── Divider ───────────────────────────────────────────────────
  ctx.strokeStyle = "#CBD5E1"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(60, 718); ctx.lineTo(S - 60, 718); ctx.stroke();

  // ── Two-column section (726–848) ─────────────────────────────
  const colR = S / 2 + 20;

  ctx.font = "32px system-ui, sans-serif";
  ctx.fillStyle = "#64748B";
  ctx.fillText("Cheapest way to pay", 60, 766);
  ctx.fillText("You could save", colR, 766);

  // Cheapest method value
  ctx.font = "bold 50px system-ui, sans-serif";
  ctx.fillStyle = "#15803D";
  const cleanMethod = cleanMethodLabel(bestMethod);
  const maxMethodW = S / 2 - 90;
  let displayMethod = cleanMethod;
  while (ctx.measureText(displayMethod).width > maxMethodW && displayMethod.length > 3) {
    displayMethod = displayMethod.slice(0, -1);
  }
  if (displayMethod !== cleanMethod) displayMethod += "\u2026";
  ctx.fillText(displayMethod, 60, 834);

  // Savings value
  ctx.fillStyle = "#0F766E";
  ctx.fillText(fmtCurrency(savings, homeCurrency), colR, 834);

  // ── Divider ───────────────────────────────────────────────────
  ctx.strokeStyle = "#CBD5E1"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(60, 862); ctx.lineTo(S - 60, 862); ctx.stroke();

  // ── Viral trigger + disclaimer (870–960) ─────────────────────
  ctx.font = "bold 32px system-ui, sans-serif";
  ctx.fillStyle = "#1E293B";
  ctx.fillText("Many travelers lose 3\u20138% to hidden FX fees.", 60, 910);

  ctx.font = "italic 25px system-ui, sans-serif";
  ctx.fillStyle = "#94A3B8";
  ctx.fillText("Estimates based on mid-market rates. Actual fees may vary.", 60, 950);

  // ── Footer band (966–1080) ────────────────────────────────────
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(0, 966, S, S - 966);

  ctx.font = "32px system-ui, sans-serif";
  ctx.fillStyle = "#93C5FD";
  ctx.fillText("Check your travel payment fees at", 60, 1014);

  ctx.font = "bold 52px system-ui, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("TravelWiseRate.com", 60, 1062);
}

export default function SharePanel({
  homeCurrency,
  currency,
  amountForeign,
  totalHome,
  bestMethod,
  savings,
  lossVsMid = 0,
  lossVsMidPercent = 0,
  countryCode,
  countryName,
  countryFlag,
  midRate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardDataUrl, setCardDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const amtStr = amountForeign.toLocaleString("en");
  const text =
    lossVsMid > 0.01
      ? `🚨 Hidden travel fee alert! Paying ${amtStr} ${currency} costs ${fmtCurrency(lossVsMid, homeCurrency)} EXTRA in bank FX fees — that's money you could spend on your trip instead. Check what your card is secretly charging: `
      : `✈️ Travel money check: ${amtStr} ${currency} = ${fmtCurrency(totalHome, homeCurrency)} via ${cleanMethodLabel(bestMethod)}` +
        (savings > 0 ? ` — that's ${fmtCurrency(savings, homeCurrency)} cheaper than a standard bank card.` : ".") +
        ` Calculate yours free: `;

  const shareUrl = `https://travelwiserate.com/?country=${countryCode}&amount=${encodeURIComponent(amountForeign)}&home=${homeCurrency}`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(shareUrl);

  const socialLinks = [
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

  const buildCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    generateShareCard(canvas, {
      countryFlag,
      countryName,
      currency,
      amountForeign,
      midRate,
      lossVsMid,
      lossVsMidPercent,
      bestMethod,
      savings,
      homeCurrency,
    });
    setCardDataUrl(canvas.toDataURL("image/png"));
  }, [countryFlag, countryName, currency, amountForeign, midRate, lossVsMid, lossVsMidPercent, bestMethod, savings, homeCurrency]);

  function handleOpen() {
    setOpen(true);
    // Defer canvas draw until after paint so the panel is visible first
    setTimeout(buildCard, 60);
  }

  function handleDownload() {
    if (!cardDataUrl) return;
    const a = document.createElement("a");
    a.href = cardDataUrl;
    a.download = `travelwiserate-fx-${countryCode}-${amountForeign}${currency}.png`;
    a.click();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  }

  // ── Collapsed state: single CTA button ───────────────────────
  if (!open) {
    return (
      <button
        onClick={handleOpen}
        className="w-full rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 py-4 flex items-center justify-center gap-2.5 text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
      >
        <span className="text-lg shrink-0">📤</span>
        {lossVsMid > 0.01 ? (
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            Share —{" "}
            <span className="font-extrabold text-red-600 dark:text-red-400">
              you're overpaying {fmtCurrency(lossVsMid, homeCurrency)}
            </span>
          </span>
        ) : (
          <span className="font-semibold text-blue-700 dark:text-blue-300">Share my result</span>
        )}
      </button>
    );
  }

  // ── Expanded state ────────────────────────────────────────────
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-4 space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📤</span>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Share my result</p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none px-1"
          aria-label="Close share panel"
        >
          ✕
        </button>
      </div>

      {/* Hidden canvas — used only for image generation */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Card preview */}
      {cardDataUrl ? (
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cardDataUrl} alt="FX fee result share card" className="w-full" />
          </div>
          <button
            onClick={handleDownload}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 flex items-center justify-center gap-2 transition-colors"
          >
            ⬇ Download image
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 h-28 flex items-center justify-center">
          <span className="text-sm text-gray-400 animate-pulse">Generating card…</span>
        </div>
      )}

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
      >
        {copied ? "✓ Link copied!" : "🔗 Copy link to result"}
      </button>

      {/* Social share buttons */}
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
  );
}


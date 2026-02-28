"use client";

import { ComparisonResult } from "@/lib/types";
import { BankName, PaymentMethod } from "@/lib/types";
import { Translations } from "@/data/translations";
import { banks } from "@/data/banks";

// Lookup bank metadata (sourceUrl, lastVerified) by display name
const bankMeta = Object.fromEntries(
  Object.values(banks).map((b) => [b.name, { sourceUrl: b.sourceUrl, lastVerified: b.lastVerified }])
) as Record<string, { sourceUrl: string; lastVerified: string }>;

interface Props {
  results: ComparisonResult[];
  selectedBank: BankName;
  selectedMethod: PaymentMethod;
  amountCNY: number;
  midRate: number;
  currency: string;
  t: Translations;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const methodIcon: Record<string, string> = {
  "Credit Card": "💳",
  Alipay: "🔵",
  "WeChat Pay": "🟢",
  Cash: "💵",
};

export default function ResultsSection({
  results,
  selectedBank,
  selectedMethod,
  amountCNY,
  midRate,
  currency,
  t,
}: Props) {
  const selected = results.find(
    (r) => r.bank === selectedBank && r.method === selectedMethod
  );
  const cheapest = results.find((r) => r.isCheapest);
  const mostExpensive = results.reduce((a, b) => (a.totalTHB > b.totalTHB ? a : b));
  const maxSavings = cheapest ? mostExpensive.totalTHB - cheapest.totalTHB : 0;

  const isSelectedCheapest = selected?.isCheapest;
  const potentialSaving =
    selected && cheapest ? selected.totalTHB - cheapest.totalTHB : 0;

  const banks = [...new Set(results.map((r) => r.bank))];

  return (
    <div className="space-y-5">
      {/* Recommendation hero */}
      {cheapest && (
        <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-100 mb-2">
            {t.recommendedTitle}
          </p>
          <p className="text-lg font-bold text-white mb-4">
            {methodIcon[cheapest.method]} {cheapest.bank} — {cheapest.method}
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-green-100 text-xs mb-0.5">{t.totalCost}</p>
              <p className="text-2xl font-bold text-white">{fmt(cheapest.totalTHB)}</p>
            </div>
            {maxSavings > 0 && (
              <div className="text-right">
                <p className="text-green-100 text-xs mb-0.5">{t.recommendedSaves}</p>
                <p className="text-lg font-bold text-green-200">-{fmt(maxSavings)}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Selected option summary card */}
      {selected && (
        <div
          className={`rounded-2xl border-2 p-5 ${
            isSelectedCheapest
              ? "border-green-400 bg-green-50"
              : "border-blue-300 bg-blue-50"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {t.yourSelection}
              </p>
              <p className="text-lg font-bold text-gray-800">
                {methodIcon[selected.method]} {selected.bank} — {selected.method}
              </p>
            </div>
            {isSelectedCheapest && (
              <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                {t.bestDeal}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-0.5">{t.totalCost}</p>
              <p className="text-base font-bold text-gray-800">
                {fmt(selected.totalTHB)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-0.5">{t.fxFee}</p>
              <p className="text-base font-bold text-red-500">
                {fmt(selected.fxFeeTHB)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-0.5">{t.spreadCost}</p>
              <p className="text-base font-bold text-orange-500">
                {fmt(selected.spreadCostTHB)}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            {t.effectiveRate}: {selected.effectiveRate.toFixed(4)} THB/{currency} &nbsp;·&nbsp;
            {t.fee}: {selected.fxFeePercent}%
          </p>
        </div>
      )}

      {/* Savings banner */}
      {!isSelectedCheapest && potentialSaving > 0 && cheapest && (
        <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">
              {t.youCouldSave} {fmt(potentialSaving)}
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              {t.switchTo} <strong>{cheapest.bank}</strong> —{" "}
              <strong>{cheapest.method}</strong> {t.totalOf} {fmt(cheapest.totalTHB)}{" "}
              (rate {cheapest.effectiveRate.toFixed(4)} THB/{currency})
            </p>
          </div>
        </div>
      )}

      {/* All options by bank */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {t.allOptions}
        </h2>
        <div className="space-y-3">
          {banks.map((bankName) => {
            const bankResults = results.filter((r) => r.bank === bankName);
            return (
              <div
                key={bankName}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-700">{bankName}</p>
                  {bankMeta[bankName] && (
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">
                        ตรวจสอบล่าสุด: {bankMeta[bankName].lastVerified}
                      </p>
                      <a
                        href={bankMeta[bankName].sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        ดูแหล่งที่มา
                      </a>
                    </div>
                  )}
                </div>
                <div className="divide-y divide-gray-50">
                  {bankResults.map((r) => {
                    const isSelected =
                      r.bank === selectedBank && r.method === selectedMethod;
                    return (
                      <div
                        key={`${r.bank}-${r.method}`}
                        className={`flex items-center justify-between px-4 py-3 ${
                          r.isCheapest ? "bg-green-50" : ""
                        } ${isSelected ? "ring-1 ring-inset ring-blue-400" : ""}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{methodIcon[r.method]}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {r.method}
                            </p>
                            <p className="text-xs text-gray-400">
                              {r.effectiveRate.toFixed(4)} THB/{currency}
                              {r.fxFeePercent > 0 ? ` + ${r.fxFeePercent}% fee` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">
                            {fmt(r.totalTHB)}
                          </p>
                          {r.isCheapest && (
                            <span className="text-xs font-semibold text-green-600">
                              {t.cheapest}
                            </span>
                          )}
                          {isSelected && !r.isCheapest && (
                            <span className="text-xs font-semibold text-blue-500">
                              {t.selected}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500">ข้อจำกัดความรับผิดชอบ</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          เครื่องมือนี้ใช้ข้อมูลอัตราแลกเปลี่ยนแบบ mid-market จาก exchangerate.host
          และค่าธรรมเนียมที่เปิดเผยต่อสาธารณะของแต่ละธนาคาร
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          ผลลัพธ์เป็นการประมาณการเพื่อการเปรียบเทียบเท่านั้น อัตราจริงอาจแตกต่างตามช่วงเวลาการตัดยอดและเครือข่ายบัตร
        </p>
        <p className="text-xs text-gray-400">
          คำนวณจาก {amountCNY.toLocaleString("th-TH")} {currency} · {t.fxSource} {midRate.toFixed(4)} THB
        </p>
      </div>
    </div>
  );
}

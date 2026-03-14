"use client";

import { COUNTRIES, HOME_CURRENCIES, getAvailableMethods } from "@/lib/fxData";
import { banks } from "@/data/banks";
import { BankName, PaymentMethod } from "@/lib/types";
import { Translations } from "@/data/translations";

const PLACEHOLDER_AMOUNT: Record<string, string> = {
  CNY: "5000",
  JPY: "10000",
  KRW: "100000",
  SGD: "500",
  HKD: "2000",
  TWD: "3000",
  USD: "500",
  EUR: "500",
  GBP: "300",
  THB: "5000",
  AUD: "500",
  CAD: "500",
  INR: "20000",
  AED: "500",
  CHF: "300",
};

const METHOD_ICON: Record<string, string> = {
  "Credit Card": "💳",
  "Debit Card": "🏧",
  "Apple Pay": "🍎",
  "Google Pay": "🔵",
  "Alipay": "🔵",
  "WeChat Pay": "🟢",
  "ATM": "🏧",
  "Cash": "💵",
};

interface Props {
  country: string;
  amount: string;
  bank: BankName;
  method: PaymentMethod;
  homeCurrency: string;
  t: Translations;
  onCountryChange: (v: string) => void;
  onAmountChange: (v: string) => void;
  onBankChange: (v: BankName) => void;
  onMethodChange: (v: PaymentMethod) => void;
  onHomeCurrencyChange: (v: string) => void;
  onSwap?: () => void;
  canSwap?: boolean;
}

export default function PaymentForm({
  country,
  amount,
  bank,
  method,
  homeCurrency,
  t,
  onCountryChange,
  onAmountChange,
  onBankChange,
  onMethodChange,
  onHomeCurrencyChange,
  onSwap,
  canSwap,
}: Props) {
  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const availableMethods = getAvailableMethods(country);

  return (
    <div className="calculator-card relative z-10 bg-white dark:bg-[#0f172a] rounded-t-3xl rounded-b-2xl border border-blue-100 dark:border-white/10 p-6 space-y-5 shadow-[0_8px_48px_-8px_rgba(30,58,138,0.18),0_2px_8px_-2px_rgba(30,58,138,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      {/* Home Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {t.homeCurrencyLabel}
        </label>
        <select
          value={homeCurrency}
          onChange={(e) => onHomeCurrencyChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {HOME_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name} ({c.code})
            </option>
          ))}
        </select>
      </div>

      {/* Swap button */}
      <div className="flex items-center justify-center -my-1">
        <button
          type="button"
          onClick={onSwap}
          disabled={!canSwap}
          title="Swap currencies"
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            canSwap
              ? "border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
              : "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
          }`}
        >
          <span className="text-sm">⇅</span>
          <span>Swap</span>
        </button>
      </div>

      {/* Destination Country */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {t.countryLabel}
        </label>
        <select
          value={country}
          onChange={(e) => { onCountryChange(e.target.value); }}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name} ({c.currency})
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {t.amountLabel} ({selectedCountry?.currency ?? "USD"})
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium text-sm">
            {selectedCountry?.currency ?? ""}
          </span>
          <input
            type="number"
            min="0"
            step="any"
            placeholder={PLACEHOLDER_AMOUNT[selectedCountry?.currency ?? "USD"] ?? "0"}
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-16 pr-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Card Type — hidden when Cash or ATM is selected */}
      {method !== "Cash" && method !== "ATM" && (
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            {t.bankLabel}
          </label>
          <div className="flex flex-col gap-2">
            {Object.values(banks).map((b) => (
              <button
                key={b.name}
                onClick={() => onBankChange(b.name as BankName)}
                className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  bank === b.name
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.name}</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {b.fxFeePercent === 0 ? "0% fee" : `~${b.fxFeePercent}% fee`}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                  e.g. {b.examples}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {t.methodLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availableMethods.map((m) => (
            <button
              key={m}
              onClick={() => onMethodChange(m)}
              className={`rounded-xl border py-2.5 px-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                method === m
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <span>{METHOD_ICON[m] ?? "💳"}</span>
              <span>{m}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
          Apple Pay & Google Pay use your card&apos;s FX rate.
        </p>
      </div>
    </div>
  );
}

"use client";

import { COUNTRIES, BANKS, PAYMENT_METHODS } from "@/lib/fxData";
import { BankName, PaymentMethod } from "@/lib/types";
import { Translations } from "@/data/translations";

const PLACEHOLDER_AMOUNT: Record<string, string> = {
  CNY: "5000",
  JPY: "10000",
  KRW: "100000",
  SGD: "1000",
  HKD: "5000",
  TWD: "5000",
};

interface Props {
  country: string;
  amount: string;
  bank: BankName;
  method: PaymentMethod;
  t: Translations;
  onCountryChange: (v: string) => void;
  onAmountChange: (v: string) => void;
  onBankChange: (v: BankName) => void;
  onMethodChange: (v: PaymentMethod) => void;
}

export default function PaymentForm({
  country,
  amount,
  bank,
  method,
  t,
  onCountryChange,
  onAmountChange,
  onBankChange,
  onMethodChange,
}: Props) {
  const selectedCountry = COUNTRIES.find((c) => c.code === country);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-5">
      {/* Country */}
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
          {t.amountLabel} ({selectedCountry?.currency ?? "CNY"})
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium text-sm">
            {selectedCountry?.currency ?? "¥"}
          </span>
          <input
            type="number"
            min="0"
            step="any"
            placeholder={PLACEHOLDER_AMOUNT[selectedCountry?.currency ?? "CNY"] ?? "0"}
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-12 pr-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bank */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {t.bankLabel}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {BANKS.map((b) => (
            <button
              key={b}
              onClick={() => onBankChange(b as BankName)}
              className={`flex-none rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                bank === b
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {t.methodLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              onClick={() => onMethodChange(m)}
              className={`rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                method === m
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

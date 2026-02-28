export const cityRules: Record<
  string,
  Record<string, { vatReminder: string }>
> = {
  CN: {
    shanghai: {
      vatReminder:
        "Shanghai: VAT refund counters at Pudong Airport are located BEFORE immigration. Do not pass immigration before claiming.",
    },
    beijing: {
      vatReminder:
        "Beijing: You must stamp VAT documents before the security check. Refund counters are before immigration.",
    },
  },
};

/** Cities available per country code */
export const citiesByCountry: Record<string, { value: string; label: string }[]> = {
  CN: [
    { value: "shanghai", label: "Shanghai" },
    { value: "beijing", label: "Beijing" },
  ],
};

/** Look up a city-specific VAT reminder, or null if none applies. */
export function getCityVatReminder(
  countryCode: string,
  city: string
): string | null {
  return cityRules[countryCode]?.[city]?.vatReminder ?? null;
}

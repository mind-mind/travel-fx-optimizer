"use client";

import { useState, useEffect } from "react";
import PaymentForm from "@/components/PaymentForm";
import ResultsSection from "@/components/ResultsSection";
import VatRefundBanner from "@/components/VatRefundBanner";
import InsightPanel from "@/components/InsightPanel";
import ComparisonPanel from "@/components/ComparisonPanel";
import LearnSection from "@/components/LearnSection";
import CardRecommendation from "@/components/CardRecommendation";
import PopularPairs from "@/components/PopularPairs";
import TravelMoneyTips from "@/components/TravelMoneyTips";
import TravelMistakes from "@/components/TravelMistakes";
import InstantExample from "@/components/InstantExample";
import MoneyLostPanel from "@/components/MoneyLostPanel";
import BestMethodCard from "@/components/BestMethodCard";
import SharePanel from "@/components/SharePanel";
import TripEstimator from "@/components/TripEstimator";
import DestinationWarnings from "@/components/DestinationWarnings";
import DestinationApps from "@/components/DestinationApps";
import Link from "next/link";
import { BankName, PaymentMethod, ComparisonResult } from "@/lib/types";
import { calculateComparisons, getVatRefund } from "@/lib/calculator";
import { COUNTRIES, HOME_CURRENCIES } from "@/lib/fxData";
import { translations, Lang } from "@/data/translations";
import { fmtCurrency } from "@/lib/formatCurrency";
import { CODE_TO_COUNTRY } from "@/lib/guideConfig";
import { getFestivalsForMonth, COUNTRY_CODE_TO_GUIDE, getBudgetMonths } from "@/data/festivals";
import { DESTINATIONS } from "@/data/whereToTravel";
import { getTravelWarningsByCountry } from "@/lib/data/travelWarnings";
import { getTravelAppsByCountry } from "@/lib/data/travelApps";
import {
  ACTIVITY_CATEGORIES,
  ACTIVITY_COUNTRIES,
  getActivitiesByCountry,
  getActivitiesByCountryAndCategory,
  getCountryMeta,
  type ActivityCategory,
} from "@/lib/data/activities";

const RATE_REFRESH_MS = 600_000; // 10 minutes

interface WeatherData {
  location: string;
  currentTemp: number;
  currentCode: number;
  tomorrowRain: number;
  forecast: Array<{
    date: string;
    max: number;
    min: number;
    code: number;
  }>;
}

interface CustomActivity {
  id: string;
  name: string;
  estimatedCostUsd: number;
}

const ACTIVITY_CATEGORY_ICON: Record<ActivityCategory, string> = {
  chill: "🧘",
  relax: "🛀",
  adventure: "🏕️",
  culture: "🏛️",
  food: "🍜",
  nature: "🌿",
  shopping: "🛍️",
};

const WEATHER_LOCATIONS: Record<string, { city: string; lat: number; lon: number }> = {
  JP: { city: "Tokyo", lat: 35.6762, lon: 139.6503 },
  TH: { city: "Bangkok", lat: 13.7563, lon: 100.5018 },
  FR: { city: "Paris", lat: 48.8566, lon: 2.3522 },
  CN: { city: "Beijing", lat: 39.9042, lon: 116.4074 },
  KR: { city: "Seoul", lat: 37.5665, lon: 126.978 },
  SG: { city: "Singapore", lat: 1.3521, lon: 103.8198 },
  HK: { city: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  TW: { city: "Taipei", lat: 25.033, lon: 121.5654 },
  MY: { city: "Kuala Lumpur", lat: 3.139, lon: 101.6869 },
  VN: { city: "Hanoi", lat: 21.0278, lon: 105.8342 },
  ID: { city: "Jakarta", lat: -6.2088, lon: 106.8456 },
  PH: { city: "Manila", lat: 14.5995, lon: 120.9842 },
  IN: { city: "New Delhi", lat: 28.6139, lon: 77.209 },
  GB: { city: "London", lat: 51.5072, lon: -0.1276 },
  DE: { city: "Berlin", lat: 52.52, lon: 13.405 },
  IT: { city: "Rome", lat: 41.9028, lon: 12.4964 },
  ES: { city: "Madrid", lat: 40.4168, lon: -3.7038 },
  CH: { city: "Bern", lat: 46.948, lon: 7.4474 },
  TR: { city: "Istanbul", lat: 41.0082, lon: 28.9784 },
  PL: { city: "Warsaw", lat: 52.2297, lon: 21.0122 },
  US: { city: "Washington, DC", lat: 38.9072, lon: -77.0369 },
  CA: { city: "Ottawa", lat: 45.4215, lon: -75.6972 },
  MX: { city: "Mexico City", lat: 19.4326, lon: -99.1332 },
  AU: { city: "Sydney", lat: -33.8688, lon: 151.2093 },
  NZ: { city: "Auckland", lat: -36.8509, lon: 174.7645 },
  AE: { city: "Dubai", lat: 25.2048, lon: 55.2708 },
  SA: { city: "Riyadh", lat: 24.7136, lon: 46.6753 },
};

function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear";
  if ([1, 2].includes(code)) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Variable";
}

function getWeatherPlanHint(weather: WeatherData): string {
  const rainy = weather.tomorrowRain >= 60 || [61, 63, 65, 80, 81, 82].includes(weather.currentCode);
  if (rainy) {
    return "Where to go: indoor plans today (museums, markets, cafes). Keep outdoor spots for lower-rain windows.";
  }

  if (weather.currentTemp >= 32) {
    return "Where to go: early-morning outdoor spots, then shaded areas or indoor activities in the afternoon heat.";
  }

  if ([0, 1, 2].includes(weather.currentCode)) {
    return "Where to go: best day for outdoor attractions, parks, and city walking routes.";
  }

  return "Where to go: mix indoor and outdoor plans, and keep a flexible backup route.";
}

function getSeasonalHighlights(countryCode: string, month: number): string[] {
  const spring = [2, 3, 4].includes(month);
  const summer = [5, 6, 7].includes(month);
  const autumn = [8, 9, 10].includes(month);
  const winter = [11, 0, 1].includes(month);

  if (countryCode === "JP") {
    if (spring) return ["Cherry blossom festivals", "Spring temple events", "Seasonal wagashi food fairs"];
    if (summer) return ["Fireworks festivals", "Summer matsuri nights", "Coastal weekend getaways"];
    if (autumn) return ["Autumn foliage viewing", "Harvest food markets", "Cultural art weekends"];
    return ["Illumination events", "New year shrine visits", "Winter hot spring trips"];
  }

  if (countryCode === "TH") {
    if (summer) return ["Island day trips", "Night market food crawls", "Temple fair season"];
    return ["City cultural walks", "Seasonal street food events", "Weekend local festivals"];
  }

  if (countryCode === "FR") {
    if (spring || summer) return ["Open-air markets", "Riverside events", "Museum late-night programs"];
    return ["Seasonal gastronomy events", "Holiday street markets", "Indoor cultural festivals"];
  }

  if (winter) return ["Holiday markets and light shows", "Seasonal comfort food events", "Indoor cultural programs"];
  if (summer) return ["Outdoor weekend festivals", "City nightlife peaks", "Open-air food events"];
  return ["Local cultural events", "Seasonal regional food fairs", "Weekend community festivals"];
}

export default function Home() {
  const [country, setCountry] = useState("JP");
  const [homeCurrency, setHomeCurrency] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("homeCurrency") ?? "USD";
    }
    return "USD";
  });
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState<BankName>("Standard card");
  const [method, setMethod] = useState<PaymentMethod>("Credit Card");
  const [results, setResults] = useState<ComparisonResult[] | null>(null);

  // Sticky bottom bar dismiss
  const [stickyDismissed, setStickyDismissed] = useState(false);

  // Comparison mode
  const [compareMode, setCompareMode] = useState(false);
  const [bank2, setBank2] = useState<BankName>("No-fee card");
  const [method2, setMethod2] = useState<PaymentMethod>("Cash");
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && saved in translations) return saved;
      // Auto-detect from browser language
      const browserLang = navigator.language.toLowerCase().split("-")[0];
      const langMap: Record<string, Lang> = { en: "en", th: "th", es: "es", zh: "zh", ja: "ja", ko: "ko" };
      return langMap[browserLang] ?? "en";
    }
    return "en";
  });

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncDarkState = () => setDark(root.classList.contains("dark"));
    syncDarkState();

    const observer = new MutationObserver(syncDarkState);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Auto-detect home currency from IP on first visit (no saved preference)
  useEffect(() => {
    if (localStorage.getItem("homeCurrency")) return;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => {
        const currency = data.currency as string;
        const supported = HOME_CURRENCIES.map((c) => c.code);
        if (currency && supported.includes(currency)) {
          setHomeCurrency(currency);
          localStorage.setItem("homeCurrency", currency);
        }
      })
      .catch(() => {});
  }, []);

  function handleHomeCurrencyChange(v: string) {
    setHomeCurrency(v);
    localStorage.setItem("homeCurrency", v);
  }

  const t = translations[lang];

  const [midRate, setMidRate] = useState<number>(1.0);
  const [rateTimestamp, setRateTimestamp] = useState<string | null>(null);
  const [rateFallback, setRateFallback] = useState(false);
  const [rateLoading, setRateLoading] = useState(true);

  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const selectedDestination = DESTINATIONS.find((d) => d.countryCode === country);
  const currency = selectedCountry?.currency ?? "CNY";
  const selectedCountrySlug = COUNTRY_CODE_TO_GUIDE[country];
  const countryWarnings = selectedCountrySlug ? getTravelWarningsByCountry(selectedCountrySlug) : [];
  const countryApps = selectedCountrySlug ? getTravelAppsByCountry(selectedCountrySlug) : [];
  const activityCountry =
    selectedCountrySlug && ACTIVITY_COUNTRIES.includes(selectedCountrySlug)
      ? selectedCountrySlug
      : null;
  const activityCountryMeta = activityCountry ? getCountryMeta(activityCountry) : undefined;
  const allCountryActivities = activityCountry ? getActivitiesByCountry(activityCountry) : [];

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [usdToHomeRate, setUsdToHomeRate] = useState(1);
  const [usdRateLoading, setUsdRateLoading] = useState(true);
  const [activityCategory, setActivityCategory] = useState<ActivityCategory | "all">("all");
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [customActivities, setCustomActivities] = useState<CustomActivity[]>([]);
  const [customActivityName, setCustomActivityName] = useState("");
  const [customActivityCost, setCustomActivityCost] = useState("");
  const [travelNights, setTravelNights] = useState(5);
  const [hotelPerNight, setHotelPerNight] = useState(120);
  const [activeDashboardTab, setActiveDashboardTab] = useState("festival-calendar");

  const dashboardTabs = [
    { id: "festival-calendar", label: "Festival" },
    { id: "weather-section", label: "Weather" },
    { id: "warnings-section", label: "Risks" },
    { id: "updates-section", label: "Updates" },
    { id: "calculator-section", label: "Calculator" },
    { id: "apps-section", label: "Apps" },
    { id: "planner-section", label: "Planner" },
  ] as const;

  const destCurrency = selectedCountry?.currency;
  const canSwap =
    !!destCurrency &&
    HOME_CURRENCIES.some((c) => c.code === destCurrency) &&
    COUNTRIES.some((c) => c.currency === homeCurrency);

  function handleSwap() {
    if (!canSwap || !destCurrency) return;
    const newCountry = COUNTRIES.find((c) => c.currency === homeCurrency);
    if (!newCountry) return;
    setHomeCurrency(destCurrency);
    localStorage.setItem("homeCurrency", destCurrency);
    setCountry(newCountry.code);
    setAmount("");
    setResults(null);
  }

  function handleCountryChange(v: string) {
    setCountry(v);
    setAmount("");
    setResults(null);
  }

  function handleMethodChange(m: PaymentMethod) {
    setMethod(m);
    if (m === "Cash") {
      setBank("Cash" as BankName);
    } else if (bank === ("Cash" as BankName)) {
      setBank("Standard card");
    }
    // ATM and all other methods keep the current card tier selection
  }

  function togglePlannedActivity(activityId: string) {
    setSelectedActivityIds((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  }

  function addCustomActivity() {
    const normalizedName = customActivityName.trim();
    const parsedCost = Number(customActivityCost);
    if (!normalizedName || !Number.isFinite(parsedCost) || parsedCost <= 0) return;

    setCustomActivities((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}-${prev.length}`,
        name: normalizedName,
        estimatedCostUsd: parsedCost / Math.max(usdToHomeRate, 0.000001),
      },
    ]);
    setCustomActivityName("");
    setCustomActivityCost("");
  }

  function removeCustomActivity(customId: string) {
    setCustomActivities((prev) => prev.filter((item) => item.id !== customId));
  }

  function jumpToSection(sectionId: string) {
    setActiveDashboardTab(sectionId);
  }

  // Fetch live FX rate; re-runs whenever the destination currency or home currency changes
  useEffect(() => {
    setRateLoading(true);
    let disposed = false;

    const fetchRate = () => {
      fetch(`/api/fx?from=${currency}&to=${homeCurrency}`)
        .then((r) => r.json())
        .then((data) => {
          if (disposed) return;
          setMidRate(data.rate ?? 1.0);
          setRateTimestamp(data.timestamp ?? new Date().toISOString());
          setRateFallback(!!data.fallback);
        })
        .catch(() => {
          if (disposed) return;
          setMidRate(1.0);
          setRateFallback(true);
          setRateTimestamp(new Date().toISOString());
        })
        .finally(() => {
          if (!disposed) setRateLoading(false);
        });
    };

    fetchRate();
    const timer = setInterval(fetchRate, RATE_REFRESH_MS);

    return () => {
      disposed = true;
      clearInterval(timer);
    };
  }, [currency, homeCurrency]);

  useEffect(() => {
    let disposed = false;
    setUsdRateLoading(true);

    const fetchUsdRate = () => {
      fetch(`/api/fx?from=USD&to=${homeCurrency}`)
        .then((r) => r.json())
        .then((data) => {
          if (disposed) return;
          setUsdToHomeRate(data.rate ?? 1);
        })
        .catch(() => {
          if (disposed) return;
          setUsdToHomeRate(1);
        })
        .finally(() => {
          if (!disposed) setUsdRateLoading(false);
        });
    };

    fetchUsdRate();
    const timer = setInterval(fetchUsdRate, RATE_REFRESH_MS);

    return () => {
      disposed = true;
      clearInterval(timer);
    };
  }, [homeCurrency]);

  useEffect(() => {
    setSelectedActivityIds([]);
    setCustomActivities([]);
    setActivityCategory("all");
    if (activityCountryMeta) {
      setHotelPerNight(activityCountryMeta.hotelPerNightUSD);
    }
  }, [activityCountry, activityCountryMeta?.hotelPerNightUSD]);

  useEffect(() => {
    const location = WEATHER_LOCATIONS[country] ?? WEATHER_LOCATIONS.JP;
    const controller = new AbortController();

    setWeatherLoading(true);
    setWeatherError(null);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7&timezone=auto`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Weather API failed");
        return res.json();
      })
      .then((data) => {
        const dailyTimes: string[] = data?.daily?.time ?? [];
        const maxTemps: number[] = data?.daily?.temperature_2m_max ?? [];
        const minTemps: number[] = data?.daily?.temperature_2m_min ?? [];
        const weatherCodes: number[] = data?.daily?.weathercode ?? [];
        const rainProb: number[] = data?.daily?.precipitation_probability_max ?? [];

        setWeather({
          location: location.city,
          currentTemp: Math.round(data?.current_weather?.temperature ?? 0),
          currentCode: Number(data?.current_weather?.weathercode ?? 0),
          tomorrowRain: Math.round(rainProb[1] ?? rainProb[0] ?? 0),
          forecast: dailyTimes.slice(0, 5).map((date, index) => ({
            date,
            max: Math.round(maxTemps[index] ?? 0),
            min: Math.round(minTemps[index] ?? 0),
            code: Number(weatherCodes[index] ?? 0),
          })),
        });
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setWeatherError("Unable to load weather right now");
      })
      .finally(() => setWeatherLoading(false));

    return () => controller.abort();
  }, [country]);

  // Auto-compare whenever amount or live rate changes
  useEffect(() => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      setResults(null);
      return;
    }
    setResults(calculateComparisons(parsed, midRate));
  }, [amount, midRate]);

  // Reset sticky bar whenever a new result is calculated
  useEffect(() => { setStickyDismissed(false); }, [results]);

  const parsedAmount = parseFloat(amount);
  const vat = parsedAmount > 0 ? getVatRefund(parsedAmount, country) : null;
  const visibleActivities = activityCountry
    ? getActivitiesByCountryAndCategory(activityCountry, activityCategory)
    : [];
  const selectedBaseActivities = allCountryActivities.filter((a) =>
    selectedActivityIds.includes(a.id)
  );
  const toHomeCurrency = (usdAmount: number) => usdAmount * usdToHomeRate;
  const activityCost =
    selectedBaseActivities.reduce((sum, item) => sum + toHomeCurrency(item.estimatedCost), 0) +
    customActivities.reduce((sum, item) => sum + toHomeCurrency(item.estimatedCostUsd), 0);
  const hotelCost = toHomeCurrency(hotelPerNight) * travelNights;
  const totalTripCost = hotelCost + activityCost;

  /** Format rate — use more decimals for small-unit currencies */
  function formatRate(rate: number, foreignCurr: string): string {
    const decimals = ["JPY", "KRW", "IDR", "VND"].includes(foreignCurr) ? 6 : 4;
    return rate.toFixed(decimals);
  }

  return (
    <main
      className="min-h-screen dark:bg-gray-950"
      style={dark ? undefined : { background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)" }}
    >
      {/* Hero + travel context + calculator */}
      <section
        className="px-4 pt-12 pb-16 min-h-[900px]"
        style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)" }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">{t.forTravelers}</p>
              <h1 className="text-2xl font-bold text-white leading-tight">
                {t.title}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                {t.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="text-lg font-semibold text-white">
              Travel overview for {selectedCountry?.name}
            </p>
            <p className="mt-2 text-sm text-blue-100 leading-relaxed">
              We help travelers understand the real cost of paying abroad.
            </p>
            <div className="mt-3 rounded-lg bg-black/10 px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">Compare</p>
              <ul className="mt-1.5 space-y-1 text-sm text-blue-100">
                <li>• FX conversion fees</li>
                <li>• Bank card fees</li>
                <li>• ATM withdrawal costs</li>
                <li>• Hidden currency markups</li>
              </ul>
            </div>
            <p className="mt-3 text-xs text-blue-100">
              Use the calculator below to estimate your real travel spending.
            </p>
          </div>

          <Link
            href="/where-to-travel"
            className="mt-3 block rounded-2xl border border-white/25 bg-white/10 px-4 py-3 hover:bg-white/20 transition-colors"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-200">
              ✨ Where should you travel with this budget?
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              🌍 Discover best-value destinations and the best travel timing.
            </p>
            <p className="mt-1 text-xs text-blue-100">🧭 Open Where to Travel →</p>
          </Link>

          <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest">
              🛫 Where are you traveling?
            </p>

            <div className="mt-3">
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code} className="text-gray-900 dark:text-gray-100">
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-3 shadow-sm">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Destination
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
              {selectedCountry?.flag} {selectedCountry?.name}
            </p>
          </div>

          {/* Live FX rate card */}
          <div className="mt-4 rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-3 shadow-sm">
            {rateLoading ? (
              <span className="text-gray-500 dark:text-gray-400 text-xs">{t.loadingRate}</span>
            ) : (
              <>
                {/* Rate row */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    1 {currency} = {formatRate(midRate, currency)} {homeCurrency}
                  </span>
                  <span
                    title="อัตรากลางจากตลาด (Mid-market rate) อาจแตกต่างจากอัตราที่ธนาคารเรียกเก็บจริง"
                    className={`cursor-help text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      rateFallback
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-green-400 text-green-900"
                    }`}
                  >
                    {rateFallback ? t.indicativeRate : t.liveRate}
                  </span>
                </div>
                {/* Source row */}
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.fxSourceLabel} exchangerate.host (mid-market rate)
                  </p>
                  {rateTimestamp && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.fxUpdatedLabel}{" "}
                      {new Date(rateTimestamp).toLocaleString("en", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Destination context dashboard */}
          {(() => {
            const guideCountry = CODE_TO_COUNTRY[country];
            const festivalKey = COUNTRY_CODE_TO_GUIDE[country];
            const currentMonth = new Date().getMonth();
            const monthsWithFestivals = festivalKey
              ? Array.from({ length: 12 }, (_, i) => getFestivalsForMonth(i, festivalKey))
              : [];
            const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const thisMonthFestivals = festivalKey ? getFestivalsForMonth(currentMonth, festivalKey) : [];
            const highCrowdNow = thisMonthFestivals.filter((f) => f.crowdLevel === "high" && f.priceImpact);
            const seasonalHighlights = getSeasonalHighlights(country, currentMonth);

            const travelUpdates: string[] = [];
            if (highCrowdNow.length > 0) {
              travelUpdates.push(`Crowded travel season due to ${highCrowdNow[0].name}.`);
            }
            if (weather && weather.tomorrowRain >= 55) {
              travelUpdates.push(`Rain risk is elevated tomorrow (${weather.tomorrowRain}% chance).`);
            }
            const safetyWarning = countryWarnings.find((w) => w.category === "safety" || w.category === "scam");
            if (safetyWarning) {
              travelUpdates.push(safetyWarning.message);
            }
            if (travelUpdates.length === 0) {
              travelUpdates.push("No major travel disruptions are flagged right now.");
            }

            const firstFestival = thisMonthFestivals[0];
            const keyRisk = countryWarnings.find((w) => w.category === "scam" || w.category === "safety") ?? countryWarnings[0];
            const weatherSummary = weather
              ? `${weather.currentTemp}C · ${getWeatherLabel(weather.currentCode)}`
              : "Weather loading";

            const budgetMonths = festivalKey
              ? getBudgetMonths(festivalKey)
                  .filter((m) => m !== currentMonth)
                  .slice(0, 3)
                  .map((m) => shortMonths[m])
              : [];

            return (
              <div className="mt-4 space-y-3">
                <section className="rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Start here</p>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-gray-100">See your trip timing, risks, and real cost in under 20 seconds.</p>
                    </div>
                    <a
                      href="#calculator-section"
                      className="shrink-0 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      Start calculator
                    </a>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a href="#festival-calendar" className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2 hover:bg-blue-50 transition-colors">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Festival timing</p>
                      <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                        {firstFestival ? `${firstFestival.emoji} ${firstFestival.name}` : "Check best months to avoid peaks"}
                      </p>
                    </a>
                    <a href="#weather-section" className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2 hover:bg-blue-50 transition-colors">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Weather route</p>
                      <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">{weatherSummary}</p>
                    </a>
                    <a href="#warnings-section" className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2 hover:bg-blue-50 transition-colors">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Risk alerts</p>
                      <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                        {keyRisk ? keyRisk.message : "No major destination warning right now"}
                      </p>
                    </a>
                    <a href="#updates-section" className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2 hover:bg-blue-50 transition-colors">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Money impact</p>
                      <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">{travelUpdates[0]}</p>
                    </a>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <div role="tablist" aria-label="Travel dashboard sections" className="flex w-full gap-1.5 overflow-x-auto pb-1">
                      {dashboardTabs.map((tab) => {
                        const active = activeDashboardTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            role="tab"
                            aria-selected={active}
                            onClick={() => jumpToSection(tab.id)}
                            className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                              active
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {festivalKey && (
                  <section
                    id="festival-calendar"
                    className={`${activeDashboardTab === "festival-calendar" ? "block" : "hidden"} rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm`}
                  >
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                      🎉 Festival calendar — {selectedCountry?.name}
                    </p>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {shortMonths.map((m, i) => {
                        const festivals = monthsWithFestivals[i];
                        const hasFestival = festivals.length > 0;
                        const isNow = i === currentMonth;
                        return (
                          <div key={i} className="relative shrink-0">
                            {hasFestival ? (
                              guideCountry ? (
                                <Link
                                  href={`/${lang}/how-to-pay/${guideCountry}#festivals`}
                                  title={festivals.map((f) => f.name).join(", ")}
                                  className={`flex flex-col items-center rounded-xl px-2.5 py-2 text-center transition-all ${
                                    isNow
                                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40 ring-2 ring-purple-300/50"
                                      : "bg-purple-500/35 hover:bg-purple-500/55 text-white border border-purple-400/40"
                                  }`}
                                >
                                  <span className="text-[10px] font-bold leading-none">{m}</span>
                                  <span className="text-[13px] leading-none mt-1">{festivals[0].emoji}</span>
                                </Link>
                              ) : (
                                <div
                                  title={festivals.map((f) => f.name).join(", ")}
                                  className={`flex flex-col items-center rounded-xl px-2.5 py-2 text-center ${
                                    isNow
                                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40 ring-2 ring-purple-300/50"
                                      : "bg-purple-500/35 text-white border border-purple-400/40"
                                  }`}
                                >
                                  <span className="text-[10px] font-bold leading-none">{m}</span>
                                  <span className="text-[13px] leading-none mt-1">{festivals[0].emoji}</span>
                                </div>
                              )
                            ) : (
                              <div
                                className={`flex flex-col items-center rounded-xl px-2.5 py-2 text-center border ${
                                  isNow
                                    ? "bg-gray-200 text-gray-800 dark:text-gray-100 border-gray-300"
                                    : "bg-[#f5f7fb] dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 border-black/5"
                                }`}
                              >
                                <span className="text-[10px] font-bold leading-none">{m}</span>
                                <span className="text-[13px] leading-none mt-1 opacity-0">·</span>
                              </div>
                            )}
                            {isNow && (
                              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-sm shadow-white/50" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                <section
                  id="weather-section"
                  className={`${activeDashboardTab === "weather-section" ? "block" : "hidden"} rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm`}
                >
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Weather</p>
                  <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-gray-100">Weather in {selectedCountry?.name}</h3>
                  {weatherLoading ? (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Loading weather...</p>
                  ) : weatherError || !weather ? (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{weatherError ?? "Weather unavailable"}</p>
                  ) : (
                    <div className="mt-2 space-y-3">
                      <div className="rounded-xl bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {weather.location}: {weather.currentTemp}C • {getWeatherLabel(weather.currentCode)}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                          {weather.tomorrowRain >= 55
                            ? `Rain expected tomorrow (${weather.tomorrowRain}% chance)`
                            : `Tomorrow rain chance: ${weather.tomorrowRain}%`}
                        </p>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {weather.forecast.map((day) => {
                          const weekday = new Date(day.date).toLocaleDateString("en", { weekday: "short" });
                          return (
                            <div key={day.date} className="rounded-lg bg-[#f5f7fb] dark:bg-gray-800/70 px-1.5 py-2 text-center">
                              <p className="text-[10px] font-semibold text-gray-600 dark:text-gray-300">{weekday}</p>
                              <p className="mt-0.5 text-[10px] text-gray-900 dark:text-gray-100">{day.max}°/{day.min}°</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Where to go</p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-700 dark:text-gray-200">{getWeatherPlanHint(weather)}</p>
                      </div>
                    </div>
                  )}
                </section>

                <div id="warnings-section" className={activeDashboardTab === "warnings-section" ? "block" : "hidden"}>
                  <DestinationWarnings
                    countryName={selectedCountry?.name ?? "this destination"}
                    warnings={countryWarnings}
                  />
                </div>

                <section
                  id="updates-section"
                  className={`${activeDashboardTab === "updates-section" ? "block" : "hidden"} rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm`}
                >
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Travel updates</p>
                  <ul className="mt-2 space-y-1.5">
                    {travelUpdates.slice(0, 3).map((item, index) => (
                      <li key={`${index}-${item.slice(0, 18)}`} className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  id="calculator-section"
                  className={`${activeDashboardTab === "calculator-section" ? "block" : "hidden"} rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm`}
                >
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">FX calculator</p>
                  <div className="mt-2">
                    <PaymentForm
                      country={country}
                      amount={amount}
                      bank={bank}
                      method={method}
                      homeCurrency={homeCurrency}
                      t={t}
                      onCountryChange={handleCountryChange}
                      onAmountChange={setAmount}
                      onBankChange={setBank}
                      onMethodChange={handleMethodChange}
                      onHomeCurrencyChange={handleHomeCurrencyChange}
                      onSwap={handleSwap}
                      canSwap={canSwap}
                      showCountryField={false}
                    />
                  </div>
                </section>

                {!results && activeDashboardTab === "calculator-section" && (
                  <section className="rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Quick cost example</p>
                    <InstantExample
                      currency={currency}
                      homeCurrency={homeCurrency}
                      midRate={midRate}
                      rateLoading={rateLoading}
                      t={t}
                    />
                  </section>
                )}

                <div id="apps-section" className={activeDashboardTab === "apps-section" ? "block" : "hidden"}>
                  <DestinationApps countryName={selectedCountry?.name ?? "this destination"} apps={countryApps} />
                </div>

                <section
                  id="planner-section"
                  className={`${activeDashboardTab === "planner-section" ? "block" : "hidden"} rounded-2xl border border-black/5 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4`}
                >
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Activities planner</p>
                  {activityCountry ? (
                    <div className="mt-2 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setActivityCategory("all")}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            activityCategory === "all" ? "bg-blue-600 text-white" : "bg-[#f5f7fb] dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          All
                        </button>
                        {ACTIVITY_CATEGORIES.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => setActivityCategory(category.value)}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              activityCategory === category.value ? "bg-blue-600 text-white" : "bg-[#f5f7fb] dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {ACTIVITY_CATEGORY_ICON[category.value]} {category.label}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {visibleActivities.map((activity) => {
                          const selected = selectedActivityIds.includes(activity.id);
                          return (
                            <button
                              key={activity.id}
                              onClick={() => togglePlannedActivity(activity.id)}
                              className={`w-full rounded-xl border px-3 py-2 text-left transition-colors ${
                                selected ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {ACTIVITY_CATEGORY_ICON[activity.category]} {activity.name}
                                </p>
                                <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{fmtCurrency(toHomeCurrency(activity.estimatedCost), homeCurrency)}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-3 space-y-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Custom activity</p>
                        <input
                          value={customActivityName}
                          onChange={(e) => setCustomActivityName(e.target.value)}
                          placeholder="Activity name"
                          className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                        />
                        <div className="flex gap-2">
                          <input
                            value={customActivityCost}
                            onChange={(e) => setCustomActivityCost(e.target.value)}
                            placeholder={`Estimated cost (${homeCurrency})`}
                            type="number"
                            min={0}
                            className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                          />
                          <button onClick={addCustomActivity} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
                            Add
                          </button>
                        </div>
                      </div>

                      {(selectedBaseActivities.length > 0 || customActivities.length > 0) && (
                        <div className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-3 space-y-1.5">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Selected activities</p>
                          {selectedBaseActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-200">
                              <span>{ACTIVITY_CATEGORY_ICON[activity.category]} {activity.name}</span>
                              <span className="font-semibold">{fmtCurrency(toHomeCurrency(activity.estimatedCost), homeCurrency)}</span>
                            </div>
                          ))}
                          {customActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-200">
                              <span>🧩 {activity.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{fmtCurrency(toHomeCurrency(activity.estimatedCostUsd), homeCurrency)}</span>
                                <button onClick={() => removeCustomActivity(activity.id)} className="text-red-500 hover:text-red-600">
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-3 space-y-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Trip estimate</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="mb-1 text-[11px] text-gray-500 dark:text-gray-400">Nights</p>
                            <input
                              type="number"
                              min={1}
                              value={travelNights}
                              onChange={(e) => setTravelNights(Math.max(1, Number(e.target.value || 1)))}
                              className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                            />
                          </div>
                          <div>
                            <p className="mb-1 text-[11px] text-gray-500 dark:text-gray-400">Hotel / night ({homeCurrency})</p>
                            <input
                              type="number"
                              min={0}
                              value={Number(toHomeCurrency(hotelPerNight).toFixed(2))}
                              onChange={(e) => {
                                const homeValue = Math.max(0, Number(e.target.value || 0));
                                setHotelPerNight(homeValue / Math.max(usdToHomeRate, 0.000001));
                              }}
                              className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-700 dark:text-gray-200">
                          <p>Hotel cost: <span className="font-semibold">{fmtCurrency(hotelCost, homeCurrency)}</span></p>
                          <p>Activity cost: <span className="font-semibold">{fmtCurrency(activityCost, homeCurrency)}</span></p>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Total trip cost: {fmtCurrency(totalTripCost, homeCurrency)}</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {usdRateLoading ? "Updating rate..." : `Planner rate: 1 USD = ${usdToHomeRate.toFixed(4)} ${homeCurrency}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">Activity planner is available for Japan, Thailand, Korea, China, and Singapore.</p>
                  )}
                </section>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-8 pb-28 space-y-5">

        {/* ── AFTER CALCULATION ── */}
        {results && parsedAmount > 0 && (() => {
          const selected = results.find((r) => r.bank === bank && r.method === method);
          const cheapest = results.find((r) => r.isCheapest);
          const mostExpensive = results.reduce((a, b) => (a.totalHome > b.totalHome ? a : b));
          const savings = cheapest ? mostExpensive.totalHome - cheapest.totalHome : 0;
          const lossVsMid = selected ? selected.totalHome - parsedAmount * midRate : 0;
          const midRateTotal = parsedAmount * midRate;
          const lossVsMidPercent = midRateTotal > 0 ? (lossVsMid / midRateTotal) * 100 : 0;
          return (
            <>
              {/* 1. Money Lost — most prominent result */}
              {selected && (
                <MoneyLostPanel
                  selected={selected}
                  midRate={midRate}
                  amountForeign={parsedAmount}
                  currency={currency}
                  homeCurrency={homeCurrency}
                  results={results}
                  countryCode={country}
                  lang={lang}
                  t={t}
                />
              )}

              {/* 2. Best Method Card */}
              <BestMethodCard results={results} homeCurrency={homeCurrency} countryCode={country} lang={lang} t={t} />

              {/* 3. VAT refund banner */}
              {vat?.vatEligible && (
                <VatRefundBanner
                  amount={parsedAmount}
                  estimatedRefund={vat.estimatedRefund}
                  vatRate={vat.vatRate}
                  minAmount={vat.minAmount}
                  meetsMinimum={vat.meetsMinimum}
                  currency={currency}
                  t={t}
                />
              )}

              {/* 4. Full comparison table — best callout suppressed (rendered above as BestMethodCard) */}
              <ResultsSection
                results={results}
                selectedBank={bank}
                selectedMethod={method}
                amountForeign={parsedAmount}
                midRate={midRate}
                currency={currency}
                homeCurrency={homeCurrency}
                rateTimestamp={rateTimestamp}
                rateFallback={rateFallback}
                refreshMinutes={Math.floor(RATE_REFRESH_MS / 60_000)}
                t={t}
                showBestCallout={false}
              />

              {/* 4. Insight panel */}
              {selected && (
                <InsightPanel
                  selected={selected}
                  midRate={midRate}
                  amountForeign={parsedAmount}
                  currency={currency}
                  homeCurrency={homeCurrency}
                  countryCode={country}
                  t={t}
                  lang={lang}
                />
              )}

              {/* 5. Card recommendation */}
              {selected && (
                <CardRecommendation
                  selected={selected}
                  amountForeign={parsedAmount}
                  midRate={midRate}
                  method={method}
                  homeCurrency={homeCurrency}
                  t={t}
                />
              )}

              {/* 7. Comparison mode */}
              <div className="space-y-3">
                <button
                  onClick={() => setCompareMode((v) => !v)}
                  className={`w-full rounded-xl border py-3 text-sm font-semibold transition-colors ${
                    compareMode
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {compareMode ? t.compareToggleClose : t.compareToggleOpen}
                </button>

                {compareMode && (
                  <ComparisonPanel
                    results={results}
                    midRate={midRate}
                    amountForeign={parsedAmount}
                    currency={currency}
                    homeCurrency={homeCurrency}
                    bank1={bank}
                    method1={method}
                    bank2={bank2}
                    method2={method2}
                    onBank2Change={setBank2}
                    onMethod2Change={setMethod2}
                    t={t}
                  />
                )}
              </div>

              {/* 8. Share result — placed after Compare vs Mid-market Rate */}
              {selected && (
                <SharePanel
                  homeCurrency={homeCurrency}
                  currency={currency}
                  amountForeign={parsedAmount}
                  totalHome={selected.totalHome}
                  bestMethod={cheapest ? `${cheapest.bank} (${cheapest.method})` : `${selected.bank} (${selected.method})`}
                  savings={savings}
                  lossVsMid={lossVsMid}
                  lossVsMidPercent={lossVsMidPercent}
                  countryCode={country}
                  countryName={selectedCountry?.name ?? ""}
                  countryFlag={selectedCountry?.flag ?? ""}
                  midRate={midRate}
                />
              )}

              {/* 9. Trip FX Fee Estimator */}
              <TripEstimator
                countryCode={country}
                countryName={selectedCountry?.name ?? ""}
                countryFlag={selectedCountry?.flag ?? ""}
                homeCurrency={homeCurrency}
              />
            </>
          );
        })()}

        {/* ── ALWAYS VISIBLE ── */}

        {/* Travel mistakes */}
        <TravelMistakes />

        {/* Where to Travel promo */}
        <Link
          href="/where-to-travel"
          className="block rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
        >
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest">
                {t.wttBadge}
              </p>
              <p className="text-base font-bold text-white leading-snug">
                {t.wttTitle}
              </p>
              <p className="text-xs text-blue-200 leading-relaxed hidden sm:block">
                {t.wttSubtitle}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 whitespace-nowrap transition-colors">
              {t.wttExploreCta}
            </span>
          </div>
        </Link>

        {/* Learn Before You Go */}
        <LearnSection countryCode={country} t={t} lang={lang} />

        {/* Popular currency pair quick links */}
        <PopularPairs />

        {/* Travel money tips */}
        <TravelMoneyTips t={t} />
      </div>

      {/* Sticky action bar ── shown when user is overpaying and hasn't dismissed */}
      {results && parsedAmount > 0 && !stickyDismissed && (() => {
        const sel = results.find((r) => r.bank === bank && r.method === method);
        if (!sel) return null;
        const loss = sel.totalHome - parsedAmount * midRate;
        if (loss < 0.5) return null;
        const cheap = results.find((r) => r.isCheapest);
        const saving = cheap ? sel.totalHome - cheap.totalHome : 0;
        const gc = CODE_TO_COUNTRY[country] ?? null;
        const gp = gc ? `/${lang}/how-to-pay/${gc}` : null;
        return (
          <div className="fixed bottom-0 inset-x-0 z-50 shadow-2xl">
            <div
              className="text-white"
              style={{ background: "linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)" }}
            >
              <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
                <span className="text-xl shrink-0" aria-hidden>💸</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight">
                    {t.stickyOverpaying} {fmtCurrency(loss, homeCurrency)} {t.stickyRightNow}
                  </p>
                  {saving > 0.5 && (
                    <p className="text-xs text-red-200 leading-tight mt-0.5">
                      {t.stickySwitchSave} {fmtCurrency(saving, homeCurrency)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {gp && (
                    <Link
                      href={gp}
                      className="rounded-lg bg-white text-red-700 font-bold text-xs px-3 py-2 hover:bg-red-50 transition-colors whitespace-nowrap"
                    >
                      {t.stickyHowToSave}
                    </Link>
                  )}
                  <button
                    onClick={() => setStickyDismissed(true)}
                    className="text-red-200 hover:text-white text-sm leading-none"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}


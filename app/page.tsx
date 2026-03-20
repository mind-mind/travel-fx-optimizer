"use client";

import { useState, useEffect, useRef } from "react";
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
import TravelSafetyNews from "@/components/TravelSafetyNews";
import type { TravelAdvisory, BannedAirline } from "@/components/TravelSafetyNews";
import Link from "next/link";
import { BankName, PaymentMethod, ComparisonResult } from "@/lib/types";
import { calculateComparisons, getVatRefund } from "@/lib/calculator";
import { COUNTRIES, HOME_CURRENCIES } from "@/lib/fxData";
import { translations, Lang } from "@/data/translations";
import { fmtCurrency, fmtCurrencyRound } from "@/lib/formatCurrency";
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
  /** true when data comes from last year's archive instead of the live 16-day forecast */
  isHistorical?: boolean;
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

interface TravelNewsData {
  advisories: Record<string, TravelAdvisory>;
  bannedAirlines: BannedAirline[];
  fetchedAt: string;
  fallback?: boolean;
}

type ExploreFilter =
  | "all"
  | "festival"
  | "weather"
  | "risks"
  | "cost"
  | "calculator"
  | "apps"
  | "planner";

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

function getWeatherLabel(code: number, lx: Record<string, string>): string {
  if (code === 0) return lx.weatherClear ?? "Clear";
  if ([1, 2].includes(code)) return lx.weatherPartlyCloudy ?? "Partly cloudy";
  if (code === 3) return lx.weatherCloudy ?? "Cloudy";
  if ([45, 48].includes(code)) return lx.weatherFog ?? "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return lx.weatherDrizzle ?? "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return lx.weatherRain ?? "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return lx.weatherSnow ?? "Snow";
  if ([95, 96, 99].includes(code)) return lx.weatherStorm ?? "Thunderstorm";
  return lx.weatherVariable ?? "Variable";
}

function getWeatherPlanHint(weather: WeatherData, lx: Record<string, string>): string {
  const rainy = weather.tomorrowRain >= 60 || [61, 63, 65, 80, 81, 82].includes(weather.currentCode);
  if (rainy) return lx.weatherHintRainy ?? "Where to go: indoor plans today (museums, markets, cafes). Keep outdoor spots for lower-rain windows.";
  if (weather.currentTemp >= 32) return lx.weatherHintHot ?? "Where to go: early-morning outdoor spots, then shaded areas or indoor activities in the afternoon heat.";
  if ([0, 1, 2].includes(weather.currentCode)) return lx.weatherHintClear ?? "Where to go: best day for outdoor attractions, parks, and city walking routes.";
  return lx.weatherHintDefault ?? "Where to go: mix indoor and outdoor plans, and keep a flexible backup route.";
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

const LANDING_COPY: Record<Lang, Record<string, string>> = {
  en: {
    heroTitle: "Know the Best Time to Travel - Before You Book",
    heroSubtitle: "See festivals, weather risks, crowds, and real travel cost impact in under 20 seconds.",
    startCalculator: "Start Travel Calculator",
    helper: "Answer 3 quick questions to see the best time to travel.",
    seeExample: "See Example",
    howWorks: "How TravelWiseRate Works",
    step1: "Choose destination and travel dates",
    step2: "We analyze festivals, weather, crowd levels, and travel risks",
    step3: "You get a travel timing score and insights",
    travelStart: "Travel start",
    travelEnd: "Travel end",
    exploreInsights: "Explore Insights",
    allInsights: "All insights",
    festival: "Festival",
    weather: "Weather",
    risks: "Risks",
    cost: "Cost",
    apps: "Apps",
    planner: "Planner",
    weatherInsights: "Weather Insights",
    weatherConditions: "Weather Conditions in",
    loadingWeather: "Loading weather...",
    weatherUnavailable: "Weather unavailable",
    travelComfort: "Travel comfort tip",
    estimatedFlightCost: "Estimated flight cost",
    flightBased: "Based on route averages and shown in",
    festivalCalendar: "Festival Calendar",
    festivalDesc: "Discover major festivals and seasonal events before planning your trip.",
    scoreTitle: "Travel Timing Score",
    smartAlt: "Smart alternative date suggestion",
    yourSelectedDates: "Your selected dates",
    betterOption: "Better option",
    alreadyGood: "Your current window is already one of the better options.",
    altReason: "Reason: lower hotel prices, less crowded routes, still good festival timing.",
    shareMyTiming: "Share My Travel Timing",
    costImpactTitle: "Cost / Money Impact",
    seasonHighlights: "Season highlights",
    priceDirection: "Price direction",
    highDemand: "High-demand window: expect higher prices.",
    balancedDemand: "More balanced demand window.",
    exampleTitle: "Example Travel Insight",
    bestTimeToVisit: "Best Time to Visit",
    bestMonths: "Best months",
    avoid: "Avoid",
    avoidText: "Peak holiday weeks and high crowd festival windows.",
    scoreExcellent: "Excellent travel timing",
    scoreMixed: "Mixed conditions",
    scoreCrowded: "Crowded or expensive",
    scoreNotRec: "Not recommended",
    finalStep: "Final step",
    finalTitle: "Plan Your Trip Smarter",
  },
  th: {
    heroTitle: "รู้ช่วงเวลาที่ดีที่สุดก่อนจองทริป",
    heroSubtitle: "ดูเทศกาล ความเสี่ยงอากาศ ความหนาแน่นคน และผลกระทบค่าใช้จ่ายจริงใน 20 วินาที",
    startCalculator: "เริ่มคำนวณทริป",
    helper: "ตอบ 3 คำถามสั้นๆ เพื่อดูช่วงเวลาที่เหมาะที่สุด",
    seeExample: "ดูตัวอย่าง",
    howWorks: "TravelWiseRate ทำงานอย่างไร",
    step1: "เลือกจุดหมายและวันที่เดินทาง",
    step2: "เราวิเคราะห์เทศกาล อากาศ ความหนาแน่นคน และความเสี่ยง",
    step3: "คุณจะได้คะแนนช่วงเวลาเดินทางและอินไซต์",
    travelStart: "เริ่มเดินทาง",
    travelEnd: "สิ้นสุดเดินทาง",
    exploreInsights: "สำรวจอินไซต์",
    allInsights: "อินไซต์ทั้งหมด",
    festival: "เทศกาล",
    weather: "อากาศ",
    risks: "ความเสี่ยง",
    cost: "ค่าใช้จ่าย",
    apps: "แอป",
    planner: "วางแผน",
    weatherInsights: "อินไซต์สภาพอากาศ",
    weatherConditions: "สภาพอากาศใน",
    loadingWeather: "กำลังโหลดอากาศ...",
    weatherUnavailable: "ไม่สามารถโหลดสภาพอากาศได้",
    travelComfort: "คำแนะนำความสบายในการเดินทาง",
    estimatedFlightCost: "ค่าเครื่องบินโดยประมาณ",
    flightBased: "คำนวณจากข้อมูลเส้นทางเฉลี่ย และแสดงเป็น",
    festivalCalendar: "ปฏิทินเทศกาล",
    festivalDesc: "ดูเทศกาลสำคัญของแต่ละเดือนก่อนวางแผนทริป",
    scoreTitle: "คะแนนช่วงเวลาเดินทาง",
    smartAlt: "คำแนะนำช่วงวันที่ดีกว่า",
    yourSelectedDates: "วันที่ที่คุณเลือก",
    betterOption: "ตัวเลือกที่ดีกว่า",
    alreadyGood: "ช่วงที่คุณเลือกอยู่ในกลุ่มที่ดีอยู่แล้ว",
    altReason: "เหตุผล: ที่พักถูกลง คนแน่นน้อยลง และยังได้บรรยากาศเทศกาล",
    shareMyTiming: "แชร์คะแนนการเดินทางของฉัน",
    costImpactTitle: "ผลกระทบด้านค่าใช้จ่าย",
    seasonHighlights: "ไฮไลต์ตามฤดูกาล",
    priceDirection: "แนวโน้มราคา",
    highDemand: "ช่วงความต้องการสูง: ราคามักสูงขึ้น",
    balancedDemand: "ช่วงความต้องการสมดุลกว่า",
    exampleTitle: "ตัวอย่างอินไซต์การเดินทาง",
    bestTimeToVisit: "ช่วงที่เหมาะที่สุดในการเที่ยว",
    bestMonths: "เดือนที่เหมาะ",
    avoid: "ควรหลีกเลี่ยง",
    avoidText: "สัปดาห์วันหยุดยาวและช่วงเทศกาลที่คนแน่น",
    scoreExcellent: "ช่วงเวลาเดินทางยอดเยี่ยม",
    scoreMixed: "สภาพผสม",
    scoreCrowded: "แออัดหรือค่าใช้จ่ายสูง",
    scoreNotRec: "ไม่แนะนำ",
    finalStep: "ขั้นตอนสุดท้าย",
    finalTitle: "วางแผนทริปให้ฉลาดขึ้น",
  },
  es: {
    heroTitle: "Conoce el mejor momento para viajar antes de reservar",
    heroSubtitle: "Ve festivales, riesgos climáticos, multitudes e impacto real de costos en menos de 20 segundos.",
    startCalculator: "Iniciar calculadora de viaje",
    helper: "Responde 3 preguntas rápidas para ver el mejor momento para viajar.",
    seeExample: "Ver ejemplo",
    howWorks: "Cómo funciona TravelWiseRate",
    step1: "Elige destino y fechas de viaje",
    step2: "Analizamos festivales, clima, multitudes y riesgos",
    step3: "Recibes una puntuación e insights",
    travelStart: "Inicio del viaje",
    travelEnd: "Fin del viaje",
    exploreInsights: "Explorar insights",
    allInsights: "Todos",
    festival: "Festival",
    weather: "Clima",
    risks: "Riesgos",
    cost: "Costo",
    apps: "Apps",
    planner: "Planificador",
    weatherInsights: "Insights del clima",
    weatherConditions: "Clima en",
    loadingWeather: "Cargando clima...",
    weatherUnavailable: "Clima no disponible",
    travelComfort: "Consejo de comodidad",
    estimatedFlightCost: "Costo estimado de vuelo",
    flightBased: "Basado en rutas promedio y mostrado en",
    festivalCalendar: "Calendario de festivales",
    festivalDesc: "Descubre festivales importantes antes de planear tu viaje.",
    scoreTitle: "Puntuación de momento de viaje",
    smartAlt: "Sugerencia inteligente de fechas",
    yourSelectedDates: "Tus fechas",
    betterOption: "Mejor opción",
    alreadyGood: "Tu ventana actual ya es una de las mejores.",
    altReason: "Razón: menor costo de hoteles, menos multitudes y buen timing de festivales.",
    shareMyTiming: "Compartir mi puntuación",
    costImpactTitle: "Impacto de costos",
    seasonHighlights: "Destacados estacionales",
    priceDirection: "Tendencia de precios",
    highDemand: "Ventana de alta demanda: precios más altos.",
    balancedDemand: "Ventana más equilibrada.",
    exampleTitle: "Ejemplo de insight de viaje",
    bestTimeToVisit: "Mejor época para visitar",
    bestMonths: "Mejores meses",
    avoid: "Evitar",
    avoidText: "Semanas festivas y periodos de mucha gente.",
    scoreExcellent: "Momento de viaje excelente",
    scoreMixed: "Condiciones mixtas",
    scoreCrowded: "Concurrido o caro",
    scoreNotRec: "No recomendado",
    finalStep: "Paso final",
    finalTitle: "Planea tu viaje de forma inteligente",
  },
  zh: {
    heroTitle: "预订前先知道最佳旅行时机",
    heroSubtitle: "20秒内查看节日、天气风险、人流和真实成本影响。",
    startCalculator: "开始旅行计算器",
    helper: "回答3个简短问题，快速看到最佳出行时间。",
    seeExample: "查看示例",
    howWorks: "TravelWiseRate 如何运作",
    step1: "选择目的地和出行日期",
    step2: "我们分析节日、天气、人流和风险",
    step3: "你将获得旅行时机评分和洞察",
    travelStart: "出发日期",
    travelEnd: "结束日期",
    exploreInsights: "探索洞察",
    allInsights: "全部",
    festival: "节日",
    weather: "天气",
    risks: "风险",
    cost: "成本",
    apps: "应用",
    planner: "规划",
    weatherInsights: "天气洞察",
    weatherConditions: "天气情况：",
    loadingWeather: "正在加载天气...",
    weatherUnavailable: "天气不可用",
    travelComfort: "出行建议",
    estimatedFlightCost: "机票费用预估",
    flightBased: "基于航线均值，显示币种",
    festivalCalendar: "节日日历",
    festivalDesc: "在规划行程前查看每月重要节日与活动。",
    scoreTitle: "旅行时机评分",
    smartAlt: "智能日期建议",
    yourSelectedDates: "你选择的日期",
    betterOption: "更优方案",
    alreadyGood: "你当前时间窗已是较优选择。",
    altReason: "原因：酒店更便宜、人更少、节日体验仍然不错。",
    shareMyTiming: "分享我的旅行评分",
    costImpactTitle: "成本影响",
    seasonHighlights: "季节亮点",
    priceDirection: "价格趋势",
    highDemand: "高需求窗口：价格预计上涨。",
    balancedDemand: "需求更平衡的窗口。",
    exampleTitle: "旅行洞察示例",
    bestTimeToVisit: "最佳旅行时间",
    bestMonths: "最佳月份",
    avoid: "避免",
    avoidText: "长假周和高峰节日窗口。",
    scoreExcellent: "旅行时机绝佳",
    scoreMixed: "条件参差",
    scoreCrowded: "拥挤或昂贵",
    scoreNotRec: "不建议",
    finalStep: "最后一步",
    finalTitle: "更聪明地规划你的旅行",
  },
  ja: {
    heroTitle: "予約前にベストな旅行タイミングを把握",
    heroSubtitle: "20秒で祭り・天候リスク・混雑・実コスト影響を確認できます。",
    startCalculator: "トラベル計算を開始",
    helper: "3つの質問に答えて最適な時期を確認しましょう。",
    seeExample: "例を見る",
    howWorks: "TravelWiseRateの使い方",
    step1: "行き先と日程を選ぶ",
    step2: "祭り・天候・混雑・リスクを分析",
    step3: "旅行タイミングスコアと洞察を取得",
    travelStart: "出発日",
    travelEnd: "帰着日",
    exploreInsights: "インサイトを探索",
    allInsights: "すべて",
    festival: "祭り",
    weather: "天気",
    risks: "リスク",
    cost: "費用",
    apps: "アプリ",
    planner: "プラン",
    weatherInsights: "天候インサイト",
    weatherConditions: "天候：",
    loadingWeather: "天気を読み込み中...",
    weatherUnavailable: "天気情報を取得できません",
    travelComfort: "移動快適ヒント",
    estimatedFlightCost: "航空券の目安",
    flightBased: "平均ルートデータに基づき表示通貨は",
    festivalCalendar: "フェスティバルカレンダー",
    festivalDesc: "旅行計画の前に主要イベントを確認しましょう。",
    scoreTitle: "旅行タイミングスコア",
    smartAlt: "日程のスマート提案",
    yourSelectedDates: "選択した日程",
    betterOption: "より良い案",
    alreadyGood: "現在の期間はすでに良い選択です。",
    altReason: "理由：ホテル価格が低く、混雑が少なく、祭り時期も良好。",
    shareMyTiming: "スコアを共有",
    costImpactTitle: "コスト影響",
    seasonHighlights: "季節ハイライト",
    priceDirection: "価格傾向",
    highDemand: "需要高：価格上昇が見込まれます。",
    balancedDemand: "よりバランスの取れた需要。",
    exampleTitle: "旅行インサイト例",
    bestTimeToVisit: "ベストシーズン",
    bestMonths: "おすすめ月",
    avoid: "避ける時期",
    avoidText: "大型連休週と高混雑フェス期間。",
    finalStep: "最後のステップ",
    finalTitle: "もっと賢く旅を計画",
  },
  ko: {
    heroTitle: "예약 전에 최고의 여행 시기를 확인하세요",
    heroSubtitle: "20초 안에 축제, 날씨 리스크, 혼잡도, 실제 비용 영향을 확인합니다.",
    startCalculator: "여행 계산 시작",
    helper: "3가지 질문에 답하고 최적 시기를 확인하세요.",
    seeExample: "예시 보기",
    howWorks: "TravelWiseRate 작동 방식",
    step1: "목적지와 여행 날짜 선택",
    step2: "축제, 날씨, 혼잡도, 리스크 분석",
    step3: "여행 타이밍 점수와 인사이트 제공",
    travelStart: "출발일",
    travelEnd: "종료일",
    exploreInsights: "인사이트 탐색",
    allInsights: "전체",
    festival: "축제",
    weather: "날씨",
    risks: "리스크",
    cost: "비용",
    apps: "앱",
    planner: "플래너",
    weatherInsights: "날씨 인사이트",
    weatherConditions: "날씨 정보",
    loadingWeather: "날씨 불러오는 중...",
    weatherUnavailable: "날씨 정보를 불러올 수 없습니다",
    travelComfort: "여행 편의 팁",
    estimatedFlightCost: "항공권 예상 비용",
    flightBased: "평균 노선 데이터를 기준으로 표시 통화",
    festivalCalendar: "축제 캘린더",
    festivalDesc: "여행 계획 전에 월별 주요 축제를 확인하세요.",
    scoreTitle: "여행 타이밍 점수",
    smartAlt: "더 나은 날짜 추천",
    yourSelectedDates: "선택한 날짜",
    betterOption: "더 좋은 옵션",
    alreadyGood: "현재 기간은 이미 좋은 선택입니다.",
    altReason: "이유: 호텔비 절감, 혼잡 완화, 축제 타이밍 유지.",
    shareMyTiming: "내 점수 공유",
    costImpactTitle: "비용 영향",
    seasonHighlights: "시즌 하이라이트",
    priceDirection: "가격 추세",
    highDemand: "수요 높은 구간: 가격 상승 예상",
    balancedDemand: "더 균형 잡힌 수요 구간",
    exampleTitle: "여행 인사이트 예시",
    bestTimeToVisit: "방문하기 좋은 시기",
    bestMonths: "추천 월",
    avoid: "피해야 할 시기",
    avoidText: "대형 연휴 주간과 혼잡한 축제 기간",
    scoreExcellent: "최고의 여행 타이밍",
    scoreMixed: "복합적인 상황",
    scoreCrowded: "혼잡하거나 비용 높음",
    scoreNotRec: "권장하지 않음",
    finalStep: "마지막 단계",
    finalTitle: "더 똑똑하게 여행 계획하기",
  },
};

const LANDING_EXTRA_EN = {
  destination: "Destination",
  destinationWithDates: "Destination: {country} · Dates: {dates}",
  dateRange: "Date range",
  scoreOutOf: "/100",
  festivalLabel: "Festival",
  weatherLabel: "Weather",
  crowdsLabel: "Crowds",
  costImpactLabel: "Cost impact",
  festivalTiming: "Festival timing",
  travelRisks: "Travel risks",
  recommendation: "Recommendation",
  tryAnotherDestination: "Try another destination",
  noMajorEvent: "No major event",
  noMajorEventWindow: "No major event in this window",
  veryBusyWeekends: "Very busy weekends",
  manageable: "Manageable",
  stablePricing: "Stable pricing",
  hotelSurge: "Hotels +30% to +40%",
  travelMidweek: "Travel midweek to avoid peak crowds.",
  balancedTiming: "Current timing looks balanced for value and comfort.",
  thisDestination: "this destination",
  defaultBestMonths: "Apr-May, Oct-Nov",
  exampleCityMonth: "Tokyo - March",
  cherryBlossomSeason: "Cherry Blossom season",
  weatherLoadingShort: "Weather loading",
  rainExpected: "Rain expected tomorrow ({pct}% chance)",
  rainChance: "Tomorrow rain chance: {pct}%",
  fxCalculator: "FX calculator",
  quickCostExample: "Quick cost example",
  activitiesPlanner: "Activities planner",
  all: "All",
  shareTwitter: "Twitter / X",
  shareReddit: "Reddit",
  shareInstagram: "Instagram Stories",
  thingsToAvoidIn: "Things to avoid in {country}",
  noWarnings: "No destination-specific warnings right now. Still avoid unofficial transport and keep valuables secure.",
  usefulAppsIn: "Useful apps for traveling in {country}",
  noAppsYet: "No country-specific app list yet. Core essentials: Google Maps, translation app, and a trusted ride app.",
  appTransport: "Transport",
  appMaps: "Maps",
  appTranslation: "Translation",
  appFood: "Food",
  appPayment: "Payment",
  warningWeather: "Weather",
  warningCrowds: "Crowds",
  warningScam: "Scam",
  warningSeason: "Season",
  warningSafety: "Safety",
  planTravelTiming: "Plan Your Travel Timing",
  seeFestivalWeatherCrowdCost: "See festivals, weather risks, crowds, and real travel cost impact in under 20 seconds.",
  nightsLabel: "nights",
  stepLabel: "Step",
  whereAreYouTraveling: "Where are you traveling?",
  crowdedSeasonDue: "Crowded season due to {name}.",
  rainRiskElevated: "Rain risk is elevated ({pct}% chance).",
  noDisruptions: "No major travel disruptions are flagged right now.",
  majorSeasonalEvents: "Major seasonal events",
  tempAndComfort: "Temperature and travel comfort",
  peakTrafficCongestion: "Peak traffic and congestion",
  seasonalPricePressure: "Seasonal price pressure",
  customActivity: "Custom activity",
  activityName: "Activity name",
  estimatedCost: "Estimated cost ({currency})",
  add: "Add",
  selectedActivities: "Selected activities",
  tripEstimate: "Trip estimate",
  hotelPerNight: "Hotel / night ({currency})",
  hotelCost: "Hotel cost",
  activityCost: "Activity cost",
  totalTripCost: "Total trip cost",
  updatingRate: "Updating rate...",
  plannerRate: "Planner rate: 1 USD = {rate} {currency}",
  plannerAvailability: "Activity planner is available for Japan, Thailand, Korea, China, and Singapore.",
  finalStep: "Final step",
  planTripSmarter: "Plan Your Trip Smarter",
  startTravelCalculator: "Start Travel Calculator",
  remove: "Remove",
  weatherClear: "Clear",
  weatherPartlyCloudy: "Partly cloudy",
  weatherCloudy: "Cloudy",
  weatherFog: "Fog",
  weatherDrizzle: "Drizzle",
  weatherRain: "Rain",
  weatherSnow: "Snow",
  weatherStorm: "Thunderstorm",
  weatherVariable: "Variable",
  weatherHintRainy: "Where to go: indoor plans today (museums, markets, cafes). Keep outdoor spots for lower-rain windows.",
  weatherHintHot: "Where to go: early-morning outdoor spots, then shaded areas or indoor activities in the afternoon heat.",
  weatherHintClear: "Where to go: best day for outdoor attractions, parks, and city walking routes.",
  weatherHintDefault: "Where to go: mix indoor and outdoor plans, and keep a flexible backup route.",
  dismiss: "Dismiss",
  safetyNewsTitle: "🌐 Live Travel Safety News",
  safetyUpdatedAgo: "Updated {age}",
  safetyOffline: "Offline",
  safetyAdvisoryFor: "Advisory for {country}",
  safetyDoNotTravel: "Do Not Travel",
  safetyReconsiderTravel: "Reconsider Travel",
  safetyExerciseCaution: "Exercise Caution",
  safetyNormalPrecautions: "Normal Precautions",
  safetyUnknown: "Unknown",
  safetyRiskScore: "Risk score: {score} / 5",
  safetySourceUpdated: "Source data updated: {date}",
  safetyOfficialSource: "Official source",
  safetyNoAdvisory: "No advisory data available for this destination right now.",
  safetyAviationFor: "✈️ Aviation Safety for {country}",
  safetyEuListLabel: "EU official list ↗",
  safetyNoAirlinesBanned: "✅ No airlines from {country} on EU safety ban list",
  safetyNoAirlinesBannedDesc: "Airlines registered in this destination are not currently on the EU Air Safety List. Always book through reputable carriers and check your airline before flying.",
  safetyViewGlobalList: "View full global EU banned airlines list ({count} entries)",
  safetyHideGlobalList: "Hide full global EU banned airlines list",
  safetyDisclaimer: "EU Air Safety List — always verify before booking. Data as of March 2026.",
  safetyAutoRefresh: "Advisory data current as of March 2026 · auto-refreshes page data every 30 min",
  safetyJustNow: "just now",
  safety1MinAgo: "1 min ago",
  safetyNMinAgo: "{n} min ago",
  safetyHAgo: "{h}h ago",
  riskPopupTitle: "Travel risk alert",
  riskPopupBody: "{country} currently has elevated travel risk ({score}/5). Check the latest advisory before you book or go.",
  riskPopupLiveData: "Live safety data refreshes automatically every 30 minutes, so risk levels can change.",
  riskPopupViewDetails: "View live safety details",
  riskPopupContinue: "Continue anyway",
};

const LANDING_EXTRA: Record<Lang, Partial<typeof LANDING_EXTRA_EN>> = {
  en: {},
  th: {
    destination: "ปลายทาง",
    destinationWithDates: "ปลายทาง: {country} · วันที่: {dates}",
    dateRange: "ช่วงวันที่",
    festivalLabel: "เทศกาล",
    weatherLabel: "อากาศ",
    crowdsLabel: "ความหนาแน่น",
    costImpactLabel: "ผลกระทบค่าใช้จ่าย",
    festivalTiming: "ช่วงเทศกาล",
    travelRisks: "ความเสี่ยงการเดินทาง",
    recommendation: "คำแนะนำ",
    tryAnotherDestination: "ลองจุดหมายอื่น",
    noMajorEvent: "ไม่มีอีเวนต์ใหญ่",
    noMajorEventWindow: "ไม่มีอีเวนต์ใหญ่ในช่วงนี้",
    veryBusyWeekends: "สุดสัปดาห์คนแน่นมาก",
    manageable: "จัดการได้",
    stablePricing: "ราคาเสถียร",
    hotelSurge: "โรงแรมเพิ่มขึ้น +30% ถึง +40%",
    travelMidweek: "แนะนำเดินทางกลางสัปดาห์เพื่อลดความแออัด",
    balancedTiming: "ช่วงเวลานี้สมดุลทั้งความคุ้มค่าและความสะดวก",
    thisDestination: "จุดหมายนี้",
    defaultBestMonths: "เม.ย.-พ.ค., ต.ค.-พ.ย.",
    exampleCityMonth: "โตเกียว - มีนาคม",
    cherryBlossomSeason: "ฤดูซากุระ",
    weatherLoadingShort: "กำลังโหลดอากาศ",
    rainExpected: "พรุ่งนี้มีฝน ({pct}%)",
    rainChance: "โอกาสฝนพรุ่งนี้: {pct}%",
    fxCalculator: "เครื่องคำนวณ FX",
    quickCostExample: "ตัวอย่างค่าใช้จ่ายแบบเร็ว",
    activitiesPlanner: "วางแผนกิจกรรม",
    all: "ทั้งหมด",
    shareTwitter: "ทวิตเตอร์ / X",
    shareReddit: "เรดดิต",
    shareInstagram: "สตอรี่ Instagram",
    thingsToAvoidIn: "สิ่งที่ควรระวังใน {country}",
    noWarnings: "ตอนนี้ยังไม่มีคำเตือนเฉพาะประเทศ แต่ควรหลีกเลี่ยงรถที่ไม่เป็นทางการและดูแลทรัพย์สิน",
    usefulAppsIn: "แอปที่ควรมีเมื่อเที่ยวใน {country}",
    noAppsYet: "ยังไม่มีรายชื่อแอปเฉพาะประเทศ แนะนำ Google Maps แอปแปลภาษา และแอปเรียกรถที่เชื่อถือได้",
    appTransport: "การเดินทาง",
    appMaps: "แผนที่",
    appTranslation: "แปลภาษา",
    appFood: "อาหาร",
    appPayment: "การชำระเงิน",
    warningWeather: "สภาพอากาศ",
    warningCrowds: "ความแออัด",
    warningScam: "มิจฉาชีพ",
    warningSeason: "ฤดูกาล",
    warningSafety: "ความปลอดภัย",
    planTravelTiming: "วางแผนช่วงเวลาเดินทาง",
    seeFestivalWeatherCrowdCost: "ดูเทศกาล ความเสี่ยงอากาศ ความหนาแน่น และผลกระทบค่าใช้จ่ายได้ในไม่กี่วินาที",
    nightsLabel: "คืน",
    stepLabel: "ขั้นตอน",
    whereAreYouTraveling: "คุณจะไปเที่ยวที่ไหน",
    crowdedSeasonDue: "เป็นช่วงคนแน่นเพราะ {name}",
    rainRiskElevated: "ความเสี่ยงฝนสูงขึ้น ({pct}%)",
    noDisruptions: "ยังไม่มีสัญญาณรบกวนการเดินทางสำคัญในตอนนี้",
    majorSeasonalEvents: "อีเวนต์ตามฤดูกาล",
    tempAndComfort: "อุณหภูมิและความสบายในการเดินทาง",
    peakTrafficCongestion: "ช่วงพีคและความแออัด",
    seasonalPricePressure: "แรงกดดันด้านราคาตามฤดูกาล",
    customActivity: "กิจกรรมกำหนดเอง",
    activityName: "ชื่อกิจกรรม",
    estimatedCost: "ค่าใช้จ่ายโดยประมาณ ({currency})",
    add: "เพิ่ม",
    selectedActivities: "กิจกรรมที่เลือก",
    tripEstimate: "ประมาณการทริป",
    hotelPerNight: "โรงแรม / คืน ({currency})",
    hotelCost: "ค่าโรงแรม",
    activityCost: "ค่ากิจกรรม",
    totalTripCost: "ค่าใช้จ่ายรวมทริป",
    updatingRate: "กำลังอัปเดตเรต...",
    plannerRate: "เรตสำหรับวางแผน: 1 USD = {rate} {currency}",
    plannerAvailability: "ตัววางแผนกิจกรรมรองรับ ญี่ปุ่น ไทย เกาหลี จีน และสิงคโปร์",
    finalStep: "ขั้นตอนสุดท้าย",
    planTripSmarter: "วางแผนทริปให้ฉลาดขึ้น",
    startTravelCalculator: "เริ่มคำนวณค่าเดินทาง",
    remove: "ลบ",
    weatherClear: "ท้องฟ้าแจ่มใส",
    weatherPartlyCloudy: "เมฆบางส่วน",
    weatherCloudy: "มีเมฆมาก",
    weatherFog: "หมอกลง",
    weatherDrizzle: "ฝนพรำ",
    weatherRain: "ฝนตก",
    weatherSnow: "หิมะตก",
    weatherStorm: "พายุฝนฟ้าคะนอง",
    weatherVariable: "แปรปรวน",
    weatherHintRainy: "แนะนำ: วันนี้เหมาะไปในร่มเช่นพิพิธภัณฑ์ ตลาด หรือคาเฟ่ สำรองสถานที่กลางแจ้งไว้สำหรับช่วงที่ฝนน้อยลง",
    weatherHintHot: "แนะนำ: ออกไปเช้าตรู่บริเวณกลางแจ้ง จากนั้นหลีกเลี่ยงแดดจัดด้วยการอยู่ในร่มหรือในอาคารช่วงบ่าย",
    weatherHintClear: "แนะนำ: วันที่ดีสำหรับสถานที่ท่องเที่ยวกลางแจ้ง สวนสาธารณะ และเดินชมเมือง",
    weatherHintDefault: "แนะนำ: ผสมแผนในร่มและกลางแจ้ง พร้อมสำรองแผนสำรองไว้",
    dismiss: "ปิด",
    safetyNewsTitle: "🌐 ข่าวความปลอดภัยการเดินทางสด",
    safetyUpdatedAgo: "อัปเดต {age}",
    safetyOffline: "ออฟไลน์",
    safetyAdvisoryFor: "คำแนะนำสำหรับ {country}",
    safetyDoNotTravel: "ไม่ควรเดินทาง",
    safetyReconsiderTravel: "ควรพิจารณาใหม่",
    safetyExerciseCaution: "ควรระมัดระวัง",
    safetyNormalPrecautions: "ระมัดระวังตามปกติ",
    safetyUnknown: "ไม่ทราบ",
    safetyRiskScore: "คะแนนความเสี่ยง: {score} / 5",
    safetySourceUpdated: "ข้อมูลต้นทางอัปเดต: {date}",
    safetyOfficialSource: "แหล่งข้อมูลทางการ",
    safetyNoAdvisory: "ขณะนี้ยังไม่มีข้อมูลคำแนะนำสำหรับจุดหมายนี้",
    safetyAviationFor: "✈️ ความปลอดภัยทางอากาศสำหรับ {country}",
    safetyEuListLabel: "รายชื่ออย่างเป็นทางการ EU ↗",
    safetyNoAirlinesBanned: "✅ ไม่มีสายการบินจาก {country} ในรายชื่อห้าม EU",
    safetyNoAirlinesBannedDesc: "สายการบินที่จดทะเบียนในจุดหมายนี้ยังไม่อยู่ในรายชื่อห้ามบิน EU จองผ่านสายการบินที่เชื่อถือได้เสมอ",
    safetyViewGlobalList: "ดูรายชื่อสายการบินต้องห้ามทั่วโลก ({count} รายการ)",
    safetyHideGlobalList: "ซ่อนรายชื่อ",
    safetyDisclaimer: "รายชื่อความปลอดภัยทางอากาศ EU — ตรวจสอบก่อนจองเสมอ ข้อมูล ณ มีนาคม 2026",
    safetyAutoRefresh: "ข้อมูล ณ มีนาคม 2026 · อัปเดตอัตโนมัติทุก 30 นาที",
    safetyJustNow: "เมื่อกี้นี้",
    safety1MinAgo: "1 นาทีที่แล้ว",
    safetyNMinAgo: "{n} นาทีที่แล้ว",
    safetyHAgo: "{h} ชม. ที่แล้ว",
  },
  es: {
    destination: "Destino",
    destinationWithDates: "Destino: {country} · Fechas: {dates}",
    dateRange: "Rango de fechas",
    festivalLabel: "Festival",
    weatherLabel: "Clima",
    crowdsLabel: "Multitudes",
    costImpactLabel: "Impacto de costos",
    festivalTiming: "Temporada de festivales",
    travelRisks: "Riesgos de viaje",
    recommendation: "Recomendación",
    tryAnotherDestination: "Probar otro destino",
    noMajorEvent: "Sin evento importante",
    noMajorEventWindow: "Sin eventos importantes en esta ventana",
    veryBusyWeekends: "Fines de semana muy concurridos",
    manageable: "Manejable",
    stablePricing: "Precios estables",
    hotelSurge: "Hoteles +30% a +40%",
    travelMidweek: "Viaja entre semana para evitar picos de gente.",
    balancedTiming: "Este periodo se ve equilibrado en costo y comodidad.",
    thisDestination: "este destino",
    defaultBestMonths: "Abr-May, Oct-Nov",
    exampleCityMonth: "Tokio - Marzo",
    cherryBlossomSeason: "Temporada de cerezos",
    weatherLoadingShort: "Cargando clima",
    rainExpected: "Lluvia esperada mañana ({pct}% prob.)",
    rainChance: "Probabilidad de lluvia mañana: {pct}%",
    fxCalculator: "Calculadora FX",
    quickCostExample: "Ejemplo rápido de costos",
    activitiesPlanner: "Planificador de actividades",
    all: "Todo",
    shareTwitter: "Twitter / X",
    shareReddit: "Reddit",
    shareInstagram: "Historias de Instagram",
    thingsToAvoidIn: "Qué evitar en {country}",
    noWarnings: "No hay alertas específicas ahora. Evita transporte no oficial y protege tus pertenencias.",
    usefulAppsIn: "Apps útiles para viajar en {country}",
    noAppsYet: "Aún no hay lista específica. Esenciales: Google Maps, traductor y app de transporte confiable.",
    appTransport: "Transporte",
    appMaps: "Mapas",
    appTranslation: "Traducción",
    appFood: "Comida",
    appPayment: "Pago",
    warningWeather: "Clima",
    warningCrowds: "Multitudes",
    warningScam: "Estafas",
    warningSeason: "Temporada",
    warningSafety: "Seguridad",
    planTravelTiming: "Planifica el momento de tu viaje",
    seeFestivalWeatherCrowdCost: "Revisa festivales, clima, multitudes e impacto real de costos en menos de 20 segundos.",
    nightsLabel: "noches",
    stepLabel: "Paso",
    whereAreYouTraveling: "¿A dónde viajas?",
    crowdedSeasonDue: "Temporada concurrida por {name}.",
    rainRiskElevated: "Riesgo de lluvia elevado ({pct}%).",
    noDisruptions: "No hay interrupciones importantes de viaje por ahora.",
    majorSeasonalEvents: "Eventos estacionales importantes",
    tempAndComfort: "Temperatura y comodidad",
    peakTrafficCongestion: "Tráfico pico y congestión",
    seasonalPricePressure: "Presión estacional de precios",
    customActivity: "Actividad personalizada",
    activityName: "Nombre de actividad",
    estimatedCost: "Costo estimado ({currency})",
    add: "Agregar",
    selectedActivities: "Actividades seleccionadas",
    tripEstimate: "Estimación del viaje",
    hotelPerNight: "Hotel / noche ({currency})",
    hotelCost: "Costo de hotel",
    activityCost: "Costo de actividades",
    totalTripCost: "Costo total del viaje",
    updatingRate: "Actualizando tipo...",
    plannerRate: "Tipo del planificador: 1 USD = {rate} {currency}",
    plannerAvailability: "El planificador está disponible para Japón, Tailandia, Corea, China y Singapur.",
    finalStep: "Paso final",
    planTripSmarter: "Planifica tu viaje mejor",
    startTravelCalculator: "Iniciar calculadora de viaje",
    remove: "Eliminar",
    weatherClear: "Despejado",
    weatherPartlyCloudy: "Parcialmente nublado",
    weatherCloudy: "Nublado",
    weatherFog: "Niebla",
    weatherDrizzle: "Llovizna",
    weatherRain: "Lluvia",
    weatherSnow: "Nieve",
    weatherStorm: "Tormenta",
    weatherVariable: "Variable",
    weatherHintRainy: "Consejo: planes de interior hoy (museos, mercados, cafés). Reserva sitios al aire libre para cuando llueva menos.",
    weatherHintHot: "Consejo: visita lugares al aire libre a primera hora, luego busca zonas con sombra o actividades de interior por el calor.",
    weatherHintClear: "Consejo: día ideal para atracciones al aire libre, parques y rutas a pie.",
    weatherHintDefault: "Consejo: combina planes de interior y exterior con una ruta alternativa flexible.",
    dismiss: "Cerrar",
    safetyNewsTitle: "🌐 Noticias de seguridad en viajes en vivo",
    safetyUpdatedAgo: "Actualizado {age}",
    safetyOffline: "Sin conexión",
    safetyAdvisoryFor: "Alerta de viaje para {country}",
    safetyDoNotTravel: "No viajar",
    safetyReconsiderTravel: "Reconsiderar viaje",
    safetyExerciseCaution: "Precaución elevada",
    safetyNormalPrecautions: "Precauciones normales",
    safetyUnknown: "Desconocido",
    safetyRiskScore: "Nivel de riesgo: {score} / 5",
    safetySourceUpdated: "Datos actualizados: {date}",
    safetyOfficialSource: "Fuente oficial",
    safetyNoAdvisory: "No hay datos de alerta para este destino por ahora.",
    safetyAviationFor: "✈️ Seguridad aérea para {country}",
    safetyEuListLabel: "Lista oficial UE ↗",
    safetyNoAirlinesBanned: "✅ Sin aerolíneas de {country} en la lista de prohibición UE",
    safetyNoAirlinesBannedDesc: "Las aerolíneas registradas en este destino no están en la lista de prohibición aérea de la UE. Reserva siempre con aerolíneas reconocidas.",
    safetyViewGlobalList: "Ver lista global completa de aerolíneas prohibidas UE ({count} entradas)",
    safetyHideGlobalList: "Ocultar lista global",
    safetyDisclaimer: "Lista de seguridad aérea UE — verifica siempre antes de reservar. Datos de marzo 2026.",
    safetyAutoRefresh: "Datos de marzo 2026 · se actualiza automáticamente cada 30 min",
    safetyJustNow: "ahora mismo",
    safety1MinAgo: "hace 1 min",
    safetyNMinAgo: "hace {n} min",
    safetyHAgo: "hace {h}h",
  },
  zh: {
    destination: "目的地",
    destinationWithDates: "目的地：{country} · 日期：{dates}",
    dateRange: "日期范围",
    festivalLabel: "节日",
    weatherLabel: "天气",
    crowdsLabel: "拥挤度",
    costImpactLabel: "成本影响",
    festivalTiming: "节日时机",
    travelRisks: "旅行风险",
    recommendation: "建议",
    tryAnotherDestination: "试试其他目的地",
    noMajorEvent: "暂无重大活动",
    noMajorEventWindow: "此时间段暂无重大活动",
    veryBusyWeekends: "周末非常拥挤",
    manageable: "可接受",
    stablePricing: "价格稳定",
    hotelSurge: "酒店上涨 +30% 至 +40%",
    travelMidweek: "建议在工作日出行，避开高峰人流。",
    balancedTiming: "当前时机在成本与舒适度上较平衡。",
    thisDestination: "该目的地",
    defaultBestMonths: "4-5月，10-11月",
    exampleCityMonth: "东京 - 3月",
    cherryBlossomSeason: "樱花季",
    weatherLoadingShort: "天气加载中",
    rainExpected: "预计明天有雨（{pct}%）",
    rainChance: "明天降雨概率：{pct}%",
    fxCalculator: "FX 计算器",
    quickCostExample: "快速费用示例",
    activitiesPlanner: "活动规划",
    all: "全部",
    shareTwitter: "Twitter / X",
    shareReddit: "Reddit",
    shareInstagram: "Instagram 故事",
    thingsToAvoidIn: "在 {country} 需要避免",
    noWarnings: "当前无特定预警。仍请避免非正规交通并注意财物安全。",
    usefulAppsIn: "在 {country} 旅行实用应用",
    noAppsYet: "暂无该国家应用清单。建议：Google 地图、翻译应用和可靠叫车应用。",
    appTransport: "交通",
    appMaps: "地图",
    appTranslation: "翻译",
    appFood: "美食",
    appPayment: "支付",
    warningWeather: "天气",
    warningCrowds: "人流",
    warningScam: "诈骗",
    warningSeason: "季节",
    warningSafety: "安全",
    planTravelTiming: "规划你的出行时机",
    seeFestivalWeatherCrowdCost: "20 秒内查看节庆、天气风险、人流和真实成本影响。",
    nightsLabel: "晚",
    stepLabel: "步骤",
    whereAreYouTraveling: "你要去哪里旅行？",
    crowdedSeasonDue: "因 {name} 进入拥挤季。",
    rainRiskElevated: "降雨风险升高（{pct}%）。",
    noDisruptions: "当前未发现重大出行扰动。",
    majorSeasonalEvents: "重要季节活动",
    tempAndComfort: "温度与出行舒适度",
    peakTrafficCongestion: "高峰客流与拥堵",
    seasonalPricePressure: "季节性价格压力",
    customActivity: "自定义活动",
    activityName: "活动名称",
    estimatedCost: "预估费用（{currency}）",
    add: "添加",
    selectedActivities: "已选活动",
    tripEstimate: "行程估算",
    hotelPerNight: "酒店 / 晚（{currency}）",
    hotelCost: "酒店费用",
    activityCost: "活动费用",
    totalTripCost: "总行程费用",
    updatingRate: "正在更新汇率...",
    plannerRate: "规划汇率: 1 USD = {rate} {currency}",
    plannerAvailability: "活动规划目前支持日本、泰国、韩国、中国和新加坡。",
    finalStep: "最后一步",
    planTripSmarter: "更聪明地规划旅行",
    startTravelCalculator: "开始旅行计算器",
    remove: "移除",
    weatherClear: "晴朗",
    weatherPartlyCloudy: "局部多云",
    weatherCloudy: "多云",
    weatherFog: "雾",
    weatherDrizzle: "小雨",
    weatherRain: "雨",
    weatherSnow: "雪",
    weatherStorm: "雷暴",
    weatherVariable: "多变",
    weatherHintRainy: "建议：今天适合室内活动（博物馆、市场、咖啡馆），将户外行程留待雨少时段。",
    weatherHintHot: "建议：清晨前往户外景点，下午高温时选择阴凉处或室内活动。",
    weatherHintClear: "建议：绝佳的户外景点、公园和城市徒步日。",
    weatherHintDefault: "建议：室内外活动搭配规划，并保留灵活备选路线。",
    dismiss: "关闭",
    safetyNewsTitle: "🌐 实时旅行安全资讯",
    safetyUpdatedAgo: "更新于 {age}",
    safetyOffline: "离线",
    safetyAdvisoryFor: "{country} 旅行安全提示",
    safetyDoNotTravel: "禁止前往",
    safetyReconsiderTravel: "重新考虑出行",
    safetyExerciseCaution: "注意安全",
    safetyNormalPrecautions: "正常注意",
    safetyUnknown: "未知",
    safetyRiskScore: "风险评分：{score} / 5",
    safetySourceUpdated: "数据更新于：{date}",
    safetyOfficialSource: "官方来源",
    safetyNoAdvisory: "当前暂无此目的地的安全提示数据。",
    safetyAviationFor: "✈️ {country} 航空安全",
    safetyEuListLabel: "EU 官方名单 ↗",
    safetyNoAirlinesBanned: "✅ {country} 无航空公司列入 EU 禁飞名单",
    safetyNoAirlinesBannedDesc: "该目的地注册的航空公司目前未被列入 EU 航空安全名单。订票时请始终选择正规航空公司并核实信息。",
    safetyViewGlobalList: "查看完整全球 EU 禁飞航空公司名单（共 {count} 条）",
    safetyHideGlobalList: "收起名单",
    safetyDisclaimer: "EU 航空安全名单 — 订票前请核实。数据截至 2026 年 3 月。",
    safetyAutoRefresh: "数据截至 2026 年 3 月 · 每 30 分钟自动刷新",
    safetyJustNow: "刚刚",
    safety1MinAgo: "1 分钟前",
    safetyNMinAgo: "{n} 分钟前",
    safetyHAgo: "{h} 小时前",
  },
  ja: {
    destination: "行き先",
    destinationWithDates: "行き先: {country} · 日程: {dates}",
    dateRange: "日程範囲",
    festivalLabel: "祭り",
    weatherLabel: "天気",
    crowdsLabel: "混雑",
    costImpactLabel: "コスト影響",
    festivalTiming: "祭りの時期",
    travelRisks: "旅行リスク",
    recommendation: "おすすめ",
    tryAnotherDestination: "別の行き先を試す",
    noMajorEvent: "大きなイベントなし",
    noMajorEventWindow: "この期間に大きなイベントはありません",
    veryBusyWeekends: "週末は非常に混雑",
    manageable: "許容範囲",
    stablePricing: "価格は安定",
    hotelSurge: "ホテル +30%〜+40%",
    travelMidweek: "混雑を避けるため平日移動がおすすめです。",
    balancedTiming: "この時期はコストと快適さのバランスが良好です。",
    thisDestination: "この目的地",
    defaultBestMonths: "4-5月、10-11月",
    exampleCityMonth: "東京 - 3月",
    cherryBlossomSeason: "桜の季節",
    weatherLoadingShort: "天気読み込み中",
    rainExpected: "明日は雨予報（{pct}%）",
    rainChance: "明日の降雨確率: {pct}%",
    fxCalculator: "FX 計算機",
    quickCostExample: "クイック費用例",
    activitiesPlanner: "アクティビティ計画",
    all: "すべて",
    shareTwitter: "Twitter / X",
    shareReddit: "Reddit",
    shareInstagram: "Instagram ストーリーズ",
    thingsToAvoidIn: "{country}で注意すべきこと",
    noWarnings: "現在、特定の警告はありません。非公式交通は避け、貴重品管理を徹底してください。",
    usefulAppsIn: "{country}旅行で便利なアプリ",
    noAppsYet: "国別アプリ一覧はまだありません。Google Maps、翻訳、配車アプリを推奨。",
    appTransport: "交通",
    appMaps: "地図",
    appTranslation: "翻訳",
    appFood: "グルメ",
    appPayment: "決済",
    warningWeather: "天気",
    warningCrowds: "混雑",
    warningScam: "詐欺",
    warningSeason: "季節",
    warningSafety: "安全",
    planTravelTiming: "旅のタイミングを計画",
    seeFestivalWeatherCrowdCost: "祭り、天候リスク、混雑、実際の費用影響を20秒で確認。",
    nightsLabel: "泊",
    stepLabel: "ステップ",
    whereAreYouTraveling: "どこへ旅行しますか？",
    crowdedSeasonDue: "{name}の影響で混雑シーズンです。",
    rainRiskElevated: "雨リスクが高めです（{pct}%）。",
    noDisruptions: "現在、大きな旅行混乱はありません。",
    majorSeasonalEvents: "主要な季節イベント",
    tempAndComfort: "気温と快適さ",
    peakTrafficCongestion: "混雑ピークと交通量",
    seasonalPricePressure: "季節的な価格圧力",
    customActivity: "カスタムアクティビティ",
    activityName: "アクティビティ名",
    estimatedCost: "概算費用（{currency}）",
    add: "追加",
    selectedActivities: "選択したアクティビティ",
    tripEstimate: "旅行見積もり",
    hotelPerNight: "ホテル / 泊（{currency}）",
    hotelCost: "ホテル費用",
    activityCost: "アクティビティ費用",
    totalTripCost: "旅行総額",
    updatingRate: "レート更新中...",
    plannerRate: "計画レート: 1 USD = {rate} {currency}",
    plannerAvailability: "アクティビティプランナーは日本、タイ、韓国、中国、シンガポールに対応しています。",
    finalStep: "最終ステップ",
    planTripSmarter: "より賢く旅を計画",
    startTravelCalculator: "旅行計算を開始",
    remove: "削除",
    weatherClear: "晴れ",
    weatherPartlyCloudy: "一部曇り",
    weatherCloudy: "曇り",
    weatherFog: "霧",
    weatherDrizzle: "霧雨",
    weatherRain: "雨",
    weatherSnow: "雪",
    weatherStorm: "雷雨",
    weatherVariable: "不安定",
    weatherHintRainy: "おすすめ：本日は屋内プラン（博物館・マーケット・カフェ）。雨が少ない時間帯に屋外スポットを楽しみましょう。",
    weatherHintHot: "おすすめ：早朝に屋外スポットへ。午後の暑さは日陰か屋内アクティビティで過ごしましょう。",
    weatherHintClear: "おすすめ：屋外観光・公園・街歩きに最適な一日です。",
    weatherHintDefault: "おすすめ：屋内と屋外のプランを組み合わせ、柔軟なバックアッププランを持っておきましょう。",
    dismiss: "閉じる",
    safetyNewsTitle: "🌐 リアルタイム旅行安全情報",
    safetyUpdatedAgo: "{age}に更新",
    safetyOffline: "オフライン",
    safetyAdvisoryFor: "{country} の危険情報",
    safetyDoNotTravel: "渡航中止勧告",
    safetyReconsiderTravel: "渡航再検討",
    safetyExerciseCaution: "渡航注意",
    safetyNormalPrecautions: "通常の注意",
    safetyUnknown: "不明",
    safetyRiskScore: "リスクスコア: {score} / 5",
    safetySourceUpdated: "ソースデータ更新日: {date}",
    safetyOfficialSource: "公式情報源",
    safetyNoAdvisory: "現在、この目的地の危険情報はありません。",
    safetyAviationFor: "✈️ {country} の航空安全",
    safetyEuListLabel: "EU公式リスト ↗",
    safetyNoAirlinesBanned: "✅ {country} の航空会社はEU禁止リストに掲載なし",
    safetyNoAirlinesBannedDesc: "この目的地の登録航空会社はEU航空安全リストに現在掲載されていません。常に信頼できる航空会社を選び、搭乗前に確認してください。",
    safetyViewGlobalList: "EU禁止航空会社の全リストを表示（{count}件）",
    safetyHideGlobalList: "全リストを閉じる",
    safetyDisclaimer: "EUセーフティリスト — 予約前に必ず確認。2026年3月時点のデータ。",
    safetyAutoRefresh: "2026年3月時点の情報 · 30分ごとに自動更新",
    safetyJustNow: "たった今",
    safety1MinAgo: "1分前",
    safetyNMinAgo: "{n}分前",
    safetyHAgo: "{h}時間前",
  },
  ko: {
    destination: "목적지",
    destinationWithDates: "목적지: {country} · 일정: {dates}",
    dateRange: "여행 날짜 범위",
    festivalLabel: "축제",
    weatherLabel: "날씨",
    crowdsLabel: "혼잡도",
    costImpactLabel: "비용 영향",
    festivalTiming: "축제 시기",
    travelRisks: "여행 위험",
    recommendation: "추천",
    tryAnotherDestination: "다른 목적지 시도",
    noMajorEvent: "주요 이벤트 없음",
    noMajorEventWindow: "이 기간에는 큰 이벤트가 없습니다",
    veryBusyWeekends: "주말 매우 혼잡",
    manageable: "관리 가능한 수준",
    stablePricing: "가격 안정",
    hotelSurge: "호텔 +30%~+40%",
    travelMidweek: "혼잡을 줄이려면 주중 이동을 권장합니다.",
    balancedTiming: "현재 시기는 비용과 편의가 균형적입니다.",
    thisDestination: "이 목적지",
    defaultBestMonths: "4-5월, 10-11월",
    exampleCityMonth: "도쿄 - 3월",
    cherryBlossomSeason: "벚꽃 시즌",
    weatherLoadingShort: "날씨 로딩 중",
    rainExpected: "내일 비 예보 ({pct}%)",
    rainChance: "내일 강수 확률: {pct}%",
    fxCalculator: "FX 계산기",
    quickCostExample: "빠른 비용 예시",
    activitiesPlanner: "액티비티 플래너",
    all: "전체",
    shareTwitter: "트위터 / X",
    shareReddit: "레딧",
    shareInstagram: "인스타그램 스토리",
    thingsToAvoidIn: "{country}에서 피해야 할 것",
    noWarnings: "현재 국가별 경고는 없습니다. 비공식 교통수단은 피하고 소지품을 안전하게 관리하세요.",
    usefulAppsIn: "{country} 여행에 유용한 앱",
    noAppsYet: "국가별 앱 목록이 아직 없습니다. Google Maps, 번역 앱, 신뢰할 수 있는 호출 앱을 권장합니다.",
    appTransport: "교통",
    appMaps: "지도",
    appTranslation: "번역",
    appFood: "음식",
    appPayment: "결제",
    warningWeather: "날씨",
    warningCrowds: "혼잡",
    warningScam: "사기",
    warningSeason: "시즌",
    warningSafety: "안전",
    planTravelTiming: "여행 타이밍 계획",
    seeFestivalWeatherCrowdCost: "축제, 날씨 위험, 혼잡도, 실제 비용 영향을 20초 안에 확인하세요.",
    nightsLabel: "박",
    stepLabel: "단계",
    whereAreYouTraveling: "어디로 여행하시나요?",
    crowdedSeasonDue: "{name} 때문에 혼잡한 시즌입니다.",
    rainRiskElevated: "비 위험이 높습니다 ({pct}%).",
    noDisruptions: "현재 큰 여행 차질 신호는 없습니다.",
    majorSeasonalEvents: "주요 시즌 이벤트",
    tempAndComfort: "기온과 여행 쾌적도",
    peakTrafficCongestion: "피크 트래픽과 혼잡",
    seasonalPricePressure: "시즌별 가격 압력",
    customActivity: "맞춤 활동",
    activityName: "활동 이름",
    estimatedCost: "예상 비용 ({currency})",
    add: "추가",
    selectedActivities: "선택한 활동",
    tripEstimate: "여행 비용 추정",
    hotelPerNight: "호텔 / 1박 ({currency})",
    hotelCost: "호텔 비용",
    activityCost: "활동 비용",
    totalTripCost: "총 여행 비용",
    updatingRate: "환율 업데이트 중...",
    plannerRate: "플래너 환율: 1 USD = {rate} {currency}",
    plannerAvailability: "액티비티 플래너는 일본, 태국, 한국, 중국, 싱가포르에서 이용 가능합니다.",
    finalStep: "마지막 단계",
    planTripSmarter: "더 스마트하게 여행 계획",
    startTravelCalculator: "여행 계산 시작",
    remove: "삭제",
    weatherClear: "맑음",
    weatherPartlyCloudy: "구름 조금",
    weatherCloudy: "흐림",
    weatherFog: "안개",
    weatherDrizzle: "이슬비",
    weatherRain: "비",
    weatherSnow: "눈",
    weatherStorm: "뇌우",
    weatherVariable: "변화무쌍",
    weatherHintRainy: "추천: 오늘은 실내 계획(박물관, 시장, 카페)을 세우고, 비가 줄어드는 시간대에 야외 명소를 방문하세요.",
    weatherHintHot: "추천: 이른 아침 야외 명소를 방문하고, 오후 더위를 피해 그늘이나 실내 활동을 즐기세요.",
    weatherHintClear: "추천: 야외 명소, 공원, 도시 도보 여행에 최적의 날입니다.",
    weatherHintDefault: "추천: 실내외 활동을 혼합하고 유연한 대안 루트를 준비하세요.",
    dismiss: "닫기",
    safetyNewsTitle: "🌐 실시간 여행 안전 정보",
    safetyUpdatedAgo: "{age} 업데이트",
    safetyOffline: "오프라인",
    safetyAdvisoryFor: "{country} 여행 안전 권고",
    safetyDoNotTravel: "여행 금지",
    safetyReconsiderTravel: "여행 재고",
    safetyExerciseCaution: "주의 필요",
    safetyNormalPrecautions: "일반적 주의",
    safetyUnknown: "정보 없음",
    safetyRiskScore: "위험 점수: {score} / 5",
    safetySourceUpdated: "데이터 업데이트: {date}",
    safetyOfficialSource: "공식 출처",
    safetyNoAdvisory: "현재 이 목적지의 여행 권고 데이터가 없습니다.",
    safetyAviationFor: "✈️ {country} 항공 안전",
    safetyEuListLabel: "EU 공식 목록 ↗",
    safetyNoAirlinesBanned: "✅ {country} 항공사는 EU 금지 목록에 없음",
    safetyNoAirlinesBannedDesc: "이 목적지에 등록된 항공사는 현재 EU 항공 안전 목록에 없습니다. 항상 공신력 있는 항공사를 이용하고 탑승 전 확인하세요.",
    safetyViewGlobalList: "EU 금지 항공사 전체 목록 보기 ({count}개)",
    safetyHideGlobalList: "전체 목록 닫기",
    safetyDisclaimer: "EU 항공 안전 목록 — 예약 전 반드시 확인. 2026년 3월 기준.",
    safetyAutoRefresh: "2026년 3월 기준 · 30분마다 자동 갱신",
    safetyJustNow: "방금 전",
    safety1MinAgo: "1분 전",
    safetyNMinAgo: "{n}분 전",
    safetyHAgo: "{h}시간 전",
  },
};

function getIsoDateOffset(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

function toLocalDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00`);
}

function diffNights(startIso: string, endIso: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const start = toLocalDate(startIso).getTime();
  const end = toLocalDate(endIso).getTime();
  const delta = Math.round((end - start) / msPerDay);
  return Math.max(1, delta);
}

function addDaysToIso(isoDate: string, days: number): string {
  const d = toLocalDate(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function makeHistoricalDate(isoDate: string): string {
  const d = toLocalDate(isoDate);
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

function formatDateLabel(isoDate: string, locale: string): string {
  if (!isoDate) return "";
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

function isIsoDateString(value: string | null): value is string {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getScoreLabel(score: number, lc: Record<string, string>): string {
  if (score >= 80) return lc.scoreExcellent ?? "Excellent travel timing";
  if (score >= 60) return lc.scoreMixed ?? "Mixed conditions";
  if (score >= 40) return lc.scoreCrowded ?? "Crowded or expensive";
  return lc.scoreNotRec ?? "Not recommended";
}

function getScoreTone(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-rose-600";
}

function getScorePalette(score: number): { ring: string; inner: string } {
  if (score >= 80) {
    return { ring: "bg-emerald-500", inner: "bg-emerald-50 dark:bg-emerald-950/30" };
  }
  if (score >= 60) {
    return { ring: "bg-yellow-500", inner: "bg-yellow-50 dark:bg-yellow-950/30" };
  }
  if (score >= 40) {
    return { ring: "bg-orange-500", inner: "bg-orange-50 dark:bg-orange-950/30" };
  }
  return { ring: "bg-rose-500", inner: "bg-rose-50 dark:bg-rose-950/30" };
}

export default function Home() {
  const [country, setCountry] = useState("");
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
  const lc = LANDING_COPY[lang] ?? LANDING_COPY.en;
  const lx = { ...LANDING_EXTRA_EN, ...(LANDING_EXTRA[lang] ?? {}) };

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
  const [travelStartDate, setTravelStartDate] = useState(() => getIsoDateOffset(21));
  const [travelEndDate, setTravelEndDate] = useState(() => getIsoDateOffset(27));
  const [showShareLinks, setShowShareLinks] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");
  const [travelNews, setTravelNews] = useState<TravelNewsData | null>(null);
  const [travelNewsLoading, setTravelNewsLoading] = useState(false);
  const [showRiskPopup, setShowRiskPopup] = useState(false);
  const shownRiskPopupKeysRef = useRef<Set<string>>(new Set());
  const [exploreFilter, setExploreFilter] = useState<ExploreFilter>("all");
  const selectedAdvisory = travelNews?.advisories[country] ?? null;
  const earliestTravelDate = getIsoDateOffset(0);
  const minTravelEndDate = travelStartDate > earliestTravelDate ? travelStartDate : earliestTravelDate;
  const selectedNights = diffNights(travelStartDate, travelEndDate);

  const exploreFilters: Array<{ id: ExploreFilter; label: string; targetId: string }> = [
    { id: "all", label: lc.allInsights, targetId: "festival-calendar" },
    { id: "festival", label: lc.festival, targetId: "festival-calendar" },
    { id: "weather", label: lc.weather, targetId: "weather-section" },
    { id: "risks", label: lc.risks, targetId: "warnings-section" },
    { id: "cost", label: lc.cost, targetId: "updates-section" },
    { id: "calculator", label: lx.fxCalculator, targetId: "calculator-section" },
    { id: "apps", label: lc.apps, targetId: "apps-section" },
    { id: "planner", label: lc.planner, targetId: "planner-section" },
  ];

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
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function advisoryPopupKey(advisory: TravelAdvisory): string {
    return `${advisory.iso}:${advisory.updated}:${advisory.score.toFixed(1)}`;
  }

  function dismissRiskPopup() {
    if (selectedAdvisory) {
      shownRiskPopupKeysRef.current.add(advisoryPopupKey(selectedAdvisory));
    }
    setShowRiskPopup(false);
  }

  function openRiskDetails() {
    setExploreFilter("risks");
    dismissRiskPopup();
    window.setTimeout(() => jumpToSection("warnings-section"), 80);
  }

  function handleTravelStartDateChange(nextStart: string) {
    if (!nextStart) return;
    const currentNights = diffNights(travelStartDate, travelEndDate);
    const clampedStart = nextStart < earliestTravelDate ? earliestTravelDate : nextStart;
    setTravelStartDate(clampedStart);
    setTravelEndDate(addDaysToIso(clampedStart, currentNights));
  }

  function handleTravelEndDateChange(nextEnd: string) {
    if (!nextEnd) return;
    if (nextEnd < minTravelEndDate) {
      setTravelEndDate(minTravelEndDate);
      return;
    }
    setTravelEndDate(nextEnd);
  }

  useEffect(() => {
    if (travelStartDate < earliestTravelDate) {
      const currentNights = diffNights(travelStartDate, travelEndDate);
      setTravelStartDate(earliestTravelDate);
      setTravelEndDate(addDaysToIso(earliestTravelDate, currentNights));
      return;
    }

    if (travelEndDate < minTravelEndDate) {
      setTravelEndDate(minTravelEndDate);
    }
  }, [earliestTravelDate, minTravelEndDate, travelEndDate, travelStartDate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const qsCountry = params.get("country");
    if (qsCountry && COUNTRIES.some((c) => c.code === qsCountry)) {
      setCountry(qsCountry);
    }

    const qsStart = params.get("start");
    const qsEnd = params.get("end");

    if (isIsoDateString(qsStart) && qsStart >= earliestTravelDate) {
      setTravelStartDate(qsStart);
      if (isIsoDateString(qsEnd) && qsEnd >= qsStart) {
        setTravelEndDate(qsEnd);
      } else {
        setTravelEndDate(addDaysToIso(qsStart, 6));
      }
    }
  }, [earliestTravelDate]);

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

    const todayIso = getIsoDateOffset(0);
    const dayOffset = Math.max(0, diffNights(todayIso, travelStartDate));
    // Open-Meteo forecast only covers 16 days. For travel dates further out use
    // last year's archive for the same calendar period as a seasonal reference.
    const useHistorical = dayOffset >= 15;

    const fetchUrl = useHistorical
      ? (() => {
          const histStart = makeHistoricalDate(travelStartDate);
          const histEnd = addDaysToIso(histStart, 5);
          return `https://archive-api.open-meteo.com/v1/archive?latitude=${location.lat}&longitude=${location.lon}&start_date=${histStart}&end_date=${histEnd}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
        })()
      : `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=16&timezone=auto`;

    fetch(fetchUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Weather API failed");
        return res.json();
      })
      .then((data) => {
        const dailyTimes: string[] = data?.daily?.time ?? [];
        const maxTemps: number[] = data?.daily?.temperature_2m_max ?? [];
        const minTemps: number[] = data?.daily?.temperature_2m_min ?? [];
        const weatherCodes: number[] = data?.daily?.weathercode ?? [];

        // Historical archive has precipitation_sum instead of probability — convert
        const rainProb: number[] = useHistorical
          ? (data?.daily?.precipitation_sum as number[] ?? []).map(
              (p: number) => (p ?? 0) > 2 ? 70 : (p ?? 0) > 0.5 ? 35 : 5
            )
          : (data?.daily?.precipitation_probability_max as number[] ?? []);

        if (dailyTimes.length === 0) throw new Error("No weather data");

        // Historical: all fetched dates map to the travel window; forecast: clamp to available range
        const startIndex = useHistorical ? 0 : Math.min(dayOffset, dailyTimes.length - 1);

        const visibleForecast = dailyTimes
          .slice(startIndex, startIndex + 5)
          .map((_date, offset) => {
            const index = startIndex + offset;
            return {
              // Use actual travel dates for display so weekday labels are correct
              date: useHistorical ? addDaysToIso(travelStartDate, offset) : dailyTimes[index],
              max: Math.round(maxTemps[index] ?? 0),
              min: Math.round(minTemps[index] ?? 0),
              code: Number(weatherCodes[index] ?? 0),
            };
          });

        const firstDay = visibleForecast[0];
        const firstMax = firstDay?.max ?? 0;
        const firstMin = firstDay?.min ?? 0;

        setWeather({
          location: location.city,
          currentTemp: Math.round((firstMax + firstMin) / 2),
          currentCode: Number(firstDay?.code ?? 0),
          tomorrowRain: Math.round(rainProb[0] ?? 0),
          isHistorical: useHistorical,
          forecast: visibleForecast,
        });
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setWeatherError("Unable to load weather right now");
      })
      .finally(() => setWeatherLoading(false));

    return () => controller.abort();
  }, [country, travelStartDate]);

  useEffect(() => {
    if (shareStatus !== "copied") return;
    const timer = window.setTimeout(() => setShareStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [shareStatus]);

  useEffect(() => {
    if (!selectedAdvisory || selectedAdvisory.score < 3.0) {
      setShowRiskPopup(false);
      return;
    }

    const popupKey = advisoryPopupKey(selectedAdvisory);
    if (shownRiskPopupKeysRef.current.has(popupKey)) {
      return;
    }

    setShowRiskPopup(true);
  }, [country, selectedAdvisory]);

  useEffect(() => {
    if (!showRiskPopup) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissRiskPopup();
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showRiskPopup, selectedAdvisory]);

  // Fetch live travel safety news; re-fetches every 30 minutes
  useEffect(() => {
    let disposed = false;
    const doFetch = () => {
      if (!disposed) setTravelNewsLoading(true);
      fetch("/api/travel-news")
        .then((r) => r.json())
        .then((data: TravelNewsData) => {
          if (!disposed) setTravelNews(data);
        })
        .catch(() => {})
        .finally(() => {
          if (!disposed) setTravelNewsLoading(false);
        });
    };
    doFetch();
    const timer = setInterval(doFetch, 30 * 60 * 1000);
    return () => {
      disposed = true;
      clearInterval(timer);
    };
  }, []);

  function buildShareUrl(): string {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "https://travel-fx-optimizer.local/";
    const url = new URL(base);
    url.searchParams.set("country", country);
    url.searchParams.set("start", travelStartDate);
    url.searchParams.set("end", travelEndDate);
    return url.toString();
  }

  async function copyScoreLink() {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
  }

  async function shareScoreLink(title: string, text: string) {
    const url = buildShareUrl();

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // Ignore user-cancelled shares and fall back to clipboard only when needed.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
  }

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
  const hotelCost = toHomeCurrency(hotelPerNight) * Math.max(1, travelNights);
  const totalTripCost = hotelCost + activityCost;

  /** Format rate — use more decimals for small-unit currencies */
  function formatRate(rate: number, foreignCurr: string): string {
    const decimals = ["JPY", "KRW", "IDR", "VND"].includes(foreignCurr) ? 6 : 4;
    return rate.toFixed(decimals);
  }

  const riskPopupMeta = selectedAdvisory
    ? selectedAdvisory.score >= 4.5
      ? {
          icon: "🚫",
          title: lx.safetyDoNotTravel,
          palette: "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
        }
      : selectedAdvisory.score >= 4.0
      ? {
          icon: "⛔",
          title: lx.safetyReconsiderTravel,
          palette: "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
        }
      : {
          icon: "⚠️",
          title: lx.safetyExerciseCaution,
          palette: "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",
        }
    : null;

  return (
    <main
      className="min-h-screen dark:bg-gray-950"
      style={dark ? undefined : { background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)" }}
    >
      {showRiskPopup && selectedAdvisory && riskPopupMeta && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label={lx.dismiss}
            onClick={dismissRiskPopup}
            className="absolute inset-0 bg-slate-950/60"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={lx.riskPopupTitle}
            className="relative z-10 w-full max-w-md rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {lx.riskPopupTitle}
                </p>
                <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${riskPopupMeta.palette}`}>
                  <span>{riskPopupMeta.icon}</span>
                  <span>{riskPopupMeta.title}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={dismissRiskPopup}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                aria-label={lx.dismiss}
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              {lx.riskPopupBody
                .replace("{country}", selectedCountry?.name ?? selectedAdvisory.name)
                .replace("{score}", selectedAdvisory.score.toFixed(1))}
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{lx.riskPopupLiveData}</p>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={openRiskDetails}
                className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                {lx.riskPopupViewDetails}
              </button>
              <button
                type="button"
                onClick={dismissRiskPopup}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {lx.riskPopupContinue}
              </button>
            </div>
          </div>
        </div>
      )}

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
                {lc.heroTitle}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                {lc.heroSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
            </div>
          </div>

          <section className="mt-5 rounded-3xl border border-white/20 bg-white/10 px-5 py-6 backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">TravelWiseRate</p>
            <h2 className="mt-2 text-xl font-extrabold text-white leading-tight">
              {lx.planTravelTiming}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-100">
              {lx.seeFestivalWeatherCrowdCost}
            </p>

            <div className="mt-4 rounded-2xl border border-white/25 bg-white/10 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-200">{lx.dateRange}</p>
                <p className="text-[11px] font-semibold text-blue-100">{selectedNights} {lx.nightsLabel}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-end">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-blue-200">{lc.travelStart}</p>
                  <input
                    type="date"
                    min={earliestTravelDate}
                    value={travelStartDate}
                    onChange={(e) => handleTravelStartDateChange(e.target.value)}
                    className="w-full rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="hidden sm:flex items-center justify-center px-1 pb-2 text-blue-100 text-sm">→</div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-blue-200">{lc.travelEnd}</p>
                  <input
                    type="date"
                    min={minTravelEndDate}
                    value={travelEndDate}
                    onChange={(e) => handleTravelEndDateChange(e.target.value)}
                    className="w-full rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <a
              href="#calculator-section"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-blue-900 hover:bg-blue-50 transition-colors"
            >
              {lc.startCalculator}
            </a>
            <p className="mt-2 text-center text-xs text-blue-100">{lc.helper}</p>
            <a href="#example-travel-insight" className="mt-2 inline-flex text-sm font-semibold text-blue-100 hover:text-white">
              {lc.seeExample}
            </a>
          </section>

          <section className="mt-4 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200">{lc.howWorks}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-900 px-4 py-3">
              <p className="text-xs font-semibold text-blue-700">{lx.stepLabel} 1</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{lc.step1}</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-gray-900 px-4 py-3">
              <p className="text-xs font-semibold text-blue-700">{lx.stepLabel} 2</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{lc.step2}</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-gray-900 px-4 py-3">
              <p className="text-xs font-semibold text-blue-700">{lx.stepLabel} 3</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{lc.step3}</p>
            </div>
            </div>
          </section>

          <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest">
              🛫 {lx.whereAreYouTraveling}
            </p>

            <div className="mt-3">
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" className="text-gray-900 dark:text-gray-100">
                  — Select a destination —
                </option>
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
              {lx.destination}
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
              {selectedCountry?.flag} {selectedCountry?.name}
            </p>
          </div>

          {/* Destination context dashboard */}
          {(() => {
            const guideCountry = CODE_TO_COUNTRY[country];
            const festivalKey = COUNTRY_CODE_TO_GUIDE[country];
            const selectedTravelMonth = travelStartDate
              ? new Date(`${travelStartDate}T00:00:00`).getMonth()
              : new Date().getMonth();
            const shortMonths = Array.from({ length: 12 }, (_, i) =>
              new Date(2026, i, 1).toLocaleDateString(lang, { month: "short" })
            );
            const monthsWithFestivals = festivalKey
              ? Array.from({ length: 12 }, (_, i) => getFestivalsForMonth(i, festivalKey))
              : [];
            const thisMonthFestivals = festivalKey ? getFestivalsForMonth(selectedTravelMonth, festivalKey) : [];
            const highCrowdNow = thisMonthFestivals.filter((f) => f.crowdLevel === "high" && f.priceImpact);
            const seasonalHighlights = getSeasonalHighlights(country, selectedTravelMonth);

            const travelUpdates: string[] = [];
            if (highCrowdNow.length > 0) {
              travelUpdates.push(lx.crowdedSeasonDue.replace("{name}", highCrowdNow[0].name));
            }
            if (weather && weather.tomorrowRain >= 55) {
              travelUpdates.push(lx.rainRiskElevated.replace("{pct}", String(weather.tomorrowRain)));
            }
            const safetyWarning = countryWarnings.find((w) => w.category === "safety" || w.category === "scam");
            if (safetyWarning) {
              travelUpdates.push(safetyWarning.message);
            }
            if (travelUpdates.length === 0) {
              travelUpdates.push(lx.noDisruptions);
            }

            const firstFestival = thisMonthFestivals[0];
            const keyRisk = countryWarnings.find((w) => w.category === "scam" || w.category === "safety") ?? countryWarnings[0];
            const weatherSummary = weather
              ? `${weather.currentTemp}C - ${getWeatherLabel(weather.currentCode, lx)}`
              : lx.weatherLoadingShort;

            const budgetMonths = festivalKey
              ? getBudgetMonths(festivalKey)
                  .filter((m) => m !== selectedTravelMonth)
                  .slice(0, 3)
              : [];

            const advisoryRiskScore = selectedAdvisory?.score ?? 0;
            const advisoryPenalty =
              advisoryRiskScore >= 4.5
                ? 45
                : advisoryRiskScore >= 4.0
                ? 35
                : advisoryRiskScore >= 3.0
                ? 22
                : advisoryRiskScore >= 2.5
                ? 12
                : advisoryRiskScore >= 2.0
                ? 6
                : 0;

            let travelTimingScore = 84;
            if (thisMonthFestivals.length > 0) travelTimingScore -= 6;
            if (highCrowdNow.length > 0) travelTimingScore -= 16;
            if (thisMonthFestivals.some((f) => f.priceImpact)) travelTimingScore -= 12;
            if (countryWarnings.length > 0) travelTimingScore -= Math.min(14, countryWarnings.length * 4);
            travelTimingScore -= advisoryPenalty;
            if (weather) {
              if (weather.tomorrowRain >= 60) travelTimingScore -= 10;
              if (weather.currentTemp >= 12 && weather.currentTemp <= 28) travelTimingScore += 4;
              if (weather.currentTemp >= 34 || weather.currentTemp <= 2) travelTimingScore -= 4;
            }
            if (budgetMonths.length > 0) travelTimingScore += 2;

            const normalizedScore = clampScore(travelTimingScore);
            const scoreLabel = getScoreLabel(normalizedScore, lc);
            const scoreTone = getScoreTone(normalizedScore);
            const scorePalette = getScorePalette(normalizedScore);
            const selectedRangeLabel = `${formatDateLabel(travelStartDate, lang)} - ${formatDateLabel(travelEndDate, lang)}`;
            const altMonth = budgetMonths[0];
            const altRangeLabel = altMonth !== undefined ? `${shortMonths[altMonth]} 8 - ${shortMonths[altMonth]} 12` : null;
            const altScore = clampScore(normalizedScore + (altMonth !== undefined ? 18 : 0));

            const shareRawText = `${selectedCountry?.name ?? "Destination"} ${selectedRangeLabel}\nTravel Timing Score: ${normalizedScore}/100\n${scoreLabel}`;
            const shareText = encodeURIComponent(shareRawText);
            const shareUrlEncoded = encodeURIComponent(buildShareUrl());

            const showFestival = exploreFilter === "all" || exploreFilter === "festival";
            const showWeather = exploreFilter === "all" || exploreFilter === "weather";
            const showRisks = exploreFilter === "all" || exploreFilter === "risks";
            const showCost = exploreFilter === "all" || exploreFilter === "cost";
            const showCalculator = exploreFilter === "all" || exploreFilter === "calculator";
            const showApps = exploreFilter === "all" || exploreFilter === "apps";
            const showPlanner = exploreFilter === "all" || exploreFilter === "planner";

            return (
              <div className="mt-8 space-y-6">
                <section className="rounded-3xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-5 py-5 shadow-md">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">{lc.scoreTitle}</p>
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
                    <div className="space-y-3">
                      <div className={`mx-auto h-40 w-40 rounded-full p-2 ${scorePalette.ring}`}>
                        <div className={`h-full w-full rounded-full flex flex-col items-center justify-center ${scorePalette.inner}`}>
                          <p className={`text-6xl leading-none font-black ${scoreTone}`}>{normalizedScore}</p>
                          <p className="mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">/100</p>
                        </div>
                      </div>
                      <p className={`text-center text-sm font-bold ${scoreTone}`}>{scoreLabel}</p>
                      {selectedAdvisory && advisoryPenalty > 0 && (
                        <p className="text-center text-[11px] font-semibold text-rose-600 dark:text-rose-300">
                          Safety advisory impact: -{advisoryPenalty} pts ({selectedAdvisory.score.toFixed(1)}/5)
                        </p>
                      )}
                      <button
                        onClick={() => setShowShareLinks((prev) => !prev)}
                        className="w-full rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-semibold"
                      >
                        {lc.shareMyTiming}
                      </button>
                      {showShareLinks && (
                        <div className="space-y-2 text-xs">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={copyScoreLink}
                              className="rounded-full bg-gray-800 text-white px-3 py-1.5"
                            >
                              {shareStatus === "copied" ? "Copied" : "Copy link"}
                            </button>
                            <button
                              onClick={() => shareScoreLink(lc.scoreTitle, shareRawText)}
                              className="rounded-full bg-blue-600 text-white px-3 py-1.5"
                            >
                              Share
                            </button>
                          </div>
                          {shareStatus === "error" && (
                            <p className="text-[11px] text-rose-600 dark:text-rose-300">Could not copy link. Please try again.</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                          <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEncoded}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#111827] text-white px-3 py-1.5">{lx.shareTwitter}</a>
                          <a href={`https://www.reddit.com/submit?title=My%20Travel%20Timing%20Score&text=${shareText}%0A${shareUrlEncoded}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#ff4500] text-white px-3 py-1.5">{lx.shareReddit}</a>
                          <a href={`https://www.instagram.com/`} target="_blank" rel="noreferrer" className="rounded-full bg-[#E1306C] text-white px-3 py-1.5">{lx.shareInstagram}</a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {lx.destinationWithDates
                          .replace("{country}", selectedCountry?.name ?? "")
                          .replace("{dates}", selectedRangeLabel)}
                      </p>
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-3">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{lx.festivalLabel}</p>
                          <p className="mt-0.5 text-gray-600 dark:text-gray-300">{lx.majorSeasonalEvents}</p>
                          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">{firstFestival ? firstFestival.name : lx.noMajorEvent}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-3">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{lx.weatherLabel}</p>
                          <p className="mt-0.5 text-gray-600 dark:text-gray-300">{lx.tempAndComfort}</p>
                          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">{weatherSummary}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-3">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{lx.crowdsLabel}</p>
                          <p className="mt-0.5 text-gray-600 dark:text-gray-300">{lx.peakTrafficCongestion}</p>
                          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">{highCrowdNow.length > 0 ? lx.veryBusyWeekends : lx.manageable}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-3">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{lx.costImpactLabel}</p>
                          <p className="mt-0.5 text-gray-600 dark:text-gray-300">{lx.seasonalPricePressure}</p>
                          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">{highCrowdNow.length > 0 ? lx.hotelSurge : lx.stablePricing}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-xs text-gray-600 dark:text-gray-300">
                        {lx.recommendation}: {highCrowdNow.length > 0 ? lx.travelMidweek : lx.balancedTiming}
                      </p>

                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{lx.tryAnotherDestination}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[
                            { label: "Tokyo", code: "JP" },
                            { label: "Kyoto", code: "JP" },
                            { label: "Seoul", code: "KR" },
                            { label: "Paris", code: "FR" },
                            { label: "Bangkok", code: "TH" },
                          ].map((quick) => (
                            <button
                              key={`${quick.label}-${quick.code}`}
                              onClick={() => handleCountryChange(quick.code)}
                              className="rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200"
                            >
                              {quick.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/40 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">{lc.smartAlt}</p>
                    <p className="mt-1 text-sm text-gray-800 dark:text-gray-100">{lc.yourSelectedDates}: {selectedRangeLabel} · Score: {normalizedScore}</p>
                    {altRangeLabel ? (
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {lc.betterOption}: {altRangeLabel} · Score: {altScore}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{lc.alreadyGood}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{lc.altReason}</p>
                  </div>
                </section>

                <section className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">{lc.exploreInsights}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exploreFilters.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setExploreFilter(item.id);
                          jumpToSection(item.targetId);
                        }}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          exploreFilter === item.id
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </section>

                {showFestival && festivalKey && (
                  <section id="festival-calendar" className="rounded-3xl border border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 px-5 py-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 dark:text-purple-300">{lc.festivalCalendar} - {selectedCountry?.name}</p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{lc.festivalDesc}</p>
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {shortMonths.map((m, i) => {
                        const festivals = monthsWithFestivals[i];
                        const hasFestival = festivals.length > 0;
                        const isTravelMonth = i === selectedTravelMonth;
                        const base = isTravelMonth
                          ? "bg-purple-600 text-white ring-2 ring-purple-300"
                          : hasFestival
                            ? "bg-purple-200 text-purple-900"
                            : "bg-white/90 dark:bg-gray-800 text-gray-500 dark:text-gray-300";
                        const tag = hasFestival ? festivals[0].emoji : "";
                        return (
                          <div key={m} className={`shrink-0 rounded-xl px-3 py-2 text-center min-w-[64px] ${base}`}>
                            <p className="text-[11px] font-bold">{m}</p>
                            <p className="text-sm mt-0.5">{tag || "-"}</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {showWeather && (
                  <section id="weather-section" className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{lc.weatherInsights}</p>
                    <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">{lc.weatherConditions} {selectedCountry?.name}</h3>
                    {weatherLoading ? (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{lc.loadingWeather}</p>
                    ) : weatherError || !weather ? (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{weatherError ?? lc.weatherUnavailable}</p>
                    ) : (
                      <div className="mt-2 space-y-3">
                        <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {weather.location}: {weather.currentTemp}°C — {getWeatherLabel(weather.currentCode, lx)}
                            </p>
                            {weather.isHistorical && (
                              <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-300">
                                📅 Seasonal avg ({new Date(travelStartDate).getFullYear() - 1} data)
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                            {weather.tomorrowRain >= 55
                              ? lx.rainExpected.replace("{pct}", String(weather.tomorrowRain))
                              : lx.rainChance.replace("{pct}", String(weather.tomorrowRain))}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {weather.forecast.map((day) => {
                            const weekday = new Date(day.date).toLocaleDateString(lang, { weekday: "short" });
                            return (
                              <div key={day.date} className="rounded-lg bg-slate-50 dark:bg-gray-800 px-1.5 py-2 text-center">
                                <p className="text-[10px] font-semibold text-gray-600 dark:text-gray-300">{weekday}</p>
                                <p className="mt-0.5 text-[10px] text-gray-900 dark:text-gray-100">{day.max}°/{day.min}°</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="rounded-xl border border-black/10 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{lc.travelComfort}</p>
                          <p className="mt-1 text-xs leading-relaxed text-gray-700 dark:text-gray-200">{getWeatherPlanHint(weather, lx)}</p>
                        </div>
                        {(() => {
                          const raw = selectedDestination?.flightPriceEstimate;
                          if (!raw || usdRateLoading) return null;
                          const nums = raw.replace(/[$,]/g, "").split(/[\u2013\u2014\-]/);
                          const lo = Number(nums[0]?.trim());
                          const hi = Number(nums[1]?.trim());
                          if (!lo || !hi) return null;
                          return (
                            <div className="rounded-xl border border-black/10 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{lc.estimatedFlightCost}</p>
                              <p className="mt-1 text-sm font-bold text-gray-900 dark:text-gray-100">
                                {fmtCurrencyRound(lo * usdToHomeRate, homeCurrency)} - {fmtCurrencyRound(hi * usdToHomeRate, homeCurrency)}
                              </p>
                              <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">{lc.flightBased} {homeCurrency}.</p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </section>
                )}

                {showRisks && (
                  <div id="warnings-section" className="space-y-4">
                    <TravelSafetyNews
                      countryCode={country}
                      countryName={selectedCountry?.name ?? lx.thisDestination}
                      advisories={travelNews?.advisories ?? {}}
                      bannedAirlines={travelNews?.bannedAirlines ?? []}
                      fetchedAt={travelNews?.fetchedAt ?? null}
                      isLoading={travelNewsLoading}
                      isFallback={travelNews?.fallback}
                      labels={{
                        title: lx.safetyNewsTitle,
                        updatedAgo: lx.safetyUpdatedAgo,
                        offline: lx.safetyOffline,
                        advisoryFor: lx.safetyAdvisoryFor,
                        doNotTravel: lx.safetyDoNotTravel,
                        reconsiderTravel: lx.safetyReconsiderTravel,
                        exerciseCaution: lx.safetyExerciseCaution,
                        normalPrecautions: lx.safetyNormalPrecautions,
                        unknown: lx.safetyUnknown,
                        riskScore: lx.safetyRiskScore,
                        sourceUpdated: lx.safetySourceUpdated,
                        officialSource: lx.safetyOfficialSource,
                        noAdvisory: lx.safetyNoAdvisory,
                        aviationFor: lx.safetyAviationFor,
                        euListLabel: lx.safetyEuListLabel,
                        noAirlinesBanned: lx.safetyNoAirlinesBanned,
                        noAirlinesBannedDesc: lx.safetyNoAirlinesBannedDesc,
                        viewGlobalList: lx.safetyViewGlobalList,
                        hideGlobalList: lx.safetyHideGlobalList,
                        disclaimer: lx.safetyDisclaimer,
                        autoRefresh: lx.safetyAutoRefresh,
                        justNow: lx.safetyJustNow,
                        oneMinAgo: lx.safety1MinAgo,
                        nMinAgo: lx.safetyNMinAgo,
                        hAgo: lx.safetyHAgo,
                      }}
                    />
                    <DestinationWarnings
                      countryName={selectedCountry?.name ?? lx.thisDestination}
                      warnings={countryWarnings}
                      labels={{
                        title: lx.thingsToAvoidIn,
                        empty: lx.noWarnings,
                        categories: {
                          weather: lx.warningWeather,
                          crowds: lx.warningCrowds,
                          scam: lx.warningScam,
                          season: lx.warningSeason,
                          safety: lx.warningSafety,
                        },
                      }}
                    />
                  </div>
                )}

                {showCost && (
                  <section id="updates-section" className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{lc.costImpactTitle}</p>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lx.festivalTiming}</p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{firstFestival ? `${firstFestival.emoji} ${firstFestival.name}` : lx.noMajorEventWindow}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lx.travelRisks}</p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{keyRisk ? keyRisk.message : lx.noWarnings}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lc.seasonHighlights}</p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{seasonalHighlights[0]}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lc.priceDirection}</p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{highCrowdNow.length > 0 ? lc.highDemand : lc.balancedDemand}</p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {travelUpdates.slice(0, 3).map((item, index) => (
                        <li key={`${index}-${item.slice(0, 18)}`} className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                          - {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {country && firstFestival && (
                  <section id="example-travel-insight" className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{lc.exampleTitle}</p>
                    <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">{selectedCountry?.name} — {shortMonths[selectedTravelMonth]}</h3>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-200">
                      <p className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2"><span className="font-semibold">{lx.festivalLabel}:</span> {firstFestival.name}</p>
                      <p className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2"><span className="font-semibold">{lx.weatherLabel}:</span> {weather ? `${weather.currentTemp}°C` : "—"}</p>
                      <p className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2"><span className="font-semibold">{lx.crowdsLabel}:</span> {highCrowdNow.length > 0 ? lx.veryBusyWeekends : lx.manageable}</p>
                      <p className="rounded-xl bg-slate-50 dark:bg-gray-800 px-3 py-2"><span className="font-semibold">{lx.costImpactLabel}:</span> {highCrowdNow.length > 0 ? lx.hotelSurge : lx.stablePricing}</p>
                    </div>
                  </section>
                )}

                <section className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{lc.bestTimeToVisit}</p>
                  <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">{selectedCountry?.name}</h3>
                  <p className="mt-2 text-xs text-gray-700 dark:text-gray-200"><span className="font-semibold">{lc.bestMonths}:</span> {budgetMonths.length > 0 ? budgetMonths.map((m) => shortMonths[m]).join(", ") : lx.defaultBestMonths}</p>
                  <p className="mt-1 text-xs text-gray-700 dark:text-gray-200"><span className="font-semibold">{lc.avoid}:</span> {lc.avoidText}</p>
                </section>

                {showCalculator && (
                  <section
                    id="calculator-section"
                    className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm"
                  >
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{lx.fxCalculator}</p>
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
                )}

                {!results && showCalculator && (
                  <section className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">{lx.quickCostExample}</p>
                    <InstantExample
                      currency={currency}
                      homeCurrency={homeCurrency}
                      midRate={midRate}
                      rateLoading={rateLoading}
                      t={t}
                    />
                  </section>
                )}

                {showApps && (
                  <div id="apps-section">
                    <DestinationApps
                      countryName={selectedCountry?.name ?? lx.thisDestination}
                      apps={countryApps}
                      labels={{
                        title: lx.usefulAppsIn,
                        empty: lx.noAppsYet,
                        categories: {
                          transport: lx.appTransport,
                          maps: lx.appMaps,
                          translation: lx.appTranslation,
                          food: lx.appFood,
                          payment: lx.appPayment,
                        },
                      }}
                    />
                  </div>
                )}

                {showPlanner && (
                <section
                  id="planner-section"
                  className="rounded-2xl border border-black/10 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-4"
                >
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{lx.activitiesPlanner}</p>
                  {activityCountry ? (
                    <div className="mt-2 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setActivityCategory("all")}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            activityCategory === "all" ? "bg-blue-600 text-white" : "bg-[#f5f7fb] dark:bg-gray-800/70 text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {lx.all}
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
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lx.customActivity}</p>
                        <input
                          value={customActivityName}
                          onChange={(e) => setCustomActivityName(e.target.value)}
                          placeholder={lx.activityName}
                          className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                        />
                        <div className="flex gap-2">
                          <input
                            value={customActivityCost}
                            onChange={(e) => setCustomActivityCost(e.target.value)}
                            placeholder={lx.estimatedCost.replace("{currency}", homeCurrency)}
                            type="number"
                            min={0}
                            className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                          />
                          <button onClick={addCustomActivity} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
                            {lx.add}
                          </button>
                        </div>
                      </div>

                      {(selectedBaseActivities.length > 0 || customActivities.length > 0) && (
                        <div className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-3 space-y-1.5">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lx.selectedActivities}</p>
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
                                  {lx.remove}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="rounded-xl border border-black/5 dark:border-gray-700 bg-[#f5f7fb] dark:bg-gray-800/70 px-3 py-3 space-y-2">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{lx.tripEstimate}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="mb-1 text-[11px] text-gray-500 dark:text-gray-400">{lx.nightsLabel}</p>
                            <input
                              type="number"
                              min={1}
                              value={travelNights || ""}
                              onChange={(e) => {
                                const raw = e.target.value;
                                setTravelNights(raw === "" ? 0 : Math.max(0, Number(raw)));
                              }}
                              onBlur={() => setTravelNights((prev) => (prev < 1 ? 1 : prev))}
                              className="w-full rounded-lg border border-black/10 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                            />
                          </div>
                          <div>
                            <p className="mb-1 text-[11px] text-gray-500 dark:text-gray-400">{lx.hotelPerNight.replace("{currency}", homeCurrency)}</p>
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
                          <p>{lx.hotelCost}: <span className="font-semibold">{fmtCurrency(hotelCost, homeCurrency)}</span></p>
                          <p>{lx.activityCost}: <span className="font-semibold">{fmtCurrency(activityCost, homeCurrency)}</span></p>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{lx.totalTripCost}: {fmtCurrency(totalTripCost, homeCurrency)}</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {usdRateLoading ? lx.updatingRate : lx.plannerRate.replace("{rate}", usdToHomeRate.toFixed(4)).replace("{currency}", homeCurrency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">{lx.plannerAvailability}</p>
                  )}
                </section>
                )}
              </div>
            );
          })()}

          {/* Secondary FX reference */}
          <div className="mt-6 rounded-xl border border-black/10 bg-white/80 dark:border-gray-800 dark:bg-gray-900/70 px-3 py-2">
            {rateLoading ? (
              <span className="text-gray-500 dark:text-gray-400 text-[11px]">{t.loadingRate}</span>
            ) : (
              <div className="space-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                <p>
                  1 {currency} = <span className="font-semibold text-gray-700 dark:text-gray-200">{formatRate(midRate, currency)} {homeCurrency}</span>
                  <span className="ml-1">({rateFallback ? t.indicativeRate : t.liveRate})</span>
                </p>
                <p>{t.fxSourceLabel} exchangerate.host</p>
                {rateTimestamp && (
                  <p>
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
            )}
          </div>
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
        <TravelMistakes lang={lang} />

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

        <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-6 text-white shadow-md">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-100">{lx.finalStep}</p>
          <h2 className="mt-1 text-xl font-extrabold">{lx.planTripSmarter}</h2>
          <a
            href="#calculator-section"
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-blue-800 hover:bg-blue-50"
          >
            {lx.startTravelCalculator}
          </a>
        </section>
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


import type { Lang } from "@/data/translations";

const MISTAKES: Record<Lang, { heading: string; title: string; items: Array<{ emoji: string; title: string; body: string }> }> = {
  en: {
    heading: "Common Mistakes",
    title: "⚠️ Travel Money Mistakes Tourists Make",
    items: [
      {
        emoji: "❌",
        title: "Paying in your home currency abroad (DCC)",
        body: "When a terminal asks 'Pay in USD or local currency?' always choose local. DCC often adds an invisible 3-8% surcharge.",
      },
      {
        emoji: "❌",
        title: "Airport currency exchange",
        body: "Airport FX booths often charge 10-15% above mid-market. Exchange only small cash, then use card or bank ATM.",
      },
      {
        emoji: "❌",
        title: "Using a standard credit card abroad",
        body: "Many banks add 2-3% foreign transaction fees. A low-fee travel card can reduce this cost.",
      },
      {
        emoji: "❌",
        title: "Not checking exchange rate before travel",
        body: "If you do not know the fair rate, it is hard to detect a bad deal. Check the rate before paying.",
      },
    ],
  },
  th: {
    heading: "ข้อผิดพลาดที่พบบ่อย",
    title: "⚠️ พลาดเรื่องเงินที่นักท่องเที่ยวเจอบ่อย",
    items: [
      {
        emoji: "❌",
        title: "จ่ายเป็นสกุลบ้านเกิด (DCC)",
        body: "ถ้าเครื่องถามให้จ่ายเป็นเงินบาทหรือสกุลท้องถิ่น ให้เลือกสกุลท้องถิ่นเสมอ DCC มักแพงกว่า 3-8%",
      },
      {
        emoji: "❌",
        title: "แลกเงินที่สนามบิน",
        body: "เคาน์เตอร์แลกเงินสนามบินมักแพงกว่าเรทกลาง 10-15% ควรแลกแค่พอใช้เบื้องต้น",
      },
      {
        emoji: "❌",
        title: "ใช้บัตรธรรมดาในต่างประเทศ",
        body: "บัตรบางใบมีค่าธรรมเนียมต่างประเทศ 2-3% ทุกครั้งที่รูด ใช้บัตรค่าธรรมเนียมต่ำจะช่วยประหยัด",
      },
      {
        emoji: "❌",
        title: "ไม่เช็กเรทก่อนเดินทาง",
        body: "ถ้าไม่รู้เรทยุติธรรม จะจับดีลไม่คุ้มได้ยาก ควรเช็กเรทก่อนจ่ายทุกครั้ง",
      },
    ],
  },
  es: {
    heading: "Errores comunes",
    title: "⚠️ Errores de dinero al viajar",
    items: [
      { emoji: "❌", title: "Pagar en tu moneda (DCC)", body: "Cuando el terminal pregunte, elige moneda local. DCC suele añadir 3-8% extra." },
      { emoji: "❌", title: "Cambiar dinero en el aeropuerto", body: "El aeropuerto suele tener peores tasas. Cambia solo lo mínimo." },
      { emoji: "❌", title: "Usar tarjeta estándar", body: "Muchas tarjetas cobran 2-3% por transacción internacional." },
      { emoji: "❌", title: "No revisar el tipo de cambio", body: "Sin una referencia, es difícil detectar una mala tarifa." },
    ],
  },
  zh: {
    heading: "常见错误",
    title: "⚠️ 游客常见的旅行支付错误",
    items: [
      { emoji: "❌", title: "用本币支付（DCC）", body: "刷卡时请选择当地货币，DCC常多收3-8%。" },
      { emoji: "❌", title: "在机场换汇", body: "机场汇率通常更差，建议只换少量现金。" },
      { emoji: "❌", title: "使用普通信用卡", body: "很多卡有2-3%的境外手续费。" },
      { emoji: "❌", title: "出行前不查汇率", body: "不知道合理汇率就很难识别不划算报价。" },
    ],
  },
  ja: {
    heading: "よくあるミス",
    title: "⚠️ 旅行者がしやすいお金の失敗",
    items: [
      { emoji: "❌", title: "自国通貨払い（DCC）を選ぶ", body: "端末では現地通貨を選びましょう。DCCは3-8%高くなることがあります。" },
      { emoji: "❌", title: "空港で両替する", body: "空港レートは不利なことが多いため最小限に。" },
      { emoji: "❌", title: "一般カードをそのまま使う", body: "海外手数料2-3%がかかるカードがあります。" },
      { emoji: "❌", title: "出発前にレートを確認しない", body: "基準レートを知らないと損な条件に気づけません。" },
    ],
  },
  ko: {
    heading: "자주 하는 실수",
    title: "⚠️ 여행 경비에서 많이 하는 실수",
    items: [
      { emoji: "❌", title: "자국 통화 결제(DCC) 선택", body: "결제 시 현지 통화를 선택하세요. DCC는 3-8% 더 비쌀 수 있습니다." },
      { emoji: "❌", title: "공항 환전 이용", body: "공항 환율은 불리한 경우가 많아 최소 금액만 환전하세요." },
      { emoji: "❌", title: "일반 카드 그대로 사용", body: "해외 결제 수수료 2-3%가 붙는 카드가 많습니다." },
      { emoji: "❌", title: "출발 전 환율 미확인", body: "기준 환율을 모르면 손해 조건을 구분하기 어렵습니다." },
    ],
  },
};

interface Props {
  lang: Lang;
}

export default function TravelMistakes({ lang }: Props) {
  const content = MISTAKES[lang] ?? MISTAKES.en;
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/50 shadow-sm p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 dark:text-orange-400 mb-1">
          {content.heading}
        </p>
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
          {content.title}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {content.items.map((m) => (
          <div key={m.title} className="flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">{m.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-0.5">
                {m.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {m.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Popular currency pairs for SEO pages at /convert/[pair]
 * e.g. /convert/usd-to-eur
 */

export interface CurrencyPair {
  from: string;  // ISO 4217 currency code
  to: string;
  fromName: string;
  toName: string;
  fromFlag: string;
  toFlag: string;
  slug: string;  // e.g. "usd-to-eur"
  travelTip?: string;
}

export const CURRENCY_PAIRS: CurrencyPair[] = [
  // USD pairs
  { from: "USD", to: "EUR", fromName: "US Dollar", toName: "Euro",           fromFlag: "🇺🇸", toFlag: "🇪🇺", slug: "usd-to-eur", travelTip: "Europe is largely cashless — your card is accepted almost everywhere. Avoid exchanging money at airports." },
  { from: "USD", to: "JPY", fromName: "US Dollar", toName: "Japanese Yen",   fromFlag: "🇺🇸", toFlag: "🇯🇵", slug: "usd-to-jpy", travelTip: "Japan is still cash-heavy. Withdraw JPY from 7-Eleven or Japan Post ATMs — they accept foreign cards." },
  { from: "USD", to: "GBP", fromName: "US Dollar", toName: "British Pound",  fromFlag: "🇺🇸", toFlag: "🇬🇧", slug: "usd-to-gbp", travelTip: "The UK is very card-friendly. Use a no-foreign-fee card to avoid the typical 2–3% FX markup." },
  { from: "USD", to: "THB", fromName: "US Dollar", toName: "Thai Baht",      fromFlag: "🇺🇸", toFlag: "🇹🇭", slug: "usd-to-thb", travelTip: "In Thailand, SuperRich and Vasu exchange booths offer much better rates than airport counters." },
  { from: "USD", to: "SGD", fromName: "US Dollar", toName: "Singapore Dollar", fromFlag: "🇺🇸", toFlag: "🇸🇬", slug: "usd-to-sgd", travelTip: "Singapore is extremely card-friendly. Contactless payments (Visa/Mastercard) are universally accepted." },
  { from: "USD", to: "AUD", fromName: "US Dollar", toName: "Australian Dollar", fromFlag: "🇺🇸", toFlag: "🇦🇺", slug: "usd-to-aud", travelTip: "Australia is cashless-friendly. Cards accepted almost everywhere, even on public transport." },
  { from: "USD", to: "CAD", fromName: "US Dollar", toName: "Canadian Dollar", fromFlag: "🇺🇸", toFlag: "🇨🇦", slug: "usd-to-cad", travelTip: "Canada is very card-friendly. Debit and credit cards accepted nearly everywhere in cities." },
  { from: "USD", to: "CNY", fromName: "US Dollar", toName: "Chinese Yuan",   fromFlag: "🇺🇸", toFlag: "🇨🇳", slug: "usd-to-cny", travelTip: "Set up Alipay or WeChat Pay before visiting China — QR code payment is dominant there." },
  { from: "USD", to: "KRW", fromName: "US Dollar", toName: "South Korean Won", fromFlag: "🇺🇸", toFlag: "🇰🇷", slug: "usd-to-krw", travelTip: "Korea is very card-friendly. Visa and Mastercard accepted widely. Keep some cash for traditional markets." },
  { from: "USD", to: "MXN", fromName: "US Dollar", toName: "Mexican Peso",   fromFlag: "🇺🇸", toFlag: "🇲🇽", slug: "usd-to-mxn", travelTip: "Having some pesos helps. Use ATMs inside banks rather than standalone machines to avoid scams." },
  // EUR pairs
  { from: "EUR", to: "USD", fromName: "Euro", toName: "US Dollar",           fromFlag: "🇪🇺", toFlag: "🇺🇸", slug: "eur-to-usd", travelTip: "The US doesn't have a VAT refund system for tourists, unlike the EU. Budget for sales tax on top of listed prices." },
  { from: "EUR", to: "GBP", fromName: "Euro", toName: "British Pound",       fromFlag: "🇪🇺", toFlag: "🇬🇧", slug: "eur-to-gbp", travelTip: "Use a travel card or Wise for better EUR→GBP rates. Airport bureaux can charge 5–10% above mid-market." },
  { from: "EUR", to: "JPY", fromName: "Euro", toName: "Japanese Yen",        fromFlag: "🇪🇺", toFlag: "🇯🇵", slug: "eur-to-jpy", travelTip: "Withdraw cash at Japanese ATMs rather than exchanging at European banks — you'll get a better rate." },
  { from: "EUR", to: "THB", fromName: "Euro", toName: "Thai Baht",           fromFlag: "🇪🇺", toFlag: "🇹🇭", slug: "eur-to-thb", travelTip: "Licensed exchange booths in Bangkok's shopping areas (Silom, Siam) offer the best EUR→THB rates." },
  { from: "EUR", to: "CHF", fromName: "Euro", toName: "Swiss Franc",         fromFlag: "🇪🇺", toFlag: "🇨🇭", slug: "eur-to-chf", travelTip: "Switzerland is expensive — plan carefully. Cards are accepted widely but CHF cash is useful in smaller towns." },
  // GBP pairs
  { from: "GBP", to: "USD", fromName: "British Pound", toName: "US Dollar",  fromFlag: "🇬🇧", toFlag: "🇺🇸", slug: "gbp-to-usd", travelTip: "Use a travel credit card (0% FX fee) for the best GBP→USD rate in the US." },
  { from: "GBP", to: "EUR", fromName: "British Pound", toName: "Euro",       fromFlag: "🇬🇧", toFlag: "🇪🇺", slug: "gbp-to-eur", travelTip: "Avoid Travelex and Post Office for currency exchange — use Starling, Wise, or your bank's travel card instead." },
  { from: "GBP", to: "JPY", fromName: "British Pound", toName: "Japanese Yen", fromFlag: "🇬🇧", toFlag: "🇯🇵", slug: "gbp-to-jpy", travelTip: "Withdraw yen from 7-Eleven ATMs in Japan — they offer fair rates and accept international cards." },
  { from: "GBP", to: "THB", fromName: "British Pound", toName: "Thai Baht",  fromFlag: "🇬🇧", toFlag: "🇹🇭", slug: "gbp-to-thb", travelTip: "SuperRich exchange booths in Bangkok offer some of the best GBP→THB rates in Southeast Asia." },
  // THB pairs
  { from: "THB", to: "JPY", fromName: "Thai Baht", toName: "Japanese Yen",   fromFlag: "🇹🇭", toFlag: "🇯🇵", slug: "thb-to-jpy", travelTip: "Exchange THB to JPY at exchange booths in Bangkok — rates there beat most airport and Japanese rates." },
  { from: "THB", to: "USD", fromName: "Thai Baht", toName: "US Dollar",      fromFlag: "🇹🇭", toFlag: "🇺🇸", slug: "thb-to-usd", travelTip: "Use a low-fee Thai bank card (TTB Flash ~1.5% FX) when spending in the US to minimize conversion losses." },
  { from: "THB", to: "EUR", fromName: "Thai Baht", toName: "Euro",           fromFlag: "🇹🇭", toFlag: "🇪🇺", slug: "thb-to-eur", travelTip: "Consider buying EUR in Bangkok before departure — rates are competitive at SuperRich or Vasu." },
  { from: "THB", to: "KRW", fromName: "Thai Baht", toName: "South Korean Won", fromFlag: "🇹🇭", toFlag: "🇰🇷", slug: "thb-to-krw", travelTip: "Exchange THB→KRW at ITM exchange in Bangkok — often cheaper than BKK airport rates by 2–3%." },
  { from: "THB", to: "SGD", fromName: "Thai Baht", toName: "Singapore Dollar", fromFlag: "🇹🇭", toFlag: "🇸🇬", slug: "thb-to-sgd", travelTip: "Singapore accepts cards everywhere. Use a Thai card with low FX fee to avoid the 2.5% markup." },
  // AUD pairs
  { from: "AUD", to: "JPY", fromName: "Australian Dollar", toName: "Japanese Yen", fromFlag: "🇦🇺", toFlag: "🇯🇵", slug: "aud-to-jpy", travelTip: "Withdraw JPY from ATMs in Japan rather than exchanging AUD before you leave — better rates." },
  { from: "AUD", to: "USD", fromName: "Australian Dollar", toName: "US Dollar", fromFlag: "🇦🇺", toFlag: "🇺🇸", slug: "aud-to-usd", travelTip: "Use a Citi or Macquarie travel debit card for 0% FX fees when spending USD in the US." },
  { from: "AUD", to: "THB", fromName: "Australian Dollar", toName: "Thai Baht", fromFlag: "🇦🇺", toFlag: "🇹🇭", slug: "aud-to-thb", travelTip: "Licensed exchange booths in Bangkok offer better AUD→THB rates than Australian airports." },
  // SGD pairs
  { from: "SGD", to: "THB", fromName: "Singapore Dollar", toName: "Thai Baht", fromFlag: "🇸🇬", toFlag: "🇹🇭", slug: "sgd-to-thb", travelTip: "Use a DBS/UOB multi-currency card for SGD→THB without conversion fees." },
  { from: "SGD", to: "USD", fromName: "Singapore Dollar", toName: "US Dollar", fromFlag: "🇸🇬", toFlag: "🇺🇸", slug: "sgd-to-usd", travelTip: "Most Singapore credit cards charge 2.5–3% on foreign transactions. Consider a Wise card for USD spending." },
  // KRW pairs
  { from: "KRW", to: "JPY", fromName: "South Korean Won", toName: "Japanese Yen", fromFlag: "🇰🇷", toFlag: "🇯🇵", slug: "krw-to-jpy", travelTip: "Exchange KRW→JPY at Myeongdong exchange booths in Seoul for the best rates before your Japan trip." },
  { from: "KRW", to: "USD", fromName: "South Korean Won", toName: "US Dollar", fromFlag: "🇰🇷", toFlag: "🇺🇸", slug: "krw-to-usd", travelTip: "Use a Korean travel card or Toss card for seamless USD payments with minimal FX fees." },
];

export const POPULAR_PAIR_SLUGS = CURRENCY_PAIRS.map((p) => p.slug);

export function getPairBySlug(slug: string): CurrencyPair | undefined {
  return CURRENCY_PAIRS.find((p) => p.slug === slug);
}

/** Get all pairs that have `currency` as the source */
export function getPairsFromCurrency(currency: string): CurrencyPair[] {
  return CURRENCY_PAIRS.filter((p) => p.from === currency);
}

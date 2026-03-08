import en from "@/locales/en.json";
import th from "@/locales/th.json";
import es from "@/locales/es.json";
import zh from "@/locales/zh.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";

export { en, th, es, zh, ja, ko };
export const translations = { en, th, es, zh, ja, ko } as const;
export type Lang = keyof typeof translations;
export type Translations = typeof en;

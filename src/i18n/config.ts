export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";
export const LOCALE_COOKIE = "locale";

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "fa" ? "rtl" : "ltr");

/** A string with one value per locale (used for product data). */
export type Localized = Record<Locale, string>;

import type { Locale } from "./config";

const intlLocale = (locale: Locale) => (locale === "fa" ? "fa-IR" : "en-US");

const priceFormatters = {
  en: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  fa: new Intl.NumberFormat("fa-IR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
};

export const formatPrice = (value: number, locale: Locale) => priceFormatters[locale].format(value);

export const formatNumber = (value: number, locale: Locale, minDigits = 1) =>
  value.toLocaleString(intlLocale(locale), { minimumIntegerDigits: minDigits, useGrouping: false });

/** "18K" -> "18K" / "۱۸ عیار" */
export const formatKarat = (karat: string, locale: Locale) => {
  if (locale === "en") return karat;
  return `${formatNumber(parseInt(karat, 10), locale)} عیار`;
};

/** 14.2 -> "14.2 g" / "۱۴٫۲ گرم" */
export const formatWeight = (grams: number, locale: Locale) =>
  locale === "fa" ? `${grams.toLocaleString("fa-IR")} گرم` : `${grams} g`;

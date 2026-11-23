import { createStore } from "zustand/vanilla";
import { dictionaries } from "@/i18n/dictionaries";
import { dirOf, LOCALE_COOKIE, type Locale } from "@/i18n/config";

export type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

export type LocaleStore = ReturnType<typeof createLocaleStore>;

/**
 * One store per request/tab (see LocaleProvider), seeded from the `locale` cookie
 * so the server renders the right language and the client never flashes.
 * Switching is pure client state: no navigation or refetch.
 */
export const createLocaleStore = (initialLocale: Locale) =>
  createStore<LocaleState>()((set, get) => ({
    locale: initialLocale,
    setLocale: (locale) => {
      if (locale === get().locale) return;
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.lang = locale;
        root.dir = dirOf(locale);
        document.title = dictionaries[locale].meta.title;
        document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
      }
      set({ locale });
    },
    toggleLocale: () => get().setLocale(get().locale === "fa" ? "en" : "fa"),
  }));

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { createLocaleStore, type LocaleState, type LocaleStore } from "@/store/localeStore";
import { dictionaries } from "@/i18n/dictionaries";
import { dirOf, type Locale } from "@/i18n/config";

const LocaleStoreContext = createContext<LocaleStore | null>(null);

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [store] = useState(() => createLocaleStore(initialLocale));
  return <LocaleStoreContext.Provider value={store}>{children}</LocaleStoreContext.Provider>;
}

export function useLocaleStore<T>(selector: (state: LocaleState) => T): T {
  const store = useContext(LocaleStoreContext);
  if (!store) throw new Error("useLocaleStore must be used inside <LocaleProvider>");
  return useStore(store, selector);
}

/** Current locale, its dictionary and text direction. Re-renders only when the locale changes. */
export function useI18n() {
  const locale = useLocaleStore((s) => s.locale);
  return { locale, t: dictionaries[locale], dir: dirOf(locale) } as const;
}

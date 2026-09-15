import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { es, type Dictionary } from "./locales/es";
import { en } from "./locales/en";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { pt } from "./locales/pt";

export const LOCALES = ["es", "en", "pt", "fr", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<Locale, { label: string; flag: string; htmlLang: string }> = {
  es: { label: "Español", flag: "🇻🇪", htmlLang: "es" },
  en: { label: "English", flag: "🇺🇸", htmlLang: "en" },
  pt: { label: "Português (BR)", flag: "🇧🇷", htmlLang: "pt-BR" },
  fr: { label: "Français", flag: "🇫🇷", htmlLang: "fr" },
  de: { label: "Deutsch", flag: "🇩🇪", htmlLang: "de" },
};

const DICTIONARIES: Record<Locale, Dictionary> = { es, en, pt, fr, de };

const STORAGE_KEY = "ngs-locale";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    const browser = window.navigator.language.slice(0, 2).toLowerCase();
    if (isLocale(browser)) setLocaleState(browser);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

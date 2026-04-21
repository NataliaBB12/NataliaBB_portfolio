"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { en } from "./en";
import { es } from "./es";
import React from "react";

export type Locale = "en" | "es";
export type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, es };

type I18nContextType = {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  t: en,
  toggleLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  const value = {
    locale,
    t: translations[locale],
    toggleLocale,
  };

  return React.createElement(
    I18nContext.Provider,
    { value },
    children
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

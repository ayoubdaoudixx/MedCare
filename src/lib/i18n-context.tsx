"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { dictionaries, type Lang, type DictKey } from "./i18n";

interface I18nContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (key: DictKey) => string;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = useCallback(
    (key: DictKey) => dictionaries[lang][key] ?? key,
    [lang]
  );
  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "fr" ? "ar" : "fr"));
  }, []);
  const setLang = useCallback((l: Lang) => setLangState(l), []);

  return (
    <I18nContext.Provider value={{ lang, dir, t, toggleLang, setLang }}>
      <div lang={lang} dir={dir} className="min-h-screen">
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

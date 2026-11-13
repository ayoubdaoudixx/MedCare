"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionaries, type Lang, type DictKey } from "./i18n";

interface I18nContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  /** Translate a key. `vars` fills `{name}` placeholders in the string. */
  t: (key: DictKey, vars?: Record<string, string>) => string;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "medcare-lang";
const CHANGE_EVENT = "medcare:lang-change";

// The chosen language lives in localStorage so it survives navigation between
// the home page and the service pages, each of which mounts its own provider.
function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readStoredLang(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "fr";
  } catch {
    return "fr";
  }
}

/**
 * The visitor's language for components mounted outside the provider (the
 * chatbot lives in the root layout). It follows the same stored choice.
 */
export function useStoredLang(): Lang {
  return useSyncExternalStore<Lang>(subscribe, readStoredLang, () => "fr");
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Server and first client render use French, then the stored choice applies.
  const lang = useSyncExternalStore<Lang>(subscribe, readStoredLang, () => "fr");
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice simply lasts for this page only.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggleLang = useCallback(() => {
    setLang(readStoredLang() === "fr" ? "ar" : "fr");
  }, [setLang]);

  // A link such as `/?lang=ar` opens the site directly in that language.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "ar" || requested === "fr") setLang(requested);
  }, [setLang]);

  // Screen readers and the browser's own UI follow the document language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = useCallback(
    (key: DictKey, vars?: Record<string, string>) => {
      let text: string = dictionaries[lang][key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.replace(`{${name}}`, value);
        }
      }
      return text;
    },
    [lang]
  );

  const value = useMemo<I18nContextType>(
    () => ({ lang, dir, t, toggleLang, setLang }),
    [lang, dir, t, toggleLang, setLang]
  );

  return (
    <I18nContext.Provider value={value}>
      <div lang={lang} dir={dir} className="min-h-dvh">
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

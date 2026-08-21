'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Lang } from '@/lib/i18n/ui-translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = 'faridos-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'ar' || saved === 'fr') setLangState(saved);
    } catch {
      // localStorage قد لا يكون متاحًا في بعض البيئات
    }
  }, []);

  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // تجاهل بصمت
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

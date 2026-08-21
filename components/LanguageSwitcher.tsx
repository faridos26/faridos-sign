'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-4 text-sm text-accent">
      <button
        onClick={() => setLang('ar')}
        className={cn('transition-opacity', lang === 'ar' ? 'font-bold opacity-100' : 'opacity-60 hover:opacity-100')}
      >
        العربية
      </button>
      <span className="opacity-40">|</span>
      <button
        onClick={() => setLang('fr')}
        className={cn('transition-opacity', lang === 'fr' ? 'font-bold opacity-100' : 'opacity-60 hover:opacity-100')}
      >
        Français
      </button>
    </div>
  );
}

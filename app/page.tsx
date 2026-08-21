'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <main className="gradient-hero min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl animate-fade-in">
        <p className="text-sm tracking-[0.3em] text-accent font-semibold mb-4">
          {t(uiText.landing.brand, lang)}
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-balance">
          {t(uiText.landing.title, lang)}
        </h1>
        <p className="text-lg text-muted-foreground mb-1">{t(uiText.landing.subtitle1, lang)}</p>
        <p className="text-base text-muted-foreground mb-10">{t(uiText.landing.subtitle2, lang)}</p>

        <Link href="/survey">
          <Button size="lg" className="text-lg px-12">
            {t(uiText.landing.cta, lang)}
          </Button>
        </Link>

        <div className="mt-10">
          <LanguageSwitcher />
        </div>
      </div>
    </main>
  );
}

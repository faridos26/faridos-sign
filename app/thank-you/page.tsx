'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

export default function ThankYouPage() {
  const { lang } = useLanguage();

  return (
    <main className="gradient-hero min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md animate-fade-in">
        <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">{t(uiText.thankYou.title, lang)}</h1>
        <p className="text-muted-foreground mb-8">{t(uiText.thankYou.message, lang)}</p>
        <Link href="/">
          <Button size="lg">{t(uiText.thankYou.backHome, lang)}</Button>
        </Link>
      </div>
    </main>
  );
}

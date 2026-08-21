'use client';

import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

interface FacebookShareProps {
  resultId: string;
  archetype: string;
}

export function FacebookShare({ resultId, archetype }: FacebookShareProps) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/results?id=${resultId}` : `/results?id=${resultId}`;

  const handleFacebookShare = () => {
    const text = encodeURIComponent(
      lang === 'ar'
        ? `اكتشفت بصمتي العطرية على FARIDOS SIGN: ${archetype} 🌸 جرّب أنت أيضًا!`
        : `J'ai découvert mon ADN Olfactif sur FARIDOS SIGN : ${archetype} 🌸 Essayez aussi !`
    );
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // تجاهل بصمت لو الحافظة غير متاحة
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button onClick={handleFacebookShare} size="lg" className="gap-2">
        <Share2 className="h-4 w-4" />
        {t(uiText.results.shareTitle, lang)}
      </Button>
      <Button onClick={handleCopy} variant="outline" size="lg" className="gap-2">
        <Copy className="h-4 w-4" />
        {copied ? t(uiText.results.copied, lang) : t(uiText.results.copyLink, lang)}
      </Button>
    </div>
  );
}

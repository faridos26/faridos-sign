'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RecommendationResult } from '@/lib/recommendation-engine';
import { leadCaptureSchema, LeadCapture } from '@/lib/validation';
import { ResultCard } from '@/components/ResultCard';
import { PerfumePyramid } from '@/components/PerfumePyramid';
import { FacebookShare } from '@/components/FacebookShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

interface StoredResult {
  id: string;
  answers: Record<string, any>;
  result: RecommendationResult;
}

export default function ResultsPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [stored, setStored] = useState<StoredResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('faridos-result');
    if (!raw) {
      router.replace('/survey');
      return;
    }
    setStored(JSON.parse(raw));
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadCapture>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: { resultId: stored?.id ?? '' },
  });

  if (!stored) {
    return (
      <main className="min-h-screen flex items-center justify-center gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  const onSubmit = async (data: LeadCapture) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, resultId: stored.id }),
      });
    } catch {
      // نستمر حتى لو فشل الحفظ في الخادم
    }
    router.push('/thank-you');
  };

  return (
    <main className="gradient-hero min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <ResultCard result={stored.result} />

        <Card>
          <CardHeader>
            <CardTitle>{t(uiText.results.pyramidTitle, lang)}</CardTitle>
          </CardHeader>
          <CardContent>
            <PerfumePyramid formula={stored.result.customFormula} />
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link href={`/perfume/${stored.result.matchedPerfume.id}`}>
            <Button variant="outline" size="lg">
              {t(uiText.results.viewDetails, lang)}
            </Button>
          </Link>
        </div>

        <FacebookShare resultId={stored.id} archetype={stored.result.archetype[lang]} />

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t(uiText.results.passportTitle, lang)}</CardTitle>
            <p className="text-center text-sm text-muted-foreground">{t(uiText.results.passportSubtitle, lang)}</p>
          </CardHeader>
          <CardContent>
            {!showLeadForm ? (
              <Button className="w-full" size="lg" onClick={() => setShowLeadForm(true)}>
                {t(uiText.results.passportCta, lang)}
              </Button>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">{t(uiText.results.fullName, lang)}</Label>
                  <input
                    id="name"
                    {...register('name')}
                    className="w-full rounded-md border border-border px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.name && <p className="text-error text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t(uiText.results.email, lang)}</Label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full rounded-md border border-border px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-error text-xs">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{t(uiText.results.phone, lang)}</Label>
                  <input
                    id="phone"
                    {...register('phone')}
                    className="w-full rounded-md border border-border px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <input type="hidden" {...register('resultId')} value={stored.id} />
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t(uiText.results.send, lang)}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

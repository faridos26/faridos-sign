'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { perfumeCatalog } from '@/lib/perfume-catalog';
import { ingredientsData } from '@/lib/ingredients-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

export default function PerfumeDetailPage() {
  const params = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const perfume = perfumeCatalog.find((p) => p.id === params.id);

  if (!perfume) {
    return (
      <main className="gradient-hero min-h-screen flex items-center justify-center px-6">
        <p className="text-muted-foreground">Not found</p>
      </main>
    );
  }

  const notes = perfume.notes.map((code) => ingredientsData.find((i) => i.code === code)).filter(Boolean);

  const genderLabel: Record<string, { ar: string; fr: string }> = {
    male: { ar: 'رجالي', fr: 'Homme' },
    female: { ar: 'نسائي', fr: 'Femme' },
    unisex: { ar: 'غير محدد', fr: 'Non spécifié' },
  };
  const longevityLabel: Record<string, { ar: string; fr: string }> = {
    light: { ar: 'خفيف', fr: 'Légère' },
    medium: { ar: 'متوسط', fr: 'Moyenne' },
    strong: { ar: 'قوي', fr: 'Forte' },
  };
  const sillageLabel: Record<string, { ar: string; fr: string }> = {
    close: { ar: 'قريب من الجسم', fr: 'Proche de la peau' },
    moderate: { ar: 'متوسط الانتشار', fr: 'Diffusion modérée' },
    strong: { ar: 'حضور قوي', fr: 'Sillage puissant' },
  };
  const usageLabel: Record<string, { ar: string; fr: string }> = {
    formal: { ar: 'رسمي', fr: 'Formel' },
    casual: { ar: 'كاجوال', fr: 'Décontracté' },
    sport: { ar: 'رياضي', fr: 'Sportif' },
  };

  return (
    <main className="gradient-hero min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/results" className="text-sm text-accent hover:underline">
          {t(uiText.perfumeDetail.back, lang)}
        </Link>

        <Card>
          <CardHeader>
            <p className="text-sm text-accent">{perfume.brand}</p>
            <CardTitle className="text-3xl">{perfume.name}</CardTitle>
            <p className="text-muted-foreground">{perfume.personality[lang]}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoRow label={t(uiText.perfumeDetail.gender, lang)} value={genderLabel[perfume.gender][lang]} />
              <InfoRow label={t(uiText.perfumeDetail.price, lang)} value={`$${perfume.pricePer50ml}`} />
              <InfoRow label={t(uiText.perfumeDetail.longevity, lang)} value={longevityLabel[perfume.longevity][lang]} />
              <InfoRow label={t(uiText.perfumeDetail.sillage, lang)} value={sillageLabel[perfume.sillage][lang]} />
              <InfoRow label={t(uiText.perfumeDetail.bestTime, lang)} value={perfume.bestTime[lang]} />
              <InfoRow
                label={t(uiText.perfumeDetail.usage, lang)}
                value={perfume.usageType.map((u) => usageLabel[u][lang]).join(lang === 'ar' ? '، ' : ', ')}
              />
            </div>

            <div>
              <h3 className="font-bold mb-2">{t(uiText.perfumeDetail.mainNotes, lang)}</h3>
              <div className="flex flex-wrap gap-2">
                {notes.map((n) => (
                  <span key={n!.code} className="rounded-full bg-white border border-border px-3 py-1.5 text-sm flex items-center gap-1.5">
                    <span>{n!.emoji}</span> {lang === 'ar' ? n!.nameAr : n!.nameFr}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/survey">
              <Button className="w-full" size="lg">
                {t(uiText.perfumeDetail.restart, lang)}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white/70 border border-border px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

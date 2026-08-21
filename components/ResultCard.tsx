'use client';

import { RecommendationResult } from '@/lib/recommendation-engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

interface ResultCardProps {
  result: RecommendationResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { lang } = useLanguage();

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">{t(uiText.results.scentDnaTitle, lang)}</CardTitle>
          <p className="text-center text-2xl font-extrabold text-primary">{result.archetype[lang]}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {result.scentDna.map((entry) => (
            <div key={entry.family}>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>{entry.emoji} {entry.familyLabel[lang]}</span>
                <span>{entry.score}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-primary to-secondary rounded-full transition-all duration-700"
                  style={{ width: `${entry.score}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="animate-fade-in overflow-hidden">
        <CardHeader className="bg-primary/5">
          <p className="text-sm text-accent font-medium">{t(uiText.results.matchedPerfumeLabel, lang)}</p>
          <CardTitle>{result.matchedPerfume.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{result.matchedPerfume.brand}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <span className="text-5xl font-extrabold text-primary">{result.matchScore}%</span>
            <p className="text-sm text-accent mt-1">{t(uiText.results.matchScoreLabel, lang)}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">{t(uiText.results.whyLabel, lang)}</p>
            <p className="text-sm text-muted-foreground">{result.reasoning[lang]}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">{t(uiText.results.bestUseLabel, lang)}</p>
              <p className="text-muted-foreground">{result.matchedPerfume.bestUse[lang]}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t(uiText.results.bestTimeLabel, lang)}</p>
              <p className="text-muted-foreground">{result.matchedPerfume.bestTime[lang]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

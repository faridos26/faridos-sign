'use client';

import { CustomFormula } from '@/lib/recommendation-engine';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

interface PerfumePyramidProps {
  formula: CustomFormula;
}

const tierColors: Record<'top' | 'heart' | 'base', string> = {
  top: 'bg-secondary/30 border-secondary',
  heart: 'bg-primary/15 border-primary',
  base: 'bg-accent/20 border-accent',
};

export function PerfumePyramid({ formula }: PerfumePyramidProps) {
  const { lang } = useLanguage();
  const tiers: ('top' | 'heart' | 'base')[] = ['top', 'heart', 'base'];
  const tierLabels = {
    top: t(uiText.results.tierTop, lang),
    heart: t(uiText.results.tierHeart, lang),
    base: t(uiText.results.tierBase, lang),
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {tiers.map((tier) => (
        <div key={tier} className={`rounded-lg border-2 p-4 ${tierColors[tier]}`}>
          <h4 className="font-bold mb-3 text-sm text-accent">{tierLabels[tier]}</h4>
          <div className="flex flex-wrap gap-2">
            {formula[tier].map((note) => (
              <div key={note.ingredient.code} className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm border border-border">
                <span>{note.ingredient.emoji}</span>
                <span className="text-sm font-semibold">{lang === 'ar' ? note.ingredient.nameAr : note.ingredient.nameFr}</span>
                <span className="text-xs text-muted-foreground">{note.concentration}%</span>
              </div>
            ))}
            {formula[tier].length === 0 && (
              <span className="text-xs text-muted-foreground">{t(uiText.survey.noMatch, lang)}</span>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between text-sm font-medium text-accent pt-2 border-t border-border">
        <span>{t(uiText.results.totalConc, lang)}: {formula.totalConcentration}%</span>
        <span>{t(uiText.results.estimatedCost, lang)}: ${formula.estimatedCostPer50ml}</span>
      </div>
    </div>
  );
}

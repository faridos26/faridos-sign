'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { surveyQuestions } from '@/lib/survey-data';
import { surveyAnswersSchema, SurveyAnswers } from '@/lib/validation';
import { generateRecommendation } from '@/lib/recommendation-engine';
import { SurveyStep } from '@/components/SurveyStep';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

export default function SurveyPage() {
  const router = useRouter();
  const { lang, dir } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({ preferredNotes: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = surveyQuestions[stepIndex];
  const isLast = stepIndex === surveyQuestions.length - 1;
  const isFirst = stepIndex === 0;
  const currentValue = answers[question.id];

  const canProceed = useMemo(() => {
    if (question.id === 'secondaryFamily') return true;
    if (question.type === 'multi-select') return (currentValue?.length ?? 0) > 0;
    if (question.type === 'slider') return true;
    return currentValue !== undefined && currentValue !== null && currentValue !== '';
  }, [question, currentValue]);

  const handleChange = (value: any) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setError(null);
  };

  const handleNext = async () => {
    if (!canProceed) return;

    if (!isLast) {
      setStepIndex((i) => i + 1);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const budgetValue = answers.budget ?? 60;
    const parsed = surveyAnswersSchema.safeParse({ ...answers, budget: budgetValue });

    if (!parsed.success) {
      setError(t(uiText.survey.error, lang));
      setIsSubmitting(false);
      return;
    }

    try {
      const result = generateRecommendation(parsed.data as SurveyAnswers);
      const resultId = `local-${Date.now()}`;

      sessionStorage.setItem('faridos-result', JSON.stringify({ id: resultId, answers: parsed.data, result }));

      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: parsed.data, result }),
      }).catch(() => {});

      router.push(`/results?id=${resultId}`);
    } catch (e) {
      setError(t(uiText.survey.errorGeneric, lang));
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (!isFirst) setStepIndex((i) => i - 1);
  };

  const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;

  return (
    <main className="gradient-hero min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator current={stepIndex + 1} total={surveyQuestions.length} groupLabel={question.group[lang]} />

        <div className="bg-white/60 backdrop-blur rounded-2xl p-8 md:p-12 shadow-sm border border-border min-h-[320px] flex flex-col justify-between">
          <SurveyStep question={question} value={currentValue} onChange={handleChange} />

          {error && <p className="text-error text-sm text-center mt-4">{error}</p>}

          <div className="flex items-center justify-between mt-10">
            <Button variant="ghost" onClick={handleBack} disabled={isFirst || isSubmitting}>
              <PrevIcon className="h-4 w-4" />
              {t(uiText.survey.prev, lang)}
            </Button>
            <Button onClick={handleNext} disabled={!canProceed || isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t(uiText.survey.analyzing, lang)}
                </>
              ) : isLast ? (
                t(uiText.survey.finish, lang)
              ) : (
                <>
                  {t(uiText.survey.next, lang)}
                  <NextIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

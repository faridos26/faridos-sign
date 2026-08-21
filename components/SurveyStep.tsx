'use client';

import { SurveyQuestion, label as optLabel } from '@/lib/survey-data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { uiText, t } from '@/lib/i18n/ui-translations';

interface SurveyStepProps {
  question: SurveyQuestion;
  value: any;
  onChange: (value: any) => void;
}

export function SurveyStep({ question, value, onChange }: SurveyStepProps) {
  const { lang } = useLanguage();

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-balance">
        {question.question[lang]}
      </h2>

      {question.type === 'radio' && (
        <RadioGroup value={value ?? ''} onValueChange={onChange} className="max-w-md mx-auto">
          {question.options?.map((opt) => (
            <label
              key={opt.id}
              className={cn(
                'flex items-center gap-3 rounded-lg border-2 border-border bg-white px-5 py-4 cursor-pointer transition-all hover:border-secondary',
                value === opt.id && 'border-primary bg-primary/5 shadow-sm'
              )}
            >
              <RadioGroupItem value={opt.id} id={opt.id} />
              <span className="text-base font-medium">{optLabel(opt, lang)}</span>
            </label>
          ))}
        </RadioGroup>
      )}

      {question.type === 'image-select' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {question.options?.map((opt) => (
            <button
              type="button"
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-lg border-2 border-border bg-white p-6 transition-all hover:border-secondary hover:-translate-y-0.5',
                value === opt.id && 'border-primary bg-primary/5 shadow-md'
              )}
            >
              <span className="text-4xl">{opt.emoji ?? '✨'}</span>
              <span className="font-semibold">{optLabel(opt, lang)}</span>
            </button>
          ))}
        </div>
      )}

      {question.type === 'multi-select' && (
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-sm text-accent mb-4">
            {(value?.length ?? 0)} / {question.max} {t(uiText.survey.multiSelectCount, lang)}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {question.options?.map((opt) => {
              const selected: string[] = value ?? [];
              const isChecked = selected.includes(opt.id);
              const disableNew = !isChecked && selected.length >= (question.max ?? 3);
              return (
                <label
                  key={opt.id}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border-2 border-border bg-white px-4 py-3 cursor-pointer transition-all hover:border-secondary',
                    isChecked && 'border-primary bg-primary/5',
                    disableNew && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  <Checkbox
                    checked={isChecked}
                    disabled={disableNew}
                    onCheckedChange={(checked) => {
                      if (checked) onChange([...selected, opt.id]);
                      else onChange(selected.filter((s) => s !== opt.id));
                    }}
                  />
                  <span className="text-sm font-medium">{optLabel(opt, lang)}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {question.type === 'slider' && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <span className="text-4xl font-extrabold text-primary">{value ?? question.min}</span>
            <span className="text-xl font-semibold text-accent"> {question.unit}</span>
          </div>
          <Slider
            min={question.min}
            max={question.max}
            step={question.step}
            value={[value ?? question.min ?? 0]}
            onValueChange={([v]) => onChange(v)}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{question.min}{question.unit}</span>
            <span>{question.max}{question.unit}</span>
          </div>
        </div>
      )}
    </div>
  );
}

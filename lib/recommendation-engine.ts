import { SurveyAnswers } from './validation';
import { perfumeCatalog, CatalogPerfume } from './perfume-catalog';
import { ingredientsData, Ingredient, familyLabels } from './ingredients-data';
import { Lang } from './i18n/ui-translations';
import { Bilingual } from './survey-data';

export interface ScentDnaEntry {
  family: string;
  familyLabel: Bilingual;
  emoji: string;
  score: number;
}

export interface FormulaNote {
  ingredient: Ingredient;
  concentration: number;
}

export interface CustomFormula {
  top: FormulaNote[];
  heart: FormulaNote[];
  base: FormulaNote[];
  totalConcentration: number;
  estimatedCostPer50ml: number;
}

export interface RecommendationResult {
  matchedPerfume: CatalogPerfume;
  matchScore: number;
  scentDna: ScentDnaEntry[];
  archetype: Bilingual;
  customFormula: CustomFormula;
  reasoning: Bilingual;
}

function buildScentDna(answers: SurveyAnswers): ScentDnaEntry[] {
  const scores: Record<string, number> = {};

  scores[answers.mainFamily] = (scores[answers.mainFamily] ?? 0) + 70;

  if (answers.secondaryFamily && answers.secondaryFamily !== 'none') {
    scores[answers.secondaryFamily] = (scores[answers.secondaryFamily] ?? 0) + 35;
  }

  for (const code of answers.preferredNotes) {
    const ingredient = ingredientsData.find((i) => i.code === code);
    if (ingredient) {
      scores[ingredient.family] = (scores[ingredient.family] ?? 0) + 15;
      for (const harmonyFamily of ingredient.harmony) {
        scores[harmonyFamily] = (scores[harmonyFamily] ?? 0) + 5;
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores), 1);
  const dna: ScentDnaEntry[] = Object.entries(scores)
    .map(([family, raw]) => ({
      family,
      familyLabel: {
        ar: familyLabels[family]?.ar ?? family,
        fr: familyLabels[family]?.fr ?? family,
      },
      emoji: familyLabels[family]?.emoji ?? '✨',
      score: Math.round(Math.min(100, (raw / maxScore) * 100)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return dna;
}

function scorePerfume(perfume: CatalogPerfume, answers: SurveyAnswers, dna: ScentDnaEntry[]): number {
  let score = 0;
  let maxPossible = 0;

  const dnaWeight = 45;
  maxPossible += dnaWeight;
  const dnaScoreRaw = dna.reduce((sum, entry) => {
    const perfumeFamilyScore = perfume.families[entry.family] ?? 0;
    return sum + (perfumeFamilyScore / 100) * (entry.score / 100);
  }, 0);
  score += Math.min(dnaWeight, dnaScoreRaw * dnaWeight);

  maxPossible += 15;
  if (perfume.gender === answers.gender || perfume.gender === 'unisex' || answers.gender === 'unisex') {
    score += 15;
  }

  maxPossible += 10;
  if (perfume.timing.includes(answers.timing)) score += 10;

  maxPossible += 10;
  if (perfume.season.includes(answers.season) || perfume.season.includes('all')) score += 10;

  maxPossible += 10;
  if (perfume.usageType.includes(answers.usageType)) score += 10;

  maxPossible += 5;
  if (perfume.longevity === answers.longevity) score += 5;

  maxPossible += 5;
  if (perfume.sillage === answers.sillage) score += 5;

  return Math.round((score / maxPossible) * 100);
}

function buildCustomFormula(answers: SurveyAnswers, dna: ScentDnaEntry[]): CustomFormula {
  const topFamilies = dna.slice(0, 3).map((d) => d.family);

  const pickByPosition = (position: 'top' | 'heart' | 'base', count: number): Ingredient[] => {
    const preferred = answers.preferredNotes
      .map((code) => ingredientsData.find((i) => i.code === code))
      .filter((i): i is Ingredient => !!i && i.position === position);

    const pool = ingredientsData.filter(
      (i) => i.position === position && topFamilies.includes(i.family) && !preferred.includes(i)
    );

    const combined = [...preferred, ...pool];
    const unique = Array.from(new Map(combined.map((i) => [i.code, i])).values());
    return unique.slice(0, count);
  };

  const budgetFactor = Math.min(1, Math.max(0.4, answers.budget / 120));

  const toFormulaNotes = (list: Ingredient[]): FormulaNote[] =>
    list.map((ingredient) => ({
      ingredient,
      concentration: Math.round(ingredient.maxConc * budgetFactor * 10) / 10,
    }));

  const top = toFormulaNotes(pickByPosition('top', 2));
  const heart = toFormulaNotes(pickByPosition('heart', 2));
  const base = toFormulaNotes(pickByPosition('base', 2));

  const all = [...top, ...heart, ...base];
  const totalConcentration = Math.round(all.reduce((sum, n) => sum + n.concentration, 0) * 10) / 10;
  const estimatedCostPer50ml =
    Math.round(all.reduce((sum, n) => sum + (n.concentration / 100) * 50 * n.ingredient.cost, 0) * 100) / 100;

  return { top, heart, base, totalConcentration, estimatedCostPer50ml };
}

function buildReasoning(answers: SurveyAnswers, dna: ScentDnaEntry[]): Bilingual {
  const topFamily = dna[0];
  if (!topFamily) {
    return {
      ar: 'اختيار متوازن يناسب أسلوبك.',
      fr: 'Un choix équilibré qui correspond à votre style.',
    };
  }
  return {
    ar: `لأنك تميل إلى الروائح ${topFamily.familyLabel.ar} بنسبة ${topFamily.score}%.`,
    fr: `Parce que vous êtes attiré(e) par les notes ${topFamily.familyLabel.fr} à ${topFamily.score}%.`,
  };
}

export function generateRecommendation(answers: SurveyAnswers): RecommendationResult {
  const dna = buildScentDna(answers);

  const scored = perfumeCatalog
    .map((perfume) => ({ perfume, score: scorePerfume(perfume, answers, dna) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const customFormula = buildCustomFormula(answers, dna);
  const reasoning = buildReasoning(answers, dna);

  return {
    matchedPerfume: best.perfume,
    matchScore: best.score,
    scentDna: dna,
    archetype: best.perfume.archetype,
    customFormula,
    reasoning,
  };
}

export function getAlternativeMatches(answers: SurveyAnswers, excludeId: string, count = 2) {
  const dna = buildScentDna(answers);
  return perfumeCatalog
    .filter((p) => p.id !== excludeId)
    .map((perfume) => ({ perfume, score: scorePerfume(perfume, answers, dna) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

import { SurveyAnswers } from './validation';
import { familyKeyMap, noteKeyMap } from './survey-data';
import { perfumeCatalog, CatalogPerfume } from './perfume-catalog';
import { ingredientsData, Ingredient } from './ingredients-data';

export interface ScentDnaEntry {
  family: string;
  familyAr: string;
  emoji: string;
  score: number; // 0-100
}

export interface FormulaNote {
  ingredient: Ingredient;
  concentration: number; // %
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
  matchScore: number; // 0-100
  scentDna: ScentDnaEntry[];
  archetype: string;
  customFormula: CustomFormula;
  reasoning: string;
}

const familyMeta: Record<string, { ar: string; emoji: string }> = {
  floral: { ar: 'زهرية', emoji: '🌸' },
  woody: { ar: 'خشبية', emoji: '🌲' },
  oceanic: { ar: 'بحرية', emoji: '🌊' },
  oriental: { ar: 'شرقية', emoji: '🔥' },
  citrus: { ar: 'حمضية', emoji: '🍋' },
  leather: { ar: 'جلدية', emoji: '👜' },
  musk: { ar: 'مسكية', emoji: '🕊️' },
  amber: { ar: 'عنبرية', emoji: '💎' },
};

/**
 * يبني "بصمة الرائحة" (Scent DNA) بناءً على إجابات الاستبيان.
 * العائلة الرئيسية تأخذ الوزن الأكبر، ثم الثانوية، ثم النوتات المفضلة تضيف نقاطًا إضافية لعائلاتها.
 */
function buildScentDna(answers: SurveyAnswers): ScentDnaEntry[] {
  const scores: Record<string, number> = {};

  const mainKey = familyKeyMap[answers.mainFamily];
  if (mainKey) scores[mainKey] = (scores[mainKey] ?? 0) + 70;

  if (answers.secondaryFamily && answers.secondaryFamily !== 'لا شيء') {
    const secKey = familyKeyMap[answers.secondaryFamily];
    if (secKey) scores[secKey] = (scores[secKey] ?? 0) + 35;
  }

  for (const noteLabel of answers.preferredNotes) {
    const code = noteKeyMap[noteLabel];
    const ingredient = ingredientsData.find((i) => i.code === code);
    if (ingredient) {
      scores[ingredient.family] = (scores[ingredient.family] ?? 0) + 15;
      // النوتة تضيف حضورًا خفيفًا للعائلات المنسجمة معها أيضًا
      for (const harmonyFamily of ingredient.harmony) {
        scores[harmonyFamily] = (scores[harmonyFamily] ?? 0) + 5;
      }
    }
  }

  // ضبط القيم بين 0 و 100
  const maxScore = Math.max(...Object.values(scores), 1);
  const dna: ScentDnaEntry[] = Object.entries(scores)
    .map(([family, raw]) => ({
      family,
      familyAr: familyMeta[family]?.ar ?? family,
      emoji: familyMeta[family]?.emoji ?? '✨',
      score: Math.round(Math.min(100, (raw / maxScore) * 100)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return dna;
}

/** يحسب نسبة توافق عطر من الكتالوج مع بصمة المستخدم وإجاباته */
function scorePerfume(perfume: CatalogPerfume, answers: SurveyAnswers, dna: ScentDnaEntry[]): number {
  let score = 0;
  let maxPossible = 0;

  // 1) توافق العائلات العطرية (الوزن الأكبر: 45 نقطة)
  const dnaWeight = 45;
  maxPossible += dnaWeight;
  const dnaScoreRaw = dna.reduce((sum, entry) => {
    const perfumeFamilyScore = perfume.families[entry.family] ?? 0;
    return sum + (perfumeFamilyScore / 100) * (entry.score / 100);
  }, 0);
  score += Math.min(dnaWeight, dnaScoreRaw * dnaWeight);

  // 2) الجنس (15 نقطة)
  maxPossible += 15;
  if (perfume.gender === answers.gender || perfume.gender === 'غير محدد' || answers.gender === 'غير محدد') {
    score += 15;
  }

  // 3) التوقيت (10 نقاط)
  maxPossible += 10;
  if (perfume.timing.includes(answers.timing)) score += 10;

  // 4) الموسم (10 نقاط)
  maxPossible += 10;
  if (perfume.season.includes(answers.season) || perfume.season.includes('كل الفصول')) score += 10;

  // 5) طابع الاستخدام (10 نقاط)
  maxPossible += 10;
  if (perfume.usageType.includes(answers.usageType)) score += 10;

  // 6) الثبات (5 نقاط)
  maxPossible += 5;
  if (perfume.longevity === answers.longevity) score += 5;

  // 7) الحضور (5 نقاط)
  maxPossible += 5;
  if (perfume.sillage === answers.sillage) score += 5;

  return Math.round((score / maxPossible) * 100);
}

/** يبني معادلة عطر مخصصة (هرم النوتات) بناءً على العائلة والنوتات المفضلة وميزانية المستخدم */
function buildCustomFormula(answers: SurveyAnswers, dna: ScentDnaEntry[]): CustomFormula {
  const topFamilies = dna.slice(0, 3).map((d) => d.family);

  const pickByPosition = (position: 'top' | 'heart' | 'base', count: number): Ingredient[] => {
    const preferred = answers.preferredNotes
      .map((label) => noteKeyMap[label])
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
    Math.round(
      all.reduce((sum, n) => sum + (n.concentration / 100) * 50 * n.ingredient.cost, 0) * 100
    ) / 100;

  return { top, heart, base, totalConcentration, estimatedCostPer50ml };
}

function buildReasoning(perfume: CatalogPerfume, answers: SurveyAnswers, dna: ScentDnaEntry[]): string {
  const topFamily = dna[0];
  const parts: string[] = [];
  if (topFamily) {
    parts.push(`لأنك تميل إلى الروائح ${topFamily.familyAr} بنسبة ${topFamily.score}%`);
  }
  parts.push(`ويناسب استخدامك ${answers.usageType} في وقت ${answers.timing}`);
  return parts.join('، ') + '.';
}

export function generateRecommendation(answers: SurveyAnswers): RecommendationResult {
  const dna = buildScentDna(answers);

  const scored = perfumeCatalog
    .map((perfume) => ({ perfume, score: scorePerfume(perfume, answers, dna) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const customFormula = buildCustomFormula(answers, dna);
  const reasoning = buildReasoning(best.perfume, answers, dna);

  return {
    matchedPerfume: best.perfume,
    matchScore: best.score,
    scentDna: dna,
    archetype: best.perfume.personality.split('—')[0]?.trim() ?? 'Signature Scent',
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

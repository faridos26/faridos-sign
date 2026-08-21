import { Lang } from './i18n/ui-translations';

export type QuestionType = 'radio' | 'image-select' | 'multi-select' | 'slider';

export interface Bilingual {
  ar: string;
  fr: string;
}

export interface SurveyOption {
  id: string;
  label: Bilingual;
  emoji?: string;
}

export interface SurveyQuestion {
  id: string;
  question: Bilingual;
  type: QuestionType;
  options?: SurveyOption[];
  max?: number;
  min?: number;
  step?: number;
  unit?: string;
  group: Bilingual;
}

export function label(item: { label: Bilingual }, lang: Lang): string {
  return item.label[lang];
}

const groupContext: Bilingual = { ar: 'السياق والمناسبة', fr: 'Contexte et occasion' };
const groupFamily: Bilingual = { ar: 'العائلة العطرية', fr: 'Famille olfactive' };
const groupNotes: Bilingual = { ar: 'النوتات المفضلة', fr: 'Notes préférées' };
const groupIntensity: Bilingual = { ar: 'الثبات والكثافة', fr: 'Tenue et intensité' };
const groupPhysio: Bilingual = { ar: 'البيانات الفسيولوجية', fr: 'Données physiologiques' };
const groupBudget: Bilingual = { ar: 'الميزانية', fr: 'Budget' };

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'gender',
    question: { ar: 'ما هو جنسك؟', fr: 'Quel est votre genre ?' },
    type: 'radio',
    group: groupContext,
    options: [
      { id: 'male', label: { ar: 'رجالي', fr: 'Homme' } },
      { id: 'female', label: { ar: 'نسائي', fr: 'Femme' } },
      { id: 'unisex', label: { ar: 'غير محدد', fr: 'Non spécifié' } },
    ],
  },
  {
    id: 'timing',
    question: { ar: 'ما هو التوقيت المناسب؟', fr: 'Quel moment préférez-vous ?' },
    type: 'radio',
    group: groupContext,
    options: [
      { id: 'day', label: { ar: 'نهاري', fr: 'Journée' } },
      { id: 'night', label: { ar: 'ليلي', fr: 'Soirée' } },
    ],
  },
  {
    id: 'season',
    question: { ar: 'ما هو الموسم المفضل؟', fr: 'Quelle saison préférez-vous ?' },
    type: 'radio',
    group: groupContext,
    options: [
      { id: 'summer', label: { ar: 'صيفي', fr: 'Été' } },
      { id: 'winter', label: { ar: 'شتوي', fr: 'Hiver' } },
      { id: 'all', label: { ar: 'كل الفصول', fr: 'Toute saison' } },
    ],
  },
  {
    id: 'usageType',
    question: { ar: 'طابع الاستخدام؟', fr: "Quel type d'usage ?" },
    type: 'radio',
    group: groupContext,
    options: [
      { id: 'formal', label: { ar: 'رسمي', fr: 'Formel' } },
      { id: 'casual', label: { ar: 'كاجوال', fr: 'Décontracté' } },
      { id: 'sport', label: { ar: 'رياضي', fr: 'Sportif' } },
    ],
  },
  {
    id: 'mainFamily',
    question: { ar: 'اختر العائلة العطرية الرئيسية', fr: 'Choisissez la famille olfactive principale' },
    type: 'image-select',
    group: groupFamily,
    options: [
      { id: 'floral', label: { ar: 'زهرية', fr: 'Florale' }, emoji: '🌸' },
      { id: 'woody', label: { ar: 'خشبية', fr: 'Boisée' }, emoji: '🌲' },
      { id: 'oceanic', label: { ar: 'بحرية/أوزونية', fr: 'Marine/Ozonique' }, emoji: '🌊' },
      { id: 'oriental', label: { ar: 'شرقية', fr: 'Orientale' }, emoji: '🔥' },
      { id: 'citrus', label: { ar: 'حمضية', fr: 'Agrumes' }, emoji: '🍋' },
      { id: 'leather', label: { ar: 'جلدية', fr: 'Cuir' }, emoji: '👜' },
    ],
  },
  {
    id: 'secondaryFamily',
    question: { ar: 'العائلة الثانوية (اختياري)', fr: 'Famille secondaire (facultatif)' },
    type: 'image-select',
    group: groupFamily,
    options: [
      { id: 'floral', label: { ar: 'زهرية', fr: 'Florale' }, emoji: '🌸' },
      { id: 'woody', label: { ar: 'خشبية', fr: 'Boisée' }, emoji: '🌲' },
      { id: 'oceanic', label: { ar: 'بحرية/أوزونية', fr: 'Marine/Ozonique' }, emoji: '🌊' },
      { id: 'oriental', label: { ar: 'شرقية', fr: 'Orientale' }, emoji: '🔥' },
      { id: 'citrus', label: { ar: 'حمضية', fr: 'Agrumes' }, emoji: '🍋' },
      { id: 'leather', label: { ar: 'جلدية', fr: 'Cuir' }, emoji: '👜' },
      { id: 'none', label: { ar: 'لا شيء', fr: 'Aucune' }, emoji: '🚫' },
    ],
  },
  {
    id: 'preferredNotes',
    question: { ar: 'اختر 3 نوتات مفضلة (كحد أقصى)', fr: 'Choisissez 3 notes préférées (maximum)' },
    type: 'multi-select',
    max: 3,
    group: groupNotes,
    options: [
      { id: 'BER-001', label: { ar: 'برغموت', fr: 'Bergamote' } },
      { id: 'ROS-001', label: { ar: 'ورد', fr: 'Rose' } },
      { id: 'JAS-001', label: { ar: 'ياسمين', fr: 'Jasmin' } },
      { id: 'MUS-001', label: { ar: 'مسك', fr: 'Musc' } },
      { id: 'AMB-001', label: { ar: 'عنبر', fr: 'Ambre' } },
      { id: 'SND-001', label: { ar: 'خشب الصندل', fr: 'Bois de santal' } },
      { id: 'VAN-001', label: { ar: 'فانيليا', fr: 'Vanille' } },
      { id: 'PAT-001', label: { ar: 'باتشولي', fr: 'Patchouli' } },
      { id: 'LEM-001', label: { ar: 'ليمون', fr: 'Citron' } },
      { id: 'OUD-001', label: { ar: 'عود', fr: 'Oud' } },
      { id: 'LAV-001', label: { ar: 'لافندر', fr: 'Lavande' } },
      { id: 'VET-001', label: { ar: 'فيتيفر', fr: 'Vétiver' } },
    ],
  },
  {
    id: 'longevity',
    question: { ar: 'قوة الثبات المطلوبة؟', fr: 'Quelle tenue souhaitez-vous ?' },
    type: 'radio',
    group: groupIntensity,
    options: [
      { id: 'light', label: { ar: 'خفيف', fr: 'Légère' } },
      { id: 'medium', label: { ar: 'متوسط', fr: 'Moyenne' } },
      { id: 'strong', label: { ar: 'قوي', fr: 'Forte' } },
    ],
  },
  {
    id: 'sillage',
    question: { ar: 'مستوى الحضور (Sillage)؟', fr: 'Quel sillage préférez-vous ?' },
    type: 'radio',
    group: groupIntensity,
    options: [
      { id: 'close', label: { ar: 'قريب من الجسم', fr: 'Proche de la peau' } },
      { id: 'moderate', label: { ar: 'متوسط الانتشار', fr: 'Diffusion modérée' } },
      { id: 'strong', label: { ar: 'حضور قوي', fr: 'Sillage puissant' } },
    ],
  },
  {
    id: 'sweatLevel',
    question: { ar: 'مستوى التعرق؟', fr: 'Quel est votre niveau de transpiration ?' },
    type: 'radio',
    group: groupPhysio,
    options: [
      { id: 'low', label: { ar: 'منخفض', fr: 'Faible' } },
      { id: 'medium', label: { ar: 'متوسط', fr: 'Moyen' } },
      { id: 'high', label: { ar: 'مرتفع', fr: 'Élevé' } },
    ],
  },
  {
    id: 'climate',
    question: { ar: 'المناخ المحيط؟', fr: 'Quel est votre climat ?' },
    type: 'radio',
    group: groupPhysio,
    options: [
      { id: 'hot_dry', label: { ar: 'حار جاف', fr: 'Chaud et sec' } },
      { id: 'hot_humid', label: { ar: 'حار رطب', fr: 'Chaud et humide' } },
      { id: 'temperate', label: { ar: 'معتدل', fr: 'Tempéré' } },
      { id: 'cold', label: { ar: 'بارد', fr: 'Froid' } },
    ],
  },
  {
    id: 'budget',
    question: { ar: 'الميزانية لكل 50 مل', fr: 'Budget pour 50 ml' },
    type: 'slider',
    min: 20,
    max: 200,
    step: 5,
    unit: '$',
    group: groupBudget,
  },
];

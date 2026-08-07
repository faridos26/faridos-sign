export type QuestionType = 'radio' | 'image-select' | 'multi-select' | 'slider';

export interface SurveyQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  max?: number;
  min?: number;
  step?: number;
  unit?: string;
  group: string;
}

export const surveyQuestions: SurveyQuestion[] = [
  // المجموعة 1: السياق والمناسبة
  { id: 'gender', question: 'ما هو جنسك؟', type: 'radio', options: ['رجالي', 'نسائي', 'غير محدد'], group: 'السياق والمناسبة' },
  { id: 'timing', question: 'ما هو التوقيت المناسب؟', type: 'radio', options: ['نهاري', 'ليلي'], group: 'السياق والمناسبة' },
  { id: 'season', question: 'ما هو الموسم المفضل؟', type: 'radio', options: ['صيفي', 'شتوي', 'كل الفصول'], group: 'السياق والمناسبة' },
  { id: 'usageType', question: 'طابع الاستخدام؟', type: 'radio', options: ['رسمي', 'كاجوال', 'رياضي'], group: 'السياق والمناسبة' },

  // المجموعة 2: العائلة العطرية
  { id: 'mainFamily', question: 'اختر العائلة العطرية الرئيسية', type: 'image-select', options: ['زهرية', 'خشبية', 'بحرية/أوزونية', 'شرقية', 'حمضية', 'جلدية'], group: 'العائلة العطرية' },
  { id: 'secondaryFamily', question: 'العائلة الثانوية (اختياري)', type: 'image-select', options: ['زهرية', 'خشبية', 'بحرية/أوزونية', 'شرقية', 'حمضية', 'جلدية', 'لا شيء'], group: 'العائلة العطرية' },

  // المجموعة 3: النوتات المفضلة
  { id: 'preferredNotes', question: 'اختر 3 نوتات مفضلة (كحد أقصى)', type: 'multi-select', max: 3, options: ['برغموت', 'ورد', 'ياسمين', 'مسك', 'عنبر', 'خشب الصندل', 'فانيليا', 'باتشولي', 'ليمون', 'عود', 'لافندر', 'فيتيفر'], group: 'النوتات المفضلة' },

  // المجموعة 4: الثبات والكثافة
  { id: 'longevity', question: 'قوة الثبات المطلوبة؟', type: 'radio', options: ['خفيف', 'متوسط', 'قوي'], group: 'الثبات والكثافة' },
  { id: 'sillage', question: 'مستوى الحضور (Sillage)؟', type: 'radio', options: ['قريب من الجسم', 'متوسط الانتشار', 'حضور قوي'], group: 'الثبات والكثافة' },

  // المجموعة 5: البيانات الفسيولوجية
  { id: 'sweatLevel', question: 'مستوى التعرق؟', type: 'radio', options: ['منخفض', 'متوسط', 'مرتفع'], group: 'البيانات الفسيولوجية' },
  { id: 'climate', question: 'المناخ المحيط؟', type: 'radio', options: ['حار جاف', 'حار رطب', 'معتدل', 'بارد'], group: 'البيانات الفسيولوجية' },

  // المجموعة 6: الميزانية
  { id: 'budget', question: 'الميزانية لكل 50 مل', type: 'slider', min: 20, max: 200, step: 5, unit: '$', group: 'الميزانية' },
];

// خريطة تحويل أسماء العائلات العربية إلى مفاتيح الأسرة العطرية المستخدمة في محرك التوصية
export const familyKeyMap: Record<string, string> = {
  'زهرية': 'floral',
  'خشبية': 'woody',
  'بحرية/أوزونية': 'oceanic',
  'شرقية': 'oriental',
  'حمضية': 'citrus',
  'جلدية': 'leather',
  'لا شيء': 'none',
};

export const noteKeyMap: Record<string, string> = {
  'برغموت': 'BER-001',
  'ورد': 'ROS-001',
  'ياسمين': 'JAS-001',
  'مسك': 'MUS-001',
  'عنبر': 'AMB-001',
  'خشب الصندل': 'SND-001',
  'فانيليا': 'VAN-001',
  'باتشولي': 'PAT-001',
  'ليمون': 'LEM-001',
  'عود': 'OUD-001',
  'لافندر': 'LAV-001',
  'فيتيفر': 'VET-001',
};

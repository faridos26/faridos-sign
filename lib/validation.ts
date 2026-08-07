import { z } from 'zod';

export const surveyAnswersSchema = z.object({
  gender: z.enum(['رجالي', 'نسائي', 'غير محدد'], {
    required_error: 'الرجاء اختيار الجنس',
  }),
  timing: z.enum(['نهاري', 'ليلي']),
  season: z.enum(['صيفي', 'شتوي', 'كل الفصول']),
  usageType: z.enum(['رسمي', 'كاجوال', 'رياضي']),
  mainFamily: z.enum(['زهرية', 'خشبية', 'بحرية/أوزونية', 'شرقية', 'حمضية', 'جلدية']),
  secondaryFamily: z
    .enum(['زهرية', 'خشبية', 'بحرية/أوزونية', 'شرقية', 'حمضية', 'جلدية', 'لا شيء'])
    .optional(),
  preferredNotes: z
    .array(z.string())
    .min(1, 'اختر نوتة واحدة على الأقل')
    .max(3, 'الحد الأقصى 3 نوتات'),
  longevity: z.enum(['خفيف', 'متوسط', 'قوي']),
  sillage: z.enum(['قريب من الجسم', 'متوسط الانتشار', 'حضور قوي']),
  sweatLevel: z.enum(['منخفض', 'متوسط', 'مرتفع']),
  climate: z.enum(['حار جاف', 'حار رطب', 'معتدل', 'بارد']),
  budget: z.number().min(20).max(200),
});

export type SurveyAnswers = z.infer<typeof surveyAnswersSchema>;

export const leadCaptureSchema = z.object({
  name: z.string().min(2, 'الاسم قصير جدًا'),
  email: z.string().email('بريد إلكتروني غير صالح'),
  phone: z
    .string()
    .min(8, 'رقم هاتف غير صالح')
    .optional()
    .or(z.literal('')),
  resultId: z.string(),
});

export type LeadCapture = z.infer<typeof leadCaptureSchema>;

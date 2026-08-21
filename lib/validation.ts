import { z } from 'zod';

export const surveyAnswersSchema = z.object({
  gender: z.enum(['male', 'female', 'unisex']),
  timing: z.enum(['day', 'night']),
  season: z.enum(['summer', 'winter', 'all']),
  usageType: z.enum(['formal', 'casual', 'sport']),
  mainFamily: z.enum(['floral', 'woody', 'oceanic', 'oriental', 'citrus', 'leather']),
  secondaryFamily: z
    .enum(['floral', 'woody', 'oceanic', 'oriental', 'citrus', 'leather', 'none'])
    .optional(),
  preferredNotes: z.array(z.string()).min(1).max(3),
  longevity: z.enum(['light', 'medium', 'strong']),
  sillage: z.enum(['close', 'moderate', 'strong']),
  sweatLevel: z.enum(['low', 'medium', 'high']),
  climate: z.enum(['hot_dry', 'hot_humid', 'temperate', 'cold']),
  budget: z.number().min(20).max(200),
});

export type SurveyAnswers = z.infer<typeof surveyAnswersSchema>;

export const leadCaptureSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8).optional().or(z.literal('')),
  resultId: z.string(),
});

export type LeadCapture = z.infer<typeof leadCaptureSchema>;

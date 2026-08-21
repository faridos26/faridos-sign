import { Bilingual } from './survey-data';

export interface CatalogPerfume {
  id: string;
  name: string;
  brand: string;
  gender: 'male' | 'female' | 'unisex';
  timing: ('day' | 'night')[];
  season: ('summer' | 'winter' | 'all')[];
  usageType: ('formal' | 'casual' | 'sport')[];
  families: Record<string, number>;
  notes: string[];
  longevity: 'light' | 'medium' | 'strong';
  sillage: 'close' | 'moderate' | 'strong';
  pricePer50ml: number;
  personality: Bilingual;
  archetype: Bilingual;
  bestUse: Bilingual;
  bestTime: Bilingual;
}

export const perfumeCatalog: CatalogPerfume[] = [
  {
    id: 'dior-sauvage',
    name: 'Dior Sauvage',
    brand: 'Dior',
    gender: 'male',
    timing: ['day', 'night'],
    season: ['all'],
    usageType: ['formal', 'casual'],
    families: { woody: 91, citrus: 84, oceanic: 73, oriental: 52 },
    notes: ['BER-001', 'AMB-001', 'PAT-001', 'LAV-001'],
    longevity: 'strong',
    sillage: 'strong',
    pricePer50ml: 95,
    archetype: { ar: 'Elegant Explorer', fr: 'Elegant Explorer' },
    personality: { ar: 'شخصية تبحث عن الأناقة والثقة والتوازن', fr: "Une personnalité en quête d'élégance, de confiance et d'équilibre" },
    bestUse: { ar: 'العمل، اللقاءات اليومية', fr: 'Travail, rencontres quotidiennes' },
    bestTime: { ar: 'النهار', fr: 'Journée' },
  },
  {
    id: 'ysl-ybnb',
    name: 'YSL Y Le Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'male',
    timing: ['night'],
    season: ['winter', 'all'],
    usageType: ['formal'],
    families: { woody: 88, oriental: 70, citrus: 45, leather: 30 },
    notes: ['SND-001', 'GER-001', 'CAR-001', 'VET-001'],
    longevity: 'strong',
    sillage: 'strong',
    pricePer50ml: 110,
    archetype: { ar: 'Bold Achiever', fr: 'Bold Achiever' },
    personality: { ar: 'واثق، طموح، ويحب ترك انطباع قوي', fr: 'Confiant, ambitieux, aime laisser une forte impression' },
    bestUse: { ar: 'المناسبات الرسمية، السهرات', fr: 'Occasions formelles, soirées' },
    bestTime: { ar: 'المساء', fr: 'Soirée' },
  },
  {
    id: 'chanel-chance',
    name: 'Chanel Chance Eau Tendre',
    brand: 'Chanel',
    gender: 'female',
    timing: ['day'],
    season: ['summer', 'all'],
    usageType: ['casual', 'formal'],
    families: { floral: 89, citrus: 66, musk: 55 },
    notes: ['JAS-001', 'NER-001', 'MUS-001', 'MAN-001'],
    longevity: 'medium',
    sillage: 'moderate',
    pricePer50ml: 130,
    archetype: { ar: 'Playful Romantic', fr: 'Playful Romantic' },
    personality: { ar: 'أنثوية، مرحة، ورقيقة الحضور', fr: 'Féminine, joyeuse, présence délicate' },
    bestUse: { ar: 'الخروج اليومي، اللقاءات', fr: 'Sorties quotidiennes, rencontres' },
    bestTime: { ar: 'النهار', fr: 'Journée' },
  },
  {
    id: 'ma-oud-satin',
    name: 'Oud Satin Mood',
    brand: 'Maison Francis Kurkdjian',
    gender: 'unisex',
    timing: ['night'],
    season: ['winter'],
    usageType: ['formal'],
    families: { oriental: 90, woody: 82, amber: 60 },
    notes: ['OUD-001', 'ROS-001', 'VAN-001', 'TON-001'],
    longevity: 'strong',
    sillage: 'strong',
    pricePer50ml: 190,
    archetype: { ar: 'Opulent Mystic', fr: 'Opulent Mystic' },
    personality: { ar: 'فاخرة، عميقة، وآسرة', fr: 'Luxueux, profond, envoûtant' },
    bestUse: { ar: 'المناسبات الخاصة، السهرات الفاخرة', fr: 'Occasions spéciales, soirées de luxe' },
    bestTime: { ar: 'المساء', fr: 'Soirée' },
  },
  {
    id: 'jomalone-lime',
    name: 'Lime Basil & Mandarin',
    brand: 'Jo Malone London',
    gender: 'unisex',
    timing: ['day'],
    season: ['summer'],
    usageType: ['casual', 'sport'],
    families: { citrus: 92, oceanic: 58, floral: 30 },
    notes: ['LEM-001', 'MAN-001', 'PEP-001'],
    longevity: 'light',
    sillage: 'close',
    pricePer50ml: 75,
    archetype: { ar: 'Fresh Minimalist', fr: 'Fresh Minimalist' },
    personality: { ar: 'بسيط، منعش، وحيوي', fr: 'Simple, frais et dynamique' },
    bestUse: { ar: 'الرياضة، النشاطات اليومية', fr: 'Sport, activités quotidiennes' },
    bestTime: { ar: 'النهار', fr: 'Journée' },
  },
  {
    id: 'tf-tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    gender: 'unisex',
    timing: ['night'],
    season: ['winter', 'all'],
    usageType: ['formal'],
    families: { oriental: 95, woody: 70, amber: 65 },
    notes: ['VAN-001', 'TON-001', 'CAR-001', 'SND-001'],
    longevity: 'strong',
    sillage: 'strong',
    pricePer50ml: 145,
    archetype: { ar: 'Warm Storyteller', fr: 'Warm Storyteller' },
    personality: { ar: 'دافئة، حسية، ولا تُنسى', fr: 'Chaleureux, sensuel et inoubliable' },
    bestUse: { ar: 'السهرات الشتوية، المناسبات الرسمية', fr: "Soirées d'hiver, occasions formelles" },
    bestTime: { ar: 'المساء', fr: 'Soirée' },
  },
];

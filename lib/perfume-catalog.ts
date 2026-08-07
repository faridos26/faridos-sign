export interface CatalogPerfume {
  id: string;
  name: string;
  brand: string;
  gender: 'رجالي' | 'نسائي' | 'غير محدد';
  timing: ('نهاري' | 'ليلي')[];
  season: ('صيفي' | 'شتوي' | 'كل الفصول')[];
  usageType: ('رسمي' | 'كاجوال' | 'رياضي')[];
  families: Record<string, number>; // family -> weight 0-100
  notes: string[]; // ingredient codes present
  longevity: 'خفيف' | 'متوسط' | 'قوي';
  sillage: 'قريب من الجسم' | 'متوسط الانتشار' | 'حضور قوي';
  pricePer50ml: number;
  personality: string;
  bestUse: string[];
  bestTime: string;
  image?: string;
}

export const perfumeCatalog: CatalogPerfume[] = [
  {
    id: 'dior-sauvage',
    name: 'Dior Sauvage',
    brand: 'Dior',
    gender: 'رجالي',
    timing: ['نهاري', 'ليلي'],
    season: ['كل الفصول'],
    usageType: ['رسمي', 'كاجوال'],
    families: { woody: 91, citrus: 84, oceanic: 73, oriental: 52 },
    notes: ['BER-001', 'AMB-001', 'PAT-001', 'LAV-001'],
    longevity: 'قوي',
    sillage: 'حضور قوي',
    pricePer50ml: 95,
    personality: 'Elegant Explorer — شخصية تبحث عن الأناقة والثقة والتوازن',
    bestUse: ['العمل', 'اللقاءات اليومية'],
    bestTime: 'النهار',
  },
  {
    id: 'ysl-ybnb',
    name: 'YSL Y Le Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'رجالي',
    timing: ['ليلي'],
    season: ['شتوي', 'كل الفصول'],
    usageType: ['رسمي'],
    families: { woody: 88, oriental: 70, citrus: 45, leather: 30 },
    notes: ['SND-001', 'GER-001', 'CAR-001', 'VET-001'],
    longevity: 'قوي',
    sillage: 'حضور قوي',
    pricePer50ml: 110,
    personality: 'Bold Achiever — واثق، طموح، ويحب ترك انطباع قوي',
    bestUse: ['المناسبات الرسمية', 'السهرات'],
    bestTime: 'المساء',
  },
  {
    id: 'chanel-chance',
    name: 'Chanel Chance Eau Tendre',
    brand: 'Chanel',
    gender: 'نسائي',
    timing: ['نهاري'],
    season: ['صيفي', 'كل الفصول'],
    usageType: ['كاجوال', 'رسمي'],
    families: { floral: 89, citrus: 66, musk: 55 },
    notes: ['JAS-001', 'NER-001', 'MUS-001', 'MAN-001'],
    longevity: 'متوسط',
    sillage: 'متوسط الانتشار',
    pricePer50ml: 130,
    personality: 'Playful Romantic — أنثوية، مرحة، ورقيقة الحضور',
    bestUse: ['الخروج اليومي', 'اللقاءات'],
    bestTime: 'النهار',
  },
  {
    id: 'ma-oud-satin',
    name: 'Oud Satin Mood',
    brand: 'Maison Francis Kurkdjian',
    gender: 'غير محدد',
    timing: ['ليلي'],
    season: ['شتوي'],
    usageType: ['رسمي'],
    families: { oriental: 90, woody: 82, amber: 60 },
    notes: ['OUD-001', 'ROS-001', 'VAN-001', 'TON-001'],
    longevity: 'قوي',
    sillage: 'حضور قوي',
    pricePer50ml: 190,
    personality: 'Opulent Mystic — فاخرة، عميقة، وآسرة',
    bestUse: ['المناسبات الخاصة', 'السهرات الفاخرة'],
    bestTime: 'المساء',
  },
  {
    id: 'jomalone-lime',
    name: 'Lime Basil & Mandarin',
    brand: 'Jo Malone London',
    gender: 'غير محدد',
    timing: ['نهاري'],
    season: ['صيفي'],
    usageType: ['كاجوال', 'رياضي'],
    families: { citrus: 92, oceanic: 58, floral: 30 },
    notes: ['LEM-001', 'MAN-001', 'PEP-001'],
    longevity: 'خفيف',
    sillage: 'قريب من الجسم',
    pricePer50ml: 75,
    personality: 'Fresh Minimalist — بسيط، منعش، وحيوي',
    bestUse: ['الرياضة', 'النشاطات اليومية'],
    bestTime: 'النهار',
  },
  {
    id: 'tf-tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    gender: 'غير محدد',
    timing: ['ليلي'],
    season: ['شتوي', 'كل الفصول'],
    usageType: ['رسمي'],
    families: { oriental: 95, woody: 70, amber: 65 },
    notes: ['VAN-001', 'TON-001', 'CAR-001', 'SND-001'],
    longevity: 'قوي',
    sillage: 'حضور قوي',
    pricePer50ml: 145,
    personality: 'Warm Storyteller — دافئة، حسية، ولا تُنسى',
    bestUse: ['السهرات الشتوية', 'المناسبات الرسمية'],
    bestTime: 'المساء',
  },
];

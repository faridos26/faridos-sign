export type IngredientPosition = 'top' | 'heart' | 'base';
export type IngredientVolatility = 'high' | 'medium' | 'low' | 'very_low';

export interface Ingredient {
  code: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  family: string;
  position: IngredientPosition;
  cost: number;
  maxConc: number;
  volatility: IngredientVolatility;
  ifra: number;
  harmony: string[];
  natural: boolean;
  emoji: string;
  desc: string;
  descFr: string;
}

const rawIngredientsData: Omit<Ingredient, 'nameFr' | 'descFr'>[] = [
  // ====== نوتات عليا (Top Notes) ======
  { code: 'BER-001', nameAr: 'برغموت', nameEn: 'Bergamot', family: 'citrus', position: 'top', cost: 0.9, maxConc: 8, volatility: 'high', ifra: 10, harmony: ['floral', 'woody'], natural: true, emoji: '🍋', desc: 'حمضي منعش مع لمسة زهرية خفيفة' },
  { code: 'LEM-001', nameAr: 'ليمون إيطالي', nameEn: 'Italian Lemon', family: 'citrus', position: 'top', cost: 0.7, maxConc: 6, volatility: 'high', ifra: 8, harmony: ['oceanic', 'citrus'], natural: true, emoji: '🍊', desc: 'حمضي نقي ومنعش' },
  { code: 'MAN-001', nameAr: 'ماندرين', nameEn: 'Mandarin', family: 'citrus', position: 'top', cost: 1.1, maxConc: 7, volatility: 'high', ifra: 9, harmony: ['floral', 'citrus'], natural: true, emoji: '🍊', desc: 'حمضي حلو مع لمسة فاكهية' },
  { code: 'LAV-001', nameAr: 'لافندر', nameEn: 'Lavender', family: 'floral', position: 'top', cost: 1.8, maxConc: 5, volatility: 'high', ifra: 7, harmony: ['woody', 'citrus'], natural: true, emoji: '💜', desc: 'زهرية عشبية مهدئة' },
  { code: 'PEP-001', nameAr: 'نعناع', nameEn: 'Peppermint', family: 'citrus', position: 'top', cost: 1.2, maxConc: 4, volatility: 'high', ifra: 5, harmony: ['oceanic', 'floral'], natural: true, emoji: '🌿', desc: 'منعشة وقوية مع لمسة باردة' },

  // ====== نوتات وسطى (Heart Notes) ======
  { code: 'JAS-001', nameAr: 'ياسمين مطلق', nameEn: 'Jasmine Absolute', family: 'floral', position: 'heart', cost: 4.2, maxConc: 5, volatility: 'medium', ifra: 6, harmony: ['floral', 'oriental'], natural: true, emoji: '🌸', desc: 'زهرية غنية وحسية' },
  { code: 'ROS-001', nameAr: 'ورد دمشقي', nameEn: 'Damask Rose', family: 'floral', position: 'heart', cost: 6.5, maxConc: 5, volatility: 'medium', ifra: 5, harmony: ['woody', 'amber'], natural: true, emoji: '🌹', desc: 'زهرية فاخرة ورومانسية' },
  { code: 'GER-001', nameAr: 'إبرة الراعي', nameEn: 'Geranium', family: 'floral', position: 'heart', cost: 2.3, maxConc: 6, volatility: 'medium', ifra: 8, harmony: ['citrus', 'woody'], natural: true, emoji: '🌺', desc: 'زهرية عشبية مع لمسة نعناعية' },
  { code: 'CAR-001', nameAr: 'هيل', nameEn: 'Cardamom', family: 'oriental', position: 'heart', cost: 3.1, maxConc: 4, volatility: 'medium', ifra: 5, harmony: ['woody', 'floral'], natural: true, emoji: '🌱', desc: 'شرقية دافئة وتوابلية' },
  { code: 'NER-001', nameAr: 'نيرولي', nameEn: 'Neroli', family: 'floral', position: 'heart', cost: 5.8, maxConc: 3, volatility: 'medium', ifra: 4, harmony: ['citrus', 'woody'], natural: true, emoji: '🍊', desc: 'زهرية حمضية مع لمسة رقيقة' },
  { code: 'YLA-001', nameAr: 'إيلنغ', nameEn: 'Ylang-Ylang', family: 'floral', position: 'heart', cost: 3.5, maxConc: 4, volatility: 'medium', ifra: 5, harmony: ['oriental', 'woody'], natural: true, emoji: '🌼', desc: 'زهرية استوائية حلوة وجذابة' },

  // ====== نوتات قاعدية (Base Notes) ======
  { code: 'SND-001', nameAr: 'خشب الصندل', nameEn: 'Sandalwood', family: 'woody', position: 'base', cost: 3.8, maxConc: 12, volatility: 'low', ifra: 10, harmony: ['amber', 'oriental'], natural: true, emoji: '🪵', desc: 'خشبية دافئة وكريمية' },
  { code: 'PAT-001', nameAr: 'باتشولي', nameEn: 'Patchouli', family: 'woody', position: 'base', cost: 1.6, maxConc: 8, volatility: 'low', ifra: 8, harmony: ['oriental', 'woody'], natural: true, emoji: '🍂', desc: 'خشبية ترابية وغامضة' },
  { code: 'MUS-001', nameAr: 'مسك أبيض', nameEn: 'White Musk', family: 'musk', position: 'base', cost: 2.1, maxConc: 15, volatility: 'very_low', ifra: 15, harmony: ['floral', 'woody', 'citrus', 'oceanic', 'oriental', 'leather'], natural: false, emoji: '🕊️', desc: 'مسكية ناعمة ودافئة' },
  { code: 'AMB-001', nameAr: 'عنبر', nameEn: 'Ambroxan', family: 'amber', position: 'base', cost: 3.0, maxConc: 10, volatility: 'low', ifra: 8, harmony: ['woody', 'oriental'], natural: false, emoji: '💎', desc: 'عنبرية دافئة مع لمسة بحرية' },
  { code: 'VAN-001', nameAr: 'فانيلين', nameEn: 'Vanillin', family: 'oriental', position: 'base', cost: 1.2, maxConc: 6, volatility: 'low', ifra: 6, harmony: ['amber', 'woody'], natural: false, emoji: '🍦', desc: 'حلوة ودافئة مع لمسة كريمية' },
  { code: 'OUD-001', nameAr: 'عود', nameEn: 'Oud', family: 'woody', position: 'base', cost: 15.0, maxConc: 5, volatility: 'low', ifra: 3, harmony: ['oriental', 'amber'], natural: true, emoji: '🪵', desc: 'خشبية فاخرة وعميقة' },
  { code: 'VET-001', nameAr: 'فيتيفر', nameEn: 'Vetiver', family: 'woody', position: 'base', cost: 2.5, maxConc: 7, volatility: 'low', ifra: 8, harmony: ['citrus', 'oceanic'], natural: true, emoji: '🌾', desc: 'خشبية ترابية مع لمسة دخانية' },
  { code: 'TON-001', nameAr: 'تونا', nameEn: 'Tonka Bean', family: 'oriental', position: 'base', cost: 2.8, maxConc: 5, volatility: 'low', ifra: 5, harmony: ['amber', 'woody'], natural: true, emoji: '🫘', desc: 'حلوة وجوزية مع لمسة توابلية' },
  { code: 'LEA-001', nameAr: 'جلد', nameEn: 'Leather', family: 'leather', position: 'base', cost: 4.5, maxConc: 4, volatility: 'low', ifra: 4, harmony: ['woody', 'oriental'], natural: false, emoji: '👜', desc: 'جلدية دافئة وقوية' },
];

const frenchNames: Record<string, string> = {
  'BER-001': 'Bergamote', 'LEM-001': 'Citron Italien', 'MAN-001': 'Mandarine',
  'LAV-001': 'Lavande', 'PEP-001': 'Menthe Poivrée', 'JAS-001': 'Absolue de Jasmin',
  'ROS-001': 'Rose de Damas', 'GER-001': 'Géranium', 'CAR-001': 'Cardamome',
  'NER-001': 'Néroli', 'YLA-001': 'Ylang-Ylang', 'SND-001': 'Bois de Santal',
  'PAT-001': 'Patchouli', 'MUS-001': 'Musc Blanc', 'AMB-001': 'Ambroxan',
  'VAN-001': 'Vanilline', 'OUD-001': 'Oud', 'VET-001': 'Vétiver',
  'TON-001': 'Fève Tonka', 'LEA-001': 'Cuir',
};

const frenchDescs: Record<string, string> = {
  'BER-001': 'Agrume frais avec une touche florale légère',
  'LEM-001': 'Agrume pur et rafraîchissant',
  'MAN-001': 'Agrume sucré avec une touche fruitée',
  'LAV-001': 'Florale herbacée apaisante',
  'PEP-001': 'Fraîche et puissante avec une touche froide',
  'JAS-001': 'Florale riche et sensuelle',
  'ROS-001': 'Florale luxueuse et romantique',
  'GER-001': 'Florale herbacée avec une touche mentholée',
  'CAR-001': 'Orientale chaude et épicée',
  'NER-001': 'Florale citronnée avec une touche délicate',
  'YLA-001': 'Florale tropicale douce et attirante',
  'SND-001': 'Boisée chaude et crémeuse',
  'PAT-001': 'Boisée terreuse et mystérieuse',
  'MUS-001': 'Musquée douce et chaude',
  'AMB-001': 'Ambrée chaude avec une touche marine',
  'VAN-001': 'Douce et chaude avec une touche crémeuse',
  'OUD-001': 'Boisée luxueuse et profonde',
  'VET-001': 'Boisée terreuse avec une touche fumée',
  'TON-001': 'Douce et noisette avec une touche épicée',
  'LEA-001': 'Cuir chaud et puissant',
};

export const ingredientsData: Ingredient[] = rawIngredientsData.map((ing) => ({
  ...ing,
  nameFr: frenchNames[ing.code] ?? ing.nameEn,
  descFr: frenchDescs[ing.code] ?? '',
}));

export const familyLabels: Record<string, { ar: string; fr: string; emoji: string }> = {
  floral: { ar: 'زهرية', fr: 'Florale', emoji: '🌸' },
  woody: { ar: 'خشبية', fr: 'Boisée', emoji: '🌲' },
  oceanic: { ar: 'بحرية/أوزونية', fr: 'Marine/Ozonique', emoji: '🌊' },
  oriental: { ar: 'شرقية', fr: 'Orientale', emoji: '🔥' },
  citrus: { ar: 'حمضية', fr: 'Agrumes', emoji: '🍋' },
  leather: { ar: 'جلدية', fr: 'Cuir', emoji: '👜' },
  musk: { ar: 'مسكية', fr: 'Musquée', emoji: '🕊️' },
  amber: { ar: 'عنبرية', fr: 'Ambrée', emoji: '💎' },
};

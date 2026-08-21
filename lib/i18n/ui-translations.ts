export type Lang = 'ar' | 'fr';

export const uiText = {
  landing: {
    brand: { ar: 'FARIDOS SIGN', fr: 'FARIDOS SIGN' },
    title: { ar: 'اكتشف بصمتك العطرية', fr: 'Découvrez votre ADN Olfactif' },
    subtitle1: { ar: 'اكتشف حمضك النووي العطري', fr: 'Discover Your Scent DNA' },
    subtitle2: { ar: 'اكتشف بصمتك العطرية', fr: 'Trouvez le parfum qui vous ressemble' },
    cta: { ar: 'ابدأ الاكتشاف', fr: 'Commencer la découverte' },
  },
  survey: {
    prev: { ar: 'السابق', fr: 'Précédent' },
    next: { ar: 'التالي', fr: 'Suivant' },
    analyzing: { ar: 'جارٍ التحليل...', fr: 'Analyse en cours...' },
    finish: { ar: 'تحليل بصمتي', fr: 'Analyser mon ADN' },
    error: { ar: 'تحقق من إجاباتك، هناك حقل ناقص.', fr: 'Vérifiez vos réponses, un champ est manquant.' },
    errorGeneric: { ar: 'حدث خطأ أثناء تحليل بصمتك العطرية. حاول مجددًا.', fr: "Une erreur est survenue lors de l'analyse. Réessayez." },
    multiSelectCount: { ar: 'مُختارة', fr: 'sélectionné(s)' },
    noMatch: { ar: 'لا توجد نوتات مطابقة', fr: 'Aucune note correspondante' },
  },
  results: {
    scentDnaTitle: { ar: 'بصمتك العطرية', fr: 'Votre ADN Olfactif' },
    matchedPerfumeLabel: { ar: 'العطر الأقرب لشخصيتك', fr: 'Le parfum le plus proche de vous' },
    matchScoreLabel: { ar: 'نسبة التوافق', fr: 'Taux de compatibilité' },
    whyLabel: { ar: 'لماذا؟', fr: 'Pourquoi ?' },
    bestUseLabel: { ar: '✔ أفضل استعمال', fr: '✔ Meilleur usage' },
    bestTimeLabel: { ar: '☀️ أفضل وقت', fr: '☀️ Meilleur moment' },
    pyramidTitle: { ar: 'هرم النوتات المقترح لك', fr: 'La pyramide olfactive suggérée' },
    viewDetails: { ar: 'عرض تفاصيل العطر', fr: 'Voir les détails du parfum' },
    shareTitle: { ar: 'مشاركة النتيجة على فيسبوك', fr: 'Partager sur Facebook' },
    copyLink: { ar: 'نسخ الرابط', fr: 'Copier le lien' },
    copied: { ar: 'تم النسخ ✓', fr: 'Copié ✓' },
    passportTitle: { ar: 'أنشئ جوازك العطري', fr: 'Créez votre passeport olfactif' },
    passportSubtitle: { ar: 'اترك بياناتك ليصلك عيّنة وتوصية شخصية من فريق FARIDOS', fr: "Laissez vos coordonnées pour recevoir un échantillon et une recommandation personnalisée de l'équipe FARIDOS" },
    passportCta: { ar: 'إنشاء جوازي العطري', fr: 'Créer mon passeport' },
    fullName: { ar: 'الاسم الكامل', fr: 'Nom complet' },
    email: { ar: 'البريد الإلكتروني', fr: 'Adresse e-mail' },
    phone: { ar: 'رقم الهاتف (اختياري)', fr: 'Téléphone (facultatif)' },
    send: { ar: 'إرسال', fr: 'Envoyer' },
    backToResults: { ar: '← العودة إلى النتائج', fr: '← Retour aux résultats' },
    totalConc: { ar: 'إجمالي التركيز', fr: 'Concentration totale' },
    estimatedCost: { ar: 'التكلفة التقديرية / 50مل', fr: 'Coût estimé / 50ml' },
    tierTop: { ar: 'نوتات عليا (Top)', fr: 'Notes de tête' },
    tierHeart: { ar: 'نوتات وسطى (Heart)', fr: 'Notes de cœur' },
    tierBase: { ar: 'نوتات قاعدية (Base)', fr: 'Notes de fond' },
  },
  perfumeDetail: {
    gender: { ar: 'الجنس', fr: 'Genre' },
    price: { ar: 'السعر / 50مل', fr: 'Prix / 50ml' },
    longevity: { ar: 'الثبات', fr: 'Tenue' },
    sillage: { ar: 'الحضور', fr: 'Sillage' },
    bestTime: { ar: 'أفضل وقت', fr: 'Meilleur moment' },
    usage: { ar: 'الاستخدام', fr: 'Usage' },
    mainNotes: { ar: 'النوتات الرئيسية', fr: 'Notes principales' },
    restart: { ar: 'إعادة الاكتشاف', fr: 'Recommencer la découverte' },
    back: { ar: '← العودة إلى النتائج', fr: '← Retour aux résultats' },
  },
  thankYou: {
    title: { ar: 'شكرًا لك!', fr: 'Merci !' },
    message: { ar: 'استلمنا بياناتك بنجاح. سيتواصل معك فريق FARIDOS SIGN قريبًا بتوصية شخصية وعيّنة من عطرك المقترح.', fr: "Vos informations ont bien été reçues. L'équipe FARIDOS SIGN vous contactera bientôt avec une recommandation personnalisée et un échantillon." },
    backHome: { ar: 'العودة إلى الرئيسية', fr: "Retour à l'accueil" },
  },
} as const;

export function t(dict: { ar: string; fr: string }, lang: Lang): string {
  return dict[lang];
}

import { PrismaClient } from '@prisma/client';
import { ingredientsData } from '../lib/ingredients-data';
import { perfumeCatalog } from '../lib/perfume-catalog';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ingredients...');
  for (const ing of ingredientsData) {
    await prisma.ingredient.upsert({
      where: { code: ing.code },
      update: {},
      create: {
        code: ing.code,
        nameAr: ing.nameAr,
        nameFr: ing.nameFr,
        nameEn: ing.nameEn,
        family: ing.family,
        position: ing.position,
        cost: ing.cost,
        maxConc: ing.maxConc,
        volatility: ing.volatility,
        ifra: ing.ifra,
        harmony: ing.harmony,
        natural: ing.natural,
        emoji: ing.emoji,
        description: ing.desc,
        descriptionFr: ing.descFr,
      },
    });
  }

  console.log('🌱 Seeding perfume catalog...');
  for (const p of perfumeCatalog) {
    await prisma.perfume.upsert({
      where: { slug: p.id },
      update: {},
      create: {
        slug: p.id,
        name: p.name,
        brand: p.brand,
        gender: p.gender,
        timing: p.timing,
        season: p.season,
        usageType: p.usageType,
        families: p.families,
        notes: p.notes,
        longevity: p.longevity,
        sillage: p.sillage,
        pricePer50ml: p.pricePer50ml,
        personalityAr: p.personality.ar,
        personalityFr: p.personality.fr,
        archetype: p.archetype.ar,
        bestUseAr: p.bestUse.ar,
        bestUseFr: p.bestUse.fr,
        bestTimeAr: p.bestTime.ar,
        bestTimeFr: p.bestTime.fr,
      },
    });
  }

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

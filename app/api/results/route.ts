import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, result } = body;

    const matchedPerfume = await prisma.perfume.findUnique({
      where: { slug: result.matchedPerfume.id },
    });

    const created = await prisma.surveyResult.create({
      data: {
        answers,
        scentDna: result.scentDna,
        matchScore: result.matchScore,
        archetype: result.archetype,
        customFormula: result.customFormula,
        matchedPerfumeId: matchedPerfume?.id,
      },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to persist survey result:', error);
    // لا نفشل تجربة المستخدم بسبب خطأ في قاعدة البيانات — النتيجة محفوظة محليًا في المتصفح أصلاً
    return NextResponse.json({ error: 'could not save result' }, { status: 200 });
  }
}

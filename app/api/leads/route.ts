import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { leadCaptureSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadCaptureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const isLocalId = parsed.data.resultId.startsWith('local-');

    if (isLocalId) {
      console.log('Lead captured (no DB-backed result yet):', parsed.data);
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        resultId: parsed.data.resultId,
      },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to save lead:', error);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

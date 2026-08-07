import { notFound } from 'next/navigation';
import Link from 'next/link';
import { perfumeCatalog } from '@/lib/perfume-catalog';
import { ingredientsData } from '@/lib/ingredients-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return perfumeCatalog.map((p) => ({ id: p.id }));
}

export default function PerfumeDetailPage({ params }: { params: { id: string } }) {
  const perfume = perfumeCatalog.find((p) => p.id === params.id);
  if (!perfume) notFound();

  const notes = perfume.notes
    .map((code) => ingredientsData.find((i) => i.code === code))
    .filter(Boolean);

  return (
    <main className="gradient-hero min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/results" className="text-sm text-accent hover:underline">
          ← العودة إلى النتائج
        </Link>

        <Card>
          <CardHeader>
            <p className="text-sm text-accent">{perfume.brand}</p>
            <CardTitle className="text-3xl">{perfume.name}</CardTitle>
            <p className="text-muted-foreground">{perfume.personality}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoRow label="الجنس" value={perfume.gender} />
              <InfoRow label="السعر / 50مل" value={`$${perfume.pricePer50ml}`} />
              <InfoRow label="الثبات" value={perfume.longevity} />
              <InfoRow label="الحضور" value={perfume.sillage} />
              <InfoRow label="أفضل وقت" value={perfume.bestTime} />
              <InfoRow label="الاستخدام" value={perfume.usageType.join('، ')} />
            </div>

            <div>
              <h3 className="font-bold mb-2">النوتات الرئيسية</h3>
              <div className="flex flex-wrap gap-2">
                {notes.map((n) => (
                  <span
                    key={n!.code}
                    className="rounded-full bg-white border border-border px-3 py-1.5 text-sm flex items-center gap-1.5"
                  >
                    <span>{n!.emoji}</span> {n!.nameAr}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/survey">
              <Button className="w-full" size="lg">
                إعادة الاكتشاف
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white/70 border border-border px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

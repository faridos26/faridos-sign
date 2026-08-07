import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="gradient-hero min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl animate-fade-in">
        <p className="text-sm tracking-[0.3em] text-accent font-semibold mb-4">FARIDOS SIGN</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-balance">
          اكتشف بصمتك العطرية
        </h1>
        <p className="text-lg text-muted-foreground mb-1">Discover Your Scent DNA</p>
        <p className="text-base text-muted-foreground mb-10">Découvrez votre ADN Olfactif</p>

        <Link href="/survey">
          <Button size="lg" className="text-lg px-12">
            ابدأ الاكتشاف
          </Button>
        </Link>

        <div className="mt-10 flex items-center justify-center gap-4 text-sm text-accent">
          <span className="cursor-pointer hover:underline">العربية</span>
          <span className="opacity-40">|</span>
          <span className="cursor-pointer hover:underline opacity-60">Français</span>
          <span className="opacity-40">|</span>
          <span className="cursor-pointer hover:underline opacity-60">English</span>
        </div>
      </div>
    </main>
  );
}

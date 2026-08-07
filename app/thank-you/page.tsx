import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <main className="gradient-hero min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md animate-fade-in">
        <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">شكرًا لك!</h1>
        <p className="text-muted-foreground mb-8">
          استلمنا بياناتك بنجاح. سيتواصل معك فريق FARIDOS SIGN قريبًا بتوصية شخصية وعيّنة من عطرك المقترح.
        </p>
        <Link href="/">
          <Button size="lg">العودة إلى الرئيسية</Button>
        </Link>
      </div>
    </main>
  );
}

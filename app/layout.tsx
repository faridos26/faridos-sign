import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'FARIDOS SIGN | اكتشف بصمتك العطرية',
  description:
    'FARIDOS SIGN — منصة ذكية تكتشف بصمتك العطرية وتوصيك بالعطر الأنسب لشخصيتك.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

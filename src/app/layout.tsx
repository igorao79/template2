import type { Metadata, Viewport } from 'next';
import "@/styles/globals.scss";
import Providers from './providers';
import { Montserrat } from 'next/font/google';
import { getAssetPath } from '@/app/utils/paths';
import Header from '@/app/components/layout/Header';
import FontPreload from './components/FontPreload';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Зоопарк',
  description: 'Добро пожаловать в наш зоопарк',
  manifest: '/manifest.json',
  icons: {
    icon: '/fav.ico'
  },
  other: {
    'format-detection': 'telephone=no',
  },
  keywords: ['зоопарк', 'животные', 'развлечения', 'семейный отдых', 'билеты в зоопарк'],
  robots: 'index, follow',
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://igorao79.github.io/template2' 
    : 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    title: 'Зоопарк - Удивительный мир животных',
    description: 'Добро пожаловать в самый интерактивный и увлекательный зоопарк',
    siteName: 'Зоопарк',
    images: [getAssetPath('/images/og-image.jpg')],
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={montserrat.className}>
      <head>
        <FontPreload />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

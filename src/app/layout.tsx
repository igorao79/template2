import type { Metadata, Viewport } from "next";
import "../styles/globals.scss";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import MainLayout from './components/layout/MainLayout';

export const metadata: Metadata = {
  title: "Зоопарк - Удивительный мир животных",
  description: "Добро пожаловать в самый интерактивный и увлекательный зоопарк. Познакомьтесь с удивительными животными, посетите наши события и проведите время с семьей!",
  icons: {
    icon: '/fav.ico',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'Зоопарк' }],
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
    images: ['/images/og-image.jpg'],
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1E5128',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <MainLayout>
            {children}
          </MainLayout>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

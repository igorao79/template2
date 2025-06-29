'use client';

import { CartProvider } from './context/CartContext';
import { AnimationProvider } from './context/AnimationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainLayout from './components/layout/MainLayout';
import LoadingScreen from './components/LoadingScreen';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <AnimationProvider>
        <LoadingScreen />
        <MainLayout>
          <Header />
          {children}
          <Footer />
        </MainLayout>
      </AnimationProvider>
    </CartProvider>
  );
} 
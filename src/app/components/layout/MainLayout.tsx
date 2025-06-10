'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './MainLayout.module.scss';
import { CartProvider } from '@/app/context/CartContext';
import CartModal from '../cart/CartModal';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <CartProvider>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <CartModal />
    </CartProvider>
  );
};

export default MainLayout; 
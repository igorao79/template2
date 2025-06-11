'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './MainLayout.module.scss';
import CartModal from '../cart/CartModal';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <main className={styles.main}>
        {children}
      </main>
      <CartModal />
    </>
  );
};

export default MainLayout; 
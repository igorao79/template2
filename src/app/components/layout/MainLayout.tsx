'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout; 
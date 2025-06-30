'use client';

import { ReactNode, memo } from 'react';
import styles from './MainLayout.module.scss';
import CartModal from '../cart/CartModal';
import { useAnimation } from '@/app/context/AnimationContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isLoading } = useAnimation();

  return (
    <>
      <main className={`${styles.main} ${isLoading ? styles.hidden : ''}`}>
        {children}
      </main>
      <CartModal />
    </>
  );
};

export default memo(MainLayout); 
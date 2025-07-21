'use client';

import { useEffect, useRef, memo } from 'react';
import styles from './LoadingScreen.module.scss';
import { useAnimation } from '@/app/context/AnimationContext';

const LoadingScreen = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useAnimation();

  useEffect(() => {
    document.body.style.opacity = '1';
    
    // Блокируем скролл во время загрузки
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    
    if (!isLoading && loaderRef.current) {
      loaderRef.current.classList.add(styles.fadeOut);
      
      const removeTimer = setTimeout(() => {
        loaderRef.current?.remove();
      }, 800);

      return () => clearTimeout(removeTimer);
    }

    // Cleanup function для сброса стилей при размонтировании
    return () => {
      if (!isLoading) {
        document.body.style.overflow = '';
        document.body.style.height = '';
      }
    };
  }, [isLoading]);

  return (
    <div ref={loaderRef} className={styles.loadingScreen}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.text}>Зоопарк</span>
          <span className={styles.dot}>.</span>
        </div>
      </div>
    </div>
  );
};

export default memo(LoadingScreen);
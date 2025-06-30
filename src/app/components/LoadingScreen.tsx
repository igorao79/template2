'use client';

import { useEffect, useRef, memo } from 'react';
import styles from './LoadingScreen.module.scss';
import { useAnimation } from '@/app/context/AnimationContext';

const LoadingScreen = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useAnimation();

  useEffect(() => {
    document.body.style.opacity = '1';
    
    if (!isLoading && loaderRef.current) {
      loaderRef.current.classList.add(styles.fadeOut);
      
      const removeTimer = setTimeout(() => {
        loaderRef.current?.remove();
      }, 800);

      return () => clearTimeout(removeTimer);
    }
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
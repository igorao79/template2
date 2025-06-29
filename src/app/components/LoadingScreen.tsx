'use client';

import { useEffect, useRef } from 'react';
import styles from './LoadingScreen.module.scss';
import { useAnimation } from '@/app/context/AnimationContext';

export default function LoadingScreen() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useAnimation();

  useEffect(() => {
    // Показываем body сразу
    document.body.style.opacity = '1';
    
    if (!isLoading && loaderRef.current) {
      loaderRef.current.classList.add(styles.fadeOut);
      
      // Удаляем элемент после завершения анимации
      const removeTimer = setTimeout(() => {
        loaderRef.current?.remove();
      }, 800); // 800ms - время анимации fadeOut

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
} 
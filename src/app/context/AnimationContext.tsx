'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AnimationContextType {
  canAnimate: boolean;
  isLoading: boolean;
  hasScrolled: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  canAnimate: false,
  isLoading: true,
  hasScrolled: false
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [canAnimate, setCanAnimate] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Устанавливаем начальное значение hasScrolled на основе текущей позиции
    setHasScrolled(window.scrollY > 0);

    const handleScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        // Разрешаем анимации только после скрытия лоадера
        setTimeout(() => {
          setCanAnimate(true);
        }, 800); // Время fadeOut анимации лоадера
      }, 2500);

      return () => clearTimeout(loadingTimer);
    }
  }, []);

  return (
    <AnimationContext.Provider value={{ canAnimate, isLoading, hasScrolled }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
} 
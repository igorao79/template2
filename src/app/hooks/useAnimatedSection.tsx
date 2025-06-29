'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseAnimatedSectionOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export const useAnimatedSection = (options: UseAnimatedSectionOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options;
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldAnimate(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShouldAnimate(true);
      }
    }
  }, [inView, delay]);

  return { ref, shouldAnimate };
}; 
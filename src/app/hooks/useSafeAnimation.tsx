'use client';

import { useState, useEffect } from 'react';
import { useAnimation } from '../context/AnimationContext';

interface AnimationState {
  canAnimate: boolean;
  isLoading: boolean;
  hasScrolled: boolean;
}

export const useSafeAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>({
    canAnimate: false,
    isLoading: true,
    hasScrolled: false
  });

  const animation = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    setAnimationState(animation);
  }, [animation]);

  return {
    ...animationState,
    isReady: isMounted
  };
}; 
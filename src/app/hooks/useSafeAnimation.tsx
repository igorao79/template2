'use client';

import { useState, useEffect } from 'react';
import { useAnimation } from '../context/AnimationContext';

export const useSafeAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [animationState, setAnimationState] = useState({
    canAnimate: false,
    isLoading: true,
    animationsEnabled: false
  });

  useEffect(() => {
    setIsMounted(true);
    try {
      const state = useAnimation();
      setAnimationState(state);
    } catch (error) {
      console.warn('AnimationContext not available yet');
    }
  }, []);

  return {
    ...animationState,
    isReady: isMounted
  };
}; 
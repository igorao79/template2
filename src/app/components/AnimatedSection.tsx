'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import { useAnimatedSection } from '../hooks/useAnimatedSection';

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  animationClass: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animationClass,
  threshold,
  triggerOnce,
  delay,
  ...props
}: AnimatedSectionProps) {
  const { ref, shouldAnimate } = useAnimatedSection({ threshold, triggerOnce, delay });

  return (
    <div 
      ref={ref}
      className={`${className} ${shouldAnimate ? animationClass : ''}`}
      {...props}
    >
      {children}
    </div>
  );
} 
'use client';

import { useCallback, useEffect, useState } from 'react';

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToElement = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveSection(hash);
      scrollToElement(hash);
    }
  }, [scrollToElement]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'animals', 'tickets', 'events', 'location'];
      let currentSection = 'home';
      let minDistance = Infinity;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        window.history.replaceState(null, '', `#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavigation = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    scrollToElement(sectionId);
    window.history.pushState(null, '', `#${sectionId}`);
  }, [scrollToElement]);

  return {
    activeSection,
    handleNavigation
  };
}; 
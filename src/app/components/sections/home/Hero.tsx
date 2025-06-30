'use client';

import { useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/app/utils/paths';
import styles from './Hero.module.scss';
import Arrow from '@/app/components/ui/Arrow';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const HeroContent = memo(() => (
  <div className={styles.hero__content}>
    <motion.h1 
      className={styles.hero__title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Добро пожаловать в <span className={styles.hero__title_accent}>Зоопарк</span>
    </motion.h1>
    
    <motion.p 
      className={styles.hero__description}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      Откройте для себя удивительный мир животных и незабываемые приключения для всей семьи.
    </motion.p>
    
    <motion.div
      className={styles.hero__buttons}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <a 
        href="#tickets" 
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('tickets');
        }}
        className={styles.hero__button_primary}
      >
        Купить билеты
      </a>
      <a
        href="#animals"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('animals');
        }}
        className={styles.hero__button_secondary}
      >
        Узнать больше
      </a>
    </motion.div>
  </div>
));

HeroContent.displayName = 'HeroContent';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Игнорируем ошибку автовоспроизведения
      });
    }
  }, []);

  const handleScrollToAnimals = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('animals');
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.hero__background}>
        <video 
          ref={videoRef}
          className={styles.hero__video}
          autoPlay
          muted
          loop
          playsInline
          poster={getAssetPath('/images/hero-bg.webp')}
        >
          <source src={getAssetPath('/video.mp4')} type="video/mp4" />
        </video>
        <div className={styles.hero__overlay}></div>
      </div>

      <HeroContent />

      <motion.div 
        className={styles.hero__scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={handleScrollToAnimals}
      >
        <div className={styles.hero__scroll_icon}>
          <Arrow color="white" size={30} />
        </div>
      </motion.div>
    </section>
  );
};

export default memo(Hero); 
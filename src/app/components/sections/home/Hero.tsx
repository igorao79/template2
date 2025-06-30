'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/app/utils/paths';
import styles from './Hero.module.scss';
import Arrow from '@/app/components/ui/Arrow';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Игнорируем ошибку автовоспроизведения
      });
    }
  }, []);

  const scrollToAnimals = (e: React.MouseEvent) => {
    e.preventDefault();
    const animalsSection = document.getElementById('animals');
    if (animalsSection) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = animalsSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollToTickets = (e: React.MouseEvent) => {
    e.preventDefault();
    const ticketsSection = document.getElementById('tickets');
    if (ticketsSection) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = ticketsSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
            onClick={scrollToTickets}
            className={styles.hero__button_primary}
          >
            Купить билеты
          </a>
          <a
            href="#animals"
            onClick={scrollToAnimals}
            className={styles.hero__button_secondary}
          >
            Узнать больше
          </a>
        </motion.div>
      </div>

      <motion.div 
        className={styles.hero__scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={scrollToAnimals}
      >
        <div className={styles.hero__scroll_icon}>
          <Arrow color="white" size={30} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 
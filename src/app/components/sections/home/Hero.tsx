'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.scss';
import { useAnimation } from '@/app/context/AnimationContext';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { canAnimate, hasScrolled } = useAnimation();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      });
    }
  }, []);

  const scrollToAnimals = (e: React.MouseEvent) => {
    e.preventDefault();
    const animalsSection = document.getElementById('animals');
    animalsSection?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToTickets = (e: React.MouseEvent) => {
    e.preventDefault();
    const ticketsSection = document.getElementById('tickets');
    ticketsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.hero__background}>
        <video 
          ref={videoRef}
          className={styles.hero__video}
          autoPlay
          muted
          loop
          playsInline
          poster="./images/hero-bg.webp"
        >
          <source src="./video.mp4" type="video/mp4" />
        </video>
        <div className={styles.hero__overlay}></div>
      </div>

      <div className={styles.hero__content}>
        <motion.h1 
          className={styles.hero__title}
          initial={{ opacity: 0, y: -20 }}
          animate={canAnimate && !hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Добро пожаловать в <span className={styles.hero__title_accent}>Зоопарк</span>
        </motion.h1>
        
        <motion.p 
          className={styles.hero__description}
          initial={{ opacity: 0 }}
          animate={canAnimate && !hasScrolled ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Откройте для себя удивительный мир животных и незабываемые приключения для всей семьи.
        </motion.p>
        
        <motion.div
          className={styles.hero__buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={canAnimate && !hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
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
        animate={canAnimate && !hasScrolled ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={scrollToAnimals}
      >
        <div className={styles.hero__scroll_icon}>
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 5V19M12 19L19 12M12 19L5 12" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 
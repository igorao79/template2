'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import styles from './FeaturedAnimals.module.scss';

// Данные о популярных животных
const featuredAnimals = [
  {
    id: 1,
    name: 'Африканский слон',
    category: 'Млекопитающее',
    description: 'Самое крупное наземное животное с отличительными длинными хоботами и большими ушами.',
    image: '/images/elephant-card.jpg',
    iconName: 'african-elephant',
    animationClass: 'animate-elephant',
  },
  {
    id: 2,
    name: 'Бенгальский тигр',
    category: 'Хищник',
    description: 'Величественная большая кошка, известная своей оранжевой шерстью с черными полосами и невероятной силой.',
    image: '/images/tiger-card.jpg',
    iconName: 'bengal-tiger',
    animationClass: 'animate-pulse',
  },
  {
    id: 3,
    name: 'Жираф',
    category: 'Млекопитающее',
    description: 'Самое высокое наземное животное с длинной шеей и характерным пятнистым окрасом.',
    image: '/images/giraffe-card.jpg',
    iconName: 'giraffe',
    animationClass: 'animate-float',
  },
  {
    id: 4,
    name: 'Кольцехвостый лемур',
    category: 'Примат',
    description: 'Известен своим характерным черно-белым полосатым хвостом и большими глазами.',
    image: '/images/lemur-card.jpg',
    iconName: 'ring-tailed-lemur',
    animationClass: 'animate-wiggle',
  },
];

const FeaturedAnimals = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className={styles.featured}>
      <div className={styles.featured__container}>
        <div className={styles.featured__header}>
          <motion.h2 
            className={styles.featured__title}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Наши удивительные животные
          </motion.h2>
          <motion.p 
            className={styles.featured__description}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Познакомьтесь поближе с нашими самыми популярными обитателями. У каждого из них своя уникальная личность и история.
          </motion.p>
        </div>

        <motion.div 
          className={styles.featured__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredAnimals.map((animal) => (
            <motion.div 
              key={animal.id}
              className={styles.featured__card}
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(animal.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles['featured__image-container']}>
                <Image 
                  src={animal.image} 
                  alt={animal.name} 
                  fill
                  className={styles.featured__image}
                />
                <div className={styles['featured__image-overlay']}></div>
                <h3 className={styles['featured__card-title']}>{animal.name}</h3>
                <span className={styles.featured__category}>{animal.category}</span>
              </div>
              
              <div className={styles.featured__content}>
                <p className={styles.featured__text}>{animal.description}</p>
                <div className={styles.featured__footer}>
                  <div className={`${styles.featured__icon} ${animal.animationClass}`}>
                    <Image 
                      src={`/images/${animal.iconName}-icon.svg`} 
                      alt={animal.name} 
                      width={48}
                      height={48}
                      className="w-full h-full" 
                    />
                  </div>
                  <Link
                    href={`/animals/${animal.id}`}
                    className={styles.featured__link}
                  >
                    Узнать больше
                    <FaArrowRight 
                      className={`${styles['featured__link-icon']} ${hoveredId === animal.id ? 'translate-x-1' : ''}`} 
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.featured__more}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/animals" className={styles.featured__button}>
            Посмотреть всех животных
            <FaArrowRight className={styles['featured__button-icon']} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedAnimals; 
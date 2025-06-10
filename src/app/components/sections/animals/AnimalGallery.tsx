'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';
import styles from './AnimalGallery.module.scss';
import { animals } from '@/app/data/animals';
import AnimalModal from './AnimalModal';

const AnimalGallery = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnimalClick = (animal: typeof animals[0]) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedAnimal(null);
    }, 300);
  };

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className={styles.animals} id="animals">
      <div className={styles.animals__container}>
        <motion.div 
          className={styles.animals__header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.animals__title}>Наши животные</h2>
          <p className={styles.animals__description}>
            Познакомьтесь с удивительными обитателями нашего зоопарка. Нажмите на карточку животного, чтобы узнать больше интересных фактов!
          </p>
        </motion.div>

        <motion.div 
          className={styles.animals__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {animals.map((animal) => (
            <motion.div 
              key={animal.id}
              className={`${styles.animals__card} ${selectedAnimal?.id === animal.id && isModalOpen ? styles['animals__card--active'] : ''}`}
              variants={cardVariants}
              onClick={() => handleAnimalClick(animal)}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className={styles.animals__image_container}>
                <Image 
                  src={animal.image} 
                  alt={animal.name} 
                  className={styles.animals__image}
                  width={400}
                  height={300}
                  quality={85}
                  priority={animal.id <= 2}
                />
                <div className={styles.animals__overlay}></div>
                <FaPaw className={styles.animals__icon} />
              </div>
              
              <div className={styles.animals__content}>
                <h3 className={styles.animals__name}>{animal.name}</h3>
                <p className={styles.animals__species}>{animal.species}</p>
                <button className={styles.animals__info_button}>
                  <FaInfoCircle />
                  <span>Подробнее</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Используем новый компонент модального окна */}
        <AnimalModal 
          animal={selectedAnimal}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
};

export default AnimalGallery; 
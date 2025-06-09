'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import styles from './AnimalGallery.module.scss';

const animals = [
  {
    id: 1,
    name: 'Лев',
    species: 'Panthera leo',
    description: 'Крупный хищник из семейства кошачьих, обитающий в Африке и части Индии. Известен своей мощной гривой и громким рыком.',
    funFact: 'Львы могут спать до 20 часов в день!',
    image: '/images/lion.webp',
    habitat: 'Саванны и открытые равнины Африки',
    diet: 'Хищник (зебры, буйволы, антилопы)',
    lifespan: '10-14 лет',
    conservation: 'Уязвимый вид',
  },
  {
    id: 2,
    name: 'Тигр',
    species: 'Panthera tigris',
    description: 'Самая крупная кошка в мире, с характерными черными полосками на оранжевой шерсти. Тигры — одиночные охотники с отличным слухом и зрением.',
    funFact: 'Полоски тигра уникальны, как отпечатки пальцев у человека!',
    image: '/images/tiger.webp',
    habitat: 'Леса, мангровые болота и луга Азии',
    diet: 'Хищник (олени, кабаны, буйволы)',
    lifespan: '10-15 лет',
    conservation: 'Вымирающий вид',
  },
  {
    id: 3,
    name: 'Слон',
    species: 'Loxodonta africana',
    description: 'Крупнейшие наземные млекопитающие с характерным длинным хоботом и бивнями. Отличаются высоким интеллектом и сложным социальным поведением.',
    funFact: 'Слоны могут общаться на расстоянии до 10 км с помощью низкочастотных звуков!',
    image: '/images/elephant.webp',
    habitat: 'Саванны, леса и пустыни Африки и Азии',
    diet: 'Травоядное (трава, листья, фрукты)',
    lifespan: '60-70 лет',
    conservation: 'Уязвимый вид',
  },
  {
    id: 4,
    name: 'Жираф',
    species: 'Giraffa camelopardalis',
    description: 'Самое высокое наземное животное с характерной длинной шеей и пятнистым окрасом. Могут достигать высоты до 5,8 метров.',
    funFact: 'Жирафы спят всего около 30 минут в день!',
    image: '/images/giraffe.webp',
    habitat: 'Саванны и редколесья Африки',
    diet: 'Травоядное (листья акации)',
    lifespan: '20-25 лет',
    conservation: 'Уязвимый вид',
  },
  {
    id: 5,
    name: 'Панда',
    species: 'Ailuropoda melanoleuca',
    description: 'Известный черно-белый медведь, обитающий в горных лесах центрального Китая. Известен своей любовью к бамбуку.',
    funFact: 'Панды едят бамбук до 12 часов в день, потребляя до 12 кг!',
    image: '/images/panda.webp',
    habitat: 'Горные леса Китая',
    diet: 'Травоядное (бамбук)',
    lifespan: '20 лет',
    conservation: 'Уязвимый вид',
  },
  {
    id: 6,
    name: 'Игуана',
    species: 'Iguana iguana',
    description: 'Крупная травоядная ящерица с характерным гребнем на спине. Отличные пловцы и альпинисты.',
    funFact: 'Игуаны могут задерживать дыхание под водой до 30 минут!',
    image: '/images/iguana.webp',
    habitat: 'Тропические леса Центральной и Южной Америки',
    diet: 'Травоядное (листья, фрукты, цветы)',
    lifespan: '12-15 лет',
    conservation: 'Не находится под угрозой',
  },
];

const AnimalGallery = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedAnimal) {
      setIsInfoVisible(true);
    } else {
      setIsInfoVisible(false);
    }
  }, [selectedAnimal]);

  const handleAnimalClick = (animal: typeof animals[0]) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (selectedAnimal && selectedAnimal.id === animal.id) {
      setIsInfoVisible(false);
      setTimeout(() => {
        setSelectedAnimal(null);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsInfoVisible(false);
      setTimeout(() => {
        setSelectedAnimal(animal);
        setIsInfoVisible(true);
        setIsAnimating(false);
      }, 300);
    }
  };

  const closeInfo = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsInfoVisible(false);
    
    setTimeout(() => {
      setSelectedAnimal(null);
      setIsAnimating(false);
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
              className={`${styles.animals__card} ${selectedAnimal?.id === animal.id ? styles['animals__card--active'] : ''}`}
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

        {selectedAnimal && (
          <motion.div 
            className={`${styles.animals__info} ${isInfoVisible ? styles['animals__info--visible'] : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInfoVisible ? 1 : 0, y: isInfoVisible ? 0 : 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.animals__info_header}>
              <div className={styles.animals__info_title_container}>
                <h3 className={styles.animals__info_title}>{selectedAnimal.name}</h3>
                <p className={styles.animals__info_species}>{selectedAnimal.species}</p>
              </div>
              <button className={styles.animals__close} onClick={closeInfo}>
                &times;
              </button>
            </div>
            
            <div className={styles.animals__info_content}>
              <div className={styles.animals__info_image_container}>
                <Image 
                  src={selectedAnimal.image} 
                  alt={selectedAnimal.name} 
                  className={styles.animals__info_image}
                  width={600}
                  height={400}
                  quality={90}
                />
              </div>
              
              <div className={styles.animals__info_details}>
                <div className={styles.animals__info_description}>
                  <p>{selectedAnimal.description}</p>
                </div>
                
                <div className={styles.animals__fun_fact}>
                  <h4>Интересный факт:</h4>
                  <p>{selectedAnimal.funFact}</p>
                </div>
                
                <div className={styles.animals__facts}>
                  <div className={styles.animals__fact}>
                    <h4>Среда обитания:</h4>
                    <p>{selectedAnimal.habitat}</p>
                  </div>
                  
                  <div className={styles.animals__fact}>
                    <h4>Питание:</h4>
                    <p>{selectedAnimal.diet}</p>
                  </div>
                  
                  <div className={styles.animals__fact}>
                    <h4>Продолжительность жизни:</h4>
                    <p>{selectedAnimal.lifespan}</p>
                  </div>
                  
                  <div className={styles.animals__fact}>
                    <h4>Статус сохранения:</h4>
                    <p>{selectedAnimal.conservation}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              className={styles.animals__more}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#" className={styles.animals__more_link}>
                <span>Посмотреть расписание кормления</span>
                <FaArrowRight className={styles.animals__more_icon} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AnimalGallery; 
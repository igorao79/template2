'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaStar, FaRedo } from 'react-icons/fa';
import styles from './AnimalSoundsGame.module.scss';

// Данные о животных и их звуках
const animals = [
  {
    id: 1,
    name: 'Лев',
    sound: '/sounds/lion.mp3',
    image: '/images/lion.webp',
    icon: '🦁'
  },
  {
    id: 2,
    name: 'Слон',
    sound: '/sounds/elephant.mp3',
    image: '/images/elephant.webp',
    icon: '🐘'
  },
  {
    id: 3,
    name: 'Обезьяна',
    sound: '/sounds/monkey.mp3',
    image: '/images/monkey.webp',
    icon: '🐵'
  },
  {
    id: 4,
    name: 'Тигр',
    sound: '/sounds/tiger.mp3',
    image: '/images/tiger.webp',
    icon: '🐯'
  },
  {
    id: 5,
    name: 'Жираф',
    sound: '/sounds/giraffe.mp3',
    image: '/images/giraffe.webp',
    icon: '🦒'
  },
  {
    id: 6,
    name: 'Волк',
    sound: '/sounds/wolf.mp3',
    image: '/images/wolf.webp',
    icon: '🐺'
  }
];

const AnimalSoundsGame = () => {
  const [currentSound, setCurrentSound] = useState<number | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showStars, setShowStars] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shakingAnimal, setShakingAnimal] = useState<number | null>(null);

  // Генерация случайного звука
  const generateRandomSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    const randomIndex = Math.floor(Math.random() * animals.length);
    setCurrentSound(animals[randomIndex].id);
    setSelectedAnimal(null);
    setResult(null);
    
    // Создаем новый аудио элемент и проигрываем звук
    const newAudio = new Audio(animals[randomIndex].sound);
    setAudio(newAudio);
    
    setTimeout(() => {
      newAudio.play().catch(error => {
        console.error('Ошибка воспроизведения звука:', error);
      });
    }, 500);
  };

  // Начало игры
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    generateRandomSound();
  };

  // Проверка выбранного животного
  const checkAnimal = (animalId: number) => {
    if (currentSound === null || result !== null) return;
    
    setSelectedAnimal(animalId);
    
    if (animalId === currentSound) {
      setResult('correct');
      setScore(prevScore => prevScore + 1);
      setShowStars(true);
      
      setTimeout(() => {
        setShowStars(false);
        setTimeout(() => {
          generateRandomSound();
        }, 500);
      }, 1500);
    } else {
      setResult('wrong');
      setShakingAnimal(animalId);
      
      setTimeout(() => {
        setShakingAnimal(null);
        setTimeout(() => {
          setResult(null);
          setSelectedAnimal(null);
        }, 300);
      }, 500);
    }
  };

  // Повторное воспроизведение текущего звука
  const replaySound = () => {
    if (audio && currentSound !== null) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error('Ошибка воспроизведения звука:', error);
      });
    }
  };

  // Очистка аудио при размонтировании компонента
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15
      } 
    },
    hover: { 
      scale: 1.05,
      y: -10,
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.95 },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: [0, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const emojiVariants = {
    idle: { y: 0 },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={styles.game}>
      <div className={styles.game__container}>
        <motion.div 
          className={styles.game__header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.game__title}>Угадай животное по звуку</h2>
          <p className={styles.game__description}>
            Прослушай звук и выбери животное, которому он принадлежит. За каждый правильный ответ ты получишь звезду!
          </p>
        </motion.div>

        {!gameStarted ? (
          <motion.div 
            className={styles.game__start}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button 
              className={styles.game__start_button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
            >
              Начать игру
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className={styles.game__control}>
              <div className={styles.game__score}>
                <span>Счёт:</span>
                <motion.span
                  key={score}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.3 }}
                  className={styles.game__score_value}
                >
                  {score}
                </motion.span>
              </div>
              <motion.button
                className={styles.game__replay}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={replaySound}
                disabled={currentSound === null}
              >
                <FaVolumeUp />
                <span>Послушать ещё раз</span>
              </motion.button>
            </div>

            <motion.div 
              className={styles.game__grid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {animals.map((animal) => (
                <motion.div 
                  key={animal.id}
                  className={`${styles.game__card} 
                    ${selectedAnimal === animal.id && result === 'correct' ? styles['game__card--correct'] : ''} 
                    ${selectedAnimal === animal.id && result === 'wrong' ? styles['game__card--wrong'] : ''}`}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={shakingAnimal === animal.id ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={shakingAnimal === animal.id ? { duration: 0.5 } : {}}
                  onClick={() => checkAnimal(animal.id)}
                >
                  <div className={styles.game__image_container}>
                    <img 
                      src={animal.image} 
                      alt={animal.name} 
                      className={styles.game__image}
                    />
                    <div className={styles.game__overlay}></div>
                    <motion.div 
                      className={styles.game__emoji}
                      variants={emojiVariants}
                      animate={selectedAnimal === animal.id && result === 'correct' ? 'bounce' : 'idle'}
                    >
                      {animal.icon}
                    </motion.div>
                  </div>
                  
                  <div className={styles.game__content}>
                    <h3 className={styles.game__name}>{animal.name}</h3>
                  </div>

                  {selectedAnimal === animal.id && result === 'correct' && showStars && (
                    <div className={styles.game__stars}>
                      {[...Array(5)].map((_, index) => (
                        <motion.div 
                          key={index}
                          className={styles.game__star}
                          variants={starVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          style={{ 
                            top: `${Math.random() * 70}%`, 
                            left: `${Math.random() * 70}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          <FaStar />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className={styles.game__restart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                className={styles.game__restart_button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
              >
                <FaRedo />
                <span>Начать заново</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default AnimalSoundsGame; 
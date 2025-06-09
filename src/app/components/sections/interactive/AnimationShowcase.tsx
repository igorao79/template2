'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimationShowcase.module.scss';

const animals = [
  {
    id: 1,
    name: 'Слон',
    icon: '🐘',
    color: '#7986CB',
    description: 'Слоны покачивают своим длинным хоботом и машут большими ушами',
    sounds: ['Туу-туу-ту!', 'Брууууу!'],
    animation: {
      trunk: {
        rotate: [0, 15, -15, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }
      },
      ears: {
        scale: [1, 1.1, 1],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }
      },
      body: {
        y: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 2.5,
          ease: 'easeInOut',
        }
      }
    }
  },
  {
    id: 2,
    name: 'Обезьяна',
    icon: '🐵',
    color: '#FF8A65',
    description: 'Обезьяны прыгают с ветки на ветку и строят смешные гримасы',
    sounds: ['У-у-а-а!', 'Ки-ки-ки!'],
    animation: {
      body: {
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeOut',
        }
      },
      arms: {
        rotate: [0, 20, -20, 0],
        transition: {
          repeat: Infinity,
          duration: 1,
          ease: 'easeInOut',
        }
      },
      face: {
        scale: [1, 1.2, 1],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }
      }
    }
  },
  {
    id: 3,
    name: 'Лев',
    icon: '🦁',
    color: '#FFA000',
    description: 'Лев трясёт своей гривой и громко рычит на всю саванну',
    sounds: ['Р-р-р-р!', 'Гр-р-р-р!'],
    animation: {
      mane: {
        rotate: [-3, 3, -3],
        transition: {
          repeat: Infinity,
          duration: 0.5,
          ease: 'easeInOut',
        }
      },
      jaw: {
        scaleY: [1, 1.2, 1],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }
      },
      body: {
        x: [0, 5, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }
      }
    }
  },
  {
    id: 4,
    name: 'Жираф',
    icon: '🦒',
    color: '#FBC02D',
    description: 'Жираф вытягивает свою длинную шею, чтобы достать листья на высоком дереве',
    sounds: ['Мммм-м-м!', 'Хм-м-м!'],
    animation: {
      neck: {
        rotate: [0, 5, -2, 0],
        transition: {
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }
      },
      head: {
        y: [0, -10, 0],
        rotate: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }
      },
      legs: {
        y: [0, 3, 0],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }
      }
    }
  },
  {
    id: 5,
    name: 'Пингвин',
    icon: '🐧',
    color: '#4FC3F7',
    description: 'Пингвин переваливается с боку на бок и скользит на животе по льду',
    sounds: ['Уаак-уаак!', 'Кррр-кррр!'],
    animation: {
      body: {
        rotate: [-5, 5, -5],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }
      },
      wings: {
        rotate: [0, 15, 0, -15, 0],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }
      },
      slide: {
        x: [0, 20, 0, -20, 0],
        transition: {
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }
      }
    }
  },
  {
    id: 6,
    name: 'Кенгуру',
    icon: '🦘',
    color: '#AED581',
    description: 'Кенгуру высоко прыгает на своих сильных задних лапах',
    sounds: ['Пуф-пуф!', 'Туп-туп!'],
    animation: {
      body: {
        y: [0, -40, 0],
        scaleY: [1, 0.9, 1.1, 1],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }
      },
      tail: {
        rotate: [0, 5, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }
      },
      pouch: {
        scale: [1, 1.05, 1],
        transition: {
          repeat: Infinity,
          duration: 2.5,
          ease: 'easeInOut',
        }
      }
    }
  }
];

const AnimationShowcase = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [playSound, setPlaySound] = useState(false);

  const handleAnimalSelect = (id: number) => {
    setSelectedAnimal(id);
    setPlaySound(false);
  };

  const handleSoundPlay = () => {
    setPlaySound(true);
    setTimeout(() => setPlaySound(false), 2000);
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

  const itemVariants = {
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
      y: -5,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.95 },
  };

  const animalContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15
      } 
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay: 0.2
      } 
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const soundVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: [0, 1.2, 1],
      transition: { 
        duration: 0.5
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

  const getSelectedAnimal = () => {
    return animals.find(animal => animal.id === selectedAnimal);
  };

  const getRandomSound = () => {
    const animal = getSelectedAnimal();
    if (!animal) return '';
    return animal.sounds[Math.floor(Math.random() * animal.sounds.length)];
  };

  return (
    <section className={styles.showcase}>
      <div className={styles.showcase__container}>
        <motion.div 
          className={styles.showcase__header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.showcase__title}>Анимированный зоопарк</h2>
          <p className={styles.showcase__description}>
            Выберите животное и посмотрите, как оно двигается! Вы даже можете услышать звуки, которые они издают.
          </p>
        </motion.div>

        {selectedAnimal === null ? (
          <motion.div 
            className={styles.showcase__grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {animals.map((animal) => (
              <motion.div 
                key={animal.id}
                className={styles.showcase__card}
                style={{ backgroundColor: animal.color }}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleAnimalSelect(animal.id)}
              >
                <div className={styles.showcase__icon_container}>
                  <span className={styles.showcase__icon}>{animal.icon}</span>
                </div>
                <h3 className={styles.showcase__name}>{animal.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedAnimal}
              className={styles.showcase__detail}
              variants={animalContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div 
                className={styles.showcase__scene}
                style={{ backgroundColor: getSelectedAnimal()?.color }}
              >
                <div className={styles.showcase__animation_container}>
                  {/* Анимированная фигура животного */}
                  {selectedAnimal === 1 && (
                    /* Слон */
                    <div className={styles.showcase__elephant}>
                      <motion.div 
                        className={styles.showcase__elephant_body}
                        animate={getSelectedAnimal()?.animation.body}
                      >
                        <motion.div 
                          className={styles.showcase__elephant_ears}
                          animate={getSelectedAnimal()?.animation.ears}
                        ></motion.div>
                        <motion.div 
                          className={styles.showcase__elephant_trunk}
                          animate={getSelectedAnimal()?.animation.trunk}
                        ></motion.div>
                        <div className={styles.showcase__elephant_eye}></div>
                      </motion.div>
                    </div>
                  )}

                  {selectedAnimal === 2 && (
                    /* Обезьяна */
                    <div className={styles.showcase__monkey}>
                      <motion.div 
                        className={styles.showcase__monkey_body}
                        animate={getSelectedAnimal()?.animation.body}
                      >
                        <motion.div 
                          className={styles.showcase__monkey_arms}
                          animate={getSelectedAnimal()?.animation.arms}
                        ></motion.div>
                        <motion.div 
                          className={styles.showcase__monkey_face}
                          animate={getSelectedAnimal()?.animation.face}
                        >
                          <div className={styles.showcase__monkey_eye}></div>
                          <div className={styles.showcase__monkey_eye}></div>
                          <div className={styles.showcase__monkey_mouth}></div>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}

                  {selectedAnimal === 3 && (
                    /* Лев */
                    <div className={styles.showcase__lion}>
                      <motion.div 
                        className={styles.showcase__lion_body}
                        animate={getSelectedAnimal()?.animation.body}
                      >
                        <motion.div 
                          className={styles.showcase__lion_mane}
                          animate={getSelectedAnimal()?.animation.mane}
                        ></motion.div>
                        <div className={styles.showcase__lion_face}>
                          <div className={styles.showcase__lion_eye}></div>
                          <div className={styles.showcase__lion_eye}></div>
                          <motion.div 
                            className={styles.showcase__lion_jaw}
                            animate={getSelectedAnimal()?.animation.jaw}
                          ></motion.div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {selectedAnimal === 4 && (
                    /* Жираф */
                    <div className={styles.showcase__giraffe}>
                      <motion.div 
                        className={styles.showcase__giraffe_legs}
                        animate={getSelectedAnimal()?.animation.legs}
                      ></motion.div>
                      <div className={styles.showcase__giraffe_body}>
                        <motion.div 
                          className={styles.showcase__giraffe_neck}
                          animate={getSelectedAnimal()?.animation.neck}
                        >
                          <motion.div 
                            className={styles.showcase__giraffe_head}
                            animate={getSelectedAnimal()?.animation.head}
                          >
                            <div className={styles.showcase__giraffe_eye}></div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {selectedAnimal === 5 && (
                    /* Пингвин */
                    <div className={styles.showcase__penguin}>
                      <motion.div 
                        className={styles.showcase__penguin_body}
                        animate={getSelectedAnimal()?.animation.body}
                      >
                        <motion.div 
                          className={styles.showcase__penguin_wings}
                          animate={getSelectedAnimal()?.animation.wings}
                        ></motion.div>
                        <div className={styles.showcase__penguin_face}>
                          <div className={styles.showcase__penguin_eye}></div>
                          <div className={styles.showcase__penguin_eye}></div>
                          <div className={styles.showcase__penguin_beak}></div>
                        </div>
                        <motion.div 
                          className={styles.showcase__penguin_slide}
                          animate={getSelectedAnimal()?.animation.slide}
                        ></motion.div>
                      </motion.div>
                    </div>
                  )}

                  {selectedAnimal === 6 && (
                    /* Кенгуру */
                    <div className={styles.showcase__kangaroo}>
                      <motion.div 
                        className={styles.showcase__kangaroo_body}
                        animate={getSelectedAnimal()?.animation.body}
                      >
                        <motion.div 
                          className={styles.showcase__kangaroo_tail}
                          animate={getSelectedAnimal()?.animation.tail}
                        ></motion.div>
                        <motion.div 
                          className={styles.showcase__kangaroo_pouch}
                          animate={getSelectedAnimal()?.animation.pouch}
                        ></motion.div>
                        <div className={styles.showcase__kangaroo_head}>
                          <div className={styles.showcase__kangaroo_eye}></div>
                          <div className={styles.showcase__kangaroo_eye}></div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Звуковой пузырь */}
                  <AnimatePresence>
                    {playSound && (
                      <motion.div 
                        className={styles.showcase__sound_bubble}
                        variants={soundVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {getRandomSound()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.div 
                className={styles.showcase__info}
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className={styles.showcase__animal_name}>
                  {getSelectedAnimal()?.name} {getSelectedAnimal()?.icon}
                </h3>
                <p className={styles.showcase__animal_description}>
                  {getSelectedAnimal()?.description}
                </p>
                <div className={styles.showcase__controls}>
                  <motion.button 
                    className={styles.showcase__sound_button}
                    onClick={handleSoundPlay}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={playSound}
                  >
                    Послушать звук
                  </motion.button>
                  <motion.button 
                    className={styles.showcase__back_button}
                    onClick={() => setSelectedAnimal(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Вернуться к списку
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default AnimationShowcase; 
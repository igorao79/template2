'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import styles from './EventsCalendar.module.scss';

const events = [
  {
    id: 1,
    title: 'Кормление хищников',
    description: 'Увлекательное зрелище, когда наши сотрудники кормят тигров, львов и других хищников. Вы сможете увидеть их естественное поведение.',
    date: '2023-06-15',
    time: '12:00',
    location: 'Павильон хищников',
    image: '/images/feeding-lions.webp',
    category: 'feeding'
  },
  {
    id: 2,
    title: 'Шоу дельфинов',
    description: 'Захватывающее представление с участием наших талантливых дельфинов. Трюки, музыка и веселье для всей семьи!',
    date: '2023-06-16',
    time: '14:00',
    location: 'Дельфинарий',
    image: '/images/dolphin-show.webp',
    category: 'show'
  },
  {
    id: 3,
    title: 'Лекция о рептилиях',
    description: 'Познавательная лекция о жизни и привычках рептилий. Вы сможете узнать интересные факты и даже подержать некоторых безопасных рептилий.',
    date: '2023-06-17',
    time: '15:30',
    location: 'Образовательный центр',
    image: '/images/reptile-lecture.webp',
    category: 'lecture'
  },
  {
    id: 4,
    title: 'Контактный зоопарк',
    description: 'Возможность для детей и взрослых погладить и покормить домашних животных под присмотром наших специалистов.',
    date: '2023-06-18',
    time: '10:00 - 18:00',
    location: 'Детская зона',
    image: '/images/petting-zoo.webp',
    category: 'activity'
  },
  {
    id: 5,
    title: 'Ночь в зоопарке',
    description: 'Уникальная возможность увидеть, как ведут себя животные ночью. Экскурсия с фонариками и опытным гидом.',
    date: '2023-06-20',
    time: '21:00',
    location: 'Главный вход',
    image: '/images/night-zoo.webp',
    category: 'special'
  }
];

const categories = [
  { id: 'all', name: 'Все события' },
  { id: 'feeding', name: 'Кормления' },
  { id: 'show', name: 'Шоу' },
  { id: 'lecture', name: 'Лекции' },
  { id: 'activity', name: 'Активности' },
  { id: 'special', name: 'Специальные' }
];

const EventsCalendar = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className={styles.events} id="events">
      <div className={styles.events__container}>
        <motion.div 
          className={styles.events__header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.events__title}>События и мероприятия</h2>
          <p className={styles.events__description}>
            В нашем зоопарке проходит множество интересных событий и мероприятий. 
            Посетите их, чтобы узнать больше о животных и получить незабываемые впечатления.
          </p>
        </motion.div>

        <div className={styles.events__filter}>
          {categories.map(category => (
            <button 
              key={category.id}
              className={`${styles.events__filter_button} ${activeCategory === category.id ? styles['events__filter_button--active'] : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <motion.div 
          className={styles.events__grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredEvents.map(event => (
            <motion.div 
              key={event.id}
              className={styles.events__card}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className={styles.events__image_container}>
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  className={styles.events__image}
                  width={500}
                  height={300}
                  quality={80}
                />
                <div className={styles.events__overlay}></div>
              </div>
              
              <div className={styles.events__content}>
                <h3 className={styles.events__event_title}>{event.title}</h3>
                <p className={styles.events__event_description}>{event.description}</p>
                
                <div className={styles.events__details}>
                  <div className={styles.events__detail}>
                    <FaCalendarAlt />
                    <span>{new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</span>
                  </div>
                  
                  <div className={styles.events__detail}>
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className={styles.events__detail}>
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className={styles.events__actions}>
                  <button className={styles.events__ticket_button}>
                    <FaTicketAlt />
                    <span>Купить билет</span>
                  </button>
                  
                  <button className={styles.events__more_button}>
                    <span>Подробнее</span>
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EventsCalendar; 
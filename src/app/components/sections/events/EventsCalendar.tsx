'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { getAssetPath } from '@/app/utils/paths';
import styles from './EventsCalendar.module.scss';
import { useCart } from '@/app/context/CartContext';
import { useAnimation } from '../../../context/AnimationContext';
import Arrow from '@/app/components/ui/Arrow';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  duration: string;
  location: string;
  price: number;
  category: string;
};

const events: Event[] = [
  {
    id: 1,
    title: 'Кормление львов',
    date: '2024-03-15',
    time: '11:00',
    description: 'Наблюдайте за кормлением наших величественных львов и узнайте больше об их рационе и поведении.',
    image: getAssetPath('/images/events/feed_lions.webp'),
    duration: '30 минут',
    location: 'Вольер львов',
    price: 200,
    category: 'feeding'
  },
  {
    id: 2,
    title: 'Шоу дельфинов',
    date: '2024-03-15',
    time: '13:00',
    description: 'Увлекательное представление с участием наших талантливых дельфинов. Трюки, игры и много веселья!',
    image: getAssetPath('/images/events/dolphin_show.webp'),
    duration: '45 минут',
    location: 'Дельфинарий',
    price: 500,
    category: 'show'
  },
  {
    id: 3,
    title: 'Мир рептилий',
    date: '2024-03-15',
    time: '15:00',
    description: 'Познакомьтесь с удивительными рептилиями нашего зоопарка. Узнайте интересные факты об их жизни.',
    image: getAssetPath('/images/events/reptiles_zoo.webp'),
    duration: '40 минут',
    location: 'Террариум',
    price: 300,
    category: 'lecture'
  },
  {
    id: 4,
    title: 'Контактный зоопарк',
    date: '2024-03-15',
    time: '16:30',
    description: 'Погладьте и покормите дружелюбных животных в нашем контактном зоопарке.',
    image: getAssetPath('/images/events/contact_zoo.webp'),
    duration: '60 минут',
    location: 'Детская зона',
    price: 400,
    category: 'activity'
  },
  {
    id: 5,
    title: 'Ночь в зоопарке',
    date: '2024-03-15',
    time: '20:00',
    description: 'Уникальная возможность увидеть ночную жизнь обитателей зоопарка. Экскурсия при свете фонарей.',
    image: getAssetPath('/images/events/night_at_zoo.webp'),
    duration: '120 минут',
    location: 'Весь зоопарк',
    price: 1000,
    category: 'special'
  },
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
  const { addToCart } = useCart();
  const { canAnimate } = useAnimation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});
  
  // Refs для отслеживания видимости элементов
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  
  // Определяем, видны ли элементы
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const filterInView = useInView(filterRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const handleScrollToTickets = () => {
    const ticketsSection = document.getElementById('tickets');
    if (ticketsSection) {
      // Get the header height to offset the scroll position
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      
      // Calculate the position to scroll to
      const position = ticketsSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (event: Event) => {
    addToCart({
      id: event.id + 1000, // Уникальный ID для событий
      name: `Билет на: ${event.title}`,
      price: event.price, // Теперь price уже число
      description: `${new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}, ${event.time}`,
      type: 'event' as 'adult' | 'child' | 'family' | 'senior', // Тип для билетов на события
      iconType: 'ticket'
    }, 1);

    setAddedToCart(prev => ({ ...prev, [event.id]: true }));
    
    // Сбросить статус "добавлено в корзину" через 3 секунды
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [event.id]: false }));
    }, 3000);
  };

  return (
    <section className={styles.events} id="events">
      <div className={styles.events__container}>
        <motion.div 
          ref={headerRef}
          className={styles.events__header}
          initial={{ opacity: 0, y: -20 }}
          animate={(canAnimate && headerInView) ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.events__title}>События и мероприятия</h2>
          <p className={styles.events__description}>
            В нашем зоопарке проходит множество интересных событий и мероприятий. 
            Посетите их, чтобы узнать больше о животных и получить незабываемые впечатления.
          </p>
        </motion.div>

        <motion.div
          ref={filterRef}
          className={styles.events__filter}
          initial={{ opacity: 0, y: 20 }}
          animate={(canAnimate && filterInView) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map(category => (
            <button 
              key={category.id}
              className={`${styles.events__filter_button} ${activeCategory === category.id ? styles['events__filter_button--active'] : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <motion.div 
          ref={gridRef}
          className={styles.events__grid}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={(canAnimate && gridInView) ? "visible" : "hidden"}
        >
          {filteredEvents.map(event => (
            <motion.div 
              key={event.id}
              className={styles.events__card}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className={styles.events__image_container}>
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  className={styles.events__image}
                  width={500}
                  height={300}
                  quality={85}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={event.id === 1}
                  loading={event.id === 1 ? "eager" : "lazy"}
                />
                <div className={styles.events__overlay}></div>
                <div className={styles.events__badge}>
                  {event.price} ₽
                </div>
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
                  <button 
                    className={`${styles.events__ticket_button} ${addedToCart[event.id] ? styles.events__ticket_button_added : ''}`}
                    onClick={() => handleAddToCart(event)}
                    disabled={addedToCart[event.id]}
                  >
                    {addedToCart[event.id] ? (
                      <>
                        <FaShoppingCart />
                        <span>Добавлено</span>
                      </>
                    ) : (
                      <>
                        <FaTicketAlt />
                        <span>Купить билет</span>
                      </>
                    )}
                  </button>
                  
                  <button 
                    className={styles.events__more_button}
                    onClick={handleScrollToTickets}
                  >
                    <span>Перейти к билетам</span>
                    <Arrow size={20} className={styles.events__arrow} />
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
'use client';

import { useRef, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTicketAlt, FaCheck, FaUser, FaChild, FaUserTie } from 'react-icons/fa';
import styles from './TicketCards.module.scss';
import { useCart } from '@/app/context/CartContext';
import { useAnimation } from '../../../context/AnimationContext';

type Ticket = {
  id: number;
  type: string;
  price: number;
  description: string;
  features: string[];
};

const tickets: Ticket[] = [
  {
    id: 1,
    type: 'Взрослый',
    price: 500,
    description: 'Для посетителей старше 14 лет',
    features: ['Полный доступ ко всем экспозициям', 'Возможность посещения шоу животных', 'Карта зоопарка']
  },
  {
    id: 2,
    type: 'Детский',
    price: 300,
    description: 'Для детей от 3 до 14 лет',
    features: ['Полный доступ ко всем экспозициям', 'Возможность посещения шоу животных', 'Карта зоопарка', 'Доступ к детским площадкам']
  },
  {
    id: 3,
    type: 'Льготный',
    price: 250,
    description: 'Пенсионеры, ветераны, инвалиды',
    features: ['Полный доступ ко всем экспозициям', 'Возможность посещения шоу животных', 'Карта зоопарка', 'Помощь сопровождающего']
  }
];

const getTicketTypeForCart = (type: string): 'adult' | 'child' | 'family' | 'senior' => {
  if (type.includes('Взрослый')) return 'adult';
  if (type.includes('Детский')) return 'child';
  if (type.includes('Льготный')) return 'senior';
  return 'adult';
};

const getTicketIcon = (type: string): string => {
  if (type.includes('Взрослый')) return 'user';
  if (type.includes('Детский')) return 'child';
  if (type.includes('Льготный')) return 'userTie';
  return 'ticket';
};

const renderTicketIcon = (iconType: string) => {
  switch (iconType) {
    case 'user':
      return <FaUser />;
    case 'child':
      return <FaChild />;
    case 'userTie':
      return <FaUserTie />;
    default:
      return <FaTicketAlt />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

const TicketFeatures = memo(({ features }: { features: string[] }) => (
  <div className={styles.tickets__features}>
    <ul className={styles.tickets__list}>
      {features.map((feature, index) => (
        <li key={index} className={styles.tickets__item}>
          <FaCheck className={styles.tickets__check} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
));

TicketFeatures.displayName = 'TicketFeatures';

interface TicketCardProps {
  ticket: Ticket;
  onBuyTicket: (ticket: Ticket) => void;
  canAnimate: boolean;
  gridInView: boolean;
}

const TicketCard = memo(({ ticket, onBuyTicket, canAnimate, gridInView }: TicketCardProps) => (
  <motion.div 
    className={`${styles.tickets__card} ${ticket.id === 3 ? styles['tickets__card--wide'] : ''}`}
    variants={cardVariants}
    whileHover={(canAnimate && gridInView) ? { y: -10, transition: { duration: 0.2 } } : {}}
  >
    <div className={styles.tickets__card_header}>
      {renderTicketIcon(getTicketIcon(ticket.type))}
      <h3 className={styles.tickets__type}>{ticket.type}</h3>
      <p className={styles.tickets__price}>{ticket.price} ₽</p>
      <p className={styles.tickets__description}>{ticket.description}</p>
    </div>
    
    <TicketFeatures features={ticket.features} />
    
    <button 
      className={styles.tickets__button}
      onClick={() => onBuyTicket(ticket)}
    >
      Купить билет
    </button>
  </motion.div>
));

TicketCard.displayName = 'TicketCard';

const TicketCards = () => {
  const { addToCart } = useCart();
  const { canAnimate } = useAnimation();
  
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const handleBuyTicket = useCallback((ticket: Ticket) => {
    console.log('TicketCards: Добавление билета в корзину:', ticket.type);
    const cartItem = {
      id: ticket.id,
      name: ticket.type,
      price: ticket.price,
      description: ticket.description,
      type: getTicketTypeForCart(ticket.type),
      iconType: 'ticket' as const,
      quantity: 1
    };
    
    console.log('TicketCards: Данные билета для корзины:', cartItem);
    addToCart(cartItem);
  }, [addToCart]);

  return (
    <section className={styles.tickets} id="tickets">
      <div className={styles.tickets__container}>
        <motion.div 
          ref={headerRef}
          className={styles.tickets__header}
          initial={{ opacity: 0, y: -20 }}
          animate={(canAnimate && headerInView) ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.tickets__title}>Билеты в зоопарк</h2>
          <p className={styles.tickets__description}>
            Выберите подходящий вариант билета для посещения нашего зоопарка. Дети до 3 лет могут посетить зоопарк бесплатно.
          </p>
        </motion.div>

        <motion.div 
          ref={gridRef}
          className={styles.tickets__grid}
          variants={containerVariants}
          initial="hidden"
          animate={(canAnimate && gridInView) ? "visible" : "hidden"}
        >
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onBuyTicket={handleBuyTicket}
              canAnimate={canAnimate}
              gridInView={gridInView}
            />
          ))}
        </motion.div>
        
        <div className={styles.tickets__note}>
          <p>Приобретая билеты онлайн, вы можете избежать очередей в кассе и получить скидку 5%.</p>
          <p>Билеты также можно приобрести в кассах зоопарка, которые работают ежедневно с 9:00 до 19:00.</p>
        </div>
      </div>
    </section>
  );
};

export default memo(TicketCards); 
'use client';

import { useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBus, FaSubway, FaCar, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import styles from './LocationMap.module.scss';
import { useAnimation } from '../../../context/AnimationContext';
import type { Map as LeafletMap } from 'leaflet';

// Импортируем иконки маркеров
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const transportOptions = [
  {
    id: 1,
    icon: <FaBus />,
    title: 'Автобус',
    routes: ['№42 - остановка "Зоопарк"', '№65 - остановка "Парк Культуры"', '№89 - остановка "Зоологический сад"']
  },
  {
    id: 2,
    icon: <FaSubway />,
    title: 'Метро',
    routes: ['Станция "Парк Культуры" - 10 мин. пешком', 'Станция "Октябрьская" - 15 мин. пешком']
  },
  {
    id: 3,
    icon: <FaCar />,
    title: 'Автомобиль',
    routes: ['Платная парковка на территории зоопарка', 'Городская парковка по ул. Зоологическая']
  }
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

const ContactInfo = memo(() => (
  <div className={styles.location__contacts}>
    <div className={styles.location__contact_item}>
      <FaPhone />
      <span>+7 (123) 456-78-90</span>
    </div>
    <div className={styles.location__contact_item}>
      <FaEnvelope />
      <span>info@zoopark.ru</span>
    </div>
    <div className={styles.location__contact_item}>
      <FaClock />
      <span>Ежедневно с 9:00 до 20:00</span>
    </div>
  </div>
));

ContactInfo.displayName = 'ContactInfo';

const TransportCard = memo(({ option }: { option: typeof transportOptions[number] }) => (
  <motion.div 
    key={option.id}
    className={`${styles.location__transport_card} ${option.id === 3 ? styles['location__transport_card--wide'] : ''}`}
    variants={itemVariants}
  >
    <div className={styles.location__transport_icon}>
      {option.icon}
    </div>
    <h4 className={styles.location__transport_option}>{option.title}</h4>
    <ul className={styles.location__transport_routes}>
      {option.routes.map((route, index) => (
        <li key={index}>{route}</li>
      ))}
    </ul>
  </motion.div>
));

TransportCard.displayName = 'TransportCard';

const LocationMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const mapInitialized = useRef<boolean>(false);
  const { canAnimate } = useAnimation();
  
  const headerRef = useRef(null);
  const transportRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const transportInView = useInView(transportRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!mapContainerRef.current || mapInitialized.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Исправляем иконки маркеров
      L.Icon.Default.mergeOptions({
        iconUrl: markerIcon.src,
        iconRetinaUrl: markerIcon2x.src,
        shadowUrl: markerShadow.src,
      });

      if (mapContainerRef.current) {
        const map = L.map(mapContainerRef.current).setView([55.7558, 37.6173], 13);
        mapInstanceRef.current = map;
        mapInitialized.current = true;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker([55.7558, 37.6173])
          .addTo(map)
          .bindPopup('Наш зоопарк');
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        mapInitialized.current = false;
      }
    };
  }, []);

  return (
    <section className={styles.location} id="location">
      <div className={styles.location__container}>
        <motion.div 
          ref={headerRef}
          className={styles.location__header}
          initial={{ opacity: 0, y: -20 }}
          animate={(canAnimate && headerInView) ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.location__title}>Как добраться</h2>
          <p className={styles.location__description}>
            Наш зоопарк расположен в самом центре города и имеет удобные транспортные развязки. 
            Вы можете добраться к нам любым удобным для вас способом.
          </p>
        </motion.div>

        <div className={styles.location__content}>
          <div className={styles.location__map_container}>
            <div 
              ref={mapContainerRef}
              className={styles.location__map}
            ></div>
            
            <div className={styles.location__address}>
              <h3>Наш адрес</h3>
              <p>г. Москва, ул. Зоологическая, д. 13</p>
              <ContactInfo />
            </div>
          </div>
          
          <motion.div 
            ref={transportRef}
            className={styles.location__transport}
            variants={containerVariants}
            initial="hidden"
            animate={(canAnimate && transportInView) ? "visible" : "hidden"}
            viewport={{ once: true }}
          >
            <h3 className={styles.location__transport_title}>Транспорт</h3>
            
            <div className={styles.location__transport_grid}>
              {transportOptions.map((option) => (
                <TransportCard key={option.id} option={option} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(LocationMap); 
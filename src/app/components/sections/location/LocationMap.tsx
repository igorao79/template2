'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBus, FaSubway, FaCar, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import styles from './LocationMap.module.scss';

// Определяем тип для Leaflet, который будет доступен глобально
declare global {
  interface Window {
    L: any;
  }
}

// Расширяем HTMLDivElement для поддержки Leaflet
interface LeafletElement extends HTMLDivElement {
  _leaflet_id?: number;
}

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
];

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Проверяем, что карта еще не инициализирована
    if (mapInitialized.current) {
      console.log('Map already initialized, skipping');
      return;
    }
    
    // Добавляем скрипт OpenStreetMap на страницу
    const scriptId = 'leaflet-script';
    const linkId = 'leaflet-css';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    let link = document.getElementById(linkId) as HTMLLinkElement;
    
    // Проверяем, есть ли уже скрипт и стили на странице
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.async = true;
      document.body.appendChild(script);
    }
    
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
    
    // Инициализируем карту после загрузки скрипта
    const initMap = () => {
      if (mapRef.current && window.L && !mapInitialized.current) {
        // Координаты зоопарка (пример, замените на реальные)
        const zooLatitude = 55.7558;
        const zooLongitude = 37.6173;
        
        // Создаем карту
        const map = window.L.map(mapRef.current).setView([zooLatitude, zooLongitude], 15);
        
        // Добавляем тайлы OpenStreetMap
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Добавляем маркер зоопарка
        const zooMarker = window.L.marker([zooLatitude, zooLongitude]).addTo(map);
        zooMarker.bindPopup("<b>Наш зоопарк</b><br>Добро пожаловать!").openPopup();
        
        // Помечаем карту как инициализированную
        mapInitialized.current = true;
      }
    };
    
    if (window.L) {
      // Если Leaflet уже загружен, сразу инициализируем карту
      initMap();
    } else if (script) {
      // Иначе ждем загрузки скрипта
      script.onload = initMap;
    }
    
    // Не удаляем скрипты и стили при размонтировании, 
    // так как они могут использоваться повторно
    return () => {};
  }, []);

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
    <section className={styles.location} id="location">
      <div className={styles.location__container}>
        <motion.div 
          className={styles.location__header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            <div ref={mapRef} className={styles.location__map}></div>
            
            <div className={styles.location__address}>
              <h3>Наш адрес</h3>
              <p>г. Москва, ул. Зоологическая, д. 13</p>
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
            </div>
          </div>
          
          <motion.div 
            className={styles.location__transport}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className={styles.location__transport_title}>Транспорт</h3>
            
            <div className={styles.location__transport_grid}>
              {transportOptions.map((option) => (
                <motion.div 
                  key={option.id}
                  className={styles.location__transport_card}
                  variants={itemVariants}
                >
                  <div className={styles.location__transport_icon}>
                    {option.icon}
                  </div>
                  <h4 className={styles.location__transport_name}>{option.title}</h4>
                  <ul className={styles.location__transport_list}>
                    {option.routes.map((route, index) => (
                      <li key={index} className={styles.location__transport_item}>
                        {route}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap; 
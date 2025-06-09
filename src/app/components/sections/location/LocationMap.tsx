'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBus, FaSubway, FaCar, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import styles from './LocationMap.module.scss';

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
            <div className={styles.location__map}>
              <Image 
                src="/images/zoo-map.webp"
                alt="Карта местоположения зоопарка"
                width={1200}
                height={800}
                className={styles.location__map_image}
                quality={90}
              />
              <div className={styles.location__map_marker}>
                <FaMapMarkerAlt />
              </div>
            </div>
            
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
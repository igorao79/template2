'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <motion.div 
          className={styles.footer__grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          {/* О нас */}
          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Зоопарк</h3>
            <p className={styles['footer__column-text']}>
              Почувствуйте магию дикой природы в уникальной и интерактивной среде. 
              Наша миссия - обучать, сохранять и вдохновлять.
            </p>
            <div className={styles.footer__social}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className={styles['footer__social-link']} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className={styles['footer__social-link']} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className={styles['footer__social-link']} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className={styles['footer__social-link']} />
              </a>
            </div>
          </motion.div>

          {/* Быстрые ссылки */}
          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Разделы</h3>
            <ul className={styles['footer__links-list']}>
              <li>
                <Link href="/" className={styles['footer__links-item']}>
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/animals" className={styles['footer__links-item']}>
                  Животные
                </Link>
              </li>
              <li>
                <Link href="/tickets" className={styles['footer__links-item']}>
                  Билеты
                </Link>
              </li>
              <li>
                <Link href="/events" className={styles['footer__links-item']}>
                  События
                </Link>
              </li>
              <li>
                <Link href="/location" className={styles['footer__links-item']}>
                  Как добраться
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Часы работы */}
          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Часы работы</h3>
            <ul>
              <li className={styles['footer__hours-item']}>
                <span>Понедельник - Пятница:</span>
                <span>9:00 - 18:00</span>
              </li>
              <li className={styles['footer__hours-item']}>
                <span>Суббота:</span>
                <span>9:00 - 19:00</span>
              </li>
              <li className={styles['footer__hours-item']}>
                <span>Воскресенье:</span>
                <span>10:00 - 19:00</span>
              </li>
              <li className={styles['footer__hours-note']}>
                <span>* Последний вход за 1 час до закрытия</span>
              </li>
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Контакты</h3>
            <ul>
              <li className={styles['footer__contact-item']}>
                <FaMapMarkerAlt className={styles['footer__contact-item-icon']} />
                <span>ул. Зоологическая, 123, г. Москва, 123456</span>
              </li>
              <li className={styles['footer__contact-item']}>
                <FaPhone className={styles['footer__contact-item-icon']} />
                <span>+7 (123) 456-7890</span>
              </li>
              <li className={styles['footer__contact-item']}>
                <FaEnvelope className={styles['footer__contact-item-icon']} />
                <span>info@zoopark.ru</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.footer__copyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; {currentYear} Зоопарк. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 
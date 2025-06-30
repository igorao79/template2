'use client';

import Link from 'next/link';
import { memo } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Footer.module.scss';

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
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
} as const;

const socialLinks = [
  { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://youtube.com', icon: FaYoutube, label: 'YouTube' },
] as const;

const quickLinks = [
  { href: '/', label: 'Главная' },
  { href: '/animals', label: 'Животные' },
  { href: '/tickets', label: 'Билеты' },
  { href: '/events', label: 'События' },
  { href: '/location', label: 'Как добраться' },
] as const;

const workingHours = [
  { days: 'Понедельник - Пятница', hours: '9:00 - 18:00' },
  { days: 'Суббота', hours: '9:00 - 19:00' },
  { days: 'Воскресенье', hours: '10:00 - 19:00' },
] as const;

const contactInfo = [
  { icon: FaMapMarkerAlt, text: 'ул. Зоологическая, 123, г. Москва, 123456' },
  { icon: FaPhone, text: '+7 (123) 456-7890' },
  { icon: FaEnvelope, text: 'info@zoopark.ru' },
] as const;

const SocialLinks = memo(() => (
  <div className={styles.footer__social}>
    {socialLinks.map(({ href, icon: Icon, label }) => (
      <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon className={styles['footer__social-link']} />
      </a>
    ))}
  </div>
));

SocialLinks.displayName = 'SocialLinks';

const QuickLinks = memo(() => (
  <ul className={styles['footer__links-list']}>
    {quickLinks.map(({ href, label }) => (
      <li key={href}>
        <Link href={href} className={styles['footer__links-item']}>
          {label}
        </Link>
      </li>
    ))}
  </ul>
));

QuickLinks.displayName = 'QuickLinks';

const WorkingHours = memo(() => (
  <ul>
    {workingHours.map(({ days, hours }) => (
      <li key={days} className={styles['footer__hours-item']}>
        <span>{days}:</span>
        <span>{hours}</span>
      </li>
    ))}
    <li className={styles['footer__hours-note']}>
      <span>* Последний вход за 1 час до закрытия</span>
    </li>
  </ul>
));

WorkingHours.displayName = 'WorkingHours';

const ContactInfo = memo(() => (
  <ul>
    {contactInfo.map(({ icon: Icon, text }) => (
      <li key={text} className={styles['footer__contact-item']}>
        <Icon className={styles['footer__contact-item-icon']} />
        <span>{text}</span>
      </li>
    ))}
  </ul>
));

ContactInfo.displayName = 'ContactInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Зоопарк</h3>
            <p className={styles['footer__column-text']}>
              Почувствуйте магию дикой природы в уникальной и интерактивной среде. 
              Наша миссия - обучать, сохранять и вдохновлять.
            </p>
            <SocialLinks />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Разделы</h3>
            <QuickLinks />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Часы работы</h3>
            <WorkingHours />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className={styles['footer__column-title']}>Контакты</h3>
            <ContactInfo />
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

export default memo(Footer); 
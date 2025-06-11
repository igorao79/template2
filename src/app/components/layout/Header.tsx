'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();
  const pathname = usePathname();
  const { openCart, totalQuantity } = useCart();

  useEffect(() => {
    // Установка активной секции на основе текущего URL при загрузке страницы
    const path = pathname === '/' ? 'home' : pathname.replace('/', '');
    setActiveSection(path);

    // Set initial scroll state to avoid header flash on page reload
    const initialScroll = window.scrollY > 50;
    setIsScrolled(initialScroll);

    const handleScroll = () => {
      // Обновляем состояние скролла для изменения фона хедера
      setIsScrolled(window.scrollY > 50);
      
      // Определяем активную секцию на основе скролла
      const sections = ['animals', 'tickets', 'events', 'location'];
      
      if (window.scrollY < 100) {
        setActiveSection('home');
        // Обновляем URL без перезагрузки
        if (pathname !== '/') {
          window.history.replaceState({}, '', '/');
        }
        return;
      }
      
      // Проходим по секциям снизу вверх, чтобы найти ту, которая сейчас видна
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            // Обновляем URL без перезагрузки
            if (pathname !== `/${section}`) {
              window.history.replaceState({}, '', `/${section}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    if (sectionId === 'home') {
      // Плавно скроллим наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Обновляем URL без перезагрузки
      window.history.replaceState({}, '', '/');
      setActiveSection('home');
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        // Плавно скроллим к секции
        section.scrollIntoView({ behavior: 'smooth' });
        // Обновляем URL без перезагрузки
        window.history.replaceState({}, '', `/${sectionId}`);
        setActiveSection(sectionId);
      }
    }
    
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '#', id: 'home', label: 'Главная' },
    { href: '#animals', id: 'animals', label: 'Животные' },
    { href: '#tickets', id: 'tickets', label: 'Билеты' },
    { href: '#events', id: 'events', label: 'События' },
    { href: '#location', id: 'location', label: 'Как добраться' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : styles['header--transparent']}`}
    >
      <div className={styles.header__container}>
        <a 
          href="#" 
          onClick={(e) => scrollToSection(e, 'home')}
          className={styles.header__logo}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Зоопарк
            <span className={styles['header__logo-accent']}>.</span>
          </motion.div>
        </a>

        {/* Desktop Navigation */}
        <motion.nav 
          className={styles.header__nav}
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <ul className={styles['header__nav-list']}>
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={itemVariants}>
                <a 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`
                    ${styles['header__nav-item']} 
                    ${isScrolled 
                      ? styles['header__nav-item--scrolled'] 
                      : styles['header__nav-item--transparent']
                    }
                    ${activeSection === link.id ? styles['header__nav-item--active'] : ''}
                  `}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Mobile Controls */}
        <div className={styles.header__mobile_controls}>
          {/* Cart Button */}
          <motion.button 
            className={styles.header__cart}
            onClick={openCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FaShoppingCart />
            {totalQuantity > 0 && (
              <span className={styles.header__cart_badge}>{totalQuantity}</span>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <button 
            className={styles['header__mobile-button']}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className={styles['header__mobile-menu']}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className={styles['header__mobile-list']}>
              {navLinks.map((link) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <a 
                    href={link.href} 
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`
                      ${styles['header__mobile-item']}
                      ${activeSection === link.id ? styles['header__mobile-item--active'] : ''}
                    `}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <button 
                  className={styles.header__mobile_cart_btn}
                  onClick={() => {
                    openCart();
                    setMobileMenuOpen(false);
                  }}
                >
                  <FaShoppingCart className={styles.header__mobile_cart_icon} />
                  Корзина
                  {totalQuantity > 0 && (
                    <span className={styles.header__mobile_cart_badge}>{totalQuantity}</span>
                  )}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 
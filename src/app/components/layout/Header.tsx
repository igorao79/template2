'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useCart } from '@/app/context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { openCart, totalQuantity } = useCart();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    
    setLastScrollY(currentScrollY);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
    }
    
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '#home', id: 'home', label: 'Главная' },
    { href: '#animals', id: 'animals', label: 'Животные' },
    { href: '#tickets', id: 'tickets', label: 'Билеты' },
    { href: '#events', id: 'events', label: 'События' },
    { href: '#location', id: 'location', label: 'Как добраться' },
  ];

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : styles['header--transparent']}`}
    >
      <div className={styles.header__container}>
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')}
          className={styles.header__logo}
        >
          Зоопарк
          <span className={styles['header__logo-accent']}>.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.header__nav}>
          <ul className={styles['header__nav-list']}>
            {navLinks.map((link) => (
              <li key={link.href}>
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
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Controls */}
        <div className={styles.header__mobile_controls}>
          {/* Cart Button */}
          <button 
            className={styles.header__cart}
            onClick={openCart}
          >
            <FaShoppingCart />
            {totalQuantity > 0 && (
              <span className={styles.header__cart_badge}>{totalQuantity}</span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className={styles['header__mobile-button']}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={styles['header__mobile-menu']}>
            <ul className={styles['header__mobile-list']}>
              {navLinks.map((link) => (
                <li key={link.href}>
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
                </li>
              ))}
              <li>
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
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
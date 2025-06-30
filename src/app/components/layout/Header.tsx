'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useCart } from '@/app/context/CartContext';
import { useNavigation } from '@/app/hooks/useNavigation';

const navLinks = [
  { href: '#home', id: 'home', label: 'Главная' },
  { href: '#animals', id: 'animals', label: 'Животные' },
  { href: '#tickets', id: 'tickets', label: 'Билеты' },
  { href: '#events', id: 'events', label: 'События' },
  { href: '#location', id: 'location', label: 'Как добраться' },
] as const;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, openCart } = useCart();
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { activeSection, handleNavigation } = useNavigation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : styles['header--transparent']}`}
    >
      <div className={styles.header__container}>
        <a 
          href="#home" 
          onClick={(e) => handleNavigation(e, 'home')}
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
                  onClick={(e) => {
                    handleNavigation(e, link.id);
                    setMobileMenuOpen(false);
                  }}
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
            aria-label="Открыть корзину"
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
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
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
                    onClick={(e) => {
                      handleNavigation(e, link.id);
                      setMobileMenuOpen(false);
                    }}
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
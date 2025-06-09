'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Установка активной секции на основе текущего URL при загрузке страницы
    const path = pathname === '/' ? 'home' : pathname.replace('/', '');
    setActiveSection(path);

    // Set initial scroll state to avoid header flash on page reload
    const initialScroll = window.scrollY > 50;
    setIsScrolled(initialScroll);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Определяем активную секцию на основе скролла
      const sections = ['animals', 'tickets', 'events', 'location'];
      
      if (window.scrollY < 100) {
        setActiveSection('home');
        updateUrl('');
        return;
      }
      
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            updateUrl(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Функция для обновления URL без перезагрузки страницы
  const updateUrl = (section: string) => {
    const newPath = section === 'home' || section === '' ? '/' : `/${section}`;
    window.history.replaceState({}, '', newPath);
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

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      updateUrl('');
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        updateUrl(sectionId);
      }
    }
    
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
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
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 
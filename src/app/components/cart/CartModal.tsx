'use client';

import { useReducer, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaTimes, 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheck, 
  FaCreditCard, 
  FaPaypal, 
  FaApple,
  FaTrash,
  FaCalendarAlt,
  FaEnvelope,
  FaMoneyBillWave,
  FaUser,
  FaChild,
  FaUserTie,
  FaTicketAlt
} from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext';
import styles from './CartModal.module.scss';
import { DotLottiePlayer } from '@dotlottie/react-player';
import ModalPortal from '../ui/ModalPortal';

// Типы для формы
type FormState = {
  email: string;
  emailError: string;
  selectedDate: Date | null;
  dateError: string;
  paymentMethod: 'card' | 'paypal' | 'applepay' | null;
  paymentError: string;
  disabledDates: Date[];
};

// Типы для actions
type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_EMAIL_ERROR'; payload: string }
  | { type: 'SET_SELECTED_DATE'; payload: Date }
  | { type: 'SET_DATE_ERROR'; payload: string }
  | { type: 'SET_PAYMENT_METHOD'; payload: 'card' | 'paypal' | 'applepay' }
  | { type: 'SET_PAYMENT_ERROR'; payload: string }
  | { type: 'SET_DISABLED_DATES'; payload: Date[] }
  | { type: 'RESET_FORM' }
  | { type: 'INITIALIZE_FORM'; payload: Partial<FormState> };

// Начальное состояние
const initialState: FormState = {
  email: '',
  emailError: '',
  selectedDate: null,
  dateError: '',
  paymentMethod: null,
  paymentError: '',
  disabledDates: [],
};

// Редьюсер для формы
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, emailError: '' };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload, dateError: '' };
    case 'SET_DATE_ERROR':
      return { ...state, dateError: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload, paymentError: '' };
    case 'SET_PAYMENT_ERROR':
      return { ...state, paymentError: action.payload };
    case 'SET_DISABLED_DATES':
      return { ...state, disabledDates: action.payload };
    case 'RESET_FORM':
      return initialState;
    case 'INITIALIZE_FORM':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const CartModal = () => {
  const {
    cartItems,
    orderInfo,
    isCartOpen,
    checkoutStep,
    removeFromCart,
    updateQuantity,
    closeCart,
    setOrderInfo,
    nextStep,
    prevStep,
    resetCheckout,
    totalPrice,
    clearCart,
  } = useCart();

  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Инициализация формы из orderInfo
  useEffect(() => {
    if (orderInfo) {
      dispatch({
        type: 'INITIALIZE_FORM',
        payload: {
          email: orderInfo.email || '',
          selectedDate: orderInfo.date,
          paymentMethod: orderInfo.paymentMethod,
        },
      });
    }
  }, [orderInfo]);

  // Отладка состояния корзины
  useEffect(() => {
    console.log('CartModal: Количество элементов в корзине:', cartItems.length);
    console.log('CartModal: Общая сумма:', totalPrice);
  }, [cartItems, totalPrice, isCartOpen]);

  // Генерация недоступных дат
  useEffect(() => {
    // Генерируем даты больше чем через 2 недели
    const today = new Date();
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);

    const disabledDatesArray: Date[] = [];
    const loopDate = new Date(twoWeeksLater);
    
    // Добавляем 30 дней после допустимого периода
    for (let i = 0; i < 30; i++) {
      loopDate.setDate(loopDate.getDate() + 1);
      disabledDatesArray.push(new Date(loopDate));
    }
    
    dispatch({ type: 'SET_DISABLED_DATES', payload: disabledDatesArray });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  };

  const handleDateSelect = (date: Date) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  };

  const handlePaymentMethodSelect = (method: 'card' | 'paypal' | 'applepay') => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  };

  const handleNextStep = () => {
    if (checkoutStep === 1) {
      if (cartItems.length === 0) {
        return;
      }
      nextStep();
    } else if (checkoutStep === 2) {
      let hasError = false;
      
      // Валидация email
      if (!formState.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
        dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Пожалуйста, введите корректный email' });
        hasError = true;
      }
      
      // Валидация даты
      if (!formState.selectedDate) {
        dispatch({ type: 'SET_DATE_ERROR', payload: 'Пожалуйста, выберите дату посещения' });
        hasError = true;
      }
      
      // Валидация способа оплаты
      if (!formState.paymentMethod) {
        dispatch({ type: 'SET_PAYMENT_ERROR', payload: 'Пожалуйста, выберите способ оплаты' });
        hasError = true;
      }
      
      if (hasError) return;
      
      // Сохраняем данные
      setOrderInfo({
        email: formState.email,
        date: formState.selectedDate,
        paymentMethod: formState.paymentMethod,
      });
      
      // Имитация процесса оплаты
      nextStep();
    }
  };

  const handleComplete = () => {
    // Сбросить корзину и закрыть модальное окно
    clearCart();
    setTimeout(() => {
      closeCart();
      resetCheckout();
      dispatch({ type: 'RESET_FORM' });
    }, 3000);
  };

  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    
    // Создаем даты на ближайшие 14 дней
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      weekday: 'short'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Form fields staggered animation
  const formVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const formItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Enhanced slide animation for steps with dramatic swipe effect
  const slideVariants = {
    enter: (direction: number) => {
      const isMobile = windowWidth <= 768;
      return {
        x: isMobile ? 0 : direction > 0 ? '100%' : '-100%',
        opacity: 0.2,
        scale: 0.95,
        rotateY: isMobile ? 0 : direction > 0 ? '7deg' : '-7deg',
        transition: { 
          type: "tween", 
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        type: "tween", 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction: number) => {
      const isMobile = windowWidth <= 768;
      return {
        x: isMobile ? 0 : direction < 0 ? '100%' : '-100%',
        opacity: 0.2,
        scale: 0.95,
        rotateY: isMobile ? 0 : direction < 0 ? '7deg' : '-7deg',
        transition: { 
          type: "tween", 
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }
  };

  // Определяет направление анимации перехода (слева направо или справа налево)
  const getDirection = () => {
    // Если нажали "Назад", то анимация слева направо (предыдущий шаг справа, текущий шаг слева)
    if (checkoutStep < prevStepRef.current) {
      return -1;
    }
    // Если нажали "Вперед", то анимация справа налево (предыдущий шаг слева, текущий шаг справа)
    return 1;
  };

  // Отслеживаем изменение шага для определения направления анимации
  const prevStepRef = useRef(checkoutStep);
  useEffect(() => {
    prevStepRef.current = checkoutStep;
  }, [checkoutStep]);

  // Function to render the appropriate icon based on iconType
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

  // Отрисовка первого шага корзины (список товаров)
  const renderCartStep = () => (
    <motion.div 
      className={styles.cart__step1}
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      custom={getDirection()}
      key="cart-step"
    >
      {cartItems && cartItems.length > 0 ? (
        <div className={styles.cart__items_list}>
          {cartItems.map((item) => (
            <div key={item.ticket.id} className={styles.cart__product_row}>
              <div className={styles.cart__product_icon}>
                {renderTicketIcon(item.ticket.iconType)}
              </div>
              <div className={styles.cart__product_info}>
                <div className={styles.cart__product_name}>
                  {item.ticket.name}
                </div>
                <div className={styles.cart__product_price}>
                  {formatPrice(item.ticket.price)} / шт.
                </div>
              </div>
              <div className={styles.cart__counter}>
                <button 
                  className={styles.cart__counter_btn}
                  onClick={() => updateQuantity(item.ticket.id, item.quantity - 1)}
                  aria-label="Уменьшить количество"
                >
                  -
                </button>
                <div className={styles.cart__counter_value}>{item.quantity}</div>
                <button 
                  className={styles.cart__counter_btn}
                  onClick={() => updateQuantity(item.ticket.id, item.quantity + 1)}
                  aria-label="Увеличить количество"
                >
                  +
                </button>
              </div>
              <div className={styles.cart__product_total}>
                {formatPrice(item.ticket.price * item.quantity)}
              </div>
              <button 
                className={styles.cart__product_remove}
                onClick={() => removeFromCart(item.ticket.id)}
                aria-label="Удалить из корзины"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.cart__empty}>
          <FaShoppingCart className={styles.cart__empty_icon} />
          <p>Ваша корзина пуста</p>
          <button 
            className={styles.cart__empty_btn}
            onClick={closeCart}
          >
            Продолжить покупки
          </button>
        </div>
      )}
    </motion.div>
  );

  // Отрисовка второго шага (оформление заказа)
  const renderCheckoutStep = () => (
    <motion.div 
      className={styles.cart__step2}
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      custom={getDirection()}
      key="checkout-step"
    >
      <motion.div
        className={styles.cart__form_container}
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <motion.div className={styles.cart__form_group} variants={formItemVariants}>
          <label htmlFor="email" className={styles.cart__form_label}>
            <FaEnvelope className={styles.cart__form_icon} /> Email для получения билетов
          </label>
          <input
            id="email"
            type="email"
            className={`${styles.cart__form_input} ${formState.emailError ? styles.cart__form_input_error : ''}`}
            placeholder="example@example.com"
            value={formState.email}
            onChange={handleEmailChange}
          />
          {formState.emailError && <p className={styles.cart__error_message}>{formState.emailError}</p>}
        </motion.div>

        <motion.div className={styles.cart__form_group} variants={formItemVariants}>
          <label className={styles.cart__form_label}>
            <FaCalendarAlt className={styles.cart__form_icon} /> Дата посещения (в течение двух недель)
          </label>
          <div className={styles.cart__date_picker}>
            {getAvailableDates().map((date) => (
              <button
                key={date.toISOString()}
                type="button"
                className={`${styles.cart__date_option} ${
                  formState.selectedDate && date.toDateString() === formState.selectedDate.toDateString()
                    ? styles.cart__date_option_selected
                    : ''
                }`}
                onClick={() => handleDateSelect(date)}
              >
                {formatDate(date)}
              </button>
            ))}
            
            {formState.disabledDates.slice(0, 5).map((date) => (
              <button
                key={date.toISOString()}
                type="button"
                className={`${styles.cart__date_option} ${styles.cart__date_option_disabled}`}
                disabled
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
          {formState.dateError && <p className={styles.cart__error_message}>{formState.dateError}</p>}
        </motion.div>

        <motion.div className={styles.cart__form_group} variants={formItemVariants}>
          <label className={styles.cart__form_label}>
            <FaMoneyBillWave className={styles.cart__form_icon} /> Способ оплаты
          </label>
          <div className={styles.cart__payment_methods}>
            <button
              type="button"
              className={`${styles.cart__payment_option} ${
                formState.paymentMethod === 'card' ? styles.cart__payment_option_selected : ''
              }`}
              onClick={() => handlePaymentMethodSelect('card')}
            >
              <FaCreditCard className={styles.cart__payment_icon} />
              <span>Банковская карта</span>
            </button>
            
            <button
              type="button"
              className={`${styles.cart__payment_option} ${
                formState.paymentMethod === 'paypal' ? styles.cart__payment_option_selected : ''
              }`}
              onClick={() => handlePaymentMethodSelect('paypal')}
            >
              <FaPaypal className={styles.cart__payment_icon} />
              <span>PayPal</span>
            </button>
            
            <button
              type="button"
              className={`${styles.cart__payment_option} ${
                formState.paymentMethod === 'applepay' ? styles.cart__payment_option_selected : ''
              }`}
              onClick={() => handlePaymentMethodSelect('applepay')}
            >
              <FaApple className={styles.cart__payment_icon} />
              <span>Apple Pay</span>
            </button>
          </div>
          {formState.paymentError && <p className={styles.cart__error_message}>{formState.paymentError}</p>}
        </motion.div>
      </motion.div>
    </motion.div>
  );

  // Отрисовка третьего шага (успешное оформление)
  const renderSuccessStep = () => (
    <motion.div 
      className={styles.cart__step3}
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      custom={getDirection()}
      key="success-step"
    >
      <div className={styles.cart__success_animation}>
        <DotLottiePlayer
          src="/monkey.lottie"
          autoplay
          loop
        />
      </div>
      <h3 className={styles.cart__success_title}>Спасибо за покупку!</h3>
      <p className={styles.cart__success_message}>
        Ваши билеты направлены на указанную почту <strong>{formState.email}</strong>. Ждем вас!
      </p>
      <button 
        className={styles.cart__success_btn}
        onClick={handleComplete}
      >
        <FaCheck />
        Готово
      </button>
    </motion.div>
  );

  // Основной рендер модального окна
  return (
    <ModalPortal isOpen={isCartOpen} onClose={closeCart}>
      <div className={styles.cart__modal_content}>
        <div className={styles.cart__header}>
          {checkoutStep === 1 && (
            <>
              <FaShoppingCart className={styles.cart__header_icon} />
              <h2 className={styles.cart__title}>Корзина</h2>
            </>
          )}
          {checkoutStep === 2 && (
            <>
              <FaCalendarAlt className={styles.cart__header_icon} />
              <h2 className={styles.cart__title}>Оформление заказа</h2>
            </>
          )}
          {checkoutStep === 3 && (
            <>
              <FaCheck className={styles.cart__header_icon} />
              <h2 className={styles.cart__title}>Заказ оформлен</h2>
            </>
          )}
          
          <div className={styles.cart__steps}>
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`${styles.cart__step_indicator} ${
                  checkoutStep >= step ? styles.cart__step_indicator_active : ''
                }`}
              >
                <span className={styles.cart__step_number}>{step}</span>
                <span className={styles.cart__step_name}>
                  {step === 1 ? 'Корзина' : 
                   step === 2 ? 'Оформление' : 
                   'Готово'}
                </span>
              </div>
            ))}
          </div>
          
          <button 
            className={styles.cart__close}
            onClick={closeCart}
          >
            <FaTimes />
          </button>
        </div>
        
        <div className={`${styles.cart__content} ${checkoutStep === 3 ? styles.cart__content_success : ''}`}>
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={getDirection()}
          >
            {checkoutStep === 1 && renderCartStep()}
            {checkoutStep === 2 && renderCheckoutStep()}
            {checkoutStep === 3 && renderSuccessStep()}
          </AnimatePresence>
        </div>
        
        <div className={styles.cart__footer}>
          {checkoutStep < 3 && (
            <>
              {checkoutStep > 1 && (
                <button 
                  className={styles.cart__back_btn}
                  onClick={prevStep}
                >
                  <FaArrowLeft className={styles.cart__btn_icon} />
                  Назад
                </button>
              )}
              <button 
                className={styles.cart__next_btn}
                onClick={handleNextStep}
                disabled={cartItems.length === 0 && checkoutStep === 1}
              >
                {checkoutStep === 1 ? 'Оформить заказ' : 'Оплатить'}
                <FaArrowRight className={styles.cart__btn_icon} />
              </button>
            </>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default CartModal; 
import { FaEnvelope, FaCalendarAlt, FaMoneyBillWave, FaCreditCard, FaPaypal, FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './CartModal.module.scss';

type CartFormProps = {
  formState: {
    email: string;
    emailError: string;
    selectedDate: Date | null;
    dateError: string;
    paymentMethod: 'card' | 'paypal' | 'applepay' | null;
    paymentError: string;
  };
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateSelect: (date: Date) => void;
  onPaymentMethodSelect: (method: 'card' | 'paypal' | 'applepay') => void;
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CartForm = ({
  formState,
  onEmailChange,
  onDateSelect,
  onPaymentMethodSelect
}: CartFormProps) => {
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
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
    });
  };

  return (
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
          onChange={onEmailChange}
        />
        {formState.emailError && <p className={styles.cart__error_message}>{formState.emailError}</p>}
      </motion.div>

      <motion.div className={styles.cart__form_group} variants={formItemVariants}>
        <label className={styles.cart__form_label}>
          <FaCalendarAlt className={styles.cart__form_icon} /> Дата посещения
        </label>
        <div className={styles.cart__date_grid}>
          {getAvailableDates().map((date) => (
            <button
              key={date.toISOString()}
              className={`${styles.cart__date_button} ${
                formState.selectedDate?.toDateString() === date.toDateString()
                  ? styles.cart__date_button_selected
                  : ''
              }`}
              onClick={() => onDateSelect(date)}
              type="button"
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
        <div className={styles.cart__payment_grid}>
          <button
            className={`${styles.cart__payment_button} ${
              formState.paymentMethod === 'card' ? styles.cart__payment_button_selected : ''
            }`}
            onClick={() => onPaymentMethodSelect('card')}
            type="button"
          >
            <FaCreditCard /> Банковская карта
          </button>
          <button
            className={`${styles.cart__payment_button} ${
              formState.paymentMethod === 'paypal' ? styles.cart__payment_button_selected : ''
            }`}
            onClick={() => onPaymentMethodSelect('paypal')}
            type="button"
          >
            <FaPaypal /> PayPal
          </button>
          <button
            className={`${styles.cart__payment_button} ${
              formState.paymentMethod === 'applepay' ? styles.cart__payment_button_selected : ''
            }`}
            onClick={() => onPaymentMethodSelect('applepay')}
            type="button"
          >
            <FaApple /> Apple Pay
          </button>
        </div>
        {formState.paymentError && <p className={styles.cart__error_message}>{formState.paymentError}</p>}
      </motion.div>
    </motion.div>
  );
};

export default CartForm; 
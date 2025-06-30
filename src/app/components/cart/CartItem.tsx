import { FaTrash, FaTicketAlt } from 'react-icons/fa';
import styles from './CartModal.module.scss';

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    iconType: 'ticket' | 'event';
    quantity: number;
  };
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  formatPrice: (price: number) => string;
};

const renderTicketIcon = (iconType: 'ticket' | 'event') => {
  switch (iconType) {
    case 'ticket':
      return <FaTicketAlt />;
    case 'event':
      return <FaTicketAlt />;
    default:
      return <FaTicketAlt />;
  }
};

const CartItem = ({ item, onRemove, onUpdateQuantity, formatPrice }: CartItemProps) => {
  return (
    <div className={styles.cart__product_row}>
      <div className={styles.cart__product_icon}>
        {renderTicketIcon(item.iconType)}
      </div>
      <div className={styles.cart__product_info}>
        <div className={styles.cart__product_name}>
          {item.name}
        </div>
        <div className={styles.cart__product_price}>
          {formatPrice(item.price)} / шт.
        </div>
      </div>
      <div className={styles.cart__counter}>
        <button 
          className={styles.cart__counter_btn}
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          aria-label="Уменьшить количество"
        >
          -
        </button>
        <div className={styles.cart__counter_value}>{item.quantity}</div>
        <button 
          className={styles.cart__counter_btn}
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>
      <div className={styles.cart__product_total}>
        {formatPrice(item.price * item.quantity)}
      </div>
      <button 
        className={styles.cart__product_remove}
        onClick={() => onRemove(item.id)}
        aria-label="Удалить из корзины"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem; 
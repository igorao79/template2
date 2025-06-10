'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Ticket = {
  id: number;
  name: string;
  price: number;
  description: string;
  type: 'adult' | 'child' | 'family' | 'senior';
  icon: React.ReactNode;
};

export type CartItem = {
  ticket: Ticket;
  quantity: number;
};

export type OrderInfo = {
  email: string;
  date: Date | null;
  paymentMethod: 'card' | 'paypal' | 'applepay' | null;
};

type CartContextType = {
  cartItems: CartItem[];
  orderInfo: OrderInfo;
  isCartOpen: boolean;
  checkoutStep: number;
  addToCart: (ticket: Ticket, quantity: number) => void;
  removeFromCart: (ticketId: number) => void;
  updateQuantity: (ticketId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setOrderInfo: (info: Partial<OrderInfo>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetCheckout: () => void;
  totalQuantity: number;
  totalPrice: number;
};

const defaultOrderInfo: OrderInfo = {
  email: '',
  date: null,
  paymentMethod: null,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfoState] = useState<OrderInfo>(defaultOrderInfo);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Загружаем корзину из localStorage только один раз при инициализации
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('zoo-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Проверяем, что это массив и в нем есть элементы
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            console.log('Загружены элементы корзины:', parsedCart.length);
            setCartItems(parsedCart);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
        localStorage.removeItem('zoo-cart'); // Сбрасываем поврежденные данные
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  // Сохраняем корзину при изменении, но только после инициализации
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('zoo-cart', JSON.stringify(cartItems));
      console.log('Сохранено элементов в корзине:', cartItems.length);
    }
  }, [cartItems, isInitialized]);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.ticket.price * item.quantity,
    0
  );

  const addToCart = (ticket: Ticket, quantity: number) => {
    console.log('Добавление в корзину:', ticket.name, quantity);
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.ticket.id === ticket.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ticket, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (ticketId: number) => {
    console.log('Удаление из корзины ID:', ticketId);
    setCartItems((prevItems) => prevItems.filter((item) => item.ticket.id !== ticketId));
  };

  const updateQuantity = (ticketId: number, quantity: number) => {
    console.log('Обновление количества ID:', ticketId, 'Новое количество:', quantity);
    if (quantity <= 0) {
      removeFromCart(ticketId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ticket.id === ticketId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('Очистка корзины');
    setCartItems([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
    console.log('Открытие корзины, элементов:', cartItems.length);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      if (checkoutStep > 1) {
        resetCheckout();
      }
    }, 300);
  };

  const setOrderInfo = (info: Partial<OrderInfo>) => {
    setOrderInfoState((prev) => ({ ...prev, ...info }));
  };

  const nextStep = () => {
    setCheckoutStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCheckoutStep((prev) => Math.max(prev - 1, 1));
  };

  const resetCheckout = () => {
    setCheckoutStep(1);
    setOrderInfoState(defaultOrderInfo);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderInfo,
        isCartOpen,
        checkoutStep,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        setOrderInfo,
        nextStep,
        prevStep,
        resetCheckout,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
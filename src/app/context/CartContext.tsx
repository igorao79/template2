'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Ticket = {
  id: number;
  name: string;
  price: number;
  description: string;
  type: 'adult' | 'child' | 'family' | 'senior';
  iconType: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  type: 'adult' | 'child' | 'family' | 'senior' | 'event';
  iconType: 'ticket' | 'event';
  quantity: number;
};

export type OrderInfo = {
  email: string;
  date: Date | null;
  paymentMethod: 'card' | 'paypal' | 'applepay' | null;
};

export type CartContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  checkoutStep: number;
  nextStep: () => void;
  prevStep: () => void;
  resetCheckout: () => void;
  orderInfo: OrderInfo;
  setOrderInfo: (info: Partial<OrderInfo>) => void;
  totalPrice: number;
};

const defaultOrderInfo: OrderInfo = {
  email: '',
  date: null,
  paymentMethod: null,
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfoState] = useState<OrderInfo>(defaultOrderInfo);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Загружены элементы корзины:', parsedCart.length);
            }
            setCartItems(parsedCart);
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Ошибка при загрузке корзины:', error);
        }
        localStorage.removeItem('cart');
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (isInitialized && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      if (process.env.NODE_ENV === 'development') {
        console.log('Сохранено элементов в корзине:', cartItems.length);
      }
    }
  }, [cartItems, isInitialized]);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (item: CartItem) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Добавление в корзину:', item.name, item.quantity);
    }
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity
        };
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Удаление из корзины ID:', itemId);
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Очистка корзины');
    }
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const openCart = () => {
    setIsCartOpen(true);
    if (process.env.NODE_ENV === 'development') {
      console.log('Открытие корзины, элементов:', cartItems.length);
    }
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
    setCheckoutStep((prev) => Math.min(prev + 1, 3));
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
        isCartOpen,
        checkoutStep,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        nextStep,
        prevStep,
        resetCheckout,
        totalAmount,
        orderInfo,
        setOrderInfo,
        totalPrice: totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
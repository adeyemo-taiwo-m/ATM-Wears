'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  tag: string | null;
  description: string;
  material: string;
  fit: string;
  size: string;
  qty: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('vw_cart');
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cart items from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('vw_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product: Product, size: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const nextItems = [...prevItems];
        nextItems[existingIndex].qty += 1;
        return nextItems;
      }
      return [...prevItems, { ...product, size, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQty = (id: string, size: string, qty: number) => {
    setCartItems((prevItems) => {
      if (qty <= 0) {
        return prevItems.filter((item) => !(item.id === id && item.size === size));
      }
      return prevItems.map((item) =>
        item.id === id && item.size === size ? { ...item, qty } : item
      );
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQty,
        openCart,
        closeCart,
        clearCart,
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

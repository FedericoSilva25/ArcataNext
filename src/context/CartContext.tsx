'use client';

import { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  talla: string;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, talla: string) => void;
  updateQuantity: (id: number, talla: string, cantidad: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === newItem.id && item.talla === newItem.talla
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id && item.talla === newItem.talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...currentItems, { ...newItem, cantidad: 1 }];
    });
  };

  const removeItem = (id: number, talla: string) => {
    setItems(currentItems =>
      currentItems.filter(
        item => !(item.id === id && item.talla === talla)
      )
    );
  };

  const updateQuantity = (id: number, talla: string, cantidad: number) => {
    if (cantidad === 0) {
      removeItem(id, talla);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.talla === talla
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
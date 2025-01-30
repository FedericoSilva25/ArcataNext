'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  talla: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cantidad'> & { cantidad: number }) => void;
  removeItem: (id: number, talla: string) => void;
  updateQuantity: (id: number, talla: string, cantidad: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'cantidad'> & { cantidad: number }) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.id === newItem.id && item.talla === newItem.talla
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].cantidad += newItem.cantidad;
        return updatedItems;
      }

      return [...currentItems, newItem as CartItem];
    });
    setIsOpen(true);
  };

  const removeItem = (id: number, talla: string) => {
    setItems(currentItems => 
      currentItems.filter(item => !(item.id === id && item.talla === talla))
    );
  };

  const updateQuantity = (id: number, talla: string, cantidad: number) => {
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

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
  const totalPrice = items.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        totalItems,
        totalPrice,
      }}
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
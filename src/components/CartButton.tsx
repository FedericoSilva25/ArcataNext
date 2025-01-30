'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm tracking-wider hover:text-gray-600 transition-colors relative"
      >
        CARRITO
        {items.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      <Cart 
        isOpen={isOpen} 
        onCloseAction={() => setIsOpen(false)} 
      />
    </>
  );
} 
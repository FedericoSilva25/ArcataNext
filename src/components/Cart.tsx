'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CartProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function Cart({ isOpen, onCloseAction }: CartProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('¡Gracias por tu compra!');
      onCloseAction();
    } catch (error) {
      alert('Hubo un error al procesar tu pedido');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseAction}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            onClick={e => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Tu Carrito</h2>
                <button
                  onClick={onCloseAction}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.talla}`} className="flex items-start space-x-4">
                        <div className="relative w-24 h-32 bg-gray-100">
                          <Image
                            src={item.imagen}
                            alt={item.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.nombre}</h3>
                          <p className="text-sm text-gray-500">Talla: {item.talla}</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.talla, Math.max(0, item.cantidad - 1))}
                              className="p-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.cantidad}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.talla, item.cantidad + 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeItem(item.id, item.talla)}
                              className="ml-4 text-red-500 hover:text-red-600"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between mb-4">
                    <span>Total</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                  >
                    {isCheckingOut ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CartProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function Cart({ isOpen, onCloseAction }: CartProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseAction}
          className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl font-light tracking-wider">Tu Carrito</h2>
                <button
                  onClick={onCloseAction}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-6">Tu carrito está vacío</p>
                    <Link 
                      href="/coleccion"
                      onClick={onCloseAction}
                      className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider
                               hover:bg-gray-900 transition-colors"
                    >
                      EXPLORAR COLECCIÓN
                    </Link>
                  </div>
                ) : (
                  <div className="px-6 space-y-6">
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.talla}-${item.color}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                      >
                        <div className="relative w-24 h-32 bg-gray-50 overflow-hidden group">
                          <Image
                            src={item.imagen}
                            alt={item.nombre}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{item.nombre}</h3>
                              <div className="space-y-1 mt-1">
                                <p className="text-sm text-gray-600">Talla: {item.talla}</p>
                                <p className="text-sm text-gray-600">Color: {item.color}</p>
                              </div>
                            </div>
                            <div className="bg-black text-white px-4 py-2 rounded-lg">
                              <p className="text-lg font-bold">
                                ${(item.precio * item.cantidad).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mt-4 space-x-4">
                            <div className="flex items-center border border-gray-200 rounded-full">
                              <button
                                onClick={() => updateQuantity(item.id, item.talla, item.color, Math.max(0, item.cantidad - 1))}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-full
                                         transition-colors active:scale-95"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.cantidad}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.talla, item.color, item.cantidad + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-r-full
                                         transition-colors active:scale-95"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.talla, item.color)}
                              className="text-sm text-red-500 hover:text-red-600 transition-colors
                                       hover:underline underline-offset-2"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200">
                  <div className="p-6 space-y-4">
                    <div className="bg-black text-white p-6 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-lg">Subtotal</span>
                        <span className="text-3xl font-bold">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={onCloseAction}
                      className="block w-full bg-black text-white text-center py-4 text-sm tracking-wider
                               hover:bg-gray-900 transition-colors active:scale-[0.99] rounded-lg font-semibold"
                    >
                      FINALIZAR COMPRA
                    </Link>
                    <button
                      onClick={onCloseAction}
                      className="w-full text-center py-3 text-sm text-gray-800 hover:text-black 
                               transition-colors font-medium hover:bg-gray-100 rounded-lg"
                    >
                      Continuar comprando
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
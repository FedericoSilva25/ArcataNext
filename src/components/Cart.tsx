'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeItem, 
    updateQuantity, 
    totalItems,
    totalPrice,
    clearCart
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-50 
                     shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-light tracking-wider">MI CARRITO</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 mb-6 relative">
                    <Image
                      src="/images/empty-cart.png"
                      alt="Carrito vacío"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-gray-500 text-center mb-6">
                    Tu carrito está vacío
                  </p>
                  <Link
                    href="/coleccion"
                    onClick={() => setIsOpen(false)}
                    className="bg-black text-white px-8 py-3 text-sm tracking-wider
                             hover:bg-gray-900 transition-colors"
                  >
                    EXPLORAR COLECCIÓN
                  </Link>
                </div>
              ) : (
                <div className="py-6 px-4 space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.talla}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="relative w-24 h-32 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.nombre}</h3>
                            <p className="text-sm text-gray-500 mt-1">Talla: {item.talla}</p>
                          </div>
                          <p className="font-medium">
                            ${(item.precio * item.cantidad).toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.talla, Math.max(1, item.cantidad - 1))}
                              className="w-8 h-8 flex items-center justify-center rounded-full 
                                       border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.cantidad}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.talla, item.cantidad + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full 
                                       border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.talla)}
                            className="text-sm text-gray-400 hover:text-black transition-colors"
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
              <div className="border-t border-gray-100">
                <div className="p-6 space-y-4 bg-white/80 backdrop-blur-md">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  
                  {/* Envío */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-sm text-gray-500">Calculado al finalizar</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-medium">${totalPrice.toLocaleString()}</span>
                  </div>

                  {/* Botones */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => {/* Implementar checkout */}}
                      className="w-full bg-black text-white px-6 py-4 text-sm tracking-wider
                               hover:bg-gray-900 transition-colors rounded-md"
                    >
                      FINALIZAR COMPRA
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="w-full bg-white text-black px-6 py-4 text-sm tracking-wider
                               border border-gray-200 hover:bg-gray-50 transition-colors rounded-md"
                    >
                      SEGUIR COMPRANDO
                    </button>
                  </div>

                  {/* Vaciar carrito */}
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-gray-500 hover:text-black transition-colors pt-2"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
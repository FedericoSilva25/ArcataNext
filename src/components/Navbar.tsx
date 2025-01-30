'use client';

import Link from 'next/link';
import { useState } from 'react';
import Cart from './Cart';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();

  // Calcular el total de items
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <nav className="fixed w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-black">
            ARCATA
          </Link>

          {/* Menú de escritorio */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-800 hover:text-black transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="/coleccion" 
              className="text-gray-800 hover:text-black transition-colors font-medium"
            >
              Colección
            </Link>
            <Link 
              href="/nosotros" 
              className="text-gray-800 hover:text-black transition-colors font-medium"
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className="text-gray-800 hover:text-black transition-colors font-medium"
            >
              Contacto
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Botón del carrito */}
            <button
              onClick={onCartOpen}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/"
                className="block py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/coleccion"
                className="block py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Colección
              </Link>
              <Link
                href="/nosotros"
                className="block py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="block py-2 text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Componente del carrito */}
      <Cart 
        isOpen={isCartOpen} 
        onCloseAction={() => setIsCartOpen(false)}
      />
    </nav>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsOpen, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl tracking-wider">
            ARCATA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/coleccion"
              className="text-sm tracking-wider hover:text-gray-600 transition-colors"
            >
              COLECCIÓN
            </Link>
            <Link 
              href="/nosotros"
              className="text-sm tracking-wider hover:text-gray-600 transition-colors"
            >
              NOSOTROS
            </Link>
            <Link 
              href="/contacto"
              className="text-sm tracking-wider hover:text-gray-600 transition-colors"
            >
              CONTACTO
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm tracking-wider hover:text-gray-600 transition-colors relative"
            >
              CARRITO
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-black text-white text-xs w-5 h-5 
                               rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="space-y-2">
              <span className={`block w-6 h-0.5 bg-black transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-all ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/coleccion"
                className="block text-sm tracking-wider hover:text-gray-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COLECCIÓN
              </Link>
              <Link 
                href="/nosotros"
                className="block text-sm tracking-wider hover:text-gray-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NOSOTROS
              </Link>
              <Link 
                href="/contacto"
                className="block text-sm tracking-wider hover:text-gray-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACTO
              </Link>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm tracking-wider hover:text-gray-600 transition-colors relative"
              >
                CARRITO
                {totalItems > 0 && (
                  <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
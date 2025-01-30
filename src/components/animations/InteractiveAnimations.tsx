'use client';

import { motion } from 'framer-motion';

// Animación para botones
export const AnimatedButton = ({ children, onClick, className = '' }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <motion.button
    className={className}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.button>
);

// Animación para tarjetas de producto
export const AnimatedProductCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ 
      y: -5,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.div>
);

// Animación para imágenes
export const AnimatedImage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.3 }
    }}
  >
    {children}
  </motion.div>
);

// Animación para menú desplegable
export const AnimatedDropdown = ({ isOpen, children }: { 
  isOpen: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ 
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0
    }}
    transition={{ duration: 0.3 }}
    style={{ overflow: 'hidden' }}
  >
    {children}
  </motion.div>
);

// Animación para texto que aparece al hacer hover
export const AnimatedHoverText = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    whileHover={{ 
      scale: 1.1,
      color: "#000",
      transition: { duration: 0.2 }
    }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

// Animación para loader
export const AnimatedLoader = () => (
  <motion.div
    className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full"
    animate={{ rotate: 360 }}
    transition={{ 
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Animación para notificaciones
export const AnimatedNotification = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="bg-black text-white p-4 rounded-lg shadow-lg"
  >
    {children}
  </motion.div>
);
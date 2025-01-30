'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-3xl font-light mb-4 tracking-wider">¡Gracias por tu compra!</h1>
        <p className="text-gray-600 mb-8">
          Hemos recibido tu pedido y nos pondremos en contacto contigo pronto para coordinar el pago y envío.
        </p>
        <Link 
          href="/"
          className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-900 transition-colors tracking-wider"
        >
          VOLVER AL INICIO
        </Link>
      </motion.div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Confirmacion() {
  const router = useRouter();

  useEffect(() => {
    // Si alguien intenta acceder directamente a esta página, redirigir a la colección
    const hasOrderData = sessionStorage.getItem('lastOrder');
    if (!hasOrderData) {
      router.push('/coleccion');
    }
  }, [router]);

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-light tracking-wider">
            ¡GRACIAS POR TU COMPRA!
          </h1>

          <p className="text-gray-600 max-w-md mx-auto">
            Hemos recibido tu pedido correctamente. Te enviaremos un email con los detalles
            y el seguimiento de tu compra.
          </p>

          <div className="pt-8 space-y-4">
            <Link
              href="/coleccion"
              className="inline-block bg-black text-white px-8 py-4 text-sm tracking-wider
                       hover:bg-gray-900 transition-colors"
            >
              SEGUIR COMPRANDO
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
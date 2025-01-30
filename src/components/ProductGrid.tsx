'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  tipo: string;
  genero: string;
}

interface ProductGridProps {
  productos: Producto[];
}

export default function ProductGrid({ productos }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
      {productos.map((producto, index) => (
        <motion.div
          key={producto.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/producto/${producto.id}`}>
            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                            transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm 
                            py-4 transform translate-y-full group-hover:translate-y-0 
                            transition-transform duration-300">
                <button className="w-full text-sm tracking-wider text-[#1A1A1A] 
                                 hover:text-gray-700 transition-colors">
                  AGREGAR AL CARRITO
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-light mb-2 text-[#1A1A1A] group-hover:text-gray-600 
                           transition-colors">
                {producto.nombre}
              </h3>
              <p className="text-gray-700">${producto.precio.toLocaleString()}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 
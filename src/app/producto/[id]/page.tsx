'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  detalles: string[];
  cuidados: string[];
  imagenes: string[];
  tallas: string[];
  categoria: string;
}

interface ProductosData {
  [key: number]: Producto;
}

const productos: ProductosData = {
  // ... datos de productos se mantienen igual ...
};

export default function ProductoPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [mainImage, setMainImage] = useState<number>(0);
  const { addItem } = useCart();
  
  const producto = productos[Number(params.id)];

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Producto no encontrado</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenes[mainImage],
      talla: selectedSize,
      cantidad: 1
    });
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] bg-[#F8F8F8] rounded-lg overflow-hidden"
            >
              <Image
                src={producto.imagenes[mainImage]}
                alt={producto.nombre}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {producto.imagenes.map((imagen, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative aspect-square bg-[#F8F8F8] rounded-md overflow-hidden
                           transition-all duration-300 ${
                             mainImage === index 
                               ? 'ring-2 ring-black' 
                               : 'hover:opacity-80'
                           }`}
                >
                  <Image
                    src={imagen}
                    alt={`${producto.nombre} - Vista ${index + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="border-b border-gray-200 pb-6">
                <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
                  {producto.nombre}
                </h1>
                <p className="text-2xl md:text-3xl">
                  ${producto.precio.toLocaleString()}
                </p>
              </div>

              {/* Selector de talla */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium">TALLA</h2>
                  <button className="text-sm text-gray-600 hover:text-black transition-colors">
                    Guía de tallas
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {producto.tallas.map((talla) => (
                    <button
                      key={talla}
                      onClick={() => setSelectedSize(talla)}
                      className={`py-3 border ${
                        selectedSize === talla
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      } transition-all duration-200 rounded-md`}
                    >
                      {talla}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón agregar al carrito */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-sm tracking-wider
                         hover:bg-gray-900 transition-colors duration-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                AGREGAR AL CARRITO
              </button>

              {/* Descripción y detalles */}
              <div className="space-y-8 pt-8">
                <div>
                  <h2 className="text-sm font-medium mb-4">DESCRIPCIÓN</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {producto.descripcion}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-sm font-medium mb-4">DETALLES</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {producto.detalles.map((detalle, index) => (
                        <li key={index} className="text-sm">{detalle}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium mb-4">CUIDADOS</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {producto.cuidados.map((cuidado, index) => (
                        <li key={index} className="text-sm">{cuidado}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        titulo: "Envío gratis",
                        descripcion: "En compras mayores a $50.000"
                      },
                      {
                        titulo: "Devolución gratis",
                        descripcion: "30 días para cambios"
                      },
                      {
                        titulo: "Pago seguro",
                        descripcion: "Métodos verificados"
                      },
                      {
                        titulo: "Atención 24/7",
                        descripcion: "Soporte permanente"
                      }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <h3 className="text-sm font-medium mb-1">{item.titulo}</h3>
                        <p className="text-xs text-gray-600">{item.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
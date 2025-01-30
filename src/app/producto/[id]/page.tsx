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

// Datos de ejemplo (deberías obtener esto de tu base de datos)
const productos: ProductosData = {
  1: {
    id: 1,
    nombre: "Remera Oversize",
    precio: 15999,
    descripcion: "Remera oversize de algodón premium con corte relajado. Perfecta para un look casual y moderno.",
    detalles: [
      "100% Algodón premium",
      "Corte oversize",
      "Cuello redondo reforzado",
      "Fabricado en Argentina"
    ],
    cuidados: [
      "Lavar a máquina con agua fría",
      "No usar blanqueador",
      "Planchar a temperatura media",
      "No lavar en seco"
    ],
    imagenes: [
      "/images/productos/cuco-remera-1.jpg",
      "/images/productos/cuco-remera-2.jpg",
      "/images/productos/cuco-remera-3.jpg",
      "/images/productos/cuco-remera-4.jpg"
    ],
    tallas: ["S", "M", "L", "XL"],
    categoria: "cuco"
  },
  2: {
    id: 2,
    nombre: "Pantalón Cargo",
    precio: 29999,
    descripcion: "Pantalón cargo con múltiples bolsillos y corte regular. Confeccionado con tela resistente y durable.",
    detalles: [
      "98% Algodón, 2% Elastano",
      "Corte regular",
      "Múltiples bolsillos",
      "Fabricado en Argentina"
    ],
    cuidados: [
      "Lavar a máquina con agua fría",
      "No usar blanqueador",
      "Planchar a temperatura baja",
      "No lavar en seco"
    ],
    imagenes: [
      "/images/productos/cuco-pantalon-1.jpg",
      "/images/productos/cuco-pantalon-2.jpg",
      "/images/productos/cuco-pantalon-3.jpg",
      "/images/productos/cuco-pantalon-4.jpg"
    ],
    tallas: ["28", "30", "32", "34", "36"],
    categoria: "cuco"
  },
  3: {
    id: 3,
    nombre: "Buzo Essential",
    precio: 35999,
    descripcion: "Buzo de algodón frisado con capucha. Diseño minimalista y versátil para cualquier ocasión.",
    detalles: [
      "80% Algodón, 20% Poliéster",
      "Corte regular",
      "Capucha ajustable",
      "Fabricado en Argentina"
    ],
    cuidados: [
      "Lavar a máquina con agua fría",
      "No usar blanqueador",
      "No secar en secadora",
      "Planchar del revés"
    ],
    imagenes: [
      "/images/productos/cuco-buzo-1.jpg",
      "/images/productos/cuco-buzo-2.jpg",
      "/images/productos/cuco-buzo-3.jpg",
      "/images/productos/cuco-buzo-4.jpg"
    ],
    tallas: ["S", "M", "L", "XL"],
    categoria: "cuco"
  },
  4: {
    id: 4,
    nombre: "Remera Crop",
    precio: 12999,
    descripcion: "Remera crop de algodón con diseño moderno. Ideal para un look fresco y juvenil.",
    detalles: [
      "100% Algodón",
      "Corte crop",
      "Cuello redondo",
      "Fabricado en Argentina"
    ],
    cuidados: [
      "Lavar a máquina con agua fría",
      "No usar blanqueador",
      "Planchar a temperatura media",
      "No lavar en seco"
    ],
    imagenes: [
      "/images/productos/lusmi-remera-1.jpg",
      "/images/productos/lusmi-remera-2.jpg",
      "/images/productos/lusmi-remera-3.jpg",
      "/images/productos/lusmi-remera-4.jpg"
    ],
    tallas: ["XS", "S", "M", "L"],
    categoria: "lusmi"
  },
  5: {
    id: 5,
    nombre: "Pantalón Wide Leg",
    precio: 27999,
    descripcion: "Pantalón wide leg de tiro alto. Confeccionado con tela suave y fluida.",
    detalles: [
      "95% Algodón, 5% Elastano",
      "Corte wide leg",
      "Tiro alto",
      "Fabricado en Argentina"
    ],
    cuidados: [
      "Lavar a máquina con agua fría",
      "No usar blanqueador",
      "Planchar a temperatura media",
      "Lavar con colores similares"
    ],
    imagenes: [
      "/images/productos/lusmi-pantalon-1.jpg",
      "/images/productos/lusmi-pantalon-2.jpg",
      "/images/productos/lusmi-pantalon-3.jpg",
      "/images/productos/lusmi-pantalon-4.jpg"
    ],
    tallas: ["XS", "S", "M", "L"],
    categoria: "lusmi"
  },
  6: {
    id: 6,
    nombre: "Buzo Cropped",
    precio: 32999,
    descripcion: "Buzo cropped con capucha. Diseño moderno y cómodo para un look casual.",
    detalles: [
      "80% Algodón, 20% Poliéster",
      "Corte cropped",
      "Capucha ajustable",
      "Fabricado en Argentina"
    ],
    cuidados: [
      "Lavar a máquina con agua fría",
      "No usar blanqueador",
      "No secar en secadora",
      "Planchar del revés"
    ],
    imagenes: [
      "/images/productos/lusmi-buzo-1.jpg",
      "/images/productos/lusmi-buzo-2.jpg",
      "/images/productos/lusmi-buzo-3.jpg",
      "/images/productos/lusmi-buzo-4.jpg"
    ],
    tallas: ["XS", "S", "M", "L"],
    categoria: "lusmi"
  }
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

    // Ahora usamos la imagen seleccionada en lugar de siempre la primera
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenes[mainImage], // Usamos la imagen seleccionada
      talla: selectedSize,
      cantidad: 1
    });
  };

  // Función para obtener el nombre de la variante según el índice
  const getVariantName = (index: number): string => {
    switch (index) {
      case 0:
        return 'Negro';
      case 1:
        return 'Blanco';
      case 2:
        return 'Gris';
      case 3:
        return 'Beige';
      default:
        return '';
    }
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imágenes */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-[3/4] bg-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                src={producto.imagenes[mainImage]}
                alt={`${producto.nombre} - ${getVariantName(mainImage)}`}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {producto.imagenes.map((imagen: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative aspect-square bg-gray-100 group ${
                    mainImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <Image
                    src={imagen}
                    alt={`${producto.nombre} - ${getVariantName(index)}`}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay con el nombre del color */}
                  <div className={`absolute inset-0 flex items-center justify-center
                                bg-black/0 group-hover:bg-black/40 transition-colors
                                ${mainImage === index ? 'bg-black/40' : ''}
                              `}>
                    <span className={`text-white text-xs font-medium opacity-0
                                   group-hover:opacity-100 transition-opacity
                                   ${mainImage === index ? 'opacity-100' : ''}
                                 `}>
                      {getVariantName(index)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-light tracking-wider mb-4">
                  {producto.nombre}
                </h1>
                <p className="text-2xl">${producto.precio.toLocaleString()}</p>
                {/* Mostrar el color seleccionado */}
                <p className="text-sm text-gray-500 mt-2">
                  Color: {getVariantName(mainImage)}
                </p>
              </div>

              {/* Selector de talla */}
              <div>
                <h2 className="text-sm font-medium mb-4">TALLA</h2>
                <div className="grid grid-cols-4 gap-2">
                  {producto.tallas.map((talla: string) => (
                    <button
                      key={talla}
                      onClick={() => setSelectedSize(talla)}
                      className={`py-3 border ${
                        selectedSize === talla
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      } transition-colors`}
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
                         hover:bg-gray-900 transition-colors"
              >
                AGREGAR AL CARRITO - {getVariantName(mainImage)}
              </button>

              {/* Descripción */}
              <div className="space-y-6 pt-8 border-t">
                <div>
                  <h2 className="text-sm font-medium mb-4">DESCRIPCIÓN</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {producto.descripcion}
                  </p>
                </div>

                {/* Detalles */}
                <div>
                  <h2 className="text-sm font-medium mb-4">DETALLES</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {producto.detalles.map((detalle: string, index: number) => (
                      <li key={index}>{detalle}</li>
                    ))}
                  </ul>
                </div>

                {/* Cuidados */}
                <div>
                  <h2 className="text-sm font-medium mb-4">CUIDADOS</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {producto.cuidados.map((cuidado: string, index: number) => (
                      <li key={index}>{cuidado}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
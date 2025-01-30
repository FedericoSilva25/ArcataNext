'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Datos de productos
const productos = {
  cuco: [
    {
      id: 1,
      nombre: "Remera Oversize",
      precio: 15999,
      imagen: "/images/productos/cuco-remera.jpg",
      categoria: "cuco",
      tipo: "remera",
      genero: "hombre"
    },
    {
      id: 2,
      nombre: "Pantalón Cargo",
      precio: 29999,
      imagen: "/images/productos/cuco-pantalon.jpg",
      categoria: "cuco",
      tipo: "pantalon",
      genero: "hombre"
    },
    {
      id: 3,
      nombre: "Buzo Essential",
      precio: 35999,
      imagen: "/images/productos/cuco-buzo.jpg",
      categoria: "cuco",
      tipo: "abrigo",
      genero: "hombre"
    }
  ],
  lusmi: [
    {
      id: 4,
      nombre: "Remera Crop",
      precio: 14999,
      imagen: "/images/productos/lusmi-remera.jpg",
      categoria: "lusmi",
      tipo: "remera",
      genero: "mujer"
    },
    {
      id: 5,
      nombre: "Pantalón Wide Leg",
      precio: 32999,
      imagen: "/images/productos/lusmi-pantalon.jpg",
      categoria: "lusmi",
      tipo: "pantalon",
      genero: "mujer"
    },
    {
      id: 6,
      nombre: "Chaqueta Oversized",
      precio: 45999,
      imagen: "/images/productos/lusmi-chaqueta.jpg",
      categoria: "lusmi",
      tipo: "abrigo",
      genero: "mujer"
    }
  ]
};

export default function Coleccion() {
  const searchParams = useSearchParams();
  const [categoriaActiva, setCategoriaActiva] = useState(searchParams.get('categoria') || 'todos');

  const productosFiltrados = categoriaActiva === 'todos' 
    ? [...productos.cuco, ...productos.lusmi]
    : productos[categoriaActiva as keyof typeof productos] || [];

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      {/* Header de la colección con imagen de fondo */}
      <section className="relative h-[50vh] md:h-[60vh] bg-[#1A1A1A]">
  <div className="absolute inset-0">
    <Image
      src={`/images/${categoriaActiva === 'cuco' ? 'cuco' : categoriaActiva === 'lusmi' ? 'lusmi' : 'all'}-header.jpg`}
      alt="Colección Header"
      fill
      className="object-cover opacity-60" // Reducimos la opacidad de la imagen
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" /> {/* Oscurecemos más el overlay */}
  </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wider">
              {categoriaActiva === 'todos' 
                ? 'TODAS LAS COLECCIONES' 
                : `COLECCIÓN ${categoriaActiva.toUpperCase()}`}
            </h1>
            <p className="text-lg md:text-xl text-white/90 tracking-wide">
              {categoriaActiva === 'cuco' 
                ? 'Diseños contemporáneos para hombre' 
                : categoriaActiva === 'lusmi' 
                  ? 'Elegancia moderna para mujer'
                  : 'Descubre nuestras colecciones exclusivas'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {['todos', 'cuco', 'lusmi'].map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-6 py-3 text-sm tracking-wider transition-all duration-300
                ${categoriaActiva === categoria 
                  ? 'bg-[#1A1A1A] text-white' 
                  : 'bg-white text-[#1A1A1A] hover:bg-gray-100'}`}
            >
              {categoria.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {productosFiltrados.map((producto, index) => (
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
                  
                  {/* Quick add button */}
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

        {/* Empty state */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No se encontraron productos en esta categoría.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter section */}
      <section className="bg-[#1A1A1A] text-white py-20 mt-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wider">
            ÚNETE A NUESTRA COMUNIDAD
          </h2>
          <p className="mb-8 text-white/80">
            Sé el primero en conocer nuestras nuevas colecciones
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/20 
                       text-white placeholder-white/50 focus:outline-none focus:border-white/50
                       transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-4 hover:bg-gray-200 
                       transition-colors tracking-wider whitespace-nowrap"
            >
              SUSCRIBIRSE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
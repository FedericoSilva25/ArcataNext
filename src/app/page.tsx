'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-[#F8F8F8]">
      {/* Hero Section - Ahora con video de fondo y overlay más elegante */}
      <section className="relative h-[90vh] md:h-screen">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter">
            ARCATA
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 tracking-wide font-light">
            COLECCIÓN 2024
          </p>
          <Link 
            href="/coleccion"
            className="group relative overflow-hidden bg-white/10 backdrop-blur-sm 
                     text-white border border-white/30 px-12 py-4 text-sm tracking-wider"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              EXPLORAR COLECCIÓN
            </span>
            <div className="absolute inset-0 bg-white transform origin-left scale-x-0 
                          group-hover:scale-x-100 transition-transform duration-500" />
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-white/30 relative">
            <motion.div 
              className="absolute top-0 w-full bg-white h-1/2"
              animate={{ 
                top: ["0%", "100%"],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Colecciones - Con mejor espaciado y animaciones */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center mb-20 tracking-wider"
          >
            COLECCIONES
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { nombre: "CUCO", imagen: "/images/cuco-collection.jpg", categoria: "cuco" },
              { nombre: "LUSMI", imagen: "/images/lusmi-collection.jpg", categoria: "lusmi" }
            ].map((coleccion) => (
              <motion.div
                key={coleccion.categoria}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={`/coleccion?categoria=${coleccion.categoria}`} 
                  className="group relative block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={coleccion.imagen}
                      alt={`Colección ${coleccion.nombre}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 
                                  transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="block text-white text-3xl md:text-4xl tracking-widest mb-4">
                          COLECCIÓN {coleccion.nombre}
                        </span>
                        <span className="inline-block px-6 py-2 border border-white/50 text-white 
                                     text-sm tracking-wider transform -translate-y-2 opacity-0 
                                     group-hover:translate-y-0 group-hover:opacity-100 
                                     transition-all duration-500">
                          VER COLECCIÓN
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados - Con hover effects mejorados */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center mb-20 tracking-wider"
          >
            DESTACADOS
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                nombre: "Buzo Essential",
                precio: 35999,
                imagen: "/images/productos/cuco-buzo.jpg"
              },
              {
                id: 5,
                nombre: "Pantalón Wide Leg",
                precio: 32999,
                imagen: "/images/productos/lusmi-pantalon.jpg"
              },
              {
                id: 6,
                nombre: "Chaqueta Oversized",
                precio: 45999,
                imagen: "/images/productos/lusmi-chaqueta.jpg"
              }
            ].map((producto, index) => (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={`/producto/${producto.id}`} className="group block">
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                                  transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-light mb-2 tracking-wider group-hover:text-gray-600 
                               transition-colors">{producto.nombre}</h3>
                  <p className="text-gray-700">${producto.precio.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros - Con parallax y mejor composición */}
      <section className="py-32 bg-[#F8F8F8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3]"
            >
              <Image
                src="/images/about-home.jpg"
                alt="Sobre ARCATA"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-light tracking-wider">NUESTRA HISTORIA</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ARCATA nace de la inspiración de una pareja de jóvenes argentinos 
                que encontraron en la ciudad de Arcata, California, el espíritu perfecto 
                para crear una marca de ropa única. Desde Córdoba Capital, fusionamos 
                el estilo despreocupado de la costa oeste con el diseño contemporáneo argentino.
              </p>
              <Link 
                href="/nosotros"
                className="inline-block border border-black px-12 py-4 
                         hover:bg-black hover:text-white transition-all
                         duration-300 tracking-wider"
              >
                CONOCE MÁS
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter - Con diseño más moderno */}
      <section className="py-32 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-wider">
              ÚNETE A NUESTRA COMUNIDAD
            </h2>
            <p className="text-xl text-white/80">
              Suscríbete para recibir las últimas novedades y ofertas exclusivas de nuestro local
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/20 
                         text-white placeholder-white/50 focus:outline-none focus:border-white/50
                         transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-4 hover:bg-gray-200 
                         transition-colors tracking-wider"
              >
                SUSCRIBIRSE
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed - Con mejor grid y efectos */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center mb-20 tracking-wider"
          >
            @ARCATA
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
              >
                <Link 
                  href="https://instagram.com/arcata" 
                  target="_blank"
                  className="group relative aspect-square block overflow-hidden"
                >
                  <Image
                    src={`/images/instagram-${item}.jpg`}
                    alt={`Instagram ${item}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-sm tracking-wider">Ver en Instagram</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
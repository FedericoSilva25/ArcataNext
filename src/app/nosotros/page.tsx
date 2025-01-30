'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Nosotros() {
  return (
    <main className="min-h-screen">
      {/* Header Section con mejor contraste */}
      <section className="relative h-[50vh] md:h-[60vh] bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <Image
            src="/images/arcata-city.jpg"
            alt="Ciudad de Arcata"
            fill
            className="object-cover opacity-60" // Reducida la opacidad para mejor contraste
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" /> {/* Overlay más oscuro */}
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wider">
              NUESTRA HISTORIA
            </h1>
            <p className="text-lg md:text-xl text-white/90 tracking-wide max-w-2xl mx-auto">
              De Arcata, California a Córdoba, Argentina: Una historia de inspiración y diseño
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-light tracking-wider text-[#1A1A1A]">EL COMIENZO</h2>
              <p className="text-gray-700 leading-relaxed">
                Todo comenzó en 2022 cuando dos jóvenes argentinos viajaron a California 
                en busca de inspiración. En la pequeña ciudad costera de Arcata, 
                encontraron el equilibrio perfecto entre la vida relajada de la costa 
                oeste y el diseño contemporáneo que buscaban transmitir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                La atmósfera única de Arcata, con su mezcla de naturaleza y cultura urbana, 
                se convirtió en la base de nuestra visión para crear prendas que combinan 
                comodidad y estilo.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] bg-[#F8F8F8]"
            >
              <Image
                src="/images/founders.jpg"
                alt="Fundadores"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section con nuevo diseño */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 tracking-wider text-[#1A1A1A]">
            NUESTROS VALORES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                titulo: "DISEÑO ATEMPORAL",
                descripcion: "Creamos prendas que trascienden las tendencias pasajeras, apostando por la calidad y el diseño duradero."
              },
              {
                titulo: "PRODUCCIÓN LOCAL",
                descripcion: "Trabajamos con talleres cordobeses, apoyando el talento local y garantizando condiciones justas de trabajo."
              },
              {
                titulo: "SUSTENTABILIDAD",
                descripcion: "Nos comprometemos con prácticas responsables, utilizando materiales de calidad y procesos que respetan el medio ambiente."
              }
            ].map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 md:p-12 text-center"
              >
                <h3 className="text-xl font-light mb-4 tracking-wider text-[#1A1A1A]">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {valor.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 tracking-wider text-[#1A1A1A]">
            NUESTRO PROCESO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/proceso.jpg"
                alt="Nuestro Proceso"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              {[
                {
                  numero: "01",
                  titulo: "DISEÑO",
                  descripcion: "Cada pieza comienza con un boceto inspirado en la estética californiana y el estilo argentino."
                },
                {
                  numero: "02",
                  titulo: "MATERIALES",
                  descripcion: "Seleccionamos cuidadosamente telas y materiales de primera calidad."
                },
                {
                  numero: "03",
                  titulo: "PRODUCCIÓN",
                  descripcion: "Trabajamos con los mejores talleres locales para garantizar acabados perfectos."
                },
                {
                  numero: "04",
                  titulo: "CONTROL DE CALIDAD",
                  descripcion: "Cada prenda pasa por rigurosos controles antes de llegar a nuestros clientes."
                }
              ].map((paso, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-6"
                >
                  <span className="text-3xl font-light text-gray-300">
                    {paso.numero}
                  </span>
                  <div>
                    <h3 className="text-xl font-light mb-2 tracking-wider text-[#1A1A1A]">
                      {paso.titulo}
                    </h3>
                    <p className="text-gray-600">
                      {paso.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
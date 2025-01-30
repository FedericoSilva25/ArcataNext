'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mdkkjleo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al enviar el mensaje');

      setSubmitStatus('success');
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative h-[40vh] md:h-[50vh] bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <Image
            src="/images/contacto-header.jpg"
            alt="Contacto"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wider">
              CONTACTO
            </h1>
            <p className="text-lg md:text-xl text-white/90 tracking-wide">
              Estamos aquí para ayudarte
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Información de contacto */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-light mb-8 tracking-wider">ENCUENTRANOS</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Showroom</h3>
                    <p className="text-gray-600">
                      Av. Hipólito Yrigoyen 123<br />
                      Nueva Córdoba, Córdoba<br />
                      Argentina
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Horarios</h3>
                    <p className="text-gray-600">
                      Lunes a Viernes: 10:00 - 20:00<br />
                      Sábados: 10:00 - 14:00
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contacto</h3>
                    <p className="text-gray-600">
                      Email: info@arcata.com<br />
                      Tel: +54 351 123-4567
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="relative aspect-video w-full bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.573821076223!2d-64.18547788485288!3d-31.416716081401463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28892a73dd1%3A0x4104a66357705427!2sAv.%20Hip%C3%B3lito%20Yrigoyen%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1623456789012!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-[#F8F8F8] p-8 md:p-12">
              <h2 className="text-3xl font-light mb-8 tracking-wider">ESCRÍBENOS</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm text-gray-600 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                             focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                             focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="asunto" className="block text-sm text-gray-600 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                             focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm text-gray-600 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                             focus:outline-none transition-colors resize-none"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white px-8 py-4 
                           transition-all tracking-wider
                           ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}
                >
                  {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                </button>

                {/* Mensajes de estado */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-green-600"
                  >
                    ¡Mensaje enviado con éxito! Te responderemos pronto.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-600"
                  >
                    Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12 tracking-wider">
            PREGUNTAS FRECUENTES
          </h2>
          <div className="space-y-8">
            {[
              {
                pregunta: "¿Cuál es el tiempo de entrega?",
                respuesta: "El tiempo de entrega estándar es de 3-5 días hábiles en Córdoba Capital y 5-7 días hábiles para el resto del país."
              },
              {
                pregunta: "¿Tienen cambios y devoluciones?",
                respuesta: "Sí, aceptamos cambios y devoluciones dentro de los 30 días de realizada la compra, siempre que el producto esté en su estado original."
              },
              {
                pregunta: "¿Hacen envíos internacionales?",
                respuesta: "Por el momento solo realizamos envíos dentro de Argentina."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-8"
              >
                <h3 className="text-lg font-medium mb-3">{item.pregunta}</h3>
                <p className="text-gray-600">{item.respuesta}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
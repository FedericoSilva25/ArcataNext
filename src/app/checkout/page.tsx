'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    notas: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        items,
        total: totalPrice,
        cliente: formData
      };

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }

      // Limpiar el carrito
      clearCart();
      
      // Redirigir a página de confirmación
      router.push('/checkout/confirmacion');
    } catch (error) {
      alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Tu carrito está vacío</h1>
          <Link 
            href="/coleccion"
            className="text-sm text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 shadow-sm"
          >
            <h1 className="text-2xl font-light mb-8 tracking-wider">DATOS DE CONTACTO</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm text-gray-600 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
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
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm text-gray-600 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm text-gray-600 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  required
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ciudad" className="block text-sm text-gray-600 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    required
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="provincia" className="block text-sm text-gray-600 mb-2">
                    Provincia
                  </label>
                  <input
                    type="text"
                    id="provincia"
                    name="provincia"
                    required
                    value={formData.provincia}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="codigoPostal" className="block text-sm text-gray-600 mb-2">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  required
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="notas" className="block text-sm text-gray-600 mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  id="notas"
                  name="notas"
                  rows={4}
                  value={formData.notas}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 hover:bg-gray-900 transition-colors tracking-wider disabled:bg-gray-400"
              >
                {isSubmitting ? 'PROCESANDO...' : 'CONFIRMAR PEDIDO'}
              </button>
            </form>
          </motion.div>

          {/* Resumen del pedido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-20 h-fit"
          >
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-xl font-light mb-6 tracking-wider">RESUMEN DEL PEDIDO</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.talla}`} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-gray-50">
                      <Image
                        src={item.imagen}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.nombre}</h3>
                      <p className="text-sm text-gray-500">Talla: {item.talla}</p>
                      <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                      <p className="text-sm font-medium mt-1">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-6 pt-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
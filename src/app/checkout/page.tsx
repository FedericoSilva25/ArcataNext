'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface CheckoutFormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  metodoPago: 'tarjeta' | 'transferencia';
}

export default function Checkout() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'tarjeta'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí deberías hacer tu llamada a la API real
      const orderData = {
        ...formData,
        items,
        totalPrice
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Error al procesar el pedido');

      // Limpiar carrito
      clearCart();
      
      // Redirigir a página de confirmación
      router.push('/checkout/confirmacion');

    } catch (error) {
      alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    router.push('/coleccion');
    return null;
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-light tracking-wider mb-12 text-center"
        >
          FINALIZAR COMPRA
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <h2 className="text-xl font-light">INFORMACIÓN DE CONTACTO</h2>
              
              <div>
                <label htmlFor="nombre" className="block text-sm text-gray-600 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 
                           focus:ring-black focus:border-transparent outline-none"
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
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 
                           focus:ring-black focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm text-gray-600 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 
                           focus:ring-black focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-light">DIRECCIÓN DE ENVÍO</h2>
              
              <div>
                <label htmlFor="direccion" className="block text-sm text-gray-600 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 
                           focus:ring-black focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ciudad" className="block text-sm text-gray-600 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 
                             focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="codigoPostal" className="block text-sm text-gray-600 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 
                             focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-light">MÉTODO DE PAGO</h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={formData.metodoPago === 'tarjeta'}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span>Tarjeta de crédito/débito</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="transferencia"
                    checked={formData.metodoPago === 'transferencia'}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span>Transferencia bancaria</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white py-4 text-sm tracking-wider
                       transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}
            >
              {isSubmitting ? 'PROCESANDO...' : 'CONFIRMAR PEDIDO'}
            </button>
          </motion.form>

          {/* Resumen del pedido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 p-8 space-y-6"
          >
            <h2 className="text-xl font-light mb-6">RESUMEN DEL PEDIDO</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.talla}`} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.nombre}</p>
                    <p className="text-sm text-gray-500">Talla: {item.talla}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                  </div>
                  <p className="font-medium">${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>Calculado al confirmar</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-4 border-t">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
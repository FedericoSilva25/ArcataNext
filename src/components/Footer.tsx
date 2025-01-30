'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <h2 className="text-2xl tracking-wider mb-6">ARCATA</h2>
            <p className="text-gray-400 max-w-md">
              Diseño contemporáneo inspirado en la costa oeste americana 
              y el estilo argentino. Creado en Córdoba Capital.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium mb-4">NAVEGACIÓN</h3>
            <ul className="space-y-3">
              <li>
                <a href="/coleccion" className="text-gray-400 hover:text-white transition-colors">
                  Colección
                </a>
              </li>
              <li>
                <a href="/nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-medium mb-4">CONTACTO</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                Av. Hipólito Yrigoyen 123<br />
                Nueva Córdoba, Córdoba
              </li>
              <li>
                <a href="tel:+543511234567" className="text-gray-400 hover:text-white transition-colors">
                  +54 351 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:info@arcata.com" className="text-gray-400 hover:text-white transition-colors">
                  info@arcata.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ARCATA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
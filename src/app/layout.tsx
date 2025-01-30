import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import LayoutContent from '@/components/LayoutContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ARCATA - Ropa de Diseño',
  description: 'Descubre la nueva colección de ARCATA. Ropa de diseño inspirada en la costa oeste americana y el estilo argentino.',
  keywords: 'ropa, moda, diseño, argentina, arcata, california',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
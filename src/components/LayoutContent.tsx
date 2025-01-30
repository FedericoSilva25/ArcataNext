'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
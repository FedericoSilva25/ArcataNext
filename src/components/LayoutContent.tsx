'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Cart 
        isOpen={isCartOpen}
        onCloseAction={() => setIsCartOpen(false)}
      />
    </div>
  );
}
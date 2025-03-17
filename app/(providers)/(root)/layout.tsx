'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { ReactNode } from 'react';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;

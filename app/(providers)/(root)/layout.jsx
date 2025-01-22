'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;

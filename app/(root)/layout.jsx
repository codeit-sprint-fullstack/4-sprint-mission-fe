'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// queryClient 연동
const queryClient = new QueryClient();

function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default RootLayout;

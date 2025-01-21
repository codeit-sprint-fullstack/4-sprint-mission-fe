'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default RootLayout;

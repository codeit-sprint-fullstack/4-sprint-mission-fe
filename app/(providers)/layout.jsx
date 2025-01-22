import { AuthProvider } from '@/contexts/AuthContext';
import { TanstackQueryProvider } from '@/libs/tanstack-query';

function ProvidersLayout({ children }) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;

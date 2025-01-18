import TanstackQueryProvider from "@/lib/tanstack-query";

function ProvidersLayout({ children }) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}

export default ProvidersLayout;

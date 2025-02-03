import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { TanstackQueryProvider } from "@/libs/tanstack-query";
import React from "react";

function ProvidersLayout({ children }) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
}
export default ProvidersLayout;

'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalElement, setModalElement] = useState();

  const open = (element) => setModalElement(element);
  const close = () => setModalElement(null);

  const value = { open, close };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}

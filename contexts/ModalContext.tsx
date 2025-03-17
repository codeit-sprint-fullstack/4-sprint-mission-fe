'use client';

import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ModalContextValue {
  open?: (element: ReactElement) => void;
  close?: () => void;
}
const ModalContext = createContext<ModalContextValue>({});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalElement, setModalElement] = useState<ReactElement | null>();

  const open = (element: ReactElement) => setModalElement(element);
  const close = () => setModalElement(null);

  const value = { open, close };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}

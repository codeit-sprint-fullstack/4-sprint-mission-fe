'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (
      isLoggedIn &&
      (pathName === '/auth/sign-up' || pathName === '/auth/log-in')
    )
      router.replace('/products');
  }, [isLoggedIn, pathName]);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
    setIsAuthInitialized(true);
  }, []);

  const value = {
    isAuthInitialized,
    isLoggedIn,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

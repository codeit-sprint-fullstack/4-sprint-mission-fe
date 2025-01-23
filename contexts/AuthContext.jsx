'use client';

import api, { client } from '@/api';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    // #1. api의 헤더에서 accessToken제거
    client.defaults.headers['Authorization'] = '';

    // #2. 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  // 로그인/회원가입 페이지 진입 시 로그인 상태면 상품페이지로 이동시키기
  useEffect(() => {
    if (
      isLoggedIn &&
      (pathName === '/auth/sign-up' || pathName === '/auth/log-in')
    )
      router.replace('/products');
  }, [isLoggedIn, pathName]);

  //
  useEffect(() => {
    async function initializeAuthStatus() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        // if (!accessToken) return;

        const user = await api.getMe();
        setUserInfo(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthInitialized(true);
      }
    }
    initializeAuthStatus();
  }, [isLoggedIn]);

  const value = {
    isAuthInitialized,
    isLoggedIn,
    userInfo,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

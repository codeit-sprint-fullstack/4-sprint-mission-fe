"use client";

import api, { codeitClient } from "@/api";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 로그인 상태면 페이지 이동
  useEffect(() => {
    const prevRefreshToken = localStorage.getItem("refreshToken");
    if (prevRefreshToken && (pathname === "/signup" || pathname === "/login"))
      router.replace("/products");
  }, [isLoggedIn, pathname]);

  // 새로고침해도 로그인 유지되게게
  useEffect(() => {
    async function initializeLogInStatus() {
      try {
        const prevRefreshToken = localStorage.getItem("refreshToken");
        if (!prevRefreshToken) return;

        await api.refreshToken(prevRefreshToken);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("refreshToken");
      } finally {
        setIsAuthInitialized(true);
      }
    }
    initializeLogInStatus();
  }, []);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    setIsLoggedIn(false);
    codeitClient.defaults.headers["Authorization"] = "";
    localStorage.removeItem("refreshToken");
  };

  const value = {
    logIn,
    logOut,
    isLoggedIn,
    isAuthInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

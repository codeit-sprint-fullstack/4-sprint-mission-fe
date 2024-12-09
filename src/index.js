import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css"
import "./index.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import RegistrationPage from "./pages/RegistrationPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="items" element={<ItemPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="*" element={<h1>404: 페이지를 찾을 수 없습니다</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
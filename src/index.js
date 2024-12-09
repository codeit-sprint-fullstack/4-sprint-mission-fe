import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css"
<<<<<<< HEAD
import './index.css';
import App from './components/App';

=======
import "./index.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import RegistrationPage from "./pages/RegistrationPage";
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
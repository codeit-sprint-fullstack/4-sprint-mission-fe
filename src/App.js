import "./App.css";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="items" element={<ProductPage />} />
    </Routes>
  );
};

export default App;

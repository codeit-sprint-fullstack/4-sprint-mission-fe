import "./App.css";
import FreeBoardPage from "./pages/FreeBoardPage";
import LandingPage from "./pages/LandingPage";
import ProductListPage from "./pages/ProductListPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="items" element={<ProductListPage />} />
      <Route path="freeboard" element={<FreeBoardPage />} />
    </Routes>
  );
};

export default App;

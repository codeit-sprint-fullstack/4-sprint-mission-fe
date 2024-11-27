import "./App.css";
import FreeBoardPage from "./pages/FreeBoardPage";
import LandingPage from "./pages/LandingPage";
import ProductListPage from "./pages/ProductListPage";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="items" element={<ProductListPage />} />
      <Route path="freeboard" element={<FreeBoardPage />} />
      <Route path="registration" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;

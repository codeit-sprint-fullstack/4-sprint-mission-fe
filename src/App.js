import ItemsPage from "./page/ItemsPage";
import MainPage from "./page/MainPage";
import { Product } from "./page/Product";
import { RegistrationPage } from "./page/RegistrationPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="Product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

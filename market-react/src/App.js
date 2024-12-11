import "./App.css";
import FreePostListPage from "./pages/FreePostListPage.js";
import LandingPage from "./pages/LandingPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage.js";
import PostPage from "./pages/PostPage.js";
import ProductPage from "./pages/ProductPage.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="items">
        <Route index element={<ProductListPage />} />
        <Route path="item" element={<ProductPage />} />
        {/* <Route path=":itemId" element={<ProductPage />} /> */}
      </Route>
      <Route path="freepost">
        <Route index element={<FreePostListPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>
      <Route path="registration" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;
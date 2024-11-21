import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import { useEffect, useState } from "react";
import { getProducts } from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);

  const handleLoad = async (options) => {
    const result = await getProducts(options);
    const { list } = result;
    setItems(list);
    // setItems((prevItems) => [list, ...prevItems]);
  };
  const handleLoadBest = async (options) => {
    const result = await getProducts(options);
    const { list } = result;
    setBestItems(list);
    // setItems((prevItems) => [list, ...prevItems]);
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: 10, orderBy: "recent" });
    handleLoadBest({ page: 1, pageSize: 4, orderBy: "favorite" });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <ProductList isBest={true} items={bestItems} />
        <ProductList items={items} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

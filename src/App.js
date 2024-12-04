import { NavigationBar } from "./Component/NavigationBar";
import { BestProduct } from "./Component/BestProduct";
import { useState, useEffect } from "react";
import { getProductList } from "./Api/ProductsService";
import { SellingProduct } from "./Component/SellingProduct";
import { ProductMenu } from "./Component/ProductMenu";
import { PageButton } from "./Component/PageButton";
import { Footer } from "./Component/Footer";
import { useAsync } from "../src/hook/useAsync";
import { useDeviceSize } from "./hook/useDeviceSize";

const DEFAULTORDER = "recent";
const FAVORITEORDER = "favorite";
const DEFAULPAGE = 1;
function App() {
  const [order, setOrder] = useState(DEFAULTORDER);
  const [Bestitems, setBestItems] = useState([]);
  const [sellingitems, setSellingItems] = useState([]);
  const [sellingPage, setSellingPage] = useState(DEFAULPAGE);
  const [keyword, setKeyword] = useState("");
  const [maxPage, setMaxPage] = useState(1);
  const [loading, error, getProductListAsync] = useAsync(getProductList);
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  const getPageSize = () => (isDesktop ? 10 : isTablet ? 6 : 4);
  const getBestPageSize = () => (isDesktop ? 4 : isTablet ? 2 : 1);

  useEffect(() => {
    let bestPageSize = getBestPageSize();
    handleLoadBest({
      order: FAVORITEORDER,
      page: DEFAULPAGE,
      pageSize: bestPageSize,
    });
  }, [isDesktop, isTablet, isMobile]);

  useEffect(() => {
    let pageSize = getPageSize();
    setMaxPage(Math.ceil(sellingitems.totalCount / pageSize) || 1);
    console.log(maxPage);
    handleLoadSelling({
      order: order,
      page: sellingPage,
      pageSize: pageSize,
      keyword: keyword,
    });
  }, [
    order,
    keyword,
    isDesktop,
    isTablet,
    isMobile,
    sellingPage,
    sellingitems.totalCount,
  ]);

  const handleLoadBest = async (Options) => {
    let data = await getProductListAsync(Options);
    setBestItems(data);
  };

  const handleLoadSelling = async (Options) => {
    let data = await getProductListAsync(Options);
    setSellingItems(data);
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <BestProduct items={Bestitems.list}></BestProduct>
      <div>
        <ProductMenu
          handleOrderChange={setOrder}
          handleKeywordChange={setKeyword}
        />
        <SellingProduct items={sellingitems.list} loading={loading} />
      </div>
      <PageButton
        currentPage={sellingPage}
        handleSellingPage={setSellingPage}
        maxPage={maxPage}
      />
      <Footer />
      {error?.message && <span>error.message</span>}
    </div>
  );
}

export default App;

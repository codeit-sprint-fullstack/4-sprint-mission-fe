import { NavigationBar } from "../component/NavigationBar";
import { BestProduct } from "../component/BestProduct";
import { useState, useEffect } from "react";
import { getProductList } from "../api/ProductsService";
import { SellingProduct } from "../component/SellingProduct";
import { ProductMenu } from "../component/ProductMenu";
import { PageButton } from "../component/PageButton";
import { Footer } from "../component/Footer";
import { useAsync } from "../hook/useAsync";
import { useDeviceSize } from "../hook/useDeviceSize";

const DEFAULTORDER = "recent";
// const FAVORITEORDER = "favorite";
const DEFAULPAGE = 1;
function ItemsPage() {
  const [order, setOrder] = useState(DEFAULTORDER);
  // const [bestitems, setBestItems] = useState([]);
  const [sellingitems, setSellingItems] = useState({
    list: [],
    totalCount: 1,
  });
  const [sellingPage, setSellingPage] = useState(DEFAULPAGE);
  const [keyword, setKeyword] = useState("");
  const [maxPage, setMaxPage] = useState(1);
  const [loading, error, getProductListAsync] = useAsync(getProductList);
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  const getPageSize = () => (isDesktop ? 10 : isTablet ? 6 : 4);
  // const getBestPageSize = () => (isDesktop ? 4 : isTablet ? 2 : 1);

  // useEffect(() => {
  //   let bestPageSize = getBestPageSize();
  //   handleLoadBest({
  //     order: FAVORITEORDER,
  //     page: DEFAULPAGE,
  //     pageSize: bestPageSize,
  //   });
  // }, [isDesktop, isTablet, isMobile]);

  useEffect(() => {
    let pageSize = getPageSize();
    setMaxPage(Math.ceil(sellingitems.totalCount / pageSize) || 1);
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

  // const handleLoadBest = async (Options) => {
  //   let data = await getProductListAsync(Options);
  //   setBestItems(data);
  // };

  const handleLoadSelling = async (Options) => {
    let data = await getProductListAsync(Options);
    setSellingItems(data || { list: [], totalCount: 1 });
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
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

export default ItemsPage;

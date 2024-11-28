import { useParams } from "react-router-dom";
import Header from "../components/Header.js";

function ProductPage() {
  const { productId } = useParams();
  return (
    <div>
      <Header />
      상품 상세 페이지
    </div>
  );
}
export default ProductPage;

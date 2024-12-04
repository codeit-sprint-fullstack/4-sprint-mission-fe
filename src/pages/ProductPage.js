import { useParams } from 'react-router-dom';
import Header from '../components/Header.js';

function ProductPage() {
  const { itemId } = useParams();
  return (
    <div>
      <Header />
      {`${itemId}의 상품 상세 페이지`}
    </div>
  );
}
export default ProductPage;

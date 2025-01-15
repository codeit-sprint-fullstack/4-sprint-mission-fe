import icHeart from '@/assets/images/ic_heart.png';
import defaultImg from '@/assets/images/img_default.png';
import Dropdown from '../common/Dropdown';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../common/Button';

function ProductItem({ product }) {
  const { name, price, favoriteCount = 0 } = product;

  return (
    <Link href={`/products/${product.id}`}>
      <div>
        <Image src={defaultImg} alt="기본 이미지" />
        <p className="text-[#1f2937] text-sm mt-4">{name}</p>
        <p className="text-[#1f2937] mt-4 mb-[14px] font-semibold">{`${price.toLocaleString()}원`}</p>
        <div className="text-[#4b5563] flex items-center text-xs">
          <Image src={icHeart} alt="heart" className="w-4 mr-[6px]" />
          {favoriteCount}
        </div>
      </div>
    </Link>
  );
}

function ProductList({ products = [], value, onClick, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.search.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center h-[42px] mb-6">
        <div className="text-xl font-semibold flex-grow-1">판매 중인 상품</div>
        <div className="flex">
          <form
            className="sm:w-[300px] sm:row-start-2 row-end-3 mr-3"
            onSubmit={handleSubmit}
          >
            <input
              name="search"
              className="bg-[#f3f4f6] placeholder-gray-400 w-[325px] h-[42px] rounded-lg pl-4"
              placeholder="검색할 상품을 입력해주세요"
            />
          </form>
          <Link href="/registration">
            <Button>상품 등록하기</Button>
          </Link>
          <Dropdown value={value} onSelect={onClick} />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

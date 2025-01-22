'use client';

import api from '@/api';
import useDeviceSize from '@/hooks/useDeviceSize';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Pagination from '../common/Pagination';
import ProductItem from './ProductItem';

function ProductList({ initialData }) {
  const [sort, setSort] = useState('latest'); // 정렬 옵션
  const [keyword, setKeyword] = useState(''); // 검색
  const [page, setPage] = useState(1); // pagination에 필요
  const [loadingError, setloadingError] = useState(null);
  const { isTablet, isMobile } = useDeviceSize(); // 미디어 쿼리

  // const currentDevice = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';
  const options = {
    sort: sort,
    keyword: keyword,
    skip: (page - 1) * 10,
    limit: 10,
    // skip: isTablet // 반응형 UI 구현 시 적용
    //   ? (page - 1) * 6
    //   : isMobile
    //   ? (page - 1) * 4
    //   : (page - 1) * 10,
    // limit: isTablet ? 6 : isMobile ? 4 : 10, // 반응형 UI 구현 시 적용
  };

  // 반응형 UI 구현 시 적용
  // const { products: initialProducts, searchCount: initialSearchCount } =
  //   initialData;
  // const newInitialProducts = initialProducts.slice(
  //   0,
  //   isTablet ? 6 : isMobile ? 4 : 10
  // );

  const { data: result } = useQuery({
    queryKey: ['products', { options }],
    queryFn: () => api.getProducts(options),
    // 반응형 UI 구현 시 적용
    // initialData: {
    //   products: newInitialProducts,
    //   searchCount: initialSearchCount,
    // },
    initialData,
  });
  const { list: products, searchCount } = result; // https://panda-market-api.vercel.app/products 사용 시
  // const { products, searchCount } = result;
  const maxPage = Math.ceil(searchCount / options.limit);

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(e.target.search.value);
    /**
     * 키워드 검색을 했을 때 페이지를 1로 변경하기
     * - (문제 케이스) 4페이지에서 검색을 했는데 검색 결과의 페이지 수가 이보다 적을 경우 보이지 않음
     */
    if (keyword) {
      setPage(1);
    }
  };

  return (
    <div>
      {loadingError?.message && <span>{loadingError.message}</span>}
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
          <Dropdown value={sort} onSelect={setSort} />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={page} maxPage={maxPage} onClick={setPage} />
    </div>
  );
}

export default ProductList;

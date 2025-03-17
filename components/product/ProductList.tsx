'use client';

import api from '@/api';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { ProductListItemDto } from '@/types/dtos/product.dto';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import AlertModal from '../common/AlertModal';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Pagination from '../common/Pagination';
import ProductItem from './ProductItem';

function ProductList() {
  const [sort, setSort] = useState<string>('recent'); // 정렬 옵션 - panda
  // const [sort, setSort] = useState('latest'); // 정렬 옵션
  const [keyword, setKeyword] = useState<string>(''); // 검색
  const [page, setPage] = useState<number>(1); // pagination에 필요
  // const { isTablet, isMobile } = useDeviceSize(); // 미디어 쿼리
  const { isLoggedIn } = useAuth();
  const modal = useModal();
  const router = useRouter();

  // ----- panda 마켓 -----------

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

  const { data: result } = useQuery<{
    products: ProductListItemDto[];
    searchCount: number;
  }>({
    queryKey: ['products', { ...options }],
    queryFn: () => {
      return api.getProducts(options);
    },
    staleTime: 120000,
    retry: 0,
    // 반응형 UI 구현 시 적용
    // initialData: {
    //   products: newInitialProducts,
    //   searchCount: initialSearchCount,
    // },
    // initialData: initialData ? initialData : { list: [], totalCount: 0 },
  });
  // const { list: products, totalCount } = result; // https://panda-market-api.vercel.app/products 사용 시
  // const maxPage = Math.ceil(totalCount / options.pageSize); // https://panda-market-api.vercel.app/products 사용 시
  const products = result?.products || [];
  const searchCount = result?.searchCount || 0;
  const maxPage = Math.ceil(searchCount / options.limit);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const { search } = e.target as HTMLFormElement;
    setKeyword(search.value);
    /**
     * 키워드 검색을 했을 때 페이지를 1로 변경하기
     * - (문제 케이스) 4페이지에서 검색을 했는데 검색 결과의 페이지 수가 이보다 적을 경우 보이지 않음
     */
    if (keyword) {
      setPage(1);
    }
  };

  const handleClickRegitstBtn = () => {
    if (!isLoggedIn)
      return modal.open?.(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );

    router.push('/products/post');
  };

  // if (isFetching || isLoading || isPending) return <div>로딩 중</div>;
  // if (isFetching || isLoading || isPending) return <Skeleton />;

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
          {/* <Link href="/registration"> */}
          <Button onClick={handleClickRegitstBtn}>상품 등록하기</Button>
          {/* </Link> */}
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

'use client';

import api from '@/api';
import { ProductListItemDto } from '@/types/dtos/product.dto';
import { useQuery } from '@tanstack/react-query';
import ProductItem from './ProductItem';

function BestProductList() {
  const { data: result } = useQuery({
    queryKey: ['products', { isBest: true }],
    queryFn: () =>
      api.getProducts({
        sort: 'favorite',
        skip: 0,
        keyword: '',
        limit: 4,
      }),
  });

  const products: ProductListItemDto[] = result?.products || [];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center h-[42px] mb-6">
        <div className="text-xl font-semibold flex-grow-1">베스트 상품</div>
      </div>

      <div className="grid gap-6 grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestProductList;

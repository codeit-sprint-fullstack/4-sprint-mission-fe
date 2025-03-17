import { ProductEntity } from '../entities/product.entity';

export interface ProductPostDto {
  name: string;
  description: string;
  tags: string[];
  writer: string;
  price: number;
  images: File[];
}

export type ProductDetailDto = Omit<ProductEntity, 'updatedAt' | 'commments'>;

export type ProductListItemDto = Pick<
  ProductDetailDto,
  'id' | 'imgUrls' | 'name' | 'count' | 'price'
>;

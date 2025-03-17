import { CommentItemDto } from '../dtos/comment.dto';

export interface ProductEntity {
  id: string;
  writer: string;
  name: string;
  description: string;
  price: number;
  count: number;
  isFavorite: boolean;
  tags: string[];
  imgUrls: string[];
  createdAt: Date;
  updatedAt: Date;
  comments: CommentItemDto[];
}

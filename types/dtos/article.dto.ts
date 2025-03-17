import { ArticleEntity } from '../entities/article.entity';

export type ArticleDetailDto = Omit<ArticleEntity, 'updatedAt' | 'commments'>;

export type ArticleCardDto = Omit<ArticleDetailDto, 'isFavorite' | 'content'>;

export type BestArticleCardDto = Omit<ArticleCardDto, 'id'>;

export type ArticleListDto = Omit<ArticleEntity, 'commments'>;

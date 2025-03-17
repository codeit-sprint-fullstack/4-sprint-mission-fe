'use client';

import icHeart from '@/assets/images/ic_heart.png';
import icHeartFill from '@/assets/images/ic_heart_fill.png';
import icProfile from '@/assets/images/ic_profile.png';
import api from '../../api';
// import { useAuth } from '@/contexts/AuthContext';
import { ArticleDetailDto } from '@/types/dtos/article.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import { formattedDate } from '../../utils/formattedDate';
import lineBreakText from '../../utils/lineBreakText';
import AlertModal from '../common/AlertModal';
import PopMenuButton from '../common/PopMenuButton';

interface Props {
  articleId: string;
  initialData: ArticleDetailDto;
}

function ArticleDetail({ articleId, initialData }: Props) {
  const { isLoggedIn } = useAuth();
  const modal = useModal();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['article', { articleId }],
    queryFn: () => api.getArticle(articleId),
    initialData,
    staleTime: 120000,
    retry: 0,
  });

  const { mutate: likeArticle } = useMutation({
    mutationFn: () => api.likeArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', { articleId }] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
  const { mutate: unLikeArticle } = useMutation({
    mutationFn: () => api.unLikeArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', { articleId }] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  const article: ArticleDetailDto = data;

  const handleClickHeartImage = () => {
    if (!isLoggedIn)
      return modal.open?.(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );
    if (article.isFavorite) {
      unLikeArticle();
    } else {
      likeArticle();
    }
  };

  console.log('article', article);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold"> {article.title}</p>
        <PopMenuButton postId={article.id} postType="articles" />
      </div>
      <div
        className={`flex items-center text-[#4B5563] text-sm h-[72px] border-b mb-6`}
      >
        <Image className="shrink-0 w-10 h-10" src={icProfile} alt="profile" />
        <p className="ml-4 mr-2">{article.writer}</p>
        <p className="text-[#9CA3AF]">{formattedDate(article.createdAt)}</p>
        <div className="flex h-10 w-[1px] bg-[#d1d4da] mx-8"></div>
        <div className="flex items-center border rounded-full px-3 py-1">
          <Image
            className="w-8 h-8 mr-1 cursor-pointer"
            src={article.isFavorite ? icHeartFill : icHeart}
            alt="heart"
            onClick={handleClickHeartImage}
          />
          <p>{article._count.articleLikes}</p>
        </div>
      </div>
      <p className="text-lg">{lineBreakText(article.content)}</p>
    </div>
  );
}

export default ArticleDetail;

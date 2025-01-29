'use client';

import api from '@/api';
import icBack from '@/assets/images/ic_back.png';
import replyEmpty from '@/assets/images/img_reply_empty.png';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AlertModal from '../common/AlertModal';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Comment from './Comment';

function Comments({ articleId, productId }) {
  const [content, setContent] = useState('');
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const modal = useModal();
  const { isLoggedIn } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['comments', articleId ? { articleId } : { productId }],
    queryFn: () =>
      articleId
        ? api.getCommentsOfArticle(articleId, { limit: 10 })
        : api.getCommentsOfProduct(productId, { limit: 10 }),
    staleTime: 120000,
    retry: 0,
  });

  const { mutate: postComment, isPending: isPendingPost } = useMutation({
    mutationFn: (content) =>
      articleId
        ? api.postArticleComment(articleId, { content })
        : api.postProductComment(productId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', articleId ? { articleId } : { productId }],
      });
    },
  });

  const { mutate: patchComment, isPending: isPendingPatch } = useMutation({
    mutationFn: ({ commentId, content }) => {
      return api.editComment(commentId, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', articleId ? { articleId } : { productId }],
      });
    },
  });

  const { mutate: deleteComment, isPending: isPendingDelete } = useMutation({
    mutationFn: (commentId) => api.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', articleId ? { articleId } : { productId }],
      });
    },
  });

  const handleRegistClick = async () => {
    if (!isBtnActive) return;
    if (!isLoggedIn)
      return modal.open(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );
    setIsSubmitting(true);
    setIsBtnActive(false);
    postComment(content);
    setContent('');
    setIsSubmitting(false);
  };

  const handleRegistEditClick = async (commentId, editedContent) => {
    if (editedContent === '') return;
    setIsSubmitting(true);
    setIsBtnActive(false);
    patchComment({ commentId, content: editedContent });
    setContent('');
    setIsSubmitting(false);
  };

  const handleDeleteClick = async (commentId) => {
    deleteComment(commentId);
  };

  useEffect(() => {
    /**
     * '등록' 버튼 활성화 조건 체크
     */
    if (content !== '') {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [content]);
  const comments = data?.list; // panda 마켓 api는 list
  // const comments = data?.comments;

  if (isLoading) return '로딩 중';

  return (
    <div>
      <div className="mt-8 mb-10">
        <p className="font-semibold mb-2">
          {articleId ? '댓글달기' : '문의하기'}
        </p>
        <div>
          <form>
            <textarea
              name="comment"
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[104px] rounded-lg px-6 py-4"
              placeholder={
                articleId
                  ? '댓글을 입력해주세요(200자 이내)'
                  : '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleRegistClick}
            disabled={!isBtnActive || isPendingPatch || isPendingPost}
          >
            {isSubmitting ? <Loader /> : '등록'}
          </Button>
        </div>
      </div>

      {comments.length !== 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteClick}
            // onEdit={handleEditClick}
            onRegistEdit={handleRegistEditClick}
          />
        ))
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-[155px] h-[208px] flex flex-col justify-center items-center">
            <Image src={replyEmpty} alt="댓글없음" className="w-[140px] mb-4" />
            <p className="text-center text-[#9CA3AF]">
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <Link href={articleId ? '/articles' : '/products'}>
          <button className="h-12 shrink-0 px-6 py-2 bg-[#3692FF] text-white rounded-full hover:bg-[#1469CF] active:brightness-75 flex items-center mt-12">
            <p className="mr-2">목록으로 돌아가기</p>
            <Image src={icBack} alt="목록으로가기" className="w-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Comments;

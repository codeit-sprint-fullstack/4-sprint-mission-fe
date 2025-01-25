'use client';

import api from '@/api';
import icBack from '@/assets/images/ic_back.png';
import replyEmpty from '@/assets/images/img_reply_empty.png';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Comment from './Comment';

function Comments({ articleId }) {
  const [content, setContent] = useState('');
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['comments', { articleId }],
    queryFn: () => api.getCommentsOfArticle(articleId, { limit: 10 }),
  });

  const { mutate: postComment } = useMutation({
    mutationFn: (content) => api.postArticleComment(articleId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
  });

  const { mutate: patchComment } = useMutation({
    mutationFn: ({ commentId, content }) => {
      return api.editComment(commentId, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId) => api.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
  });

  const handleRegistClick = async () => {
    if (!isBtnActive) return;
    setIsSubmitting(true);
    setIsBtnActive(false);
    console.log('content', content);
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
    console.log('do Delete');
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
  const comments = data?.comments;

  if (isLoading) return '로딩 중';

  return (
    <div>
      <div className="mt-8 mb-10">
        <p className="font-semibold mb-2">댓글달기</p>
        <div>
          <form>
            <textarea
              name="comment"
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[104px] rounded-lg px-6 py-4"
              placeholder="댓글을 입력해주세요(200자 이내)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleRegistClick} disabled={!isBtnActive}>
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
        <Link href={'/articles'}>
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

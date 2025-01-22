'use client';

import api from '@/api';
import icBack from '@/assets/images/ic_back.png';
import replyEmpty from '@/assets/images/img_reply_empty.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Comment from './Comment';

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [refreshValue, setRefreshValue] = useState(0);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCommnets = async (options) => {
    const result = await api.getCommentsOfArticle(articleId, options);
    setComments(result.comments);
  };

  const handleRegistClick = async () => {
    if (!isBtnActive) return;
    setIsSubmitting(true);
    setIsBtnActive(false);
    await api.postArticleComment(articleId, { content });
    // 댓글 목록 자동 갱신을 위한 코드
    setRefreshValue((prevValue) => prevValue + 1);
    setContent('');
    setIsSubmitting(false);
  };

  const handleRegistEditClick = async (commentId, commentText) => {
    if (!isBtnActive) return;
    setIsSubmitting(true);
    setIsBtnActive(false);
    await api.editComment(commentId, { content: commentText });
    setRefreshValue((prevValue) => prevValue + 1);
    setContent('');
    setIsSubmitting(false);
  };

  const handleDeleteClick = async (commentId) => {
    await api.deleteComment(commentId);
    setRefreshValue((prevValue) => prevValue + 1);
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

  useEffect(() => {
    loadCommnets({ limit: 10 });
  }, [refreshValue]);

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

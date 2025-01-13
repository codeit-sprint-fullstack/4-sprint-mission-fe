'use client';

import { useEffect, useState } from 'react';
import Comment from './Comment';
import api from '@/api';
import Button from './Button';
import replyEmpty from '@/assets/images/img_reply_empty.png';
import icBack from '@/assets/images/ic_back.png';
import Image from 'next/image';
import Link from 'next/link';

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [refreshValue, setRefreshValue] = useState(0);

  const handleCommentsLoad = async (options) => {
    const result = await api.getCommentsOfArticle(articleId, options);
    setComments(result.comments);
  };

  const handleRegistClick = async () => {
    if (content === '') return;
    await api.postArticleComment(articleId, { content });
    // 댓글 목록 자동 갱신을 위한 코드
    setRefreshValue((prevValue) => prevValue + 1);
    setContent('');
  };

  const handleRegistEditClick = async (commentId, commentText) => {
    if (commentText === '') return;
    await api.editComment(commentId, { content: commentText });
    setRefreshValue((prevValue) => prevValue + 1);
    setContent('');
  };

  const handleDeleteClick = async (commentId) => {
    await api.deleteComment(commentId);
    setRefreshValue((prevValue) => prevValue + 1);
  };

  // const handleEditClick = async (commentId) => {};

  useEffect(() => {
    handleCommentsLoad({ limit: 10 });
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
              placeholder="댓글을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleRegistClick} disabled={content === ''}>
            등록
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
          <button className="h-12 shrink-0 px-6 py-2 bg-[#3692FF] text-white rounded-full hover:bg-[#1469CF] flex items-center mt-12">
            <p className="mr-2">목록으로 돌아가기</p>

            <Image src={icBack} alt="목록으로가기" className="w-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Comments;

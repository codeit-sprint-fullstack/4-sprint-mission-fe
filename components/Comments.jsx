'use client';

import { useEffect, useState } from 'react';
import Comment from './Comment';
import api from '@/api';
import Button from './Button';

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

  const handleDeleteClick = async (commentId) => {
    await api.deleteComment(commentId);
    setRefreshValue((prevValue) => prevValue + 1);
  };

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
          <Button onClick={handleRegistClick} isDisabled={content === ''}>
            등록
          </Button>
        </div>
      </div>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default Comments;

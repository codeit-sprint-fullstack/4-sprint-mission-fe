'use client';

import { useEffect, useState } from 'react';
import Comment from './Comment';
import api from '@/api';
import Button from './Button';

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const handleCommentsLoad = async (options) => {
    const result = await api.getCommentsOfArticle(articleId, options);
    setComments(result.comments);
  };

  const handleRegistClick = async (e) => {
    if (content === '') return;
    console.log(content);
    e.preventDefault();
    await api.postArticleComment(articleId, { content });
  };

  useEffect(() => {
    handleCommentsLoad({ limit: 10 });
  }, []);

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
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;

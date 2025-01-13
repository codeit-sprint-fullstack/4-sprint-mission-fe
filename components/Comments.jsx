'use client';

import { useEffect, useState } from 'react';
import Comment from './Comment';
import api from '@/api';

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);

  const handleCommentsLoad = async (options) => {
    const result = await api.getCommentsOfArticle(articleId, options);
    setComments(result.comments);
  };

  useEffect(() => {
    handleCommentsLoad({ limit: 3 });
  }, []);

  return (
    <div>
      <div className="mt-8 mb-20">
        <p className="font-semibold mb-2">댓글달기</p>
        <div>
          <form>
            <textarea
              name="commnet"
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[104px] rounded-lg px-6 py-4"
              placeholder="댓글을 입력해주세요"
            />
          </form>
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;

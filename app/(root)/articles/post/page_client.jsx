'use client';

import api from '@/api';
import Button from '@/components/Button';
import { useState } from 'react';

function ArticlePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleRegistClick = async () => {
    console.log('실행');
    console.log(title, content);
    await api.postArticle({ title, content });
  };

  return (
    <main className="max-w-[1200px] mx-auto my-6">
      <div>
        <form>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">게시글 쓰기</p>
            <Button onClick={handleRegistClick}>등록</Button>
          </div>
          <p className="text-lg font-bold mb-3">*제목</p>
          <p className="mb-6">
            <input
              type="text"
              id="title"
              name="title"
              required
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-14 rounded-lg px-6"
              placeholder="제목을 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p className="text-lg font-bold mb-3">*내용</p>
          <textarea
            name="content"
            className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[282px] rounded-lg px-6 py-4"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </div>
    </main>
  );
}

export default ArticlePostPage;

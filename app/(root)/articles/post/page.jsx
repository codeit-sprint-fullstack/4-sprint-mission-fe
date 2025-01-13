'use client';

import api from '@/api';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ArticlePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const isCheckedValid = title !== '' && content !== '';

  const handleRegistClick = async () => {
    if (!isCheckedValid) return;
    const articleId = await api.postArticle({ title, content });
    router.push(`/articles/${articleId}`);
  };

  return (
    <main className="max-w-[1200px] mx-auto my-6">
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">게시글 쓰기</p>
            <Button onClick={handleRegistClick} disabled={!isCheckedValid}>
              등록
            </Button>
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

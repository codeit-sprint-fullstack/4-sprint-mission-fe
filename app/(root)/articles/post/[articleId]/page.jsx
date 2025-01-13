'use client';

import api from '@/api';
import Button from '@/components/Button';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ArticleEditPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const isCheckedValid = title !== '' && content !== '';
  const params = useParams();

  const handleArticleLoad = async () => {
    const article = await api.getArticle(params.articleId);
    setContent(article.content);
    setTitle(article.title);
  };

  const handleRegistClick = async () => {
    if (!isCheckedValid) return;
    const articleId = await api.editArticle({ title, content });
    router.push(`/articles/${articleId}`);
  };

  useEffect(() => {
    handleArticleLoad();
  }, []);

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
              defaultValue={title}
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-14 rounded-lg px-6"
              placeholder="제목을 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p className="text-lg font-bold mb-3">*내용</p>
          <textarea
            name="content"
            defaultValue={content}
            className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[282px] rounded-lg px-6 py-4"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </div>
    </main>
  );
}

export default ArticleEditPage;

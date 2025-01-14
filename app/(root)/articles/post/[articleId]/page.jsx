'use client';

import api from '@/api';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PageContainer from '@/components/common/Page';
import useCheckInputValid from '@/hooks/useCheckInputValid';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.articleId;
  const [isBtnActive, setIsBtnActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    inputValue: inputTitle,
    isValid: isValidTitle,
    isBeforeTouch: isBeforeTouchTitle,
    setInputValue: setInputTitle,
    handleBlur: handleTitleBlur,
    handleChange: handleTitleChange,
  } = useCheckInputValid((value) => value.trim() !== '' && value.length <= 30);
  const {
    inputValue: inputContent,
    isValid: isValidContent,
    isBeforeTouch: isBeforeTouchContent,
    setInputValue: setInputContent,
    handleBlur: handleContentBlur,
    handleChange: handleContentChange,
  } = useCheckInputValid((value) => value.length >= 10 && value.length <= 500);

  const loadArticle = async () => {
    const article = await api.getArticle(articleId);
    setInputContent(article.content);
    setInputTitle(article.title);
  };

  const handleRegistClick = async () => {
    if (!isBtnActive) return;
    setIsSubmitting(true);
    setIsBtnActive(false);
    //TODO: Loader확인을 위한 의도적 딜레이 부여(향후 setTimeout삭제)
    setTimeout(async () => {
      const articleId = await api.postArticle({
        title: inputTitle,
        content: inputContent,
      });
      router.push(`/articles/${articleId}`);
    }, 200);
  };

  useEffect(() => {
    loadArticle();
  }, []);

  useEffect(() => {
    /**
     * '등록' 버튼 활성화 조건 체크
     */
    if (isValidTitle && isValidContent) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [isValidTitle, isValidContent]);

  return (
    <PageContainer>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">게시글 쓰기</p>
            <Button onClick={handleRegistClick} disabled={!isBtnActive}>
              {isSubmitting ? <Loader /> : '등록'}
            </Button>
          </div>
          <p className="text-lg font-bold mb-3">*제목</p>
          <div className="mb-6">
            <input
              type="text"
              id="title"
              name="title"
              required
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-14 rounded-lg px-6"
              placeholder="제목을 입력해주세요"
              value={inputTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
            />
            {!isValidTitle && (
              <p className="ml-1 mt-2 text-red-500">
                1자 이상 30자 이내로 입력해 주세요.
              </p>
            )}
          </div>
          <p className="text-lg font-bold mb-3">*내용</p>
          <div>
            <textarea
              name="content"
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[282px] rounded-lg px-6 py-4 "
              placeholder="내용을 입력해주세요"
              value={inputContent}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
            />
            {!isValidContent && (
              <p className="ml-1 mt-1 text-red-500">
                10자 이상 500자 이내로 입력해 주세요.
              </p>
            )}
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

export default ArticleEditPage;

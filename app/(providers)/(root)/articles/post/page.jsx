'use client';

import api from '@/api';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PageContainer from '@/components/common/Page';
import useCheckInputValid from '@/hooks/useCheckInputValid';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ArticlePostPage() {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    inputValue: inputTitle,
    isValid: isValidTitle,
    isBeforeTouch: isBeforeTouchTitle,
    handleBlur: handleTitleBlur,
    handleChange: handleTitleChange,
  } = useCheckInputValid((value) => value.trim() !== '' && value.length <= 30);
  const {
    inputValue: inputContent,
    isValid: isValidContent,
    isBeforeTouch: isBeforeTouchContent,
    handleBlur: handleContentBlur,
    handleChange: handleContentChange,
  } = useCheckInputValid((value) => value.length >= 10 && value.length <= 500);

  const { mutate: createArticle } = useMutation({
    mutationFn: () =>
      api.postArticle({
        title: inputTitle,
        content: inputContent,
      }),
    onSuccess: (data) => {
      router.push(`/articles/${data}`);
    },
  });

  const handleRegistClick = async () => {
    if (!isBtnActive) return;
    setIsSubmitting(true);
    setIsBtnActive(false);
    createArticle();
  };

  6(() => {
    /**
     * '등록' 버튼 활성화 조건 체크
     * - 입력폼 최초 클릭 전인 경우 valid값과 상관없이 무조건 false(최초 페이지 로딩 시를 위한 처리)
     */
    if (
      !isBeforeTouchTitle &&
      isValidTitle &&
      !isBeforeTouchContent &&
      isValidContent
    ) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [isBeforeTouchTitle, isBeforeTouchContent, isValidTitle, isValidContent]);

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
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[282px] rounded-lg px-6 py-4"
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

export default ArticlePostPage;

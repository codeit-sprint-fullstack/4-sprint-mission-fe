'use client';

import api from '@/api';
import AlertModal from '@/components/common/AlertModal';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PageContainer from '@/components/common/Page';
import { useModal } from '@/contexts/ModalContext';
import useCheckInputValid from '@/hooks/useCheckInputValid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.articleId;
  const [isBtnActive, setIsBtnActive] = useState(true);

  const modal = useModal();
  const queryClient = useQueryClient();

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

  const { data: article } = useQuery({
    queryKey: ['article', { articleId }],
    queryFn: () => api.getArticle(articleId),
    retry: 0,
  });

  const { mutate: editArticle, isPending } = useMutation({
    mutationFn: () =>
      api.editArticle(articleId, { title: inputTitle, content: inputContent }),
    onSuccess: () => {
      function handleClickSuccess() {
        router.replace(`/articles/${articleId}`);
        modal.close();
      }
      // 게시글 수정 후 게시글 상세와 목록을 갱신
      queryClient.invalidateQueries({ queryKey: ['article', { articleId }] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      modal.open(
        <AlertModal
          alertMessage="게시글이 정상적으로 수정되었습니다."
          onClick={handleClickSuccess}
        />
      );
    },
  });

  const handleRegistClick = async () => {
    if (!isBtnActive) return;
    setIsBtnActive(false);
    editArticle();
  };

  useEffect(() => {
    if (!article) return;
    setInputContent(article.content);
    setInputTitle(article.title);
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
            <Button
              onClick={handleRegistClick}
              disabled={!isBtnActive || isPending}
            >
              {isPending ? <Loader /> : '등록'}
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

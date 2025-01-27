'use client';

import api from '@/api';
import icKebab from '@/assets/images/ic_kebab.png';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';

export const DropdownMenu = ({
  isCommentBtn,
  onDelete,
  onEdit,
  commentId,
  post,
  postType,
}) => {
  const router = useRouter();
  const modal = useModal();

  // 상품 삭제
  const { mutate: removeProduct } = useMutation({
    mutationFn: () => api.deleteProduct(post.id),
    onSuccess: () => {
      router.push('/products');
    },
  });
  const deleteProduct = async () => {
    modal.open(
      <ConfirmModal
        confirmMessage={'삭제하시겠습니까?'}
        onClickConfirm={removeProduct}
      />
    );
  };
  // 게시글 삭제
  const { mutate: removeArticle } = useMutation({
    mutationFn: () => api.deleteArticle(post.id),
    onSuccess: () => {
      router.push('/articles');
    },
  });
  const deleteArticle = async () => {
    modal.open(
      <ConfirmModal
        confirmMessage={'삭제하시겠습니까?'}
        onClickConfirm={removeArticle}
      />
    );
  };
  // 상품 수정
  const editProduct = () => {
    router.push(`/products/post/${post.id}`);
  };
  // 게시글 수정
  const editArticle = () => {
    router.push(`/articles/post/${post.id}`);
  };
  // 댓글 삭제
  const deleteComment = () => {
    modal.open(
      <ConfirmModal
        confirmMessage={'삭제하시겠습니까?'}
        onClickConfirm={() => onDelete(commentId)}
      />
    );
  };
  // 댓글 수정
  const editComment = () => {
    onEdit(true);
  };
  const MENU_ITEMS = [
    {
      text: '수정하기',
      clickMethod: isCommentBtn
        ? editComment
        : postType === 'articles'
        ? editArticle
        : editProduct,
    },
    {
      text: '삭제하기',
      clickMethod: isCommentBtn
        ? deleteComment
        : postType === 'articles'
        ? deleteArticle
        : deleteProduct,
    },
  ];

  return (
    <div className="absolute top-5 right-0 mt-2 w-[130px] font-normal text-[#6B7280] text-center bg-white rounded-lg border">
      {MENU_ITEMS.map((menuItem, i) => (
        <div
          className="h-10 flex justify-center items-center cursor-pointer hover:bg-slate-100 transition"
          key={i}
          onClick={menuItem.clickMethod}
        >
          {menuItem.text}
        </div>
      ))}
    </div>
  );
};

function PopMenuButton({
  isCommentBtn = false,
  onDelete,
  onEdit,
  commentId,
  post,
  postType,
}) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const buttonRef = useRef();
  const modal = useModal();
  const { isLoggedIn } = useAuth();

  // 게시글에 있는 메뉴 버튼과 댓글에 있는 메뉴 버튼의 스타일 구분
  const defaultClassName = clsx('w-6 h-6 cursor-pointer');
  const commentClassName = clsx({ 'absolute top-0 right-0': isCommentBtn });

  const handleMenuClick = () => {
    if (!isLoggedIn)
      return modal.open(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );
    setTimeout(() => setIsShowDropdown(!isShowDropdown), 200);
  };

  useEffect(() => {
    /**
     * 빈 공간 클릭 시 또는 다른 댓글의 버튼 클릭 시 메뉴가 닫히도록 하기 위해
     * - buttonRef없이 window listner만 적용할 경우 메뉴가 열려 있을 때 버튼을 누르면 닫히지 않음
     */
    const handleClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setTimeout(() => setIsShowDropdown(false), 200);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative">
      <Image
        src={icKebab}
        alt="more"
        className={clsx(defaultClassName, commentClassName)}
        onClick={handleMenuClick}
        ref={buttonRef}
      />
      {isShowDropdown && (
        <DropdownMenu
          isCommentBtn={isCommentBtn}
          onDelete={onDelete}
          onEdit={onEdit}
          commentId={commentId}
          post={post}
          postType={postType}
        />
      )}
    </div>
  );
}

export default PopMenuButton;

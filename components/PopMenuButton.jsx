'use client';

import Image from 'next/image';
import icKebab from '@/assets/images/ic_kebab.png';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const DropdownMenu = ({ isCommentBtn, onDelete, commentId, onEdit }) => {
  const editArticle = () => {
    console.log('edit article');
  };
  const deleteArticle = () => {
    console.log('delete article');
  };
  const editComment = () => {
    onEdit(true);
  };
  const deleteComment = () => {
    onDelete(commentId);
  };
  const MENU_ITEMS = [
    { text: '수정하기', clickMethod: isCommentBtn ? editComment : editArticle },
    {
      text: '삭제하기',
      clickMethod: isCommentBtn ? deleteComment : deleteArticle,
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

function PopMenuButton({ isCommentBtn = false, onDelete, commentId, onEdit }) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const buttonRef = useRef();

  // 게시글에 있는 메뉴 버튼과 댓글에 있는 메뉴 버튼의 스타일 구분
  const defaultClassName = clsx('w-6 h-6 cursor-pointer');
  const commentClassName = clsx({ 'absolute top-0 right-0': isCommentBtn });

  const handleMenuClick = () => {
    setTimeout(() => setIsShowDropdown(!isShowDropdown), 100);
  };

  useEffect(() => {
    /**
     * 빈 공간 클릭 시 또는 다른 댓글의 버튼 클릭 시 메뉴가 닫히도록 하기 위해
     * - buttonRef없이 window listner만 적용할 경우 메뉴가 열려 있을 때 버튼을 누르면 닫히지 않음
     */
    const handleClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setTimeout(() => setIsShowDropdown(false), 100);
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
          // onSelect={setIsShowDropdown}
          isCommentBtn={isCommentBtn}
          onDelete={onDelete}
          onEdit={onEdit}
          commentId={commentId}
        />
      )}
    </div>
  );
}

export default PopMenuButton;

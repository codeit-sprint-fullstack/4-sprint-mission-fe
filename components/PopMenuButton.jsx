'use client';

import Image from 'next/image';
import icKebab from '@/assets/images/ic_kebab.png';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const DropdownMenu = ({ onSelect, isCommentBtn }) => {
  const MENU_ITEMS = [
    { text: '수정하기', value: 'latest' },
    { text: '삭제하기', value: 'favorite' },
  ];

  const handleClick = (value) => () => {
    onSelect(false);
  };

  return (
    <div className="absolute top-5 right-0 mt-2 w-[130px] font-normal text-[#6B7280] text-center bg-white rounded-lg border">
      {MENU_ITEMS.map(({ text, value }) => (
        <div
          className="h-10 flex justify-center items-center cursor-pointer hover:bg-slate-100 transition"
          key={value}
          onClick={handleClick(value)}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

function PopMenuButton({ isCommentBtn = false }) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const buttonRef = useRef();

  const defaultClassName = clsx('w-6 h-6 cursor-pointer');
  const commentClassName = clsx({ 'absolute top-0 right-0': isCommentBtn });

  const handleMenuClick = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  useEffect(() => {
    /**
     * 빈 공간 클릭 시 또는 다른 댓글의 버튼 클릭 시 메뉴가 닫히도록 하기 위해
     * - buttonRef없이 window listner만 적용할 경우 메뉴가 열려 있을 때 버튼을 누르면 닫히지 않음
     */
    const handleClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsShowDropdown(false);
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
          onSelect={setIsShowDropdown}
          isCommentBtn={isCommentBtn}
        />
      )}
    </div>
  );
}

export default PopMenuButton;

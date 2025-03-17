'use client';

import icKebab from '@/assets/images/ic_kebab.png';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import AlertModal from './AlertModal';
import { DropdownMenu } from './DropDownMenu';

export interface PopupMenuProps {
  isCommentBtn?: boolean;
  onDelete?: (commentId: string) => void;
  onEdit?: (isEditing: boolean) => void;
  commentId?: string;
  postId?: string;
  postType?: string;
}

function PopMenuButton({
  isCommentBtn = false,
  onDelete,
  onEdit,
  commentId,
  postId,
  postType,
}: PopupMenuProps) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLImageElement | null>(null);
  const modal = useModal();
  const { isLoggedIn } = useAuth();

  // 게시글에 있는 메뉴 버튼과 댓글에 있는 메뉴 버튼의 스타일 구분
  const defaultClassName = clsx('w-6 h-6 cursor-pointer');
  const commentClassName = clsx({ 'absolute top-0 right-0': isCommentBtn });

  const handleMenuClick = () => {
    if (!isLoggedIn)
      return modal.open?.(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );
    setTimeout(() => setIsShowDropdown(!isShowDropdown), 200);
  };

  useEffect(() => {
    /**
     * 빈 공간 클릭 시 또는 다른 댓글의 버튼 클릭 시 메뉴가 닫히도록 하기 위해
     * - buttonRef없이 window listner만 적용할 경우 메뉴가 열려 있을 때 버튼을 누르면 닫히지 않음
     */
    const buttonInstance = buttonRef.current;
    const handleClick: EventListener = (e) => {
      if (buttonInstance && !buttonInstance.contains(e.target as HTMLElement)) {
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
          postId={postId}
          postType={postType}
        />
      )}
    </div>
  );
}

export default PopMenuButton;

import icProfile from '@/assets/images/ic_profile.png';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { formattedDate } from '@/utils/formattedDate';
import lineBreakText from '@/utils/lineBreakText';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../common/Button';
import PopMenuButton from '../common/PopMenuButton';

function Comment({ comment, onDelete, onRegistEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState(comment.content);
  const modal = useModal();
  const { isLoggedIn } = useAuth();

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleRegistEditClick = () => {
    if (!isLoggedIn)
      return modal.open(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );
    onRegistEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border-b bg-[#f8f8f8] px-1 py-1 mb-6 relative">
        <PopMenuButton
          isCommentBtn={true}
          onDelete={onDelete}
          onEdit={setIsEditing}
          commentId={comment.id}
        />
        <div>
          <p className="text-[#1F2937] text-sm">
            {lineBreakText(comment.content)}
          </p>
        </div>
        <div className="flex mt-6 mb-3">
          <Image
            className="shrink-0 w-8 h-8 mr-2"
            src={icProfile}
            alt="profile"
          />
          <div>
            <p className="text-xs text-[#4B5563] mb-1">
              {comment.writer.nickname}
            </p>
            <p className="text-[#9CA3AF] text-xs">
              {formattedDate(comment.createdAt) +
                `${comment.createdAt === comment.updatedAt ? '' : '(수정됨)'}`}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-8 mb-10">
        <div>
          <form>
            <textarea
              name="comment"
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[104px] rounded-lg px-6 py-4"
              placeholder="댓글을 입력해주세요"
              value={editedContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button onClick={handleCancelClick} outline={true}>
            취소
          </Button>
          <Button
            onClick={handleRegistEditClick}
            disabled={editedContent === ''}
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Comment;

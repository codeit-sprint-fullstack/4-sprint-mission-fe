import Image from 'next/image';
import icProfile from '@/assets/images/ic_profile.png';
import PopMenuButton from '../common/PopMenuButton';
import lineBreakText from '@/utils/lineBreakText';
import { useState } from 'react';
import Button from '../common/Button';

function Comment({ comment, onDelete, onRegistEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleRegistEditClick = () => {
    onRegistEdit(comment.id, editContent);
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
            <p className="text-xs text-[#4B5563] mb-1">똑똑한판다</p>
            <p className="text-[#9CA3AF] text-xs">1시간 전</p>
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
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleCancelClick} cancel={true}>
            취소
          </Button>
          <Button onClick={handleRegistEditClick} disabled={editContent === ''}>
            수정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Comment;

import Image from 'next/image';
import icProfile from '@/assets/images/ic_profile.png';
import PopMenuButton from './PopMenuButton';
import lineBreakText from '@/utils/lineBreakText';

function Comment({ comment, onDelete }) {
  return (
    <div className="border-b bg-[#f8f8f8] px-1 py-1 mb-6 relative">
      <PopMenuButton
        isCommentBtn={true}
        onDelete={onDelete}
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

export default Comment;

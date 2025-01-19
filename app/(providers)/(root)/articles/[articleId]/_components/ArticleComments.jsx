import Button from "@/components/Button";
import React from "react";

function ArticleComments() {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <label htmlFor="content" className="text-base font-semibold">
          댓글 달기
        </label>
        <textarea
          id="content"
          placeholder="댓글을 입력해주세요."
          className="bg-gray-200 px-6 py-4 rounded-lg"
        />
        <Button>등록</Button>
      </form>
      <div>
        <p>사용 기간이 어떻게 되실까요?</p>
        <Button>수정하기</Button>
        <Button>삭제하기</Button>
        <p>똑똑한 판다</p>
        <p>1시간 전</p>
      </div>
    </div>
  );
}

export default ArticleComments;

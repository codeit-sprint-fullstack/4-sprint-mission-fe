import React from "react";
import Image from "next/image";
import empty from "@/assets/svg/img_empty.svg";
import ArticleComment from "./ArticleComment";

function ArticleComments({ comments }) {
  const existComments = comments.length !== 0;
  return (
    <>
      {existComments ? (
        <div className="flex flex-col w-full gap-10">
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <ArticleComment comment={comment} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col">
          <Image src={empty.src} width={140} height={140} alt="emptyIamge" />
          <p>아직 댓글이 없어요,</p>
          <p>지금 댓글을 달아보세요!</p>
        </div>
      )}
    </>
  );
}

export default ArticleComments;

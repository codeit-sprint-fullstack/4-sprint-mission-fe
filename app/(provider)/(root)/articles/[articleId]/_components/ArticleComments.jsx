"use client";
import React from "react";
import Image from "next/image";
import empty from "@/assets/svg/img_empty.svg";
import ArticleComment from "./ArticleComment";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";

function ArticleComments({ initailComments }) {
  const existComments = initailComments.length !== 0;
  const params = useParams();
  const articleId = params.articleId;
  const { data: comments } = useQuery({
    queryFn: () =>
      api.getCommentsinArticle(articleId).then((data) => data.comments),
    queryKey: ["comments", { articleId }],
    initialData: initailComments,
    staleTime: 30 * 1000,
  });
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

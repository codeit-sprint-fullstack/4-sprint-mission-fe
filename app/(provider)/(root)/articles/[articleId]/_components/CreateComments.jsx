"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import api from "@/api";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateComments() {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const params = useParams();
  const articleId = params.articleId;
  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");

  useEffect(() => {
    if (comment === "") {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [comment]);

  const { mutate: createCommentInArticle } = useMutation({
    mutationFn: (comment) => api.createCommentInArticle(articleId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { articleId }],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCommentInArticle(comment);
    setComment("");
  };

  return (
    <div>
      {/* 댓글달기 */}
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold">댓글달기</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="xl:w-[1200px] md:w-[744px] w-[375px] h-[104px] px-6 py-4 bg-[#F3F4F6] rounded-xl resize-none"
            placeholder="댓글을 입력해주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="self-end w-[74px] h-[42px] px-[23px] py-3 box-border rounded-lg"
            disabled={disabled}
            type={isActive}
          >
            등록
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateComments;

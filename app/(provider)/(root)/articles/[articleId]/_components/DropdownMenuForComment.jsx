"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/DropdownMenuButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

function DropdownMenuForComment({ onEdit, commentId }) {
  const queryClient = useQueryClient();
  const params = useParams();
  const articleId = params.articleId;
  const { mutate: deleteCommentInArticle } = useMutation({
    mutationFn: () => api.deleteCommentInArticle(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { articleId }],
      });
    },
    onError: () => {},
  });

  return (
    <DropdownMenuButton
      menus={[
        {
          label: "수정하기",
          onClick: onEdit,
        },
        {
          label: "삭제하기",
          onClick: deleteCommentInArticle,
        },
      ]}
    />
  );
}

export default DropdownMenuForComment;

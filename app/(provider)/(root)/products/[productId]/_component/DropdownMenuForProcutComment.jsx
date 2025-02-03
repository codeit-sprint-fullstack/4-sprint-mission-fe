"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/DropdownMenuButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

function DropdownMenuForProcutComment({ onEdit, commentId }) {
  const queryClient = useQueryClient();
  const params = useParams();
  const productId = params.productId;
  const { mutate: deleteCommentInProduct } = useMutation({
    mutationFn: () => api.deleteCommentInProduct(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { productId }],
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
          onClick: deleteCommentInProduct,
        },
      ]}
    />
  );
}

export default DropdownMenuForProcutComment;

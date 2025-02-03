"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/DropdownMenuButton";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

function DropdownMenuForArticle() {
  const params = useParams();
  const articleId = params.articleId;
  const router = useRouter();

  const { mutate: deleteArticle } = useMutation({
    mutationFn: () => api.deleteArticle(articleId),
    onSuccess: () => {
      router.replace("/articles");
    },
    onError: () => {
      alert("삭제 실패");
    },
  });

  const { mutate: patchArticle } = useMutation({
    mutationFn: () => api.patchArticle(articleId),
    onSuccess: () => {
      router.push(`/articles/${articleId}/edit`);
    },
    onError: () => {},
  });

  return (
    <DropdownMenuButton
      menus={[
        {
          label: "수정하기",
          onClick: patchArticle,
        },
        {
          label: "삭제하기",
          onClick: deleteArticle,
        },
      ]}
    />
  );
}

export default DropdownMenuForArticle;

"use client";

import api from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function DeleteArticleButton({ children, articleId }) {
  const router = useRouter();
  const { mutate: deleteArticle } = useMutation({
    mutationFn: () => api.deleteArticle(articleId),
    onSuccess: () => {
      router.replace("/articles");
    },
  });

  const handClick = () => {
    deleteArticle();
  };

  return (
    <button className="cursor-pointer" onClick={handClick}>
      {children}
    </button>
  );
}

export default DeleteArticleButton;

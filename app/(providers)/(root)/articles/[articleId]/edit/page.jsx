"use client";

import api from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.articleId;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: article } = useQuery({
    queryFn: () => api.getArticle(articleId),
    queryKey: ["articles"],
  });

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setContent(article.content || "");
    }
  }, [article]);

  const { mutate: editArticle } = useMutation({
    mutationFn: (newArticle) => api.editArticle(articleId, newArticle),
    onSuccess: () => {
      router.push(`/articles/${articleId}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = { title, content };
    editArticle(newArticle);
  };

  return (
    <main className="flex flex-col gap-5 max-w-7xl m-auto my-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">게시글 수정</h2>
          <Button>수정</Button>
        </div>
        <Input
          type="text"
          label="*제목"
          name="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="textarea"
          label="*내용"
          name="content"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </main>
  );
}

export default ArticleEditPage;

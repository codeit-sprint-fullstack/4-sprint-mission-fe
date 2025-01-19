import api from "@/api";
import Button from "@/components/Button";
import dayjs from "dayjs";
import React from "react";
import Image from "next/image";
import profileImg from "@/assets/img/ic_profile.png";
import Link from "next/link";
import ArticleComments from "./_components/ArticleComments";
import IconHeart from "@/components/IconHeart";
import DeleteArticleButton from "./_components/DeleteArticleButton";

async function ArticlePage(props) {
  const params = await props.params;
  const articleId = params.articleId;
  const article = await api.getArticle(articleId);

  const isoDate = article.createdAt;
  const formattedDate = dayjs(isoDate).format("YYYY.MM.DD");

  return (
    <main className="flex flex-col gap-4 max-w-7xl mx-auto my-12">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{article.title}</h3>
        <div className="flex gap-3 items-center text-gray-400">
          <Link
            href={`/articles/${article.id}/edit`}
            className="cursor-pointer"
          >
            수정하기
          </Link>
          <DeleteArticleButton articleId={articleId}>
            삭제하기
          </DeleteArticleButton>
        </div>
      </div>
      <div className="flex items-center gap-4 border-b-2 py-3">
        <div className="flex gap-4 items-center border-r-2 pr-4">
          <Image src={profileImg} alt="profile image" width={40} height={40} />
          <span>총명한 판다</span>
          <span className="text-gray-400">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 border-2 px-3 py-1 rounded-3xl">
          <IconHeart />
          <span className="text-gray-700">123</span>
        </div>
      </div>
      <div className="mb-5">
        <p>{article.content}</p>
      </div>
      <ArticleComments />
    </main>
  );
}

export default ArticlePage;

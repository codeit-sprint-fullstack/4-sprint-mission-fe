import api from "@/api";
import React from "react";

async function ArticlePage(props) {
  const params = await props.params;
  const articleId = params.articleId;

  const article = await api.getArticle(articleId);
  console.log(article);

  return <main>page {articleId}</main>;
}

export default ArticlePage;

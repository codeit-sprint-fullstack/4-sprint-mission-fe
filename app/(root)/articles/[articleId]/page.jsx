import React from "react";

async function ArticlePage(props) {
  const params = await props.params;
  const articleId = params.articleId;

  return <div>page {articleId}</div>;
}

export default ArticlePage;

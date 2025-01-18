import React from "react";

async function ArticleEditPage(props) {
  const params = await props.params;
  const articleId = params.articleId;

  return <div>ArticleEditPage {articleId}</div>;
}

export default ArticleEditPage;

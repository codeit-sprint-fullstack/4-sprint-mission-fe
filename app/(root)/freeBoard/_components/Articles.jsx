import React from "react";
import Link from "next/link";
import Article from "./Article";

function Articles({ articles }) {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {articles.map((article) => {
          return (
            <Link key={article.id} href={`/freeBoard/${article.id}`}>
              <div>
                <Article article={article}></Article>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Articles;

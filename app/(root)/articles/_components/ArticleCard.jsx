import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

function ArticleCard({ item }) {
  const isoDate = item.createdAt;
  const formattedDate = dayjs(isoDate).format("YYYY.MM.DD");

  return (
    <Link href={`/articles/${item.id}`}>
      <article className="flex flex-col h-40 bg-gray-100 rounded-lg px-6 py-6 gap-3">
        <div className="flex-1 flex justify-between">
          <h3 className="text-lg font-medium">{item.title}</h3>
          {item.image && <img src={item.image} className="w-20 rounded-md" />}
        </div>
        <div className="flex gap-4 justify-between">
          <p className="text-gray-700">{item.writer.nickname}</p>
          <p className="text-gray-500 ">{formattedDate}</p>
          <p className="flex-1 text-right text-gray-700">{item.likeCount}</p>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;

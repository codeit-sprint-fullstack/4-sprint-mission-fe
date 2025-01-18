import IconHeart from "@/components/IconHeart";
import macbookImg from "@/assets/img/macbook.png";
import dayjs from "dayjs";
import Image from "next/image";
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
          <Image
            src={macbookImg}
            width={72}
            height={72}
            alt="macbook"
            className="rounded-md"
          />
        </div>
        <div className="flex gap-4 justify-between">
          <p className="text-gray-700">총명한 판다</p>
          <p className="text-gray-500 ">{formattedDate}</p>

          <div className="flex-1 flex items-center gap-1 justify-end text-gray-700">
            <IconHeart />
            9999+
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;

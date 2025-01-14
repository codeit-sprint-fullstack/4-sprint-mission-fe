import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import medal from "@/assets/img/ic_medal.png";
import Link from "next/link";

function BestArticleCard({ item }) {
  const isoDate = item.createdAt;
  const formattedDate = dayjs(isoDate).format("YYYY.MM.DD");

  return (
    <Link href={`/articles/${item.id}`}>
      <article className="flex flex-col max-w-3xl h-40 bg-gray-100 rounded-lg px-6 gap-3 pb-2">
        <div className="flex gap-1 w-28 bg-blue-500 py-1 justify-center rounded-b-2xl">
          <Image
            layout="intrinsic"
            width={24}
            height={16}
            alt="medal_ic"
            src={medal}
          />
          <span className="font-semibold text-white">Best</span>
        </div>
        <div className="flex-1 flex justify-between">
          <h3 className="text-lg font-medium">{item.title}</h3>
          {item.image && <img src={item.image} className="w-20 rounded-md" />}
        </div>
        <div className="flex gap-4 justify-between">
          <p className="text-gray-700">{item.writer.nickname}</p>
          <p className="text-gray-700">{item.likeCount}</p>
          <p className="flex-1 text-gray-500 text-right">{formattedDate}</p>
        </div>
      </article>
    </Link>
  );
}

export default BestArticleCard;

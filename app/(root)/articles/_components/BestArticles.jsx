"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import BestArticle from "./BestArticle";
import { useDeviceSize } from "@/hook/useDeviceSize";
function BestArticles({ data }) {
  const [number, setNumber] = useState(3);
  const { isDesktop, isTablet, isMobile } = useDeviceSize();
  const getPageSize = () => (isDesktop ? 3 : isTablet ? 2 : 1);

  useEffect(() => {
    const pageSize = getPageSize();
    setNumber(pageSize);
  }, [isDesktop, isTablet, isMobile]);

  const bestArticlesData = data.slice(0, number);
  return (
    <div className="flex gap-6">
      {bestArticlesData.map((article) => {
        return (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <BestArticle key={article.id} article={article}></BestArticle>
          </Link>
        );
      })}
    </div>
  );
}

export default BestArticles;

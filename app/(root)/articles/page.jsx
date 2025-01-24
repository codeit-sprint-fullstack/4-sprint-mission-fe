import api from "@/api";
import React from "react";
import BestArticles from "./_components/BestArticles";
import SearchBar from "@/components/SearchBar";
import DropDown from "@/components/DropDown";
import Articles from "./_components/Articles";
import Button from "@/components/Button";
import Link from "next/link";

export const revalidate = 5;

async function articles({ searchParams }) {
  const bestArticles = await api.getArticles();
  const queryParams = await searchParams;
  const keyword = queryParams?.keyword || "";

  const articles = await api.getArticles(keyword);

  return (
    <div className="flex flex-col items-center gap-10 xl:w-[1200px] md:w-[744px] w-[375px] m-auto">
      {/* 베스트 게시글 */}
      <div className="flex flex-col gap-6 mt-6">
        <h1 className="font-bold text-[20px]">베스트 게시글</h1>
        <BestArticles data={bestArticles} />
      </div>

      {/* 게시글 */}
      <div className="flex flex-col gap-6 w-full">
        {/* 상단단 */}
        <div className="flex w-full justify-between items-center">
          <h2 className="font-bold text-xl">게시글</h2>
          <Link href="/articles/create">
            <Button className="px-3 py-[23px] rounded-lg h-[42px] box-border">
              글쓰기
            </Button>
          </Link>
        </div>

        {/* 메뉴 바 */}
        <div className="flex justify-between gap-[10px]">
          <SearchBar className="xl:w-[1054px] md:w-[560px] w-[288px] h-[42px] rounded-xl py-[9px] pr-5 pl-4 bg-[#F3F4F6] ">
            검색할 상품을 입력해주세요
          </SearchBar>
          <DropDown className="w-[130px] px-5 py-3 ">
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </DropDown>
        </div>

        {/* 게시글 */}
        <Articles articles={articles}></Articles>
      </div>
    </div>
  );
}

export default articles;

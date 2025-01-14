import api from "@/api";
import React from "react";
import Image from "next/image";
import profile from "@/assets/svg/ic_profile.svg";
import CreateComments from "./_components/CreateComments";
import ArticleComments from "./_components/ArticleComments";
import backIcon from "@/assets/svg/ic_back.svg";
import Button from "@/components/Button";
import Link from "next/link";
import EditDeleteDropdown from "./_components/EditDeleteDropdown";

async function articlePage({ params }) {
  const param = await params;
  const articleId = param.articleId;
  const article = await api.getArticle(articleId);
  const createDate = article.createdAt;
  let date = createDate.split("T")[0];

  const commentData = await api.getComments(articleId);
  const comments = commentData.comments;

  return (
    <div className="flex flex-col items-center w-[1200px] m-auto gap-16 mt-8">
      {/* 본문 */}
      <div className="flex flex-col w-full gap-6 ">
        <div className="flex flex-col gap-4 border-b border-[#E5E7EB]">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">{article.title}</h1>
            <EditDeleteDropdown type="article" />
          </div>
          <div className="flex gap-4 items-center">
            <Image src={profile.src} width={40} height={40} alt="profile" />
            <div className="flex gap-2 text-[14px]">
              <p className="font-medium text-[#4B5563]">총명한 판다</p>
              <p className="text-[#9CA3AF]">{date}</p>
            </div>
          </div>
        </div>
        <p>{article.content}</p>
      </div>

      {/* 댓글 작성  */}
      <CreateComments></CreateComments>
      {/* 댓글들  */}
      <ArticleComments comments={comments}></ArticleComments>
      {/* 버튼 */}
      <Link href={`/freeBoard`}>
        <Button className="w-[240px] h-12 rounded-[40px] px=16 py-3">
          <p className="mr-1">목록으로 돌아가기</p>
          <Image src={backIcon.src} width={24} height={24} alt="backicon" />
        </Button>
      </Link>
    </div>
  );
}

export default articlePage;

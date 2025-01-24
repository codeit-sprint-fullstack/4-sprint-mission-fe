"use client";
import React, { useState } from "react";
import kebab from "@/assets/svg/ic_kebab.svg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import api from "@/api";

function EditDeleteDropdown({ type, commentId, onEdit }) {
  const [isDropdown, setIsDropdown] = useState(false);

  const params = useParams();
  const articleId = params.articleId;
  const router = useRouter();

  const handleButtonClick = () => {
    setIsDropdown(!isDropdown);
  };

  const handleDelete = () => {
    if (type === "article") {
      try {
        api.deleteArticle(articleId);
        router.replace("/articles");
      } catch (e) {
        console.log(e);
      }
    }
    if (type === "comment") {
      api.deleteComment(commentId);
      router.refresh();
    }
  };

  const handleEdit = () => {
    if (type === "article") {
      router.push(`/articles/${articleId}/edit`);
    }
    if (type === "comment") {
      onEdit();
      setIsDropdown(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={handleButtonClick}>
        <Image src={kebab.src} width={24} height={24} alt="kebabicon" />
      </button>
      {isDropdown && (
        <ul className="absolute right-0">
          <button
            onClick={handleEdit}
            className="text-[#6B7280] h-[46px] w-[139px] rounded-t-lg border-t border-x pt-4 pb-3 border-[#D1D5DB] bg-white flex justify-center items-center"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="text-[#6B7280] h-[46px] w-[139px] rounded-b-lg border-b border-x pt-3 pb-4 border-[#D1D5DB] bg-white flex justify-center items-center"
          >
            삭제하기
          </button>
        </ul>
      )}
    </div>
  );
}

export default EditDeleteDropdown;

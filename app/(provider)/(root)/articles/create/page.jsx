"use client";
import api from "@/api";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ArticleCreatePage() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });

  useEffect(() => {
    if (newArticle.title === "" || newArticle.content === "") {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [newArticle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createArticle(newArticle);
      const articleId = response.id;
      router.replace(`/articles/${articleId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="xl:w-[1200px] md:w-[696px] w-[345px] m-auto flex flex-col gap-[32px] mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">게시글쓰기</h1>{" "}
        <Button
          className="h-[42px] rounded-lg px-[23px] py-3"
          disabled={disabled}
          type={isActive}
        >
          등록
        </Button>
      </div>
      <div>
        <h1>*제목</h1>
        <input
          name="title"
          className="w-full h-[56px] px-6 py-4 bg-[#F3F4F6] rounded-xl resize-none"
          placeholder="제목을 입력해주세요"
          onChange={handleChange}
        />
      </div>
      <div>
        <h1>*내용</h1>
        <textarea
          name="content"
          className="w-full h-[282px] px-6 py-4 bg-[#F3F4F6] rounded-xl resize-none"
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default ArticleCreatePage;

"use client";
import api from "@/api";
import Button from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function articlePatchPage() {
  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");
  const [context, setContext] = useState({ title: "", content: "" });

  const params = useParams();
  const articleId = params.articleId;

  useEffect(() => {
    api.getArticle(articleId).then((data) => {
      const { title, content } = data;
      setContext({ title: title, content: content });
    });
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (context.title === "" || context.content === "") {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patchArticle(articleId, context); // 여기를 patch로
      router.replace(`/freeBoard/${articleId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContext((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="w-[1200px] m-auto flex flex-col gap-[32px] mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">게시글쓰기</h1>{" "}
        <Button
          className="h-[42px] rounded-lg px-[23px] py-3"
          disabled={disabled}
          isActive={isActive}
        >
          등록
        </Button>
      </div>
      <div>
        <h1>*제목</h1>{" "}
        <textarea
          name="title"
          className="w-full h-[56px] px-6 py-4 bg-[#F3F4F6] rounded-xl resize-none"
          placeholder="제목을 입력해주세요"
          value={context.title}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <h1>*내용</h1>{" "}
        <textarea
          name="content"
          className="w-full h-[282px] px-6 py-4 bg-[#F3F4F6] rounded-xl resize-none"
          placeholder="내용을 입력해주세요"
          value={context.content}
          onChange={handleChange}
        ></textarea>
      </div>
    </form>
  );
}

export default articlePatchPage;

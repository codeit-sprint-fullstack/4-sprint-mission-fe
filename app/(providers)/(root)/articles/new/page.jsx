"use client";

import api from "@/api";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !content) return;

    const postData = {
      content: content,
      title: title,
    };

    const response = await api.postArticle(postData);

    console.log("response : ", response);

    if (response) {
      router.push(`/articles/${response}`);
    }
  };

  return (
    <main className="flex flex-col gap-5 max-w-7xl m-auto my-8">
      <from>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">게시글 쓰기</h2>
          <Button onClick={handleSubmit}>등록</Button>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <label className="text-lg font-bold" htmlFor="title">
            *제목
          </label>
          <input
            className="bg-gray-200 px-4 py-3 rounded-xl"
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-bold" htmlFor="content">
            *내용
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="bg-gray-200 px-4 py-3 rounded-xl h-52"
            placeholder="내용을 입력해주세요."
          />
        </div>
      </from>
    </main>
  );
}

export default NewArticlePage;

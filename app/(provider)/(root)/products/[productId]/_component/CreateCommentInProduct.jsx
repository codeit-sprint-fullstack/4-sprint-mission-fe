"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import api from "@/api";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateCommentInProduct() {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const params = useParams();
  const productId = params.productId;
  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");

  useEffect(() => {
    if (comment === "") {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [comment]);

  const { mutate: createCommentInProduct } = useMutation({
    mutationFn: (comment) => api.createCommentInProduct(productId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { productId }],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCommentInProduct(comment);
    setComment("");
  };

  return (
    <div>
      {/* 댓글달기 */}
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold">문의하기</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="xl:w-[1200px] md:w-[744px] w-[375px] h-[104px] px-6 py-4 bg-[#F3F4F6] rounded-xl resize-none"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="self-end w-[74px] h-[42px] px-[23px] py-3 box-border rounded-lg"
            disabled={disabled}
            type={isActive}
          >
            등록
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateCommentInProduct;

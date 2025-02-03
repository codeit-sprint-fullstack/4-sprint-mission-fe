"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import backIcon from "@/assets/svg/ic_back.svg";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";
import ProductComment from "./ProductComment";
import imgInquiryEmpty from "@/assets/svg/img_inquiry_empty.svg";

function ProductComments() {
  const params = useParams();
  const productId = params.productId;
  const { data: comments } = useQuery({
    queryFn: () =>
      api.getCommentsInProduct(productId).then((comment) => comment.list),
    queryKey: ["comments", { productId }],
    initialData: [],
    staleTime: 30 * 1000,
    refetchInterval: 5 * 1000,
  });

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-col w-full gap-10">
        {comments.length !== 0 ? (
          comments.map((comment) => {
            return (
              <div key={comment.id}>
                <ProductComment comment={comment} />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col self-center gap-2">
            <div className="w-[196px] h-[196px] relative">
              <Image src={imgInquiryEmpty.src} alt="img_inquiry_empty" fill />
            </div>
            <p className="text-[#9CA3AF] self-center">아직 문의가 없어요</p>
          </div>
        )}
      </div>
      <Link href={`/products`}>
        <Button className="w-[240px] h-12 rounded-[40px] px=16 py-3">
          <p className="mr-1">목록으로 돌아가기</p>
          <Image src={backIcon.src} width={24} height={24} alt="backicon" />
        </Button>
      </Link>
    </div>
  );
}

export default ProductComments;

"use client";
import api from "@/api";
import Button from "@/components/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import xIcon from "@/assets/svg/ic_X.svg";

function ProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const productId = params.productId;
  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");
  const [context, setContext] = useState({
    name: "",
    description: "",
    price: 0,
    tags: [],
  });
  const [tag, setTag] = useState("");

  const { data: product } = useQuery({
    queryFn: () => api.getProduct(productId),
    queryKey: ["product", { productId }],
    staleTime: 30 * 1000,
  });

  const { mutate: patchProduct } = useMutation({
    mutationFn: () => api.patchProduct(productId, context),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", { productId }] });
      router.replace(`/products/${productId}`);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  useEffect(() => {
    if (product) {
      const { name, description, price, tags } = product;
      setContext((prev) => ({ ...prev, name, description, price, tags }));
    }
  }, [product]);

  useEffect(() => {
    if (context.name === "" || context.description === "") {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [context]);

  const handleTagClick = (index) => {
    const patchedTag = context.tags.filter((_, i) => index !== i);
    setContext((prev) => ({ ...prev, tags: patchedTag }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchProduct();
  };

  const handleKeyDownInTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!context.tags.includes(tag)) {
        context.tags.push(tag);
      }
      setTag("");
    }
  };

  return (
    <form
      className="xl:w-[1200px] md:w-[696px] w-[345px] m-auto flex flex-col gap-[32px] mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-xl"> 상품 등록하기</h1>
        <Button
          className="h-[42px] py-3 px-[23px] rounded-lg "
          type={isActive}
          disabled={disabled}
        >
          수정
        </Button>
      </div>

      <div className="w-full flex flex-col gap-[32px]">
        <h2 className="font-bold text-[18px]">상품 이미지</h2>
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-bold text-[18px]">상품명</h2>
          <input
            className="resize-none w-full h-14 rounded-xl px-6 py-4 bg-[#F3F4F6]"
            placeholder="상품명을 입력해주세요"
            value={context.name}
            onChange={(e) => {
              setContext((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-bold text-[18px]">상품 소개</h2>
          <textarea
            className="resize-none w-full h-[282px] rounded-xl px-6 py-4 bg-[#F3F4F6]"
            placeholder="상품 소개를 입력해주세요"
            value={context.description}
            onChange={(e) => {
              setContext((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-bold text-[18px]">판매 가격</h2>
          <input
            className="resize-none w-full h-14 rounded-xl px-6 py-4 bg-[#F3F4F6]"
            placeholder="판매 가격을 입력해주세요"
            value={context.price}
            onChange={(e) => {
              setContext((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }));
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-[14px]">
          <h2 className="font-bold text-[18px]">태그</h2>
          <input
            className="resize-none w-full h-14 rounded-xl px-6 py-4 bg-[#F3F4F6]"
            placeholder="태그를 입력해주세요"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
            onKeyDown={handleKeyDownInTag}
          />
          <ol className="flex flex-wrap gap-3">
            {context.tags &&
              context.tags.map((tag, index) => (
                <li
                  className="py-[6px] px-3 h-9 rounded-[26px] bg-[#F3F4F6] flex gap-2 items-center"
                  key={tag}
                  onClick={() => handleTagClick(index)}
                >
                  <p>#{tag}</p>
                  <Image src={xIcon.src} alt="xIcon" width={22} height={24} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    </form>
  );
}

export default ProductEditPage;

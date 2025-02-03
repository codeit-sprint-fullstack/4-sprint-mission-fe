"use client";
import dayjs from "dayjs";
import React from "react";
import defaultUserImage from "@/assets/svg/defualt_user_image.svg";
import Image from "next/image";
import emptyHeartIcon from "@/assets/svg/ic_empty_heart.svg";
import heartIcon from "@/assets/svg/ic_heart.svg";
import DropdownMenuForProduct from "./DropdownMenuForProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";

function ProductDetailData({ product, userData }) {
  const queryClient = useQueryClient();
  const params = useParams();
  const productId = params.productId;
  const date = dayjs(product.createdAt).format("YYYY.MM.DD");

  const { mutate: createFavoriteProduct } = useMutation({
    mutationFn: () => api.createFavoriteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", { productId }],
      });
    },
  });

  const { mutate: deleteFavoriteProduct } = useMutation({
    mutationFn: () => api.deleteFavoriteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", { productId }],
      });
    },
  });

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex md:flex-row flex-col gap-6">
        {/* 이미지 */}
        <img
          src={product.images}
          alt="productImage"
          className="xl:w-[486px] xl:h-[486px] w-[340px] h-[340px] rounded-2xl"
          onError={(e) => (e.target.src = defaultUserImage.src)}
        />
        {/* 상품 관련 */}
        <div className="flex flex-col justify-between gap-[62px] md:w-[690px]">
          <div className="flex flex-col gap-6">
            {/* 상품 이름 ,가격 */}
            <div className="flex flex-col gap-4 font-semibold justify-between border-b border-[#E5E7EB]">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl">{product.name} 팔아요</h1>
                <DropdownMenuForProduct product={product} userData={userData} />
              </div>

              <p className="text-[40px]">{product.price}</p>
            </div>
            {/* 상품 소개 ,태그 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 text-[#4B5563]">
                <h2 className="font-bold ">상품소개</h2>
                <p className="whitespace-normal">{product.description}</p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-[#4B5563] font-bold">상품태그</h2>
                <div className="flex gap-2 flex-wrap">
                  {product.tags &&
                    product.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-[26px] px-4 py-[6px] bg-[#F3F4F6]"
                      >
                        #{tag}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {/* 유저데이타 및 좋아요 */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {userData.image && (
                <Image
                  src={defaultUserImage.src}
                  alt="userProfileImage"
                  width={40}
                  height={40}
                />
              )}
              <div className="flex flex-col gap-[2px]">
                <p>{product.ownerNickname}</p>
                {date}
              </div>
            </div>
            <div className="flex gap-6">
              <div className="border" />
              <div className="rounded-[35px] px-3 py-1 border border-[#E5E7EB] flex gap-[10px] font-medium items-center">
                {product.isFavorite ? (
                  <Image
                    src={heartIcon.src}
                    alt="heartIcon"
                    width={32}
                    height={32}
                    onClick={deleteFavoriteProduct}
                  />
                ) : (
                  <Image
                    src={emptyHeartIcon.src}
                    alt="emptyHeartIcon"
                    width={32}
                    height={32}
                    onClick={createFavoriteProduct}
                  />
                )}
                {product.favoriteCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-[#E5E7EB]" />
    </div>
  );
}

export default ProductDetailData;

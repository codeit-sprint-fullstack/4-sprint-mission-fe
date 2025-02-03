"use client";
import api from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ProductDetailData from "./_component/ProductDetailData";
import ProductComments from "./_component/ProductComments";
import CreateCommentInProduct from "./_component/CreateCommentInProduct";

function ItemDetailPage() {
  const { isLoggedIn, isAuthInitialized } = useAuth();
  const params = useParams();
  const productId = params.productId;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthInitialized) return;
    if (!isLoggedIn) {
      router.replace("/products");
      alert("로그인을 해주세요");
    }
  }, [isLoggedIn, isAuthInitialized]);

  const { data: product, isError } = useQuery({
    queryFn: () => api.getProduct(productId),
    queryKey: ["product", { productId }],
    enabled: isLoggedIn,
    initialData: {},
  }); // 여기 다음 프로젝트 진행할때 initialData를 Products에서 받아서 넣기

  const { data: userData } = useQuery({
    queryFn: () => api.getUserData(),
    queryKey: ["userData"],
    enabled: isLoggedIn,
    initialData: {},
    staleTime: 30 * 1000,
    refetchInterval: 5 * 1000,
  });

  return (
    <div className="flex flex-col items-center m-auto xl:w-[1200px] md:w-[744px] w-[375px] justify-center mt-6 gap-16">
      <ProductDetailData product={product} userData={userData} />
      <div className="flex flex-col gap-6 w-full">
        <CreateCommentInProduct />
        <ProductComments />
      </div>
    </div>
  );
}

export default ItemDetailPage;

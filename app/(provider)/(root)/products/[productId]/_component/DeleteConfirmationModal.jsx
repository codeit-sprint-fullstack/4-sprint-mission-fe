"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useModal } from "@/contexts/ModalContext";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import api from "@/api";
import checkIcon from "@/assets/svg/ic_check.svg";
import Image from "next/image";

function DeleteConfirmationModal({ children }) {
  const modal = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const productId = params.productId;

  const { mutate: deleteItem } = useMutation({
    mutationFn: () => api.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", { productId }],
      });
      router.replace("/products");
      modal.close();
    },
    onError: () => {
      alert("삭제할 수 없는 상품입니다.");
      modal.close();
    },
  });

  return (
    <Modal>
      <div className="flex flex-col items-center gap-6">
        <Image src={checkIcon.src} alt="checkIcon" width={24} height={24} />
        <div className="text-nowrap font-medium">{children}</div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={modal.close}
          className="w-[88px] h-[48px] rounded-lg py-3 px-[23px] md:w-[120px]"
          type="redBorder"
        >
          취소
        </Button>
        <Button
          onClick={deleteItem}
          className="w-[88px] h-[48px] rounded-lg py-3 px-[23px] md:w-[120px]"
          type="redButton"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;

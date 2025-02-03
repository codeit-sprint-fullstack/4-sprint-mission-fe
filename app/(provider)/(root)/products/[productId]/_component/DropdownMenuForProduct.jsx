"use client";

import DropdownMenuButton from "@/components/DropdownMenuButton";
import { useModal } from "@/contexts/ModalContext";
import React from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useParams, useRouter } from "next/navigation";

function DropdownMenuForProduct({ product, userData }) {
  const modal = useModal();
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;

  return (
    <DropdownMenuButton
      menus={[
        {
          label: "수정하기",
          onClick: () => {
            if (product?.ownerId !== userData.id)
              return alert("내 상품만 수정할 수 있습니다.");
            router.push(`/products/${productId}/edit`);
          },
        },
        {
          label: "삭제하기",
          onClick: () =>
            modal.open(
              <DeleteConfirmationModal>
                정말로 상품을 삭제하시겠어요?
              </DeleteConfirmationModal>
            ),
        },
      ]}
    />
  );
}

export default DropdownMenuForProduct;

"use client";
import api from "@/api";
import profile from "@/assets/svg/ic_profile.svg";
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import calculateTimeDiff from "@/utils/calculateTimeDiff";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DropdownMenuForProcutComment from "./DropdownMenuForProcutComment";

function ProductComment({ comment }) {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.content);
  const [timeDiff, setTimeDiff] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");
  const commentId = comment.id;
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    if (updatedComment === "") {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [updatedComment]);

  useEffect(() => {
    const updatedDate = new Date(comment.updatedAt).getTime();
    const currentDate = new Date().getTime();
    calculateTimeDiff(updatedDate, currentDate, setTimeDiff);
  }, [comment.updatedAt]);

  const { mutate: patchCommentInProduct } = useMutation({
    mutationFn: (updatedComment) =>
      api.patchCommentInProduct(commentId, updatedComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { productId }],
      });
    },
  });

  const handlebuttonclick = () => {
    patchCommentInProduct(updatedComment);
    setEdit(false);
  };

  const handleCancelButton = () => {
    setEdit(false);
    setUpdatedComment(comment.content);
  };

  return (
    <div className=" bg-[#FCFCFC] border-b border-[#E5E7EB] pb-3 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        {edit ? (
          <textarea
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
            className="resize-none w-full px-3 py-2 bg-[#F3F4F6] rounded-xl"
          />
        ) : (
          <div>
            <p> {comment.content}</p>
          </div>
        )}

        <DropdownMenuForProcutComment
          commentId={comment.id}
          onEdit={() => setEdit(true)}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image src={profile.src} width={32} height={32} alt="profile" />
          <div className="flex flex-col gap-1 text-[12px]">
            <p className=" text-[#4B5563]">총명한 판다</p>
            <p className="text-[#9CA3AF]">{timeDiff}</p>
          </div>
        </div>

        {edit ? (
          <div className="flex gap-2">
            <Button
              type="inactive"
              className="rounded-lg px-[23px] py-3 h-[42px]"
              onClick={handleCancelButton}
            >
              취소
            </Button>
            <Button
              className="rounded-lg px-[23px] py-3 h-[42px]"
              onClick={handlebuttonclick}
              disabled={disabled}
              type={isActive}
            >
              수정 완료
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProductComment;

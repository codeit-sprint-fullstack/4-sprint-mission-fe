"use client";
import React from "react";
import Button from "./Button";
import { useModal } from "@/contexts/ModalContext";

function Modal({ children }) {
  const modal = useModal();
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/70">
      <div className="md:w-[540px] md:h-[250px] w-[327px] h-[220px] bg-white md:px-[187px] md:py-10 px-[90px] py-[23px] rounded-lg flex flex-col justify-center items-center gap-10">
        {children}
      </div>
    </div>
  );
}

export default Modal;

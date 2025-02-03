"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useModal } from "@/contexts/ModalContext";

function LoginErrorModal({ children }) {
  const modal = useModal();
  return (
    <Modal>
      <div className="text-[18px] font-medium text-nowrap">{children}</div>
      <Button
        onClick={modal.close}
        className="w-[120px] h-[48px] rounded-lg py-3 px-[23px] md:w-[165px]"
      >
        확인
      </Button>
    </Modal>
  );
}

export default LoginErrorModal;

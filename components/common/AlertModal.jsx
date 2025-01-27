import { useModal } from '@/contexts/ModalContext';
import Button from './Button';
import Modal from './Modal';

function AlertModal({ alertMessage, onClick }) {
  const modal = useModal();

  const handleClickConfirm = () => {
    if (onClick) {
      onClick();
    } else {
      modal.close();
    }
  };
  return (
    <Modal>
      <div className="flex justify-center items-center bg-white w-[540px] h-[250px] rounded-lg">
        <div className="flex flex-col items-center gap-10">
          <p className="grow-0 text-lg text-[#1F2937]">{alertMessage}</p>
          <Button width={'165'} onClick={handleClickConfirm}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AlertModal;

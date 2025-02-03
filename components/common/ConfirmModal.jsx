import { useModal } from '@/contexts/ModalContext';
import Button from './Button';
import Modal from './Modal';

function ConfirmModal({ confirmMessage, onClickConfirm }) {
  const modal = useModal();

  const handleClickConfirm = () => {
    onClickConfirm();
    modal.close();
  };

  const handleClickCancel = () => {
    modal.close();
  };

  return (
    <Modal>
      <div className="flex justify-center items-center bg-white w-[540px] h-[250px] rounded-lg">
        <div className="flex flex-col items-center gap-10">
          <p className="grow-0 text-lg text-[#1F2937]">{confirmMessage}</p>
          <div className="flex gap-2">
            <Button
              color={'red'}
              outline={true}
              width={'165'}
              onClick={handleClickCancel}
            >
              취소
            </Button>
            <Button color={'red'} width={'165'} onClick={handleClickConfirm}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;

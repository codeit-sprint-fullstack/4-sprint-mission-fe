'use client';

function Modal({ children }) {
  return (
    <div className="z-10 fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex items-center justify-center">
      {children}
    </div>
  );
}

export default Modal;

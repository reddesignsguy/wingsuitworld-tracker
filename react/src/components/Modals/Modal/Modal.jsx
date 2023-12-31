// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Modal.css";

// Wrap arounds HTML tag, "dialog" and utilizes HTML's modal capabilities (doesn't manage data)
export default function Modal({ isOpen, onClose, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  const closeModal = () => {
    onClose();
    setIsModalOpen(false); // * The first state to get changed to false is very top component, then it ripples back down through side FX (react pattern)
  };

  // * Updates React modal state
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  // * Updates HTML modal state
  useEffect(() => {
    const modalCurrent = modalRef.current;
    if (isModalOpen) {
      // @ts-ignore
      // * Ignored error because React's Ref object is unaware of the HTML API
      modalCurrent.showModal();
    } else {
      modalCurrent.close();
    }
  }, [isModalOpen]);

  // ? How can we have the cancel button in children, close the modal?

  // * In effect, the modal stays in the component tree, however, its visibility is determined by HTML modal API
  return (
    <dialog ref={modalRef} className="modal">
      <ModalCloseButton closeModal={closeModal} />
      {children}
    </dialog>
  );
}

const ModalCloseButton = ({ closeModal }) => {
  return (
    <div
      className="modal__close-btn"
      onClick={() => {
        closeModal();
      }}
    >
      <IoClose className="modal__close-btn_icon" />
    </div>
  );
};

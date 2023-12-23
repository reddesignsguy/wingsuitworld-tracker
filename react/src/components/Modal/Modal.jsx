// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Modal.css";

// Wrap arounds dialog and utilizes HTML's modal capabilities (doesn't manage data)
export default function Modal({ isOpen, onClose, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef(null); // * allows us to reference the modal in the "HTML" world

  const closeModal = () => {
    onClose();
    setIsModalOpen(false); // * The first state to get changed to false is very top component, then it ripples back down through side FX
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
      // * Ignore error because React's Ref object is unaware of the HTML API
      modalCurrent.showModal();
    } else {
      modalCurrent.close();
    }
  }, [isModalOpen]);

  // ! How can we have the cancel button in children, close the modal?
  // ! useEffect closes the modal as a side effect of the state of the parent
  // ! The button in the parent handles the parent's state, which is subscribed to by the child's UseEffect() and UseState()

  // * In effect, the modal is always in the component tree, however, its visibility is determined by HTML modal API
  return (
    <dialog ref={modalRef} className="modal">
      <div
        className="modal__close-btn"
        onClick={() => {
          closeModal();
        }}
      >
        <IoClose className="modal__close-btn_icon" />
      </div>
      {children}
    </dialog>
  );
}

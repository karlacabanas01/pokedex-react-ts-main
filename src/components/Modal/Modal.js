import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactPortal } from "../ReactPortal";

function Modal({ children, isOpen, handleClose }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => document.body.removeEventListener("keydown", closeOnEscapeKey);
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={handleClose}
        >
          <div
            className="relative bg-transparent" // SIN FONDO, SIN BORDES
            ref={nodeRef}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default Modal;

import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactPortal } from "../ReactPortal";
import "./Modal.css";

function Modal({ children, isOpen, handleClose }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 300, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal-overlay">
          <div className="modal" ref={nodeRef}>
            <button onClick={handleClose} className="close-btn">
              <img
                src="https://img.icons8.com/color/48/000000/close-window.png"
                alt="Close"
              />
            </button>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default Modal;

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import * as styles from "./modal.module.css";
import classNames from "classnames";
import noop from "../noop";

const Modal = ({ children, className, onClose = noop, ...rest }) => {
  const modalClasses = classNames(styles["modal-container"], className);
  const modalContentRef = useRef();

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalContentRef]);

  return createPortal(
    <div className={modalClasses} {...rest}>
      <div className={styles["modal"]} ref={modalContentRef}>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

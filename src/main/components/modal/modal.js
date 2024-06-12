import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import * as styles from "./modal.module.css";
import classNames from "classnames";
import noop from "../noop";
import { cond, equals, always, T } from "ramda";

const alignmentToClassMapping = cond([
  [equals("top-right"), always(styles["align--top-right"])],
  [T, always(styles["align--center"])],
]);

const Modal = ({
  children,
  className,
  onBlur = noop,
  align = "center",
  ...rest
}) => {
  const modalContentRef = useRef();
  const containerClasses = classNames({
    [styles["modal-container"]]: true,
    [className]: className,
  });

  const modalClasses = classNames(
    styles["modal"],
    alignmentToClassMapping(align)
  );

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        onBlur();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalContentRef]);

  return createPortal(
    <div className={containerClasses} {...rest}>
      <div className={modalClasses} ref={modalContentRef}>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

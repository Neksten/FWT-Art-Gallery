import React, { FC, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface OverlayProps {
  isOpen: boolean;
}

const Overlay: FC<OverlayProps> = ({ isOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <div className={cx(styles.overlay, isOpen && styles["overlay-visible"])} />
  );
};

export default Overlay;

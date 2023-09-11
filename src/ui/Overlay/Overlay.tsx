import React, { FC, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface OverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

const Overlay: FC<OverlayProps> = ({ isOpen, onClick }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <div
      role="presentation"
      onClick={onClick}
      className={cx("overlay", { open: isOpen })}
    />
  );
};

export default Overlay;

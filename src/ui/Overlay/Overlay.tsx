import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface OverlayProps {
  onClick: () => void;
  className?: string;
}

const Overlay: FC<OverlayProps> = ({ onClick, className }) => {
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={cx("overlay", className)}
    />
  );
};

export default Overlay;

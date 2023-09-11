import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface OverlayProps {
  onClick: () => void;
  menuClass: "open" | "delete";
}

const Overlay: FC<OverlayProps> = ({ onClick, menuClass }) => {
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={cx("overlay", menuClass)}
    />
  );
};

export default Overlay;

import React, { FC, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

interface ScrimProps {
  isOpen: boolean;
}

const Scrim: FC<ScrimProps> = ({ isOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return <div className={cx("scrim", { open: isOpen })} />;
};

export default Scrim;

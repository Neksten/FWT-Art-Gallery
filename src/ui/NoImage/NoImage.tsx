import { FC } from "react";
import classNames from "classnames/bind";

import { ReactComponent as Photo } from "@/assets/icons/photo.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface NoImageProps {
  variant?: "small" | "big";
  theme?: "light" | "dark";
}

const NoImage: FC<NoImageProps> = ({ variant = "small", theme = "light" }) => {
  return (
    <div className={cx("none", `none-${variant}`, `none-${theme}`)}>
      <div className={cx("none__icon")}>
        <Photo />
      </div>
      <span className={cx("none__text")}>No Image uploaded</span>
    </div>
  );
};

export default NoImage;

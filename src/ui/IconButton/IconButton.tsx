import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  variant?: "theme" | "arrow";
}

const IconButton: FC<IconButtonProps> = ({
  theme = "light",
  variant,
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={cx("button", `button-${theme}`, `button-${variant}`, className)}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;

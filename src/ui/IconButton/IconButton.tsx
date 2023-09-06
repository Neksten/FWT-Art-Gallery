import { ButtonHTMLAttributes, FC } from "react";

import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  fullBorderRadius?: boolean;
  variant?: "delete" | "theme" | "arrow";
}

const IconButton: FC<IconButtonProps> = ({
  theme = "light",
  fullBorderRadius = false,
  variant = "delete",
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cx("button", `button-${theme}`, `button-${variant}`, {
        fullBorderRadius: fullBorderRadius === true,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

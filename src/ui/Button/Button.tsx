import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import classNames from "classnames";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  startIcon?: ReactNode;
  theme?: "light" | "dark";
}

const Button: FC<ButtonProps> = ({
  variant = "filled",
  theme = "light",
  startIcon,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cx(
        "button",
        `button__${variant}`,
        `button__${variant}-${theme}`
      )}
      {...props}
    >
      {startIcon && startIcon}
      <span className={cx("button__text")}>{children}</span>
    </button>
  );
};

export default Button;

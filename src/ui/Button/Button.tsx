import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import styles from "./styles.module.scss";
import { classParser } from "../helpers/classParser";

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
  const rootClasses: string[] = [
    "button",
    `button__${variant}`,
    `button__${variant}-${theme}`,
  ];

  return (
    <button
      type="button"
      className={classParser(rootClasses, styles)}
      {...props}
    >
      {startIcon && startIcon}
      <span>{children}</span>
    </button>
  );
};

export default Button;

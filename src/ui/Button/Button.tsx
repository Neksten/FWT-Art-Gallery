import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import styles from "./styles.module.scss";

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

  const readyClasses = (): string => {
    return rootClasses.map((className) => styles[className]).join(" ");
  };

  return (
    <button type="button" className={readyClasses()} {...props}>
      {startIcon && startIcon}
      <span>{children}</span>
    </button>
  );
};

export default Button;

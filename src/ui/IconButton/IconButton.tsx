import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames/bind";
import { classParser } from "@helpers/classParser";
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
  const rootClasses: string[] = [
    "button",
    `button-${theme}`,
    `button-${variant}`,
  ];

  return (
    <button
      type="button"
      className={cx(`${classParser(rootClasses, styles)}`, {
        fullBorderRadius: fullBorderRadius === true,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

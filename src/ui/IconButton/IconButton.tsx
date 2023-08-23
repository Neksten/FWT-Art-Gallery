import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { classParser } from "../helpers/classParser";

const cx = classNames.bind(styles);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  fullBorderRadius?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  theme = "light",
  fullBorderRadius = false,
  children,
  ...props
}) => {
  const rootClasses: string[] = ["button", `button-${theme}`];

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

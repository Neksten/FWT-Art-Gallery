import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames/bind";

import { ReactComponent as Close } from "@/assets/icons/close.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface GenreProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  close?: boolean;
}

const Genre: FC<GenreProps> = ({
  theme = "light",
  close,
  className,
  children,
  ...props
}) => (
  <button
    type="button"
    className={cx("genre", `genre-${theme}`, className, {
      close,
    })}
    {...props}
  >
    {children}
    {close && (
      <div className={cx("genre__icon")}>
        <Close />
      </div>
    )}
  </button>
);

export default Genre;

import { forwardRef, InputHTMLAttributes } from "react";

import { ReactComponent as Error } from "@assets/icons/error.svg";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  value: string;
  setValue: (value: string) => void;
  error?: string;
  theme?: "light" | "dark";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, htmlFor, theme = "light", error, value, setValue, ...props },
    ref
  ) => {
    return (
      <div className={cx(styles["text-field"], styles[`text-field-${theme}`])}>
        <label className={styles["text-field__label"]} htmlFor={htmlFor}>
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cx(
            styles["text-field__input"],
            styles[`text-field__input-${theme}`],
            styles[error ? `text-field__input-error` : ""]
          )}
        />
        {error && (
          <p className={styles["text-field__error"]}>
            <Error />
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;

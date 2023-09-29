import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames/bind";

import { Error } from "@/ui/Error";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  theme?: "light" | "dark";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, theme = "light", error, value, ...props }, ref) => {
    return (
      <div className={cx("text-field", `text-field-${theme}`)}>
        <label className={cx("text-field__label")} htmlFor={name}>
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          name={name}
          value={value}
          className={cx(
            "text-field__input",
            `text-field__input-${theme}`,
            error ? `text-field__input-error` : ""
          )}
        />
        {error && <Error error={error} />}
      </div>
    );
  }
);

export default Input;

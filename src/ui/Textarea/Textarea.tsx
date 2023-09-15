import { forwardRef, TextareaHTMLAttributes } from "react";
import classNames from "classnames/bind";

import { ReactComponent as Error } from "@/assets/icons/error.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  htmlFor: string;
  error?: string;
  theme?: "light" | "dark";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, htmlFor, value, error, theme = "light", ...props },
    ref
  ) => {
    return (
      <div className={cx("text-field", `text-field-${theme}`)}>
        <label className={cx("text-field__label")} htmlFor={htmlFor}>
          {label}
        </label>
        <textarea
          {...props}
          name={htmlFor}
          ref={ref}
          value={value}
          className={cx(
            "text-field__textarea",
            `text-field__textarea-${theme}`,
            "scroll",
            className,
            {
              "text-field__textarea-error": error,
            }
          )}
        />
        {error && (
          <p className={cx("text-field__error")}>
            <Error />
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Textarea;

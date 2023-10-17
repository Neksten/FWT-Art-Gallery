import { forwardRef, TextareaHTMLAttributes } from "react";
import classNames from "classnames/bind";

import { Error } from "@/ui/Error";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  theme?: "light" | "dark";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, name, value, error, theme = "light", ...props },
    ref
  ) => (
    <div className={cx("text-field", `text-field-${theme}`)}>
      <label className={cx("text-field__label")} htmlFor={name}>
        {label}
      </label>
      <textarea
        {...props}
        name={name}
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
      {error && <Error error={error} />}
    </div>
  )
);

export default Textarea;

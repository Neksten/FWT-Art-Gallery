import { forwardRef } from "react";
import classNames from "classnames/bind";

import { InputProps } from "@/models/IInput";

import { Error } from "@/ui/Error";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, theme = "light", renderAddon, error, value, ...props },
    ref
  ) => (
    <div className={cx("text-field", `text-field-${theme}`)}>
      <label className={cx("text-field__label")} htmlFor={name}>
        {label}
      </label>
      <div className={cx("text-field__wrapper")}>
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
        {renderAddon}
      </div>
      {error && <Error error={error} />}
    </div>
  )
);

export default Input;

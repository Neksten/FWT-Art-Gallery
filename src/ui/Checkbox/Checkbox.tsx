import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames/bind";

import { ReactComponent as Success } from "@/assets/icons/success.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  theme?: "light" | "dark";
}

const Checkbox: FC<CheckboxProps> = ({
  checked,
  theme = "light",
  htmlFor,
  ...props
}) => {
  return (
    <label htmlFor={htmlFor} className={cx("checkbox", `checkbox-${theme}`)}>
      <input type="checkbox" className={cx("checkbox__input")} {...props} />
      {checked && (
        <div className={cx("checkbox__icon")}>
          <Success />
        </div>
      )}
    </label>
  );
};

export default Checkbox;

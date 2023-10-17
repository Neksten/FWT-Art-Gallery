import { forwardRef, useState } from "react";
import classNames from "classnames/bind";

import { InputProps } from "@/models/IInput";

import { Input } from "@/ui/Input";
import { ReactComponent as Eye } from "@/assets/icons/eye.svg";
import { ReactComponent as EyeChecked } from "@/assets/icons/eye-checked.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ theme, label, error, className, ...props }, ref) => {
    const [isShownPassword, setIsShownPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={isShownPassword ? "text" : "password"}
        label="password"
        autoComplete="current-password"
        theme={theme}
        error={error}
        renderAddon={
          <button
            type="button"
            onClick={() => setIsShownPassword(!isShownPassword)}
            className={cx("eye")}
          >
            {isShownPassword ? <EyeChecked /> : <Eye />}
          </button>
        }
        {...props}
      />
    );
  }
);

export default InputPassword;

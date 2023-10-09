import { FC, useState } from "react";
import classNames from "classnames/bind";
import { UseFormRegisterReturn } from "react-hook-form";

import { InputProps } from "@/ui/Input/Input";
import { Input } from "@/ui/Input";
import { ReactComponent as Eye } from "@/assets/icons/eye.svg";
import { ReactComponent as EyeChecked } from "@/assets/icons/eye-checked.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputPasswordProps extends InputProps {
  register?: UseFormRegisterReturn<string>;
}

const InputPassword: FC<InputPasswordProps> = ({
  theme,
  label,
  error,
  className,
  register,
  ...props
}) => {
  const [isShownPassword, setIsShownPassword] = useState(false);

  return (
    <Input
      {...register}
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
};

export default InputPassword;

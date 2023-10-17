import { ButtonHTMLAttributes, FC, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { AuthModal } from "@/components/AuthModal";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "login" | "signup";
}

const HeaderButton: FC<HeaderButtonProps> = ({
  variant,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cx("link", `link-${theme}`, className)}
      >
        {variant === "login" ? "Log in" : "Sign Up"}
      </button>
      {isOpen && <AuthModal setIsOpen={setIsOpen} initialVariant={variant} />}
    </>
  );
};

export default HeaderButton;

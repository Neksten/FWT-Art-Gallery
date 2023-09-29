import { FC, PropsWithChildren, useState } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { Portal } from "@/components/Portal";
import { Overlay } from "@/ui/Overlay";
import { ReactComponent as Close } from "@/assets/icons/close.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface ModalProps extends PropsWithChildren {
  closeModal: () => void;
  className?: string;
  variant?: "small" | "big" | "menu";
}

const Modal: FC<ModalProps> = ({
  closeModal,
  className,
  variant = "big",
  children,
}) => {
  const { theme } = useTheme();
  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");

  const closeForm = () => {
    setMenuClass("delete");
    setTimeout(() => {
      setMenuClass("open");
      closeModal();
    }, 300);
  };
  return (
    <Portal>
      <RemoveScrollBar gapMode="padding" />
      <div
        className={cx(
          "wrapper",
          `wrapper-${theme}`,
          `wrapper-${variant}`,
          menuClass
        )}
      >
        <Overlay className={cx("wrapper__overlay")} onClick={closeForm} />
        <div className={cx("modal", "scroll", className)}>
          <button
            type="button"
            onClick={closeForm}
            className={cx("modal__close")}
          >
            <Close />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

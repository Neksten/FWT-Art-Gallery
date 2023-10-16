import { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import { ReactComponent as Error } from "@/assets/icons/error.svg";
import { ReactComponent as Close } from "@/assets/icons/close.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface ToastProps extends PropsWithChildren {
  closeToast: () => void;
  theme: "light" | "dark";
}

const Toast: FC<ToastProps> = ({ closeToast, theme, children }) => (
  <div className={cx("toast", `toast-${theme}`)}>
    <div className={cx("toast__top")}>
      <Error />
      <p className={cx("toast__title", "base", "md")}>Error!</p>
    </div>
    <p className={cx("toast__error", "small", "lh")}>{children}</p>
    <button type="button" onClick={closeToast} className={cx("toast__close")}>
      <Close />
    </button>
  </div>
);

export default Toast;

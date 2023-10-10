import { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { HeaderButton } from "@/components/Header/HeaderButton";
import { ThemeButton } from "@/components/Header/ThemeButton";
import { Modal } from "@/components/Modal";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface HeaderModalProps extends PropsWithChildren {
  handleClickLogout: () => void;
  setIsOpen: (value: boolean) => void;
}

const HeaderModal: FC<HeaderModalProps> = ({
  handleClickLogout,
  setIsOpen,
}) => {
  const { theme, changeTheme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      variant="menu"
      closeModal={() => setIsOpen(false)}
    >
      <ThemeButton theme={theme} changeTheme={changeTheme} />
      <ul className={cx("modal__list")}>
        {isAuth ? (
          <li>
            <button
              onClick={handleClickLogout}
              type="button"
              className={cx("modal__link")}
            >
              Log out
            </button>
          </li>
        ) : (
          <>
            <li>
              <HeaderButton variant="login" className={cx("modal__link")} />
            </li>
            <li>
              <HeaderButton variant="signup" className={cx("modal__link")} />
            </li>
          </>
        )}
      </ul>
    </Modal>
  );
};

export default HeaderModal;

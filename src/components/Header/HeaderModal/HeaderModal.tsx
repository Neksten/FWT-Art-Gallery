import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { ThemeButton } from "@/components/Header/ThemeButton";
import { Modal } from "@/components/Modal";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface HeaderModalProps {
  handleClickClose: () => void;
  handleClickLogout: () => void;
  handleClickLogin: () => void;
  handleClickSignup: () => void;
}

const HeaderModal: FC<HeaderModalProps> = ({
  handleClickClose,
  handleClickLogout,
  handleClickLogin,
  handleClickSignup,
}) => {
  const { theme, changeTheme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      variant="menu"
      closeModal={handleClickClose}
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
              <button
                type="button"
                onClick={handleClickLogin}
                className={cx("modal__link")}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={handleClickSignup}
                className={cx("modal__link")}
              >
                Sign up
              </button>
            </li>
          </>
        )}
      </ul>
    </Modal>
  );
};

export default HeaderModal;

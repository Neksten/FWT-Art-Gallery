import { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { ThemeButton } from "@/components/Header/ThemeButton";
import { HeaderAuth } from "@/components/Header/HeaderAuth";
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

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      variant="menu"
      closeModal={() => setIsOpen(false)}
    >
      <ThemeButton theme={theme} changeTheme={changeTheme} />
      <ul className={cx("modal__list")}>
        <HeaderAuth
          handleClickLogout={handleClickLogout}
          className={cx("modal__link")}
        />
      </ul>
    </Modal>
  );
};

export default HeaderModal;

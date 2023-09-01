import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { MyLink } from "@ui/MyLink";
import { IconButton } from "@ui/IconButton";
import { ReactComponent as Moon } from "@assets/icons/moon.svg";
import { ReactComponent as Logo } from "@assets/icons/logo.svg";
import { ReactComponent as Burger } from "@assets/icons/burger.svg";
import { ReactComponent as Sun } from "@assets/icons/sun.svg";
import { ReactComponent as Close } from "@assets/icons/close.svg";
import { useTheme } from "@hooks/useTheme";
import Modal from "@components/Modal/Modal";
import { Authorization } from "@components/Authorization";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const SCREEN_WIDTH = window.screen.width < 1440;

const Header = () => {
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickBurger = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };
  const handleClickLogin = () => {
    setIsOpenAuth(true);
  };
  const handleClickTheme = () => {
    changeTheme(theme);
  };

  return (
    <header className={cx(styles.header, styles[`header-${theme}`])}>
      <Authorization isOpen={isOpenAuth} setIsOpen={setIsOpenAuth} />
      {SCREEN_WIDTH && !isOpenAuth && (
        <Modal isOpen={isOpen}>
          <nav
            className={cx(
              styles.header__modal,
              styles[`header__modal-${theme}`],
              isOpen && styles["header__modal-open"]
            )}
          >
            <div
              aria-hidden
              onClick={handleClickTheme}
              className={styles.header__theme}
            >
              <IconButton fullBorderRadius variant="theme" theme={theme}>
                {theme === "light" ? <Moon /> : <Sun />}
              </IconButton>
              <MyLink to="#" theme={theme}>
                Dark mode
              </MyLink>
            </div>
            <ul className={styles.header__list}>
              <li>
                <button
                  type="button"
                  onClick={handleClickLogin}
                  className={styles.header__link}
                >
                  Log In
                </button>
              </li>
              <li>
                <Link to="/" className={styles.header__link}>
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>
          <div
            aria-hidden
            onClick={handleClickClose}
            className={cx(
              styles.header__close,
              styles[`header__close-${theme}`],
              isOpen && styles["header__close-open"]
            )}
          >
            <Close />
          </div>
        </Modal>
      )}
      <div className={`${styles.header__content} container`}>
        <Link to="/" className={styles.header__logo}>
          <Logo />
        </Link>
        <nav className={styles.header__menu}>
          <ul className={styles.header__list}>
            <li>
              <button
                type="button"
                onClick={handleClickLogin}
                className={styles.header__link}
              >
                Log In
              </button>
            </li>
            <li>
              <p className={styles.header__link}>Sign up</p>
            </li>
          </ul>
          <IconButton
            fullBorderRadius
            onClick={handleClickTheme}
            variant="theme"
            theme={theme}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </IconButton>
        </nav>
        <div
          aria-hidden
          onClick={handleClickBurger}
          className={styles.header__burger}
        >
          <Burger />
        </div>
      </div>
    </header>
  );
};

export default Header;

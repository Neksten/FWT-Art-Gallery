import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { logout } from "@store/auth/authSlice";
import { MyLink } from "@ui/MyLink";
import { IconButton } from "@ui/IconButton";
import { ReactComponent as Moon } from "@assets/icons/moon.svg";
import { ReactComponent as Logo } from "@assets/icons/logo.svg";
import { ReactComponent as Burger } from "@assets/icons/burger.svg";
import { ReactComponent as Sun } from "@assets/icons/sun.svg";
import { ReactComponent as Close } from "@assets/icons/close.svg";
import { useTheme } from "@hooks/useTheme";
import Modal from "@components/Modal/Modal";
import AuthModal from "@components/AuthModal/AuthModal";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const SCREEN_WIDTH = window.screen.width < 1440;

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickBurger = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };
  const handleClickLogin = () => {
    setIsOpenLogin(true);
    setIsOpen(false);
  };
  const handleClickSignup = () => {
    setIsOpenSignup(true);
    setIsOpen(false);
  };
  const handleClickTheme = () => {
    changeTheme(theme);
  };
  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={cx(styles.header, styles[`header-${theme}`])}>
      <AuthModal isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
      <AuthModal
        isOpen={isOpenSignup}
        setIsOpen={setIsOpenSignup}
        variant="signup"
      />
      {SCREEN_WIDTH && (!isOpenLogin || !isOpenSignup) && (
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
              {isAuth ? (
                <li>
                  <button
                    onClick={handleClickLogout}
                    type="button"
                    className={styles.header__link}
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
                      className={styles.header__link}
                    >
                      Log In
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleClickSignup}
                      className={styles.header__link}
                    >
                      Sign up
                    </button>
                  </li>
                </>
              )}
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
            {isAuth ? (
              <li>
                <button
                  onClick={handleClickLogout}
                  type="button"
                  className={styles.header__link}
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
                    className={styles.header__link}
                  >
                    Log In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleClickSignup}
                    className={styles.header__link}
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
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

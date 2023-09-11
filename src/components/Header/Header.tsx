import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { logout } from "@/store/auth/authSlice";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Moon } from "@/assets/icons/moon.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { ReactComponent as Burger } from "@/assets/icons/burger.svg";
import { ReactComponent as Sun } from "@/assets/icons/sun.svg";
import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { ThemeButton } from "@/components/Header/ThemeButton";
import { Modal } from "@/components/Modal";
import { AuthModal } from "@/components/AuthModal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const SCREEN_WIDTH = window.screen.width < 1440;

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");

  const handleClickLogin = () => {
    setIsOpenLogin(true);
    setIsOpenMenu(false);
  };
  const handleClickSignup = () => {
    setIsOpenSignup(true);
    setIsOpenMenu(false);
  };
  const handleClickLogout = () => dispatch(logout());

  const handleClickClose = () => {
    setMenuClass("delete");
    setTimeout(() => {
      setIsOpenMenu(false);
      setMenuClass("open");
    }, 300);
  };
  return (
    <header className={cx("header", `header-${theme}`)}>
      {isOpenLogin && (
        <AuthModal
          setMenuClass={setMenuClass}
          menuClass={menuClass}
          setIsOpen={setIsOpenLogin}
          setIsRedirect={() => setIsOpenSignup(true)}
        />
      )}
      {isOpenSignup && (
        <AuthModal
          setMenuClass={setMenuClass}
          menuClass={menuClass}
          setIsOpen={setIsOpenSignup}
          setIsRedirect={() => setIsOpenLogin(true)}
          variant="signup"
        />
      )}
      {SCREEN_WIDTH && (!isOpenLogin || !isOpenSignup) && isOpenMenu && (
        <Modal menuClass={menuClass} closeModal={handleClickClose}>
          <nav
            className={cx("header__modal", `header__modal-${theme}`, menuClass)}
          >
            <button
              type="button"
              onClick={handleClickClose}
              className={cx("header__close", {
                open: isOpenMenu,
              })}
            >
              <Close />
            </button>
            <ThemeButton theme={theme} changeTheme={changeTheme} />
            <ul className={cx("header__list")}>
              {isAuth ? (
                <li>
                  <button
                    onClick={handleClickLogout}
                    type="button"
                    className={cx("header__link")}
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
                      className={cx("header__link")}
                    >
                      Log In
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleClickSignup}
                      className={cx("header__link")}
                    >
                      Sign up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </Modal>
      )}
      <div className={cx("header__content", "container")}>
        <Link to="/" className={cx("header__logo")}>
          <Logo />
        </Link>
        <nav className={cx("header__menu")}>
          <ul className={cx("header__list")}>
            {isAuth ? (
              <li>
                <button
                  onClick={handleClickLogout}
                  type="button"
                  className={cx("header__link")}
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
                    className={cx("header__link")}
                  >
                    Log In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleClickSignup}
                    className={cx("header__link")}
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
          </ul>
          <IconButton
            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
            variant="theme"
            theme={theme}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </IconButton>
        </nav>
        <button
          type="button"
          onClick={() => setIsOpenMenu(true)}
          className={cx("header__burger")}
        >
          <Burger />
        </button>
      </div>
    </header>
  );
};

export default Header;

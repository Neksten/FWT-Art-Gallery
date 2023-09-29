import { FC, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { apiService } from "@/api";
import { useTheme } from "@/context/ThemeContext";
import { logout } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { HeaderModal } from "@/components/Header/HeaderModal";
import { AuthModal } from "@/components/AuthModal";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Moon } from "@/assets/icons/moon.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { ReactComponent as Burger } from "@/assets/icons/burger.svg";
import { ReactComponent as Sun } from "@/assets/icons/sun.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const SCREEN_WIDTH = window.screen.width < 1440;

const Header: FC = () => {
  const { theme, changeTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClickLogin = () => {
    setIsOpenLogin(true);
    setIsOpenMenu(false);
  };
  const handleClickSignup = () => {
    setIsOpenSignup(true);
    setIsOpenMenu(false);
  };
  const handleClickLogout = () => {
    dispatch(apiService.util.resetApiState());
    dispatch(logout());
  };
  return (
    <header className={cx("header", `header-${theme}`)}>
      {isOpenLogin && (
        <AuthModal
          setIsOpen={setIsOpenLogin}
          setIsRedirect={() => setIsOpenSignup(true)}
        />
      )}
      {isOpenSignup && (
        <AuthModal
          setIsOpen={setIsOpenSignup}
          setIsRedirect={() => setIsOpenLogin(true)}
          variant="signup"
        />
      )}
      {SCREEN_WIDTH && (!isOpenLogin || !isOpenSignup) && isOpenMenu && (
        <HeaderModal
          handleClickClose={() => setIsOpenMenu(false)}
          handleClickLogout={handleClickLogout}
          handleClickLogin={handleClickLogin}
          handleClickSignup={handleClickSignup}
        />
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

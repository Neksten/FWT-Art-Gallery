import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { apiService } from "@/api";
import { logout } from "@/store/auth/authSlice";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { BurgerButton } from "@/components/BurgerButton";
import { HeaderButton } from "@/components/Header/HeaderButton";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Moon } from "@/assets/icons/moon.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { ReactComponent as Sun } from "@/assets/icons/sun.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { theme, changeTheme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  const handleClickLogout = () => {
    dispatch(apiService.util.resetApiState());
    dispatch(logout());
  };

  return (
    <header className={cx("header", `header-${theme}`)}>
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
                  {!isAuth && (
                    <HeaderButton
                      variant="login"
                      className={cx("header__link")}
                    />
                  )}
                </li>
                <li>
                  {!isAuth && (
                    <HeaderButton
                      variant="signup"
                      className={cx("header__link")}
                    />
                  )}
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
        <BurgerButton
          handleClickLogout={handleClickLogout}
          className={cx("header__burger")}
        />
      </div>
    </header>
  );
};

export default Header;

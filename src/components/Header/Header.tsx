import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { apiService } from "@/api";
import { logout } from "@/store/auth/authSlice";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch } from "@/hooks/redux";

import { HeaderAuth } from "@/components/Header/HeaderAuth";
import { BurgerButton } from "@/components/BurgerButton";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Moon } from "@/assets/icons/moon.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { ReactComponent as Sun } from "@/assets/icons/sun.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { theme, changeTheme } = useTheme();

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
            <HeaderAuth
              handleClickLogout={handleClickLogout}
              className={cx("header__link")}
            />
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

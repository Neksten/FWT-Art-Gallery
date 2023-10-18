import { FC, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { apiService } from "@/api";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/auth/authSlice";
import { useTheme } from "@/context/ThemeContext";
import { useFilters } from "@/context/FiltersContext";

import { BurgerButton } from "@/components/BurgerButton";
import { HeaderAuth } from "@/components/Header/HeaderAuth";
import { IconButton } from "@/ui/IconButton";
import { InputSearch } from "@/ui/InputSearch";
import { ReactComponent as Sun } from "@/assets/icons/sun.svg";
import { ReactComponent as Moon } from "@/assets/icons/moon.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { filters, changeFilters } = useFilters();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { theme, changeTheme } = useTheme();

  const handleClickLogout = () => {
    dispatch(apiService.util.resetApiState());
    dispatch(logout());
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <header className={cx("header", `header-${theme}`)}>
      <div className={cx("header__content", "container")}>
        {!isOpenSearch && (
          <Link to="/" className={cx("header__logo")}>
            <Logo />
          </Link>
        )}
        <InputSearch
          value={filters.name}
          isOpen={isOpenSearch}
          setIsOpen={setIsOpenSearch}
          setValue={(value: string) =>
            changeFilters({ ...filters, name: value })
          }
          placeholder="Search"
          theme={theme}
          variant="small"
          className={cx("header__search")}
        />
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

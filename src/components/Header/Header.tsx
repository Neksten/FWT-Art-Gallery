import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import IconButton from "../../ui/IconButton/IconButton";
import { Moon } from "../../assets/Moon";
import { Logo } from "../../assets/Logo";
import { Burger } from "../../assets/Burger";
import MyLink from "../../ui/MyLink/MyLink";
import Scrim from "../../ui/Scrim/Scrim";
import { useTheme } from "../../hooks/useTheme";
import { Sun } from "../../assets/Sun";
import { Close } from "../../assets/Close";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickBurger = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };
  const handleClickTheme = () => {
    changeTheme(theme);
  };

  return (
    <header
      className={cx(`${styles.header}`, {
        dark: theme === "dark",
      })}
    >
      <Scrim isOpen={isOpen} />
      <div className={`${styles.header__content} container`}>
        <Link to="/" className={styles.header__logo}>
          <Logo />
        </Link>
        <nav
          className={cx(`header__menu`, {
            open: isOpen,
          })}
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
              <Link to="/" className={styles.header__link}>
                Log In
              </Link>
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
          onClick={handleClickBurger}
          className={styles.header__burger}
        >
          <Burger />
        </div>
        <div
          aria-hidden
          onClick={handleClickClose}
          className={cx(`header__close`, {
            open: isOpen,
          })}
        >
          <Close />
        </div>
      </div>
    </header>
  );
};

export default Header;

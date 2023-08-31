import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { Scrim } from "@ui/Scrim";
import { MyLink } from "@ui/MyLink";
import { IconButton } from "@ui/IconButton";
import { ReactComponent as Moon } from "@assets/moon.svg";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as Burger } from "@assets/burger.svg";
import { ReactComponent as Sun } from "@assets/sun.svg";
import { ReactComponent as Close } from "@assets/close.svg";
import { useTheme } from "@hooks/useTheme";

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
    <header className={cx(styles.header, styles[`header-${theme}`])}>
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

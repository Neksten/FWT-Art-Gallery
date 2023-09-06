import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { Scrim } from "@/ui/Scrim";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as Burger } from "@/assets/burger.svg";
import { ReactComponent as Close } from "@/assets/close.svg";
import { useTheme } from "@/context/ThemeContext/ThemeContext";

import { ThemeButton } from "@/components/Header/ThemeButton";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cx(`${styles.header}`, {
        dark: theme === "dark",
      })}
    >
      <Scrim isOpen={isOpen} />
      <div className={cx("header__content", "container")}>
        <Link to="/" className={cx("header__logo")}>
          <Logo />
        </Link>
        <nav
          className={cx("header__menu", {
            open: isOpen,
          })}
        >
          <ThemeButton theme={theme} changeTheme={changeTheme} />
          <ul className={cx("header__list")}>
            <li>
              <Link to="/" className={cx("header__link")}>
                Log In
              </Link>
            </li>
            <li>
              <Link to="/" className={cx("header__link")}>
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cx("header__burger")}
        >
          <Burger />
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={cx("header__close", {
            open: isOpen,
          })}
        >
          <Close />
        </button>
      </div>
    </header>
  );
};

export default Header;

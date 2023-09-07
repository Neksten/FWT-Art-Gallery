import { FC } from "react";

import classNames from "classnames/bind";
import { ReactComponent as Moon } from "@/assets/moon.svg";
import { ReactComponent as Sun } from "@/assets/sun.svg";

import { MyLink } from "@/ui/MyLink";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface IconButtonProps {
  theme: "light" | "dark";
  changeTheme: (value: "light" | "dark") => void;
}

const ThemeButton: FC<IconButtonProps> = ({ theme = "light", changeTheme }) => {
  return (
    <button
      onClick={() => changeTheme(theme)}
      type="button"
      className={cx("button", `button-${theme}`)}
    >
      <div className={cx("button__icon")}>
        {theme === "light" ? <Moon /> : <Sun />}
      </div>
      <MyLink to="#" theme={theme} className={cx("button__link")}>
        Dark mode
      </MyLink>
    </button>
  );
};

export default ThemeButton;

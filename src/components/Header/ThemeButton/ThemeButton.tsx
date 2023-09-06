import { FC } from "react";

import classNames from "classnames/bind";
import { ReactComponent as Moon } from "@/assets/moon.svg";
import { ReactComponent as Sun } from "@/assets/sun.svg";

import { MyLink } from "@/ui/MyLink";
import stylesButton from "@/ui/IconButton/styles.module.scss";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);
const cxBtn = classNames.bind(stylesButton);

interface IconButtonProps {
  theme: "light" | "dark";
  changeTheme: (value: "light" | "dark") => void;
}

const ThemeButton: FC<IconButtonProps> = ({ theme = "light", changeTheme }) => {
  return (
    <button
      onClick={() => changeTheme(theme)}
      type="button"
      className={cx("button")}
    >
      <div className={cxBtn("button", `button-${theme}`, "button-theme")}>
        {theme === "light" ? <Moon /> : <Sun />}
      </div>
      <MyLink to="#" theme={theme}>
        Dark mode
      </MyLink>
    </button>
  );
};

export default ThemeButton;

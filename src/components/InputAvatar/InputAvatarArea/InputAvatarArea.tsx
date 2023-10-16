import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { ReactComponent as Profile } from "@/assets/icons/profile.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const InputAvatarArea: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={cx("area", `area-${theme}`)}>
      <div className={cx("area__image")}>
        <Profile />
      </div>
      <p className={cx("area__title", "base", "lh")}>Drop your image here</p>
      <p className={cx("area__text", "small", "lh")}>
        Upload only .jpg or .png format less than 3 MB
      </p>
    </div>
  );
};

export default InputAvatarArea;

import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { checkingBaseUrl } from "@/utils/checkingBaseUrl";

import { ReactComponent as Profile } from "@/assets/icons/profile.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputAvatarImageProps {
  value: any;
  error?: string;
}

const InputAvatarImage: FC<InputAvatarImageProps> = ({ value, error }) => {
  const { theme } = useTheme();

  return (
    <div className={cx("drag", `drag-${theme}`, { error, value })}>
      {value ? (
        <div className={cx("drag__avatar")}>
          <img
            src={checkingBaseUrl(value) ? value : URL.createObjectURL(value)}
            alt=""
          />
        </div>
      ) : (
        <>
          <div className={cx("drag__image")}>
            <Profile />
          </div>
          <p className={cx("drag__title", "base", "lh")}>
            You can drop your image here
          </p>
        </>
      )}
    </div>
  );
};

export default InputAvatarImage;

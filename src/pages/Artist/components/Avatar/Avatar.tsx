import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { prefixBaseUrl } from "@/utils/prefixBaseUrl";

import { NoImage } from "@/ui/NoImage";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface AvatarProps {
  avatar: string;
}

const Avatar: FC<AvatarProps> = ({ avatar }) => {
  const { theme } = useTheme();

  return (
    <div
      className={cx("avatar", {
        empty: !avatar,
      })}
    >
      {avatar ? (
        <img
          src={prefixBaseUrl(avatar)}
          alt="artist"
          className={cx("avatar__image")}
        />
      ) : (
        <NoImage variant="big" theme={theme} />
      )}
    </div>
  );
};

export default Avatar;

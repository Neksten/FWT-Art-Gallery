import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { ReactComponent as PreviewImage } from "@/assets/icons/preview-image.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputPaintingPreviewProps {
  error?: string;
}

const InputPaintingPreview: FC<InputPaintingPreviewProps> = ({ error }) => {
  const { theme } = useTheme();

  return (
    <div className={cx("preview", `preview-${theme}`, { error })}>
      <div className={cx("preview__image")}>
        <PreviewImage />
      </div>
      <div className={cx("preview__info")}>
        <p className={cx("preview__title", "base", "lh")}>
          Drop your image here, or
        </p>
        <p className={cx("preview__browse", "base", "md")}>browse image</p>
        <p className={cx("preview__text", "small", "lh")}>
          Upload only .jpg or .png format less than 3 MB
        </p>
      </div>
    </div>
  );
};

export default InputPaintingPreview;

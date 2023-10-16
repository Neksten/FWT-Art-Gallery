import { FC } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { checkingBaseUrl } from "@/utils/checkingBaseUrl";

import { InputPaintingPreview } from "@/components/InputPainting/InputPaintingPreview";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputPaintingAreaProps {
  value: any;
  drag: boolean;
  error?: string;
}

const InputPaintingArea: FC<InputPaintingAreaProps> = ({
  value,
  drag,
  error,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={cx("area", `area-${theme}`, {
        uploaded: value && !error,
        error,
        drag,
      })}
    >
      {value && !error && (
        <div className={cx("area__photo")}>
          <img
            src={checkingBaseUrl(value) ? value : URL.createObjectURL(value)}
            alt=""
          />
        </div>
      )}
      <InputPaintingPreview error={error} />
    </div>
  );
};

export default InputPaintingArea;

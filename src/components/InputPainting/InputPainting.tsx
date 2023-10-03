import { InputHTMLAttributes, useRef } from "react";
import { Control, FieldValues, Path, Controller } from "react-hook-form";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

import { IconButton } from "@/ui/IconButton";
import { Error } from "@/ui/Error";
import { ReactComponent as PreviewImage } from "@/assets/icons/preview-image.svg";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputPaintingProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  name: Path<T>;
  control: Control<T, unknown>;
}

const InputPainting = <T extends FieldValues>({
  error,
  name,
  control,
  ...props
}: InputPaintingProps<T>) => {
  const { theme } = useTheme();
  const {
    drag,
    dragOverHandler,
    dragLeaveHandler,
    onDropHandler,
    onImageChange,
  } = useDragAndDrop();

  const ref = useRef<HTMLInputElement | null>(null);

  const handleDeleteClick = (onBlur: () => void) => {
    onBlur();
    if (ref.current) {
      ref.current.value = "";
    }
    return null;
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <div
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => onChange(onDropHandler(e, onBlur))}
          className={cx("input-painting", `input-painting-${theme}`, {
            drag,
          })}
        >
          {value && !error && (
            <IconButton
              onClick={() => onChange(handleDeleteClick(onBlur))}
              theme={theme}
              className={cx("input-painting__delete")}
            >
              <Delete />
            </IconButton>
          )}
          <label htmlFor="drop" className={cx("input-painting__label")}>
            <input
              type="file"
              id="drop"
              onChange={(e) => onChange(onImageChange(e, onBlur))}
              className={cx("input-painting__input")}
              {...props}
            />
            <div
              className={cx("input-painting__area", {
                uploaded: value && !error,
                error,
              })}
            >
              {value && !error && (
                <div className={cx("input-painting__photo")}>
                  <img
                    src={
                      value.toString().includes(process.env.REACT_APP_BASE_URL)
                        ? value
                        : URL.createObjectURL(value)
                    }
                    alt=""
                  />
                </div>
              )}
              <div className={cx("input-painting__image")}>
                <PreviewImage />
              </div>
              <div className={cx("input-painting__info")}>
                <p className={cx("input-painting__title", "base", "lh")}>
                  Drop your image here, or
                </p>
                <p className={cx("input-painting__browse", "base", "md")}>
                  browse image
                </p>
                <p className={cx("input-painting__text", "small", "lh")}>
                  Upload only .jpg or .png format less than 3 MB
                </p>
              </div>
            </div>
          </label>
          {error && (
            <Error error={error} className={cx("input-painting__error")} />
          )}
        </div>
      )}
    />
  );
};

export default InputPainting;

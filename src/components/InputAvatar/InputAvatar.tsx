import { ChangeEvent, DragEvent, InputHTMLAttributes, useRef } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { Error } from "@/ui/Error";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Profile } from "@/assets/icons/profile.svg";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface InputAvatarProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  name: Path<T>;
  drag: boolean;
  dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void;
  onDropHandler: (e: DragEvent<HTMLDivElement>, onBlur: () => void) => File;
  onImageChange: (
    e: ChangeEvent<HTMLInputElement>,
    onBlur: () => void
  ) => File | null;
  control: Control<T, unknown>;
}

const InputAvatar = <T extends FieldValues>({
  error,
  name,
  drag,
  dragOverHandler,
  dragLeaveHandler,
  onDropHandler,
  onImageChange,
  control,
  ...props
}: InputAvatarProps<T>) => {
  const { theme } = useTheme();
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
          className={cx("input-avatar", `input-avatar-${theme}`)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => onChange(onDropHandler(e, onBlur))}
        >
          {drag ? (
            <div className={cx("input-avatar__area")}>
              <div className={cx("input-avatar__image")}>
                <Profile />
              </div>
              <p className={cx("input-avatar__title", "base", "lh")}>
                Drop your image here
              </p>
              <p className={cx("input-avatar__text", "small", "lh")}>
                Upload only .jpg or .png format less than 3 MB
              </p>
            </div>
          ) : (
            <div className={cx("input-avatar__file")}>
              {value && !error && (
                <IconButton
                  onClick={() => onChange(handleDeleteClick(onBlur))}
                  theme={theme}
                  className={cx("input-avatar__delete")}
                >
                  <Delete />
                </IconButton>
              )}
              <label className={cx("input-avatar__label")} htmlFor="drag">
                <input
                  ref={ref}
                  type="file"
                  id="drag"
                  onChange={(e) => onChange(onImageChange(e, onBlur))}
                  className={cx("input-avatar__input")}
                  {...props}
                />
                {value && !error ? (
                  <div className={cx("input-avatar__image-avatar")}>
                    <img
                      src={
                        value
                          .toString()
                          .includes(process.env.REACT_APP_BASE_URL)
                          ? value
                          : URL.createObjectURL(value)
                      }
                      alt=""
                    />
                  </div>
                ) : (
                  <>
                    <div className={cx("input-avatar__drag", { error })}>
                      <div className={cx("input-avatar__image")}>
                        <Profile />
                      </div>
                      <p className={cx("input-avatar__title", "base", "lh")}>
                        You can drop your image here
                      </p>
                    </div>
                    {error && (
                      <Error
                        error={error}
                        className={cx("input-avatar__error")}
                      />
                    )}
                  </>
                )}
                <p className={cx("input-avatar__browse", "small")}>
                  Browse profile photo
                </p>
              </label>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default InputAvatar;

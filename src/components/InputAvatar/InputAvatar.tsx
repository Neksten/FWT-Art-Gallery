import {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  RefObject,
  useRef,
} from "react";
import classNames from "classnames/bind";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { useTheme } from "@/context/ThemeContext";
import { checkingBaseUrl } from "@/utils/checkingBaseUrl";

import { Error } from "@/ui/Error";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";
import { ReactComponent as Profile } from "@/assets/icons/profile.svg";

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
  handleDeleteClick: (
    ref: RefObject<HTMLInputElement>,
    onBlur: () => void,
    onChange: (...event: any[]) => void
  ) => void;
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
  handleDeleteClick,
  control,
  ...props
}: InputAvatarProps<T>) => {
  const { theme } = useTheme();
  const ref = useRef<HTMLInputElement | null>(null);

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
                  onClick={() => handleDeleteClick(ref, onBlur, onChange)}
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
                        checkingBaseUrl(value)
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

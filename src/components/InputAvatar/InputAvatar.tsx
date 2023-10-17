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

import InputAvatarArea from "@/components/InputAvatar/InputAvatarArea/InputAvatarArea";
import InputAvatarImage from "@/components/InputAvatar/InputAvatarImage/InputAvatarImage";
import { Error } from "@/ui/Error";
import { IconButton } from "@/ui/IconButton";
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
  onDropHandler,
  onImageChange,
  handleDeleteClick,
  dragLeaveHandler,
  dragOverHandler,
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
          onDrop={(e) => onChange(onDropHandler(e, onBlur))}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
        >
          {drag ? (
            <InputAvatarArea />
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
                <InputAvatarImage value={value} error={error} />
                {error && (
                  <Error error={error} className={cx("input-avatar__error")} />
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

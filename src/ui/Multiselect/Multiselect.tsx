import { MouseEvent, useRef, useState } from "react";
import { Control, FieldValues, Path, Controller } from "react-hook-form";
import classNames from "classnames/bind";

import { IGenre } from "@/models/IGenre";

import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { Checkbox } from "@/ui/Checkbox";
import { Genre } from "@/ui/Genre";
import { Error } from "@/ui/Error";
import { ReactComponent as Expand } from "@/assets/icons/expand.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface MultiselectProps<T extends FieldValues> {
  title: string;
  list: IGenre[];
  initialListSelect?: IGenre[];
  className: string;
  theme?: "light" | "dark";
  name: Path<T>;
  error?: string;
  control: Control<T, unknown>;
}

const Multiselect = <T extends FieldValues>({
  title,
  list,
  initialListSelect,
  className,
  control,
  name,
  error,
  theme = "light",
}: MultiselectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [listSelect, setListSelect] = useState<IGenre[]>(
    initialListSelect || []
  );
  const topRef = useRef<HTMLDivElement>(null);

  const handleAddListSelect = (item: IGenre): IGenre[] => {
    if (!listSelect.find((i) => i.name === item.name)) {
      const newListSelect = [...listSelect, item];
      setListSelect(newListSelect);
      return newListSelect;
    }
    return listSelect;
  };

  const handleClickDelete = (id: string, onBlur: () => void): IGenre[] => {
    const newListSelect = listSelect.filter((i) => i._id !== id);
    setListSelect(newListSelect);
    if (newListSelect.length === 0) {
      onBlur();
    }
    return newListSelect;
  };
  const handleChangeOpen = (
    e: MouseEvent<HTMLDivElement>,
    onBlur: () => void
  ) => {
    if (topRef.current && e.target instanceof HTMLElement) {
      if (
        e.target.className === cx("select__top") ||
        e.target.className === cx("select__items")
      ) {
        setIsOpen(!isOpen);
      }
    }
    if (isOpen) {
      onBlur();
    }
  };

  const handleClose = (onBlur: () => void) => {
    if (isOpen) {
      setIsOpen(false);
      onBlur();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur } }) => (
        <div
          className={cx("select", `select-${theme}`, className, {
            open: isOpen,
            error,
          })}
        >
          <p className={cx("select__title", "small")}>{title}</p>
          <OutsideClickHandler onOutsideClick={() => handleClose(onBlur)}>
            <div
              role="presentation"
              ref={topRef}
              onClick={(e) => handleChangeOpen(e, onBlur)}
              className={cx("select__top")}
            >
              <div className={cx("select__items")}>
                {listSelect.map((i) => (
                  <Genre
                    theme={theme}
                    className={cx("select__genre")}
                    key={i._id}
                    onClick={() => onChange(handleClickDelete(i._id, onBlur))}
                    close
                  >
                    {i.name}
                  </Genre>
                ))}
              </div>
              <button type="button" className={cx("select__icon")}>
                <Expand />
              </button>
            </div>
            <div className={cx("select__content")}>
              <div className={cx("select__wrapper")}>
                <div className={cx("select__body", "scroll")}>
                  <ul className={cx("select__list")}>
                    {list.map(
                      (i) =>
                        i?.name && (
                          <li key={i._id} className={cx("select__item")}>
                            <button
                              type="button"
                              onClick={() =>
                                listSelect.some((item) => item === i)
                                  ? onChange(handleClickDelete(i._id, onBlur))
                                  : onChange(handleAddListSelect(i))
                              }
                              className={cx("select__button")}
                            >
                              <Checkbox
                                checked={listSelect.some(
                                  (item) => item._id === i._id
                                )}
                                name={i.name}
                                theme={theme}
                              />
                              <p className={cx("select__text", "base", "lh")}>
                                {i.name}
                              </p>
                            </button>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </OutsideClickHandler>
          {error && !isOpen && <Error error={error} />}
        </div>
      )}
    />
  );
};
export default Multiselect;

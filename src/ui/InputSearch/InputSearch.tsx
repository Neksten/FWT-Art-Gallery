import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames/bind";
import debounce from "lodash/debounce";

import { OutsideClickHandler } from "@/components/OutsideClickHandler";
import { Error } from "@/ui/Error";
import { ReactComponent as Search } from "@/assets/icons/search.svg";
import { ReactComponent as Reset } from "@/assets/icons/close.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface InputSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  variant?: "small" | "default";
  theme?: "light" | "dark";
  error?: string;
}

const InputSearch: FC<InputSearchProps> = ({
  name,
  isOpen = true,
  setIsOpen,
  theme = "light",
  variant = "default",
  setValue,
  error,
  className,
  ...props
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleOnClickClear = () => {
    setValue("");
    setSearch("");

    if (ref.current) {
      ref.current?.focus();
    }
  };

  const debouncedOnChange = useMemo(
    () => debounce((value: string) => setValue(value), 500),
    [setValue]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    debouncedOnChange(e?.target?.value);
  };

  const handleClickButton = () => {
    if (setIsOpen) {
      setIsOpen(true);
    }
    if (ref.current) {
      ref.current?.focus();
    }
    setIsFocus(true);
  };

  const handleClickOutside = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
    setIsFocus(false);
  };

  return (
    <div
      className={cx(
        "search",
        `search-${theme}`,
        `search-${variant}`,
        className,
        { open: isOpen }
      )}
    >
      <OutsideClickHandler onOutsideClick={() => handleClickOutside()}>
        <div className={cx("search__field", { error, focus: isFocus })}>
          <button
            onClick={handleClickButton}
            type="button"
            className={cx("search__button")}
          >
            <div className={cx("search__icon")}>
              <Search />
            </div>
          </button>
          <input
            {...props}
            ref={ref}
            name={name}
            onChange={handleChange}
            value={search}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={cx("search__input")}
          />
          {search && isOpen && (
            <button
              type="button"
              onClick={handleOnClickClear}
              className={cx("search__reset")}
            >
              <Reset />
            </button>
          )}
        </div>
      </OutsideClickHandler>
      {error && <Error className={cx("search__error")} error={error} />}
    </div>
  );
};
export default InputSearch;

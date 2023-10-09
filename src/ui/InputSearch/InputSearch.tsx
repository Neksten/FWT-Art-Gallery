import { ChangeEvent, FC, InputHTMLAttributes, useRef } from "react";
import classNames from "classnames/bind";
import { debounce } from "lodash";

import { Error } from "@/ui/Error";
import { ReactComponent as Search } from "@/assets/icons/search.svg";
import { ReactComponent as Reset } from "@/assets/icons/close.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface InputSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  theme?: "light" | "dark";
  error?: string;
}

const InputSearch: FC<InputSearchProps> = ({
  name,
  theme = "light",
  value,
  setValue,
  error,
  ...props
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  // const debounceFn = useCallback(debounce(handleSearchDebounce, 1000), []);

  // const handleSearchDebounce = debounce(() => {
  //   console.log("request");
  // }, 300);

  const handleDebounceFn = () => {
    // console.log("debounce");
  };
  const handleDebounceChange = debounce(handleDebounceFn, 300);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleDebounceChange();
  };
  const handleOnClickClear = () => {
    setValue("");
    if (ref.current) {
      ref.current?.focus();
    }
  };

  return (
    <div className={cx("search", `search-${theme}`)}>
      <div className={cx("search__field")}>
        <button type="button" className={cx("search__button")}>
          <div className={cx("search__icon")}>
            <Search />
          </div>
        </button>
        <input
          {...props}
          ref={ref}
          name={name}
          onChange={handleOnChange}
          value={value}
          className={cx("search__input")}
        />
        {value && (
          <button
            type="button"
            onClick={handleOnClickClear}
            className={cx("search__reset")}
          >
            <Reset />
          </button>
        )}
      </div>
      {error && <Error className={cx("search__error")} error={error} />}
    </div>
  );
};
export default InputSearch;

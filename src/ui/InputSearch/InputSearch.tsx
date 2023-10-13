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

import { Error } from "@/ui/Error";
import { ReactComponent as Search } from "@/assets/icons/search.svg";
import { ReactComponent as Reset } from "@/assets/icons/close.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface InputSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
  theme?: "light" | "dark";
  error?: string;
}

const InputSearch: FC<InputSearchProps> = ({
  name,
  theme = "light",
  setValue,
  error,
  ...props
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");

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
          onChange={handleChange}
          value={search}
          className={cx("search__input")}
        />
        {search && (
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

import React, {
  createContext,
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TThemeType = "light" | "dark";
type TSetTheme<T> = Dispatch<SetStateAction<T>>;

interface IContext {
  theme: TThemeType;
  changeTheme: TSetTheme<TThemeType>;
}

const initialThemeValue: IContext = {
  theme: "light",
  changeTheme: () => {},
};

const ThemeContext = createContext<IContext>(initialThemeValue);

type TThemeProvider = HTMLAttributes<HTMLDivElement>;

const getTheme = () => {
  const theme = localStorage.getItem("theme");

  if (!theme) {
    localStorage.setItem("theme", initialThemeValue.theme);
  }

  return theme as TThemeType;
};

export const ThemeProvider: FC<TThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<TThemeType>(getTheme());

  const changeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme, setTheme]);

  const contextValue = useMemo(
    () => ({ theme, changeTheme }),
    [theme, changeTheme]
  );

  useEffect(() => {
    setTheme(getTheme());
  }, []);
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

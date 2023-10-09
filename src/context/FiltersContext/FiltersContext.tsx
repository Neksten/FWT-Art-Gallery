import {
  createContext,
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { TFilterType } from "@/models/Filter";

interface IContext {
  filters: TFilterType[];
  changeFilters: (index: number, value: TFilterType) => void;
  clearFilters: () => void;
}

const defaultValueFilters: TFilterType[] = [
  { type: "genres", values: [] },
  { type: "sortBy", value: "A-Z" },
];

const initialFiltersValue: IContext = {
  filters: defaultValueFilters,
  changeFilters: () => {},
  clearFilters: () => {},
};

const FiltersContext = createContext<IContext>(initialFiltersValue);

export const FiltersProvider: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [filters, setFilters] = useState(defaultValueFilters);

  const changeFilters = useCallback(
    (index: number, value: TFilterType): void => {
      setFilters((prev: TFilterType[]) => {
        const updatedFilters = [...prev];
        updatedFilters[index] = value;
        return updatedFilters;
      });
    },
    []
  );

  const clearFilters = () => {
    setFilters(defaultValueFilters);
  };

  const contextValue = useMemo(
    () => ({ filters, changeFilters, clearFilters }),
    [filters, changeFilters]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);

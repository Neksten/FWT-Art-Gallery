import { FC } from "react";

import { IFilterValue } from "@/models/Filter";
import { useTheme } from "@/context/ThemeContext";

import { Filter } from "@/ui/Filter";

export interface FilterSortByProps {
  list: IFilterValue[];
  valueSelect: IFilterValue;
  setValueSelect: (value: IFilterValue) => void;
}

const FilterOrderBy: FC<FilterSortByProps> = ({
  list,
  valueSelect,
  setValueSelect,
}) => {
  const { theme } = useTheme();

  const handleChange = (item: IFilterValue) => {
    setValueSelect(item);
  };

  return (
    <Filter
      title="Sort By"
      list={list}
      theme={theme}
      onChange={handleChange}
      trackSelect={(item) => valueSelect._id === item._id}
    />
  );
};

export default FilterOrderBy;

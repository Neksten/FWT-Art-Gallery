import { FC } from "react";

import { IFilterValue } from "@/models/Filter";
import { useTheme } from "@/context/ThemeContext";

import { Filter } from "@/ui/Filter";

export interface FilterGenresProps {
  list: IFilterValue[];
  listSelect: IFilterValue[];
  setListSelect: (value: IFilterValue[]) => void;
}

const FilterGenres: FC<FilterGenresProps> = ({
  list,
  listSelect,
  setListSelect,
}) => {
  const { theme } = useTheme();

  const handleChange = (item: IFilterValue) => {
    const values = listSelect.some((i) => i._id === item._id)
      ? listSelect.filter((i) => i._id !== item._id)
      : [...listSelect, item];

    setListSelect(values);
  };

  return (
    <Filter
      title="Genres"
      list={list}
      length={listSelect.length}
      theme={theme}
      onChange={handleChange}
      trackSelect={(item) => listSelect.some((i) => i._id === item._id)}
    />
  );
};

export default FilterGenres;

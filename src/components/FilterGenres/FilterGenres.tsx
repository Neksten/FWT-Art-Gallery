import { FC } from "react";
import { IFilterValue } from "@/models/Filter";
import { Filter } from "@/ui/Filter";
import { useFilters } from "@/context/FiltersContext";
import { useTheme } from "@/context/ThemeContext";

export interface FilterGenresProps {
  list: IFilterValue[];
}

const FilterGenres: FC<FilterGenresProps> = ({ list }) => {
  const { theme } = useTheme();
  const { changeFilters, filters } = useFilters();
  const { genres } = filters;

  const handleChange = (item: IFilterValue) => {
    const values = genres.some((i) => i === item._id)
      ? genres.filter((i) => i !== item._id)
      : [...genres, item._id];

    changeFilters({ ...filters, genres: values });
  };

  return (
    <Filter
      title="Genres"
      list={list}
      length={genres.values.length}
      theme={theme}
      onChange={handleChange}
      trackSelect={(item) => genres.some((i) => i === item._id)}
    />
  );
};

export default FilterGenres;

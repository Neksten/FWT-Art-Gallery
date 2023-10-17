import { ButtonHTMLAttributes, FC, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

import { FiltersModal } from "@/components/FiltersModal";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Filters } from "@/assets/icons/filter.svg";

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const FilterButton: FC<FilterButtonProps> = ({ ...props }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton {...props} onClick={() => setIsOpen(!isOpen)} theme={theme}>
        <Filters />
      </IconButton>
      {isOpen && <FiltersModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default FilterButton;

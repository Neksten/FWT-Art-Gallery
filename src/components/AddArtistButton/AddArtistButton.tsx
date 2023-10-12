import { ButtonHTMLAttributes, FC, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { IGenre } from "@/models/IGenre";

import { ArtistModal } from "@/components/ArtistModal";
import { Button } from "@/ui/Button";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  genresList: IGenre[];
}

const AddArtistButton: FC<AddButtonProps> = ({ genresList, ...props }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        variant="outlined"
        startIcon={<Plus />}
        theme={theme}
      >
        Add Artist
      </Button>
      {isOpen && (
        <ArtistModal
          setIsOpen={setIsOpen}
          genresList={genresList}
          variant="add"
        />
      )}
    </>
  );
};

export default AddArtistButton;

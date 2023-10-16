import { ButtonHTMLAttributes, FC, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { IArtistModal } from "@/models/IArtist";
import { IGenre } from "@/models/IGenre";

import { ArtistModal } from "@/components/ArtistModal";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Edit } from "@/assets/icons/edit.svg";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  initialData: IArtistModal;
  artistId: string;
  genresList: IGenre[];
}

const EditArtistButton: FC<EditButtonProps> = ({
  initialData,
  artistId,
  genresList,
  ...props
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton {...props} onClick={() => setIsOpen(!isOpen)} theme={theme}>
        <Edit />
      </IconButton>
      {isOpen && (
        <ArtistModal
          setIsOpen={setIsOpen}
          initialData={initialData}
          artistId={artistId}
          genresList={genresList}
        />
      )}
    </>
  );
};

export default EditArtistButton;

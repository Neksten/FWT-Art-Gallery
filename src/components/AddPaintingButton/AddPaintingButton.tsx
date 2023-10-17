import { ButtonHTMLAttributes, FC, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

import { PaintingModal } from "@/components/PaintingModal";
import { Button } from "@/ui/Button";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  artistId: string;
}

const AddArtistButton: FC<AddButtonProps> = ({ artistId, ...props }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        variant="outlined"
        startIcon={<Plus />}
        theme={theme}
      >
        Add Picture
      </Button>
      {isOpen && (
        <PaintingModal
          artistId={artistId}
          setIsOpen={setIsOpen}
          variant="add"
        />
      )}
    </>
  );
};

export default AddArtistButton;

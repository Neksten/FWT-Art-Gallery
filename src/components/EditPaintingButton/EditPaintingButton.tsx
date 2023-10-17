import { ButtonHTMLAttributes, FC, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { IPainting } from "@/models/IPainting";

import { PaintingModal } from "@/components/PaintingModal";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Edit } from "@/assets/icons/edit.svg";

interface EditPaintingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  initialData: IPainting;
  paintingId: string;
  artistId: string;
  variant?: "icon" | "text";
}

const EditPaintingButton: FC<EditPaintingButtonProps> = ({
  initialData,
  paintingId,
  artistId,
  variant = "icon",
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {variant === "icon" ? (
        <IconButton
          {...props}
          onClick={() => setIsOpen(!isOpen)}
          theme={theme}
          className={className}
        >
          <Edit />
        </IconButton>
      ) : (
        <button
          {...props}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={className}
        >
          Edit
        </button>
      )}
      {isOpen && (
        <PaintingModal
          initialData={initialData}
          paintingId={paintingId}
          setIsOpen={setIsOpen}
          artistId={artistId}
          variant="edit"
        />
      )}
    </>
  );
};

export default EditPaintingButton;

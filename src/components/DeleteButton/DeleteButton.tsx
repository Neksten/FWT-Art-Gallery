import { ButtonHTMLAttributes, FC, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

import { DeleteModal } from "@/components/DeleteModal";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSuccess: boolean;
  handleDelete: () => void;
  variant?: "icon" | "text";
  variantTitle?: "artist" | "painting";
}

const DeleteButton: FC<DeleteButtonProps> = ({
  isSuccess,
  handleDelete,
  variant = "icon",
  variantTitle = "artist",
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
          className={className}
          onClick={() => setIsOpen(!isOpen)}
          theme={theme}
        >
          <Delete />
        </IconButton>
      ) : (
        <button
          {...props}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={className}
        >
          Delete
        </button>
      )}
      {isOpen && (
        <DeleteModal
          isSuccess={isSuccess}
          handleDelete={handleDelete}
          variant={variantTitle}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default DeleteButton;

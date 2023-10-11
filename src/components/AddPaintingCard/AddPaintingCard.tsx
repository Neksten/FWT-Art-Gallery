import { ButtonHTMLAttributes, FC, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";

import { PaintingModal } from "@/components/PaintingModal";
import { ReactComponent as Plus } from "@/assets/icons/plus.svg";
import { ReactComponent as Photo } from "@/assets/icons/photo.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface AddPaintingCardProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  artistId: string;
}

const AddPaintingCard: FC<AddPaintingCardProps> = ({ artistId, ...props }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cx("card", `card-${theme}`)}
      >
        <div className={cx("card__icon")}>
          <Photo />
        </div>
        <div className={cx("card__add")}>
          <Plus />
        </div>
      </button>
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

export default AddPaintingCard;

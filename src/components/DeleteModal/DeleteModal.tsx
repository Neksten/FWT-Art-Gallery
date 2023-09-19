import { FC, useState } from "react";
import { Modal } from "@/components/Modal";
import classNames from "classnames/bind";

import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";

import { Button } from "@/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { useDeleteArtistByIdMutation } from "@/store/artists/artist.api";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface DeleteModalProps {
  setIsOpen: (value: boolean) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ setIsOpen }) => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");
  const [deleteArtist] = useDeleteArtistByIdMutation();

  const handleClickClose = () => {
    setMenuClass("delete");
    setTimeout(() => {
      setIsOpen(false);
      setMenuClass("open");
    }, 300);
  };

  return (
    <Modal menuClass={menuClass} closeModal={handleClickClose}>
      <div className={cx("modal", `modal-${theme}`, menuClass)}>
        <button
          type="button"
          onClick={handleClickClose}
          className={cx("modal__close")}
        >
          <Close />
        </button>
        <div className={cx("modal__icon")}>
          <Delete />
        </div>
        <p className={cx("modal__title", "base", "md")}>
          Do you want to delete this artist profile?
        </p>
        <p className={cx("modal__text", "small", "lh")}>
          You will not be able to recover this profile afterwards.
        </p>
        <Button
          onClick={() => deleteArtist(id as string)}
          theme={theme}
          className={cx("modal__button")}
        >
          Delete
        </Button>
        <button
          type="button"
          onClick={handleClickClose}
          className={cx("modal__cancel")}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;

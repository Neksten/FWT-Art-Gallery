import { FC, useEffect } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch } from "@/hooks/redux";
import { resetError } from "@/store/error/errorSlice";

import { Modal } from "@/components/Modal";
import { Button } from "@/ui/Button";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface DeleteModalProps {
  setIsOpen: (value: boolean) => void;
  title: string;
  handleDelete: () => void;
  isSuccess: boolean;
}

const DeleteModal: FC<DeleteModalProps> = ({
  setIsOpen,
  title,
  handleDelete,
  isSuccess,
}) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const handleDeleteRequest = async () => {
    dispatch(resetError());
    handleDelete();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [setIsOpen, isSuccess]);

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      closeModal={() => setIsOpen(false)}
      variant="small"
    >
      <div className={cx("modal__icon")}>
        <Delete />
      </div>
      <p className={cx("modal__title", "base", "md")}>{title}</p>
      <p className={cx("modal__text", "small", "lh")}>
        You will not be able to recover this profile afterwards.
      </p>
      <Button
        onClick={handleDeleteRequest}
        theme={theme}
        className={cx("modal__button")}
      >
        Delete
      </Button>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className={cx("modal__cancel")}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default DeleteModal;

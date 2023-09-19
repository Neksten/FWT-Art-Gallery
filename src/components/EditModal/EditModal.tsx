import { FC, useState, DragEvent, ChangeEvent } from "react";
import classNames from "classnames/bind";

import { Modal } from "@/components/Modal";
import { useTheme } from "@/context/ThemeContext";
import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { ReactComponent as Profile } from "@/assets/icons/profile.svg";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { Button } from "@/ui/Button";
import { Multiselect } from "@/ui/Multiselect";
import { IconButton } from "@/ui/IconButton";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface EditModalProps {
  setIsOpen: (value: boolean) => void;
}

const EditModal: FC<EditModalProps> = ({ setIsOpen }) => {
  const { theme } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [listSelect, setListSelect] = useState<string[]>([]);
  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");

  const checkTypeFile = (type: string, file: Blob | MediaSource) => {
    if (type === "image/jpeg") {
      setImage(URL.createObjectURL(file));
    } else {
      setImage("error");
    }
  };
  const handleClickClose = () => {
    setMenuClass("delete");
    setTimeout(() => {
      setIsOpen(false);
      setMenuClass("open");
    }, 300);
  };

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
    setImage(null);
  };
  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = [...e.dataTransfer.files][0];
    checkTypeFile(file.type, file);
    setDrag(false);
  };
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      checkTypeFile(e.target.files[0].type, e.target.files[0]);
    }
  };
  return (
    <Modal menuClass={menuClass} closeModal={handleClickClose}>
      <div
        className={cx("modal", `modal-${theme}`, "scroll", menuClass, {
          drop: drag,
        })}
      >
        <div className={cx("modal__content")}>
          <button
            type="button"
            onClick={handleClickClose}
            className={cx("modal__close")}
          >
            <Close />
          </button>
          <div className={cx("modal__left")}>
            {image && image !== "error" ? (
              <div className={cx("modal__photo", "modal-photo")}>
                <div className={cx("modal-photo__image")}>
                  <img src={image} alt="" />
                  <IconButton
                    onClick={() => setImage(null)}
                    className={cx("modal-photo__delete")}
                  >
                    <Delete />
                  </IconButton>
                </div>
                <p className={cx("modal-photo__browse", "small")}>
                  Browse Profile Photo
                </p>
              </div>
            ) : (
              <div
                className={cx("modal__drop", "modal-drop", {
                  error: image === "error",
                })}
              >
                {drag ? (
                  <div
                    draggable
                    onDragEnter={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDrop={(e) => onDropHandler(e)}
                  >
                    <label htmlFor="drop" className={cx("modal-drop__label")}>
                      <input
                        type="file"
                        id="drop"
                        className={cx("modal-drop__input")}
                      />
                      <div className={cx("modal-drop__area")}>
                        <div className={cx("modal-drop__image")}>
                          <Profile />
                        </div>
                        <p className={cx("modal-drop__title", "base", "lh")}>
                          Drop your image here
                        </p>
                        <p className={cx("modal-drop__text", "small", "lh")}>
                          Upload only .jpg or .png format less than 3 MB
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div
                    className={cx("modal-drop__wrap")}
                    draggable
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                  >
                    <label className={cx("modal-drop__label")} htmlFor="drag">
                      <input
                        type="file"
                        id="drag"
                        className={cx("modal-drop__input")}
                        onChange={onImageChange}
                      />
                      <div className={cx("modal-drop__drag")}>
                        <div className={cx("modal-drop__image")}>
                          <Profile />
                        </div>
                        <p className={cx("modal-drop__title", "base", "lh")}>
                          You can drop your image here
                        </p>
                      </div>
                      <p className={cx("modal-drop__browse", "small")}>
                        Browse profile photo
                      </p>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={cx("modal__right")}>
            <Textarea
              htmlFor="Description"
              value=""
              onChange={(e) => e.target.value}
              label="Description"
              theme={theme}
            />
            <Input
              label="Name"
              htmlFor="Name"
              value=""
              onChange={() => ""}
              theme={theme}
              className={cx("modal__input")}
            />
            <Input
              label="Years of life"
              htmlFor="Years"
              value=""
              onChange={() => ""}
              theme={theme}
              className={cx("modal__input")}
            />
            <Input
              label="Location"
              htmlFor="Location"
              value=""
              onChange={() => ""}
              theme={theme}
              className={cx("modal__input")}
            />
            <Multiselect
              title="Genres"
              list={["Romanticism", "Art", "Nature", "Bataille", "Realistic"]}
              listSelect={listSelect}
              setListSelect={setListSelect}
              theme={theme}
              className={cx("modal__select")}
            />
            <Button className={cx("modal__button")} theme={theme}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;

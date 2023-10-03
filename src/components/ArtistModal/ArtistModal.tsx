import { FC } from "react";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import isEqual from "lodash.isequal";

import { IArtistModal } from "@/models/IArtist";
import { IGenre } from "@/models/IGenre";
import {
  useAddArtistMutation,
  useEditArtistMutation,
} from "@/store/artists/artist.api";
import { imageSchema } from "@/utils/Schems/imageSchema";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useTheme } from "@/context/ThemeContext";

import { Modal } from "@/components/Modal";
import { InputAvatar } from "@/components/InputAvatar";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { Button } from "@/ui/Button";
import { Multiselect } from "@/ui/Multiselect";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface EditModalProps {
  setIsOpen: (value: boolean) => void;
  artistId?: string;
  variant?: "add" | "edit";
  genresList: IGenre[];
  initialData?: IArtistModal;
}

const defaultValues: IArtistModal = {
  name: "",
  yearsOfLife: "",
  description: "",
  genres: [],
  avatar: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required field"),
  yearsOfLife: yup.string().required("Required field"),
  description: yup.string().required("Required field"),
  avatar: imageSchema(),
  genres: yup
    .array()
    .min(1, "Сhoose at least one genre")
    .of(
      yup.object().shape({
        _id: yup.string().required(),
        name: yup.string().required(),
      })
    )
    .required(),
});

const ArtistModal: FC<EditModalProps> = ({
  artistId,
  setIsOpen,
  initialData,
  genresList,
  variant = "edit",
}) => {
  type ArtistFormData = yup.InferType<typeof validationSchema>;
  const { theme } = useTheme();
  const [addRequest] = useAddArtistMutation();
  const [editRequest] = useEditArtistMutation();
  const {
    drag,
    dragOverHandler,
    dragLeaveHandler,
    onDropHandler,
    onImageChange,
  } = useDragAndDrop();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ArtistFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues: initialData || defaultValues,
  });
  const generationRequestBody = (data: IArtistModal): FormData => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("yearsOfLife", data.yearsOfLife);
    formData.append("description", data.description);
    if (data.avatar !== initialData?.avatar) {
      formData.append("avatar", data.avatar);
    }
    data.genres.forEach((i, idx) => {
      formData.append(`genres[${idx}]`, i._id);
    });
    return formData;
  };

  const onSubmitHandler = async (data: any) => {
    if (!isEqual(initialData, data)) {
      if (variant === "add") {
        await addRequest(generationRequestBody(data))
          .unwrap()
          .then(() => setIsOpen(false))
          .catch(() => {});
      } else if (variant === "edit") {
        await editRequest({
          artistId: artistId || "",
          data: generationRequestBody(data),
        })
          .unwrap()
          .then(() => setIsOpen(false))
          .catch(() => {});
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Modal
      className={cx("modal", `modal-${theme}`, { drag })}
      closeModal={() => setIsOpen(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={cx("modal__content")}
      >
        <div className={cx("modal__left")}>
          <InputAvatar
            error={errors?.avatar?.message}
            name="avatar"
            dragOverHandler={dragOverHandler}
            dragLeaveHandler={dragLeaveHandler}
            onDropHandler={onDropHandler}
            drag={drag}
            onImageChange={onImageChange}
            control={control}
          />
        </div>
        <div className={cx("modal__right")}>
          <Input
            {...register("name")}
            label="name"
            theme={theme}
            error={errors?.name?.message}
          />
          <Input
            {...register("yearsOfLife")}
            label="years of life"
            theme={theme}
            error={errors?.yearsOfLife?.message}
          />
          <Textarea
            {...register("description")}
            error={errors?.description?.message}
            label="description"
            theme={theme}
          />
          <Multiselect
            control={control}
            name="genres"
            title="Genres"
            initialListSelect={initialData?.genres}
            list={genresList}
            theme={theme}
            error={errors?.genres?.message}
            className={cx("modal__select")}
          />
          <Button type="submit" className={cx("modal__button")} theme={theme}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default ArtistModal;

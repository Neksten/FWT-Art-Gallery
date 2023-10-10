import { FC, PropsWithChildren, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import isEqual from "lodash.isequal";
import * as yup from "yup";

import {
  useAddArtistMutation,
  useEditArtistMutation,
} from "@/store/artists/artist.api";
import { IGenre } from "@/models/IGenre";
import { useAppDispatch } from "@/hooks/redux";
import { IArtistModal } from "@/models/IArtist";
import { useTheme } from "@/context/ThemeContext";
import { resetError } from "@/store/error/errorSlice";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { imageSchema } from "@/utils/Schems/imageSchema";
import { genresSchema } from "@/utils/Schems/genresSchema";

import { InputAvatar } from "@/components/InputAvatar";
import { Modal } from "@/components/Modal";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Textarea } from "@/ui/Textarea";
import { Multiselect } from "@/ui/Multiselect";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface EditModalProps extends PropsWithChildren {
  artistId?: string;
  variant?: "add" | "edit";
  genresList: IGenre[];
  initialData?: IArtistModal;
  setIsOpen: (value: boolean) => void;
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
  genres: genresSchema(),
});

const ArtistModal: FC<EditModalProps> = ({
  artistId,
  initialData,
  genresList,
  setIsOpen,
  variant = "edit",
}) => {
  type ArtistFormData = yup.InferType<typeof validationSchema>;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [addRequest, { isSuccess: isSuccessAdd }] = useAddArtistMutation();
  const [editRequest, { isSuccess: isSuccessEdit }] = useEditArtistMutation();
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
    if (isEqual(initialData, data)) {
      return;
    }

    dispatch(resetError());

    if (variant === "add") {
      await addRequest(generationRequestBody(data));
    }
    if (variant === "edit") {
      await editRequest({
        artistId: artistId || "",
        data: generationRequestBody(data),
      });
    }
  };

  useEffect(() => {
    if (isSuccessAdd || isSuccessEdit) {
      setIsOpen(false);
    }
  }, [setIsOpen, isSuccessAdd, isSuccessEdit]);

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

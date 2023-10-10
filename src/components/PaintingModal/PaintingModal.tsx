import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames/bind";
import isEqual from "lodash.isequal";
import * as yup from "yup";

import {
  useAddArtistPaintingMutation,
  useEditArtistPaintingMutation,
} from "@/store/painting/painting.api";
import { useAppDispatch } from "@/hooks/redux";
import { IPainting } from "@/models/IPainting";
import { useTheme } from "@/context/ThemeContext";
import { resetError } from "@/store/error/errorSlice";
import { imageSchema } from "@/utils/Schems/imageSchema";

import { InputPainting } from "@/components/InputPainting";
import { Modal } from "@/components/Modal";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface PaintingModalProps {
  artistId: string;
  paintingId?: string;
  variant?: "add" | "edit";
  initialData?: IPainting;
  setIsOpen: (value: boolean) => void;
}

const defaultValues: IPainting = {
  name: "",
  yearOfCreation: "",
  image: "",
};

const generationRequestBody = (
  data: IPainting,
  initialData?: IPainting
): FormData => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("yearOfCreation", data.yearOfCreation);

  if (data.image !== initialData?.image) {
    formData.append("image", data.image);
  }

  return formData;
};

const validationSchema = yup.object({
  name: yup.string().required("Required field"),
  yearOfCreation: yup.string().required("Required field"),
  image: imageSchema(),
});

const PaintingModal: FC<PaintingModalProps> = ({
  variant = "add",
  paintingId,
  artistId,
  initialData,
  setIsOpen,
}) => {
  type PaintingFormData = yup.InferType<typeof validationSchema>;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [addRequest, { isSuccess: isSuccessAdd }] =
    useAddArtistPaintingMutation();
  const [editRequest, { isSuccess: isSuccessEdit }] =
    useEditArtistPaintingMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaintingFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues: initialData || defaultValues,
  });

  const onSubmitHandler = async (data: any) => {
    if (isEqual(initialData, data)) {
      return;
    }

    dispatch(resetError());

    if (variant === "add") {
      await addRequest({ artistId, data: generationRequestBody(data) });
    }
    if (variant === "edit" && paintingId) {
      await editRequest({
        artistId,
        paintingId,
        data: generationRequestBody(data, initialData),
      });
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (isSuccessAdd || isSuccessEdit) {
      setIsOpen(false);
    }
  }, [setIsOpen, isSuccessAdd, isSuccessEdit]);

  return (
    <Modal
      className={cx("modal", `modal-${theme}`)}
      closeModal={() => setIsOpen(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={cx("modal__content")}
      >
        <div className={cx("modal__inputs")}>
          <Input
            {...register("name")}
            label="The name of the picture"
            error={errors?.name?.message}
            theme={theme}
          />
          <Input
            type="number"
            {...register("yearOfCreation")}
            label="Year of creation"
            error={errors?.yearOfCreation?.message}
            theme={theme}
          />
        </div>
        <InputPainting
          name="image"
          control={control}
          error={errors?.image?.message}
        />
        <Button type="submit" className={cx("modal__button")} theme={theme}>
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default PaintingModal;

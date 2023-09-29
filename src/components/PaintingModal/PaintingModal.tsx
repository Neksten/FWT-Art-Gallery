import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { IPainting } from "@/models/IPainting";
import { imageSchema } from "@/utils/Schems/imageSchema";
import { useAddArtistPaintingMutation } from "@/store/artists/artist.api";

import { Modal } from "@/components/Modal";
import { InputPainting } from "@/components/InputPainting";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export interface PaintingModalProps {
  setIsOpen: (value: boolean) => void;
  idArtist: string;
  variant?: "add" | "edit";
}

interface PaintingDefaultValues extends Omit<IPainting, "yearOfCreation"> {
  yearOfCreation: string;
}

const defaultValues: PaintingDefaultValues = {
  name: "",
  yearOfCreation: "",
  image: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required field"),
  yearOfCreation: yup.string().required("Required field"),
  image: imageSchema(),
});

const PaintingModal: FC<PaintingModalProps> = ({
  setIsOpen,
  variant = "add",
  idArtist,
}) => {
  type PaintingFormData = yup.InferType<typeof validationSchema>;
  const { theme } = useTheme();
  const [addRequest] = useAddArtistPaintingMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaintingFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues,
  });

  const generationRequestBody = (data: PaintingDefaultValues): FormData => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("yearOfCreation", data.yearOfCreation);
    formData.append("image", data.image);
    return formData;
  };

  const onSubmitHandler = async (data: any) => {
    if (variant === "add") {
      await addRequest({ id: idArtist, data: generationRequestBody(data) })
        .unwrap()
        .then(() => setIsOpen(false))
        .catch(() => {});
    }
  };

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

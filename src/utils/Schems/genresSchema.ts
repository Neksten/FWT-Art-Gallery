import * as yup from "yup";

export const genresSchema = () =>
  yup
    .array()
    .min(1, "Сhoose at least one genre")
    .of(
      yup.object().shape({
        _id: yup.string().required(),
        name: yup.string().required(),
      })
    )
    .required();

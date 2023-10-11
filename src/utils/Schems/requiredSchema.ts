import * as yup from "yup";

export const requiredSchema = () => {
  return yup.string().required("Required field");
};

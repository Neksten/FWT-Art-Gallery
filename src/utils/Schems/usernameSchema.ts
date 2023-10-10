import * as yup from "yup";

export const usernameSchema = () => {
  return yup.string().email("Enter a valid email").required("Required field");
};

import * as yup from "yup";

export const usernameSchema = () =>
  yup.string().email("Enter a valid email").required("Required field");
